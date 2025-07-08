// Card component yang reusable

import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'medium',
  variant = 'default',
  ...props 
}) => {
  // Base classes
  const baseClasses = 'bg-white rounded-lg shadow-medical border border-gray-200';
  
  // Hover effect
  const hoverClasses = hover ? 'transition-all duration-300 hover:shadow-medical-lg hover:-translate-y-1 cursor-pointer' : '';
  
  // Padding classes
  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };
  
  // Variant classes
  const variantClasses = {
    default: '',
    success: 'border-l-4 border-l-green-500',
    warning: 'border-l-4 border-l-yellow-500',
    danger: 'border-l-4 border-l-red-500',
    info: 'border-l-4 border-l-blue-500',
  };
  
  // Combine classes
  const cardClasses = `
    ${baseClasses}
    ${hoverClasses}
    ${paddingClasses[padding]}
    ${variantClasses[variant]}
    ${className}
  `.trim();
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

// Sub-components
const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
);

// Export components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
