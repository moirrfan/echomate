
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Share } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PostMedia {
  type: 'image' | 'video' | 'gif';
  url: string;
}

interface Author {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
}

interface FeedPostProps {
  id: string;
  author: Author;
  content: string;
  media?: PostMedia[];
  likes: number;
  comments: number;
  timestamp: string;
  filter?: string;
}

const FeedPost: React.FC<FeedPostProps> = ({
  id,
  author,
  content,
  media,
  likes,
  comments,
  timestamp,
  filter = 'None'
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const getFilterClass = () => {
    switch (filter) {
      case 'BioluminescentGlow':
        return 'bg-gradient-to-br from-echo-cyan/10 to-echo-magenta/10 shadow-glow-sm';
      case 'NeuralPulse':
        return 'bg-echo-dark border-echo-purple/30 shadow-glow-purple';
      case 'EchoChamber':
        return 'bg-echo-deepblue/80 border-echo-cyan/20';
      case 'DigitalNebula':
        return 'bg-gradient-to-br from-echo-purple/20 to-echo-blue/20';
      default:
        return 'bg-echo-blue/50';
    }
  };

  return (
    <div className={cn(
      "echo-card mb-6 overflow-hidden transition-all duration-300 hover:shadow-glow-sm",
      getFilterClass()
    )}>
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Link to={`/profile/${author.username}`}>
            <Avatar className="h-10 w-10 border border-echo-cyan/30">
              {author.avatar ? (
                <img src={author.avatar} alt={author.displayName} />
              ) : (
                <div className="bg-gradient-to-br from-echo-cyan/60 to-echo-magenta/60 w-full h-full"></div>
              )}
            </Avatar>
          </Link>
          <div className="ml-3">
            <Link 
              to={`/profile/${author.username}`}
              className="font-medium text-white hover:text-echo-cyan transition-colors"
            >
              {author.displayName}
            </Link>
            <div className="text-xs text-gray-400">@{author.username} • {timestamp}</div>
          </div>
        </div>
        
        <div className="mb-3 whitespace-pre-wrap text-gray-200">{content}</div>
        
        {media && media.length > 0 && (
          <div className={cn(
            "rounded-lg overflow-hidden mb-3",
            media.length > 1 ? "grid grid-cols-2 gap-2" : ""
          )}>
            {media.map((item, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                {item.type === 'image' && (
                  <img 
                    src={item.url} 
                    alt="Post media" 
                    className="w-full h-full object-cover"
                  />
                )}
                {item.type === 'video' && (
                  <video 
                    src={item.url}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
                {item.type === 'gif' && (
                  <img 
                    src={item.url} 
                    alt="Post media" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "flex items-center space-x-2 text-gray-400 hover:text-echo-magenta",
                liked && "text-echo-magenta"
              )}
              onClick={handleLike}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-echo-magenta")} />
              <span>{likeCount}</span>
            </Button>
            
            <Link to={`/post/${id}`}>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center space-x-2 text-gray-400 hover:text-echo-cyan"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{comments}</span>
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center space-x-2 text-gray-400 hover:text-echo-lime"
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
