
import React from 'react';
import Layout from '@/components/layout/Layout';

const FollowingPage: React.FC = () => {
  return (
    <Layout>
      <div className="animate-entrance max-w-7xl mx-auto">
        <h1 className="text-2xl font-rajdhani font-bold text-glow mb-6">Following</h1>
        
        <div className="bg-echo-blue/20 border border-echo-cyan/20 rounded-xl p-8 text-center">
          <h2 className="text-xl font-medium text-echo-cyan mb-4">Your Network</h2>
          <p className="text-gray-400 mb-6">
            Stay connected with creators and communities you follow.
          </p>
          <div className="p-12 flex items-center justify-center">
            <div className="text-echo-cyan/50 text-lg">
              Follow creators to see their content here
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FollowingPage;
