
import mongoose from 'mongoose';

const hubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 1000
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  banner: {
    type: String
  },
  icon: {
    type: String
  },
  theme: {
    type: String,
    enum: ['Default', 'Tech', 'Creative', 'Gaming', 'Lifestyle'],
    default: 'Default'
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['member', 'moderator', 'admin'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  streams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stream'
  }],
  rules: [{
    title: String,
    description: String
  }],
  isPrivate: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Hub = mongoose.model('Hub', hubSchema);

export default Hub;
