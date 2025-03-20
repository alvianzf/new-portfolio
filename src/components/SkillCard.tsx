import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 group">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-900 rounded-lg group-hover:bg-blue-800 transition-colors">
          <FontAwesomeIcon 
            icon={skill.icon} 
            className="w-6 h-6 text-blue-400"
            fixedWidth
          />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-200">{skill.name}</h4>
          <p className="text-sm text-gray-400">{skill.description}</p>
        </div>
      </div>
    </div>
  );
}