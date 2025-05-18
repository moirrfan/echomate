
import express from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Create a post
router.post('/', auth, async (req, res) => {
  try {
    const { content, media, filter, hub, tags, visibility } = req.body;
    
    // Basic validation
    if (!content && (!media || media.length === 0)) {
      return res.status(400).json({ message: 'Post must have content or media' });
    }
    
    const newPost = new Post({
      creator: req.user.id,
      content,
      media: media || [],
      filter: filter || 'None',
      hub,
      tags: tags || [],
      visibility: visibility || 'public'
    });
    
    const post = await newPost.save();
    await Post.populate(post, { path: 'creator', select: 'username displayName avatar' });
    
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get feed posts (timeline)
router.get('/feed', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    
    // Get posts from users being followed and own posts
    const following = currentUser.following;
    following.push(req.user.id); // Include own posts
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const posts = await Post.find({ 
      creator: { $in: following },
      visibility: 'public'
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('creator', 'username displayName avatar')
      .populate('comments.user', 'username displayName avatar');
    
    res.json({
      posts,
      hasMore: posts.length === limit,
      page
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get trending posts
router.get('/trending', async (req, res) => {
  try {
    const posts = await Post.aggregate([
      { $match: { visibility: 'public', createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } },
      { $addFields: { reactionCount: { $size: '$reactions' }, commentCount: { $size: '$comments' } } },
      { $addFields: { score: { $add: ['$reactionCount', { $multiply: ['$commentCount', 2] }] } } },
      { $sort: { score: -1 } },
      { $limit: 20 }
    ]);
    
    await Post.populate(posts, { path: 'creator', select: 'username displayName avatar' });
    
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('creator', 'username displayName avatar')
      .populate('comments.user', 'username displayName avatar');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a reaction to post
router.post('/:id/react', auth, async (req, res) => {
  try {
    const { type } = req.body;
    
    if (!['like', 'love', 'wow', 'pulse', 'echo'].includes(type)) {
      return res.status(400).json({ message: 'Invalid reaction type' });
    }
    
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if already reacted
    const existingReaction = post.reactions.find(
      reaction => reaction.user.toString() === req.user.id && reaction.type === type
    );
    
    if (existingReaction) {
      // Remove reaction if same type (toggle)
      post.reactions = post.reactions.filter(
        reaction => !(reaction.user.toString() === req.user.id && reaction.type === type)
      );
    } else {
      // Remove any existing reaction of different type
      post.reactions = post.reactions.filter(
        reaction => reaction.user.toString() !== req.user.id
      );
      
      // Add new reaction
      post.reactions.push({
        user: req.user.id,
        type
      });
    }
    
    await post.save();
    
    res.json({ 
      message: existingReaction ? 'Reaction removed' : 'Reaction added',
      reactionCounts: post.reactionCounts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a comment to post
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }
    
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    post.comments.push({
      user: req.user.id,
      content
    });
    
    await post.save();
    
    // Populate the new comment
    const newComment = post.comments[post.comments.length - 1];
    await Post.populate(post, { path: 'comments.user', select: 'username displayName avatar' });
    
    res.status(201).json({
      comment: post.comments.find(comment => comment._id.toString() === newComment._id.toString())
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user owns the post
    if (post.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await post.remove();
    
    res.json({ message: 'Post removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
