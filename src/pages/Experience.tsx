import React from 'react';
import { experiences } from '../data';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">Professional Experience</h1>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
              <div className="flex items-start">
                <div className="bg-blue-900 p-3 rounded-full mr-4">
                  <Briefcase className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-400">{exp.title}</h3>
                  <p className="text-gray-300 mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-400 mb-4">{exp.period}</p>
                  <p className="text-gray-300">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}