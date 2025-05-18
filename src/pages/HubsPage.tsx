
import React from 'react';
import Layout from '@/components/layout/Layout';
import HubCard from '@/components/hubs/HubCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
const featuredHubs = [
  {
    id: 'creative-sparks',
    name: 'Creative Sparks',
    description: 'A hub for digital artists, designers, and creative minds to share work and collaborate on projects.',
    memberCount: 12485,
    bannerImage: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    iconImage: '',
    theme: 'Creative' as const
  },
  {
    id: 'tech-pulse',
    name: 'Tech Pulse',
    description: 'Discussions about emerging technologies, programming, AI, and the future of tech.',
    memberCount: 9876,
    bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    iconImage: '',
    theme: 'Tech' as const
  },
  {
    id: 'gaming-nexus',
    name: 'Gaming Nexus',
    description: 'The ultimate hub for gamers - share gameplay, discuss strategies, and connect with fellow players.',
    memberCount: 15342,
    bannerImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    iconImage: '',
    theme: 'Gaming' as const
  }
];

const popularHubs = [
  {
    id: 'music-wave',
    name: 'Music Wave',
    description: 'Share tracks, discuss production techniques, and discover new artists and genres.',
    memberCount: 7823,
    bannerImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    iconImage: '',
    theme: 'Default' as const
  },
  {
    id: 'digital-nomads',
    name: 'Digital Nomads',
    description: 'For remote workers and travelers sharing experiences, workspaces, and lifestyle tips.',
    memberCount: 5467,
    bannerImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    iconImage: '',
    theme: 'Lifestyle' as const
  },
  {
    id: 'cyber-security',
    name: 'Cyber Security',
    description: 'Discussions on security protocols, ethical hacking, and protecting digital assets.',
    memberCount: 4298,
    bannerImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    iconImage: '',
    theme: 'Tech' as const
  },
  {
    id: 'future-fashion',
    name: 'Future Fashion',
    description: 'Exploring digital fashion, wearable tech, and next-generation style concepts.',
    memberCount: 3456,
    bannerImage: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    iconImage: '',
    theme: 'Lifestyle' as const
  },
  {
    id: 'ai-collective',
    name: 'AI Collective',
    description: 'Research, applications, and ethical discussions about artificial intelligence.',
    memberCount: 6789,
    bannerImage: 'https://images.unsplash.com/photo-1677442135706-27305f2f1d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    iconImage: '',
    theme: 'Tech' as const
  },
  {
    id: 'eco-innovators',
    name: 'Eco Innovators',
    description: 'Sustainable technology, green living, and environmental innovation discussions.',
    memberCount: 3987,
    bannerImage: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    iconImage: '',
    theme: 'Lifestyle' as const
  }
];

const HubsPage: React.FC = () => {
  return (
    <Layout>
      <div className="animate-entrance">
        <header className="mb-6">
          <h1 className="text-3xl font-rajdhani font-bold text-glow mb-2">
            Community Hubs
          </h1>
          <p className="text-gray-400">Discover communities and connect with like-minded individuals</p>
        </header>

        <div className="flex flex-wrap justify-between gap-4 items-center mb-8">
          <Input 
            type="search" 
            placeholder="Search hubs..." 
            className="bg-echo-blue/30 border-echo-cyan/20 max-w-xs"
          />
          
          <Button 
            className="bg-gradient-to-r from-echo-cyan to-echo-magenta hover:from-echo-cyan/90 hover:to-echo-magenta/90 text-white font-semibold"
          >
            Create Hub
          </Button>
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-rajdhani font-bold text-glow mb-4">Featured Hubs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHubs.map(hub => (
              <HubCard
                key={hub.id}
                id={hub.id}
                name={hub.name}
                description={hub.description}
                memberCount={hub.memberCount}
                bannerImage={hub.bannerImage}
                iconImage={hub.iconImage}
                theme={hub.theme}
              />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-rajdhani font-bold text-glow">Popular Hubs</h2>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="border-echo-cyan/30 text-echo-cyan">
                All
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400">
                Tech
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-400">
                Creative
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularHubs.map(hub => (
              <HubCard
                key={hub.id}
                id={hub.id}
                name={hub.name}
                description={hub.description}
                memberCount={hub.memberCount}
                bannerImage={hub.bannerImage}
                iconImage={hub.iconImage}
                theme={hub.theme}
              />
            ))}
          </div>
        </section>

        <div className="text-center py-6">
          <Button variant="outline" className="border-echo-cyan/30 text-echo-cyan">
            Load More
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default HubsPage;
