import React from 'react';
import Card from '@mui/material/Card';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function ModernCard({ children, className = '' }: ModernCardProps) {
  return (
    <Card
      elevation={0}
      className={`p-6 ${className}`}
      sx={{
        boxShadow: 1,
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-0.25rem)',
          borderColor: 'primary.main',
        },
        '.cyberpunk &:hover': {
          boxShadow: '6px 6px 0px var(--accent-primary)',
          transform: 'translate(-2px, -2px)',
        },
      }}
    >
      {children}
    </Card>
  );
}
