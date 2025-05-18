
import express from 'express';
import Hub from '../models/Hub.js';
import Post from '../models/Post.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create a hub
router.post('/', auth, async (req, res) => {
  try {
    const {
      name,
      description,
      banner,
      icon,
      theme,
      rules,
      isPrivate,
      tags
    } = req.body;
    
    // Check if hub with same name exists
    const existingHub = await Hub.findOne({ name });
    if (existingHub) {
      return res.status(400).json({ message: 'A hub with this name already exists' });
    }
    
    const newHub = new Hub({
      name,
      description,
      creator: req.user.id,
      banner,
      icon,
      theme: theme || 'Default',
      members: [{ user: req.user.id, role: 'admin' }],
      rules: rules || [],
      isPrivate: isPrivate || false,
      tags: tags || []
    });
    
    const hub = await newHub.save();
    
    // Populate creator
    await Hub.populate(hub, { path: 'creator', select: 'username displayName avatar' });
    await Hub.populate(hub, { path: 'members.user', select: 'username displayName avatar' });
    
    res.status(201).json(hub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get popular hubs
router.get('/popular', async (req, res) => {
  try {
    const hubs = await Hub.aggregate([
      { $match: { isPrivate: false } },
      { $addFields: { memberCount: { $size: '$members' } } },
      { $sort: { memberCount: -1 } },
      { $limit: 10 }
    ]);
    
    await Hub.populate(hubs, { path: 'creator', select: 'username displayName avatar' });
    
    res.json(hubs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get hub by name
router.get('/:name', async (req, res) => {
  try {
    const hub = await Hub.findOne({ name: req.params.name })
      .populate('creator', 'username displayName avatar')
      .populate('members.user', 'username displayName avatar');
    
    if (!hub) {
      return res.status(404).json({ message: 'Hub not found' });
    }
    
    res.json(hub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get hub posts
router.get('/:id/posts', async (req, res) => {
  try {
    const hub = await Hub.findById(req.params.id);
    if (!hub) {
      return res.status(404).json({ message: 'Hub not found' });
    }
    
    const posts = await Post.find({ hub: hub._id })
      .sort({ createdAt: -1 })
      .populate('creator', 'username displayName avatar')
      .populate('comments.user', 'username displayName avatar')
      .limit(20);
    
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Join a hub
router.post('/:id/join', auth, async (req, res) => {
  try {
    const hub = await Hub.findById(req.params.id);
    if (!hub) {
      return res.status(404).json({ message: 'Hub not found' });
    }
    
    // Check if already a member
    const isMember = hub.members.some(member => member.user.toString() === req.user.id);
    if (isMember) {
      return res.status(400).json({ message: 'Already a member of this hub' });
    }
    
    // Add as member
    hub.members.push({ user: req.user.id, role: 'member' });
    await hub.save();
    
    res.json({ message: 'Joined hub successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Leave a hub
router.post('/:id/leave', auth, async (req, res) => {
  try {
    const hub = await Hub.findById(req.params.id);
    if (!hub) {
      return res.status(404).json({ message: 'Hub not found' });
    }
    
    // Can't leave if creator and only admin
    const isCreator = hub.creator.toString() === req.user.id;
    const adminCount = hub.members.filter(member => member.role === 'admin').length;
    
    if (isCreator && adminCount === 1) {
      return res.status(400).json({ message: 'Creator cannot leave hub without appointing another admin' });
    }
    
    // Remove from members
    hub.members = hub.members.filter(member => member.user.toString() !== req.user.id);
    await hub.save();
    
    res.json({ message: 'Left hub successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search hubs
router.get('/search/:query', async (req, res) => {
  try {
    const searchQuery = req.params.query;
    const hubs = await Hub.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { tags: { $in: [new RegExp(searchQuery, 'i')] } }
      ]
    })
    .select('name description icon banner theme')
    .limit(20);
    
    res.json(hubs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
