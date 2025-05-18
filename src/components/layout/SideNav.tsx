
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, MessageSquare, Search, Heart, Video, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SideNav: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Community', path: '/hubs' },
    { icon: Video, label: 'Live Streams', path: '/streams' },
    { icon: Play, label: 'Watch', path: '/watch' },
    { icon: Heart, label: 'Following', path: '/following' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
  ];

  const activeClass = "bg-echo-blue/70 text-white border-l-2 border-echo-cyan shadow-glow-sm";
  const inactiveClass = "text-gray-400 hover:bg-echo-blue/30 hover:text-white";

  return (
    <aside
      className={cn(
        "h-[calc(100vh-64px)] sticky top-16 bg-echo-dark border-r border-echo-cyan/20",
        expanded ? "w-56" : "w-16"
      )}
    >
      <div className="p-2">
        <Button
          variant="ghost"
          className="w-full py-2 px-4 mb-4 justify-center text-echo-cyan hover:bg-echo-blue/20 border border-echo-cyan/20 rounded-xl"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Collapse" : "Expand"}
        </Button>

        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center py-3 px-3 rounded-lg transition-all duration-200",
                  isActive ? activeClass : inactiveClass
                )
              }
            >
              <item.icon className={cn("h-5 w-5", expanded ? "mr-3" : "mx-auto")} />
              {expanded && <span>{item.label}</span>}
            </NavLink>
          ))}
        </div>

        <div className="mt-8 space-y-1">
          <h3 className={cn("text-xs font-semibold text-gray-500 mb-2 px-3", !expanded && "text-center")}>
            {expanded ? "TRENDING HUBS" : "HUBS"}
          </h3>
          
          {['Creative Sparks', 'Tech Pulse', 'Gaming Nexus', 'Music Wave'].map((hub, i) => (
            <NavLink
              key={hub}
              to={`/hubs/${hub.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center py-2 px-3 rounded-lg text-gray-400 hover:bg-echo-blue/30 hover:text-white transition-all duration-200"
            >
              <div className={cn(
                "w-6 h-6 rounded-full flex-shrink-0",
                i === 0 ? "bg-gradient-to-br from-red-500 to-yellow-500" :
                i === 1 ? "bg-gradient-to-br from-echo-cyan to-blue-500" :
                i === 2 ? "bg-gradient-to-br from-green-500 to-emerald-500" :
                "bg-gradient-to-br from-purple-500 to-echo-magenta"
              )}></div>
              {expanded && <span className="ml-3 text-sm truncate">{hub}</span>}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Button 
          variant="default" 
          className="w-full bg-gradient-to-r from-echo-cyan to-echo-magenta hover:from-echo-cyan/90 hover:to-echo-magenta/90 text-white font-semibold py-2 rounded-xl"
        >
          {expanded ? 'Go Live' : 'Live'}
        </Button>
      </div>
    </aside>
  );
};

export default SideNav;
