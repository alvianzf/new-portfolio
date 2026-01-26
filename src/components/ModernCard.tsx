import React from 'react';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function ModernCard({ children, className = '' }: ModernCardProps) {
  return (
    <div className={`card-modern p-6 ${className}`}>
      {children}
    </div>
  );
}
