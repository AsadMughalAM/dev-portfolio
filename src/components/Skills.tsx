import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Marquee from 'react-fast-marquee';

const techSkills = [
  'HTML5',
  'CSS3',
  'Tailwind CSS',
  'JavaScript',
  'React.js',
  'Django REST API',
  'Supabase',
  'MySQL',
  'AI & ML',
  'Wordpress',
  'Python',
  'Git & Github',
  'Self-Motivation',
];

const softSkills = [
  'Problem Solving',
  'Team Collaboration',
  'Communication',
  'Project Management',
  'Creative Thinking',
  'Attention to Detail',
  'Continuous Learning',
  'Time Management',
  'Typing Mastery',
  'Leadership',
  'Work Ethic',
  'Active Listening',
  'Decision Making',
  'Empathy',
  'Public Speaking',
  'Self-Motivation',
];

interface SkillsProps {
  id: string;
  isDarkMode: boolean;
}

const Skills = ({ id, isDarkMode }: SkillsProps) => {
  return (
    <section
      id={id}
      className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen w-full overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">Skills & Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            A blend of technical and soft skills that drive impactful results.
          </p>
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center tracking-wide uppercase letter-spacing-wider">
            Technical Skills
          </h3>
          <div className="marquee-container overflow-hidden">
            <Marquee 
              gradient={false}
              speed={40} 
              pauseOnHover={true}
              className="py-4 overflow-hidden"
              style={{ 
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
              }}
            >
              {techSkills.map((tech, index) => (
                <Card
                  key={`${tech}-${index}`}
                  className="flex items-center justify-center h-24 w-48 mx-4 bg-white/80 dark:bg-gray-900/80 border-0 shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-2xl group cursor-pointer hover:scale-105 will-change-transform"
                >
                  <span className="text-gray-800 dark:text-gray-200 font-semibold text-lg text-center group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors duration-200 px-4">
                    {tech}
                  </span>
                </Card>
              ))}
            </Marquee>
          </div>
        </div>
        
        <div className="flex items-center my-10">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
          <span className="mx-4 text-gray-400 dark:text-gray-500 font-medium tracking-widest uppercase text-xs">Soft Skills</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 overflow-hidden">
          {softSkills.map((skill, index) => (
            <Badge
              key={`${skill}-${index}`}
              variant="secondary"
              className="text-base px-5 py-2 rounded-full shadow-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;