import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { Skill } from '../types';

interface SkillBarProps {
  skill: Skill;
}

export default function SkillBar({ skill }: SkillBarProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
          {skill.name}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
          {skill.level}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={skill.level}
        sx={{ height: 10, '& .MuiLinearProgress-bar': { transition: 'transform 0.5s' } }}
      />
    </Box>
  );
}
