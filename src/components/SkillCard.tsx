import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <Card
      elevation={0}
      sx={{ p: 2, '&:hover': { borderColor: 'primary.main' } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: 'background.default',
            color: 'primary.main',
            display: 'flex',
            transition: 'background-color 0.3s',
          }}
        >
          <FontAwesomeIcon icon={skill.icon} className="w-6 h-6" fixedWidth />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {skill.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {skill.description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
