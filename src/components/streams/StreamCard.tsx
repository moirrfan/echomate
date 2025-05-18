
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Circle } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface StreamCardProps {
  id: string;
  title: string;
  streamer: {
    username: string;
    displayName: string;
    avatar?: string;
  };
  thumbnailUrl: string;
  viewers: number;
  category?: string;
  isLive: boolean;
}

const StreamCard: React.FC<StreamCardProps> = ({
  id,
  title,
  streamer,
  thumbnailUrl,
  viewers,
  category,
  isLive
}) => {
  return (
    <Link 
      to={`/streams/${id}`}
      className="group block relative overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-echo-dark to-transparent opacity-60 z-10"></div>
        <img 
          src={thumbnailUrl || '/placeholder.svg'} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {isLive && (
          <div className="absolute top-2 left-2 z-20 flex items-center bg-red-500/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
            <Circle className="h-3 w-3 fill-white text-white mr-1 animate-pulse" />
            LIVE
          </div>
        )}
        
        <div className="absolute bottom-2 right-2 z-20 flex items-center bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
          <Users className="h-3 w-3 mr-1" />
          {viewers.toLocaleString()}
        </div>
      </div>
      
      <div className="p-3 bg-echo-blue/50 backdrop-blur-sm">
        <div className="flex">
          <Avatar className="h-8 w-8 border border-echo-cyan/30">
            {streamer.avatar ? (
              <img src={streamer.avatar} alt={streamer.displayName} />
            ) : (
              <div className="bg-gradient-to-br from-echo-cyan/60 to-echo-magenta/60 w-full h-full"></div>
            )}
          </Avatar>
          
          <div className="ml-2 flex-1">
            <h3 className="font-medium text-white line-clamp-1 group-hover:text-echo-cyan transition-colors">
              {title}
            </h3>
            <div className="flex justify-between">
              <p className="text-sm text-gray-400">{streamer.displayName}</p>
              {category && (
                <span className="text-xs bg-echo-blue/80 text-echo-cyan px-2 py-0.5 rounded">
                  {category}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className={cn(
        "absolute inset-0 border-2 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        isLive ? "border-echo-magenta shadow-glow-magenta" : "border-echo-cyan shadow-glow-cyan"
      )}></div>
    </Link>
  );
};

export default StreamCard;
