interface AboutProps {
  id: string;
}

const About = ({ id }: AboutProps) => {
  const technologies = [
    'HTML5',
    'CSS3',
    'JavaScript',
    'Tailwind CSS',
    'React.js',
    'Python',
    'Django REST API',
    'Git & Github',
    'Supabase',
    'MySQL',
    'AI & ML',
    'Wordpress',
  ];

  return (
    <section id={id} data-scroll-section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">About Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-1">
          {/* Story */}
          <div className="space-y-6 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-8 border-0">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              My Development Journey
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a passionate full-stack web developer with over 3 years of experience 
              creating dynamic, user-friendly applications. My journey began with a 
              curiosity about how websites work, and it quickly evolved into a deep 
              love for problem-solving through code.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I specialize in building scalable web applications using modern technologies. 
              My approach combines clean, efficient code with intuitive user experiences. 
              I believe that great software should not only work flawlessly but also 
              delight its users.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, 
              contributing to open-source projects, or sharing knowledge with the 
              developer community. I'm always eager to take on new challenges and 
              collaborate on exciting projects.
            </p>
          </div>

          {/* Technologies */}
          <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl p-8 shadow-xl border-0">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Technologies I Work With
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {technologies.map((tech, index) => (
                <div
                  key={tech}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-tr from-blue-50/80 via-white/80 to-cyan-50/80 dark:from-blue-900/40 dark:via-gray-900/60 dark:to-cyan-900/40 hover:scale-105 hover:shadow-lg transition-all duration-200 border border-blue-100 dark:border-blue-900"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-3 h-3 bg-blue-600 rounded-full shadow"></div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;