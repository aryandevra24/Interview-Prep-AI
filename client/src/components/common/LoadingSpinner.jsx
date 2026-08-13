const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span
        className={`animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600 ${sizes[size]}`}
      />
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default LoadingSpinner;
