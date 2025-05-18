
import mongoose from 'mongoose';

const streamSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500
  },
  thumbnailUrl: {
    type: String
  },
  streamKey: {
    type: String,
    required: true,
    unique: true
  },
  playbackUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['scheduled', 'live', 'ended', 'recorded'],
    default: 'scheduled'
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  scheduledFor: {
    type: Date
  },
  recordingUrl: {
    type: String
  },
  category: {
    type: String
  },
  tags: [{
    type: String
  }],
  viewers: {
    type: Number,
    default: 0
  },
  totalViews: {
    type: Number,
    default: 0
  },
  hub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hub'
  },
  coHosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Stream = mongoose.model('Stream', streamSchema);

export default Stream;
