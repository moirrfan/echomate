
import React, { useState } from 'react';
import { Image, Video, Send } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const CreatePostCard: React.FC = () => {
  const [postContent, setPostContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleFocus = () => {
    setIsExpanded(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Post content:', postContent);
    setPostContent('');
    setIsExpanded(false);
  };
  
  return (
    <div className="echo-card mb-6 overflow-hidden">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex">
          <Avatar className="h-10 w-10 border border-echo-cyan/30 mr-3">
            <div className="bg-gradient-to-br from-echo-cyan/60 to-echo-magenta/60 w-full h-full"></div>
          </Avatar>
          
          <div className="flex-1 relative">
            <Textarea
              placeholder="What's on your mind?"
              className="bg-echo-blue/20 border-echo-cyan/20 resize-none text-gray-200 w-full rounded-xl focus:border-echo-cyan focus:ring-echo-cyan"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              onFocus={handleFocus}
              rows={isExpanded ? 3 : 1}
            />
            
            <div className={`mt-3 flex justify-between items-center ${!isExpanded && 'hidden'}`}>
              <div className="flex space-x-2">
                <Button type="button" variant="ghost" className="p-2 rounded-full text-echo-cyan hover:bg-echo-blue/30">
                  <Image className="h-5 w-5" />
                </Button>
                <Button type="button" variant="ghost" className="p-2 rounded-full text-echo-magenta hover:bg-echo-blue/30">
                  <Video className="h-5 w-5" />
                </Button>
              </div>
              
              <Button 
                type="submit" 
                disabled={!postContent.trim()}
                className="bg-gradient-to-r from-echo-cyan to-echo-magenta hover:from-echo-cyan/90 hover:to-echo-magenta/90 text-white rounded-full flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostCard;
