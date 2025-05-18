
import React from 'react';
import Layout from '@/components/layout/Layout';
import StreamCard from '@/components/streams/StreamCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Mock data for demonstration
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
  },
  {
    id: '4',
    title: 'Cybernetic Integration Theory',
    streamer: {
      username: 'digital_nexus',
      displayName: 'Digital Nexus'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    viewers: 743,
    category: 'Science',
    isLive: true
  },
  {
    id: '5',
    title: 'Molecular Nanotech Development',
    streamer: {
      username: 'biosynapse',
      displayName: 'BioSynapse'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1554475900-0a0350e3fc7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    viewers: 1089,
    category: 'Tech',
    isLive: true
  },
  {
    id: '6',
    title: 'Virtual Reality Game Development',
    streamer: {
      username: 'neon_arcade',
      displayName: 'Neon Arcade'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    viewers: 876,
    category: 'Gaming',
    isLive: true
  }
];

const upcomingStreams = [
  {
    id: '7',
    title: 'Holographic Interface Design Workshop',
    streamer: {
      username: 'ui_future',
      displayName: 'UI Future'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    viewers: 0,
    category: 'Design',
    isLive: false
  },
  {
    id: '8',
    title: 'Next-Gen Neural Networks Explained',
    streamer: {
      username: 'ai_collective',
      displayName: 'AI Collective'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    viewers: 0,
    category: 'Tech',
    isLive: false
  }
];

const pastStreams = [
  {
    id: '9',
    title: 'Advanced Biotechnology Panel Discussion',
    streamer: {
      username: 'bio_innovations',
      displayName: 'Bio Innovations'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    viewers: 1532,
    category: 'Science',
    isLive: false
  },
  {
    id: '10',
    title: 'Digital Fashion Show: Neo Tokyo Collection',
    streamer: {
      username: 'cyber_style',
      displayName: 'Cyber Style'
    },
    thumbnailUrl: 'https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    viewers: 2187,
    category: 'Fashion',
    isLive: false
  }
];

const categories = [
  'All', 'Tech', 'Creative', 'Gaming', 'Music', 
  'Science', 'Fashion', 'Art', 'Education'
];

const StreamsPage: React.FC = () => {
  return (
    <Layout>
      <div className="animate-entrance">
        <header className="mb-6">
          <h1 className="text-3xl font-rajdhani font-bold text-glow mb-2">Streams</h1>
          <p className="text-gray-400">Discover live streams, upcoming events, and past broadcasts</p>
        </header>

        <div className="flex flex-wrap gap-3 mb-6">
          <Input 
            type="search" 
            placeholder="Search streams..." 
            className="bg-echo-blue/30 border-echo-cyan/20 max-w-xs"
          />
          <div className="flex overflow-x-auto space-x-2 py-2 scrollbar-hide">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className={index === 0 ? 
                  "bg-gradient-to-r from-echo-cyan to-echo-magenta text-white" : 
                  "border-echo-cyan/20 text-gray-400 hover:text-white"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="live" className="mb-8">
          <TabsList className="bg-echo-blue/30 border border-echo-cyan/20">
            <TabsTrigger value="live" className="data-[state=active]:bg-echo-blue/70">
              Live Now
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-echo-blue/70">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-echo-blue/70">
              Past Streams
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="live">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
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
          </TabsContent>
          
          <TabsContent value="upcoming">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
              {upcomingStreams.map(stream => (
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
          </TabsContent>
          
          <TabsContent value="past">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6">
              {pastStreams.map(stream => (
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
          </TabsContent>
        </Tabs>

        <div className="text-center py-6">
          <Button variant="outline" className="border-echo-cyan/30 text-echo-cyan">
            Load More
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default StreamsPage;
