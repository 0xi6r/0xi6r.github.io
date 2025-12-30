import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold text-red-400 mb-4">404</h1>
        
        {/* Message */}
        <h2 className="text-2xl font-semibold text-white mb-6">
          Page Not Found
        </h2>
        
        {/* Description */}
        <p className="text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        {/* Home Link */}
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 
                   text-white font-medium rounded-lg transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
