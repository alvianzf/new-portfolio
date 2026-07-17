import Card from '@mui/material/Card';

interface PixelCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'green' | 'purple' | 'yellow';
}

const glowColors = {
  blue: '#3b82f6',
  green: '#22c55e',
  purple: '#a855f7',
  yellow: '#eab308',
};

export default function PixelCard({ children, className = '', glowColor }: PixelCardProps) {
  return (
    <Card
      square
      elevation={0}
      className={className}
      sx={{
        border: 4,
        borderColor: 'divider',
        boxShadow: '8px 8px 0px 0px rgba(0, 0, 0, 0.25)',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-0.25rem)',
          borderColor: glowColors[glowColor ?? 'blue'],
        },
      }}
    >
      {children}
    </Card>
  );
}
