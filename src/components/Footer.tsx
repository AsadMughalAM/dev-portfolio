import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { playClickSound } from '@/utils/soundUtils';

interface FooterProps {
  scrollToSection: (sectionId: string) => void;
}

const Footer = ({ scrollToSection }: FooterProps) => {
  const handleSocialClick = async (url: string) => {
    await playClickSound();
    window.open(url, '_blank');
  };

  const handleEmailClick = async () => {
    await playClickSound();
    // Use window.open instead of window.location.href for Gmail compose
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=am127955@gmail.com&su=Meeting&body=Let%20me%20know%20your%20availability.', '_blank');
  };
  
  const handleNavClick = async (sectionId: string) => {
    await playClickSound();
    scrollToSection(sectionId);
  };

  return (
    <footer data-scroll-section className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Asad Ali
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-sm">
              Full-Stack Web Developer passionate about creating innovative 
              solutions that make a difference in the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Connect With Me
            </h4>
            <div className="flex space-x-4">
              <button
                onClick={() => handleSocialClick('https://github.com/AsadMughalAM')}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={() => handleSocialClick('https://www.linkedin.com/in/asad-ali-161b82250')}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={handleEmailClick}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center">
              © {new Date().getFullYear()} Asad Ali. Made with{' '}
              <Heart className="h-4 w-4 text-red-500 mx-1" fill="currentColor" />
              and React.js
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">
              Designed & Developed with passion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;