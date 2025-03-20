import React from 'react';
import { Skill } from '../types';

interface SkillBarProps {
  skill: Skill;
}

export default function SkillBar({ skill }: SkillBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-gray-300">{skill.name}</span>
        <span className="text-sm font-medium text-gray-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );
}