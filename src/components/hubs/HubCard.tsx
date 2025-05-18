
import React from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

interface HubCardProps {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  bannerImage?: string;
  iconImage?: string;
  theme?: 'Default' | 'Tech' | 'Creative' | 'Gaming' | 'Lifestyle';
}

const HubCard: React.FC<HubCardProps> = ({
  id,
  name,
  description,
  memberCount,
  bannerImage,
  iconImage,
  theme = 'Default'
}) => {
  const getThemeStyle = () => {
    switch (theme) {
      case 'Tech':
        return 'from-blue-500/30 to-cyan-500/30 border-blue-500/30';
      case 'Creative':
        return 'from-purple-500/30 to-pink-500/30 border-purple-500/30';
      case 'Gaming':
        return 'from-green-500/30 to-emerald-500/30 border-green-500/30';
      case 'Lifestyle':
        return 'from-amber-500/30 to-yellow-500/30 border-amber-500/30';
      default:
        return 'from-echo-cyan/20 to-echo-magenta/20 border-echo-cyan/30';
    }
  };

  return (
    <Link 
      to={`/hubs/${id}`}
      className="group block rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
    >
      <div className={`bg-gradient-to-br ${getThemeStyle()} border rounded-xl overflow-hidden`}>
        <div className="h-24 relative overflow-hidden">
          {bannerImage ? (
            <img 
              src={bannerImage} 
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-echo-dark">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,0,0,0))]"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(0,163,255,0.4),rgba(255,0,0,0))]"></div>
              </div>
            </div>
          )}
          
          <div className="absolute -bottom-8 left-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-echo-blue bg-echo-dark">
              {iconImage ? (
                <img 
                  src={iconImage} 
                  alt={`${name} icon`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-echo-cyan to-echo-magenta"></div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4 pt-10">
          <h3 className="text-lg font-bold mb-1 group-hover:text-echo-cyan transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2 mb-3 h-10">
            {description}
          </p>
          <div className="flex items-center text-xs text-gray-400">
            <Users className="h-3 w-3 mr-1" />
            {memberCount.toLocaleString()} members
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HubCard;
