import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-400 mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-white mb-6">
          Page Not Found
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-600
                   text-white font-medium rounded-lg transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
