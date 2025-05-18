
import express from 'express';
import Stream from '../models/Stream.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Create a new stream
router.post('/', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      thumbnailUrl,
      category,
      tags,
      scheduledFor,
      hub
    } = req.body;
    
    // Generate a unique stream key
    const streamKey = uuidv4();
    
    const newStream = new Stream({
      creator: req.user.id,
      title,
      description,
      thumbnailUrl,
      streamKey,
      category,
      tags: tags || [],
      scheduledFor,
      hub,
      status: scheduledFor ? 'scheduled' : 'live',
      startTime: scheduledFor ? null : Date.now()
    });
    
    const stream = await newStream.save();
    
    // Update user streaming status
    if (!scheduledFor) {
      await User.findByIdAndUpdate(req.user.id, { isStreaming: true });
    }
    
    // Populate creator
    await Stream.populate(stream, { path: 'creator', select: 'username displayName avatar' });
    
    res.status(201).json(stream);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get active streams
router.get('/live', async (req, res) => {
  try {
    const streams = await Stream.find({ status: 'live' })
      .sort({ viewers: -1 })
      .populate('creator', 'username displayName avatar')
      .limit(20);
    
    res.json(streams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get scheduled streams
router.get('/scheduled', async (req, res) => {
  try {
    const streams = await Stream.find({ 
      status: 'scheduled',
      scheduledFor: { $gt: new Date() }
    })
      .sort({ scheduledFor: 1 })
      .populate('creator', 'username displayName avatar')
      .limit(20);
    
    res.json(streams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get stream by ID
router.get('/:id', async (req, res) => {
  try {
    const stream = await Stream.findById(req.params.id)
      .populate('creator', 'username displayName avatar bio')
      .populate('coHosts', 'username displayName avatar');
    
    if (!stream) {
      return res.status(404).json({ message: 'Stream not found' });
    }
    
    // Increment views
    stream.totalViews += 1;
    await stream.save();
    
    res.json(stream);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update viewer count
router.put('/:id/viewers', async (req, res) => {
  try {
    const { count } = req.body;
    
    if (typeof count !== 'number') {
      return res.status(400).json({ message: 'Viewer count must be a number' });
    }
    
    const stream = await Stream.findById(req.params.id);
    if (!stream) {
      return res.status(404).json({ message: 'Stream not found' });
    }
    
    stream.viewers = count;
    await stream.save();
    
    res.json({ viewers: stream.viewers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// End a stream
router.put('/:id/end', auth, async (req, res) => {
  try {
    const stream = await Stream.findById(req.params.id);
    
    if (!stream) {
      return res.status(404).json({ message: 'Stream not found' });
    }
    
    // Check if user owns the stream
    if (stream.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Update stream status
    stream.status = 'ended';
    stream.endTime = Date.now();
    await stream.save();
    
    // Update user streaming status
    await User.findByIdAndUpdate(req.user.id, { isStreaming: false });
    
    res.json({ message: 'Stream ended', stream });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add co-host to stream
router.post('/:id/cohost', auth, async (req, res) => {
  try {
    const { userId } = req.body;
    
    const stream = await Stream.findById(req.params.id);
    if (!stream) {
      return res.status(404).json({ message: 'Stream not found' });
    }
    
    // Check if user owns the stream
    if (stream.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Check if co-host already exists
    if (stream.coHosts.includes(userId)) {
      return res.status(400).json({ message: 'User is already a co-host' });
    }
    
    // Add co-host
    stream.coHosts.push(userId);
    await stream.save();
    
    // Populate co-host
    await Stream.populate(stream, { path: 'coHosts', select: 'username displayName avatar' });
    
    res.json({ message: 'Co-host added', coHosts: stream.coHosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
