
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  return (
    <nav className="border-b border-echo-cyan/20 bg-echo-dark bg-opacity-90 backdrop-blur-md sticky top-0 z-50 py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <span className="text-echo-cyan font-rajdhani text-2xl font-bold">
              ECHO<span className="text-echo-magenta">MATE</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex relative max-w-md w-full mx-4 group">
          <Input
            type="search"
            placeholder="Search Echomate..."
            className="bg-echo-blue/50 border border-echo-cyan/20 pl-10 pr-4 py-2 w-full rounded-full focus:ring-echo-cyan focus:border-echo-cyan transition-all duration-300 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-echo-cyan/70" />
          <div className="absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-echo-cyan shadow-glow-sm"></div>
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-4">
          <Button variant="ghost" className="relative p-2 rounded-full hover:bg-echo-blue/30 transition-all duration-300">
            <Bell className="h-5 w-5 text-echo-cyan/70" />
            <span className="absolute -top-1 -right-1 bg-echo-magenta text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-glow-magenta">3</span>
          </Button>
          
          <Button variant="ghost" className="relative p-2 rounded-full hover:bg-echo-blue/30 transition-all duration-300">
            <MessageSquare className="h-5 w-5 text-echo-cyan/70" />
            <span className="absolute -top-1 -right-1 bg-echo-cyan text-echo-dark rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-glow-cyan">2</span>
          </Button>
          
          <Link to="/profile" className="flex items-center">
            <Avatar className="h-8 w-8 border border-echo-cyan/30 shadow-glow-sm">
              <div className="bg-gradient-to-br from-echo-cyan/60 to-echo-magenta/60 w-full h-full rounded-full"></div>
            </Avatar>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
