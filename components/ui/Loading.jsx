// Loading component dengan berbagai variasi

import React from 'react';

const Loading = ({ 
  type = 'spinner', 
  size = 'medium', 
  message = 'Loading...', 
  fullscreen = false,
  className = '' 
}) => {
  // Size classes
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };
  
  // Spinner component
  const Spinner = () => (
    <svg
      className={`animate-spin ${sizeClasses[size]} text-blue-600`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
  
  // Dots component
  const Dots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`${sizeClasses[size].split(' ')[0]} ${sizeClasses[size].split(' ')[1]} bg-blue-600 rounded-full animate-pulse`}
          style={{
            animationDelay: `${index * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
  
  // Pulse component
  const Pulse = () => (
    <div className={`${sizeClasses[size]} bg-blue-600 rounded-full animate-pulse`} />
  );
  
  // Medical cross animation
  const MedicalCross = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-6 h-2 bg-blue-600 rounded animate-pulse" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-6 bg-blue-600 rounded animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
  
  // Progress bar component
  const ProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-blue-600 h-2 rounded-full animate-pulse" 
        style={{ width: '60%' }}
      />
    </div>
  );
  
  // Render loading component based on type
  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return <Dots />;
      case 'pulse':
        return <Pulse />;
      case 'medical':
        return <MedicalCross />;
      case 'progress':
        return <ProgressBar />;
      default:
        return <Spinner />;
    }
  };
  
  // Container component
  const LoadingContainer = ({ children }) => {
    if (fullscreen) {
      return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center">
            {children}
          </div>
        </div>
      );
    }
    
    return (
      <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
        {children}
      </div>
    );
  };
  
  return (
    <LoadingContainer>
      {renderLoader()}
      {message && (
        <p className="mt-2 text-sm text-gray-600 animate-pulse">
          {message}
        </p>
      )}
    </LoadingContainer>
  );
};

// Skeleton loading component
export const Skeleton = ({ className = '', children }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}>
    {children}
  </div>
);

// Loading overlay for specific sections
export const LoadingOverlay = ({ loading, children, message = 'Processing...' }) => {
  if (!loading) return children;
  
  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
        <Loading message={message} />
      </div>
    </div>
  );
};

export default Loading;
