
import React from 'react';
import Layout from '@/components/layout/Layout';
import CreatePostCard from '@/components/home/CreatePostCard';
import FeedPost from '@/components/home/FeedPost';
import StreamCard from '@/components/streams/StreamCard';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
const mockPosts = [
  {
    id: '1',
    author: {
      id: '1',
      username: 'neurosynth',
      displayName: 'NeuroSynth',
      avatar: ''
    },
    content: 'Just finished developing a new neural interface that transforms brainwaves into bioluminescent patterns! Check out these test results. #BioTech #DigitalSynapse',
    media: [
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    ],
    likes: 124,
    comments: 18,
    timestamp: '2h ago',
    filter: 'BioluminescentGlow'
  },
  {
    id: '2',
    author: {
      id: '2',
      username: 'quantum_pulse',
      displayName: 'Quantum Pulse',
      avatar: ''
    },
    content: "The digital ecosystem is evolving. We're not just consuming content anymore—we're becoming part of it. What patterns are you noticing in your online neural connections?",
    media: [],
    likes: 89,
    comments: 32,
    timestamp: '4h ago',
    filter: 'NeuralPulse'
  },
  {
    id: '3',
    author: {
      id: '3',
      username: 'synthwave_dreams',
      displayName: 'Synthwave Dreams',
      avatar: ''
    },
    content: 'New ambient track just dropped! "Digital Nebula" is an exploration of sound and light in virtual space. Listen with headphones for full immersion.',
    media: [
      {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    ],
    likes: 215,
    comments: 42,
    timestamp: '6h ago',
    filter: 'DigitalNebula'
  }
];

const liveStreams = [
  {
    id: '1',
    title: 'Creating Neural Art with AI',
    streamer: {
      username: 'neurosynth',
      displayName: 'NeuroSynth'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1633101585272-9511607bd096?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    viewers: 1245,
    category: 'Creative',
    isLive: true
  },
  {
    id: '2',
    title: 'Exploring Quantum Computing Applications',
    streamer: {
      username: 'quantum_pulse',
      displayName: 'Quantum Pulse'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    viewers: 892,
    category: 'Tech',
    isLive: true
  },
  {
    id: '3',
    title: 'Late Night Ambient Session',
    streamer: {
      username: 'synthwave_dreams',
      displayName: 'Synthwave Dreams'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    viewers: 567,
    category: 'Music',
    isLive: true
  }
];

const Index: React.FC = () => {
  return (
    <Layout>
      <div className="animate-entrance max-w-3xl mx-auto">
        <h1 className="sr-only">Echomate Home</h1>
        
        <CreatePostCard />
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-rajdhani font-bold text-glow">Live Now</h2>
            <Button variant="link" className="text-echo-cyan">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {liveStreams.map(stream => (
              <StreamCard
                key={stream.id}
                id={stream.id}
                title={stream.title}
                streamer={stream.streamer}
                thumbnailUrl={stream.thumbnailUrl}
                viewers={stream.viewers}
                category={stream.category}
                isLive={stream.isLive}
              />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-rajdhani font-bold text-glow">Your Feed</h2>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="border-echo-cyan/30 text-echo-cyan">
                Latest
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400">
                Top
              </Button>
            </div>
          </div>
          
          {mockPosts.map(post => (
            <FeedPost
              key={post.id}
              id={post.id}
              author={post.author}
              content={post.content}
              media={post.media}
              likes={post.likes}
              comments={post.comments}
              timestamp={post.timestamp}
              filter={post.filter}
            />
          ))}
          
          <div className="text-center mt-6 mb-8">
            <Button variant="outline" className="border-echo-cyan/30 text-echo-cyan">
              Load More
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
