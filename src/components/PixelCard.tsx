interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'green' | 'purple' | 'yellow';
}

export default function PixelCard({ children, className = '', glowColor }: PixelCardProps) {
  const glowClass = glowColor ? `hover:border-${glowColor}-500` : 'hover:border-blue-500';

  return (
    <div className={`bg-white dark:bg-gray-900 border-4 border-gray-300 dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1 ${className} ${glowClass}`}>
      {children}
    </div>
  );
}
