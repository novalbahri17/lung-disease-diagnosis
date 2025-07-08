// Input component yang reusable

import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  type = 'text',
  label,
  error,
  help,
  className = '',
  size = 'medium',
  variant = 'default',
  icon: Icon,
  iconPosition = 'left',
  ...props 
}, ref) => {
  // Base input classes
  const baseClasses = 'block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500';
  
  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-3 py-2 text-sm',
    large: 'px-4 py-3 text-base',
  };
  
  // Variant classes
  const variantClasses = {
    default: '',
    error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
    success: 'border-green-300 focus:border-green-500 focus:ring-green-500',
  };
  
  // Icon classes
  const iconClasses = {
    left: Icon ? 'pl-10' : '',
    right: Icon ? 'pr-10' : '',
  };
  
  // Determine variant based on error
  const currentVariant = error ? 'error' : variant;
  
  // Combine classes
  const inputClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[currentVariant]}
    ${iconClasses[iconPosition]}
    ${className}
  `.trim();
  
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      {/* Input wrapper with icon */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none`}>
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        
        {/* Input */}
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          {...props}
        />
      </div>
      
      {/* Help text */}
      {help && !error && (
        <p className="mt-1 text-xs text-gray-500">
          {help}
        </p>
      )}
      
      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// Textarea component
export const Textarea = forwardRef(({ 
  label,
  error,
  help,
  className = '',
  rows = 3,
  ...props 
}, ref) => {
  const baseClasses = 'block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500';
  const errorClasses = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '';
  
  const textareaClasses = `
    ${baseClasses}
    ${errorClasses}
    ${className}
  `.trim();
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        rows={rows}
        className={textareaClasses}
        {...props}
      />
      
      {help && !error && (
        <p className="mt-1 text-xs text-gray-500">
          {help}
        </p>
      )}
      
      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

// Select component
export const Select = forwardRef(({ 
  label,
  error,
  help,
  options = [],
  placeholder = 'Select an option',
  className = '',
  ...props 
}, ref) => {
  const baseClasses = 'block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500';
  const errorClasses = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '';
  
  const selectClasses = `
    ${baseClasses}
    ${errorClasses}
    ${className}
  `.trim();
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <select
        ref={ref}
        className={selectClasses}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {help && !error && (
        <p className="mt-1 text-xs text-gray-500">
          {help}
        </p>
      )}
      
      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

// File input component
export const FileInput = forwardRef(({ 
  label,
  error,
  help,
  accept,
  multiple = false,
  className = '',
  onChange,
  ...props 
}, ref) => {
  const baseClasses = 'block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100';
  const errorClasses = error ? 'file:bg-red-50 file:text-red-700 hover:file:bg-red-100' : '';
  
  const fileInputClasses = `
    ${baseClasses}
    ${errorClasses}
    ${className}
  `.trim();
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <input
        ref={ref}
        type="file"
        accept={accept}
        multiple={multiple}
        className={fileInputClasses}
        onChange={onChange}
        {...props}
      />
      
      {help && !error && (
        <p className="mt-1 text-xs text-gray-500">
          {help}
        </p>
      )}
      
      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

FileInput.displayName = 'FileInput';

export default Input;
