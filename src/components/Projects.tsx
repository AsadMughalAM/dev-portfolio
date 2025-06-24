import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github } from 'lucide-react';
import { playClickSound } from '@/utils/soundUtils';
import devPortfolio from '../assets/portfolioC.png';
import imageGenerator from '../assets/imageGenerator.png';
import imageEnhancer from '../assets/imageEnhancer.png';
import reportAnalyzer from '../assets/reportAnalyzer.png';

interface ProjectsProps {
  id: string;
}

const Projects = ({ id }: ProjectsProps) => {
  const handleLinkClick = async () => {
    await playClickSound();
  };

  const projects = [
    {
      title: 'Dev-Portfolio',
      description: 'A sleek and modern personal portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth scrolling, a dark mode, and a custom cursor. The design is fully responsive and showcases my skills and projects in an elegant way.',
      image: devPortfolio,
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
      liveUrl: '#',
      githubUrl: 'https://github.com/AsadMughalAM/dev-portfolio.git',
    },
    {
      title: 'Image-Generator',
      description: 'A sleek web-based text-to-image generator that lets users bring their imagination to life. Powered by advanced AI (likely DALL·E, Stable Diffusion, or similar), this tool converts your prompts into stunning, high-resolution visuals in seconds.',
      image: imageGenerator,
      technologies: ['React.js', 'Gemini-Flash 2.0 API', 'Supabase', 'Tailwind'],
      liveUrl: 'https://image-dream-scape.vercel.app/',
      githubUrl: 'https://github.com/AsadMughalAM/image-dream-scape.git',
    },
    {
      title: 'Report-Analyzer',
      description: ' AI Report Analyzer is a sleek, accessible interface that simplifies the interpretation of medical reports using modern AI tools—bringing transparency and clarity to complex health data.',
      image: reportAnalyzer,
      technologies: ['React.js', 'Tailwind', 'Gemini API'],
      liveUrl: 'https://ai-report-analyzer.vercel.app/',
      githubUrl: 'https://github.com/AsadMughalAM/AI-ReportAnalyzer.git',
    },
    {
      title: 'Image-Enhancer',
      description: 'Effortlessly enhance your images using state-of-the-art AI. Upload your photo and experience instant upscaling, clarity, and vibrance. Perfect for photographers, designers, and anyone who wants their images to shine.',
      image: imageEnhancer,
      technologies: ['React.js', 'Tailwind', 'JavaScript', 'HTML5'],
      liveUrl: 'https://image-enhancer-sigma-ashy.vercel.app/',
      githubUrl: 'https://github.com/AsadMughalAM/image-Enhancer.git',
    }
  ];

  return (
    <section id={id} className="py-20 bg-white dark:bg-gray-900 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            Here are some of my recent projects that showcase my skills and passion for web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={project.title} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title} project`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load image for ${project.title}:`, e);
                    // Fallback to a placeholder or hide the image
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    asChild
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleLinkClick}
                  >
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                    >
                      View Live
                    </a>
                  </Button>
                  
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-gray-300 dark:border-gray-600"
                    onClick={handleLinkClick}
                  >
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`View source code of ${project.title} on GitHub`}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;