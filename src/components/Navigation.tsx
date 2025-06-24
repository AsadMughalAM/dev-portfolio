import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { playClickSound } from '@/utils/soundUtils';

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Navigation = ({ scrollToSection, toggleDarkMode, isDarkMode }: NavigationProps) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      // Update active section
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });

      // Update navbar background opacity based on scroll
      setIsScrolled(window.scrollY > 50);
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = async (sectionId: string) => {
    await playClickSound();
    
    // Close mobile menu first
    setIsOpen(false);
    
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  };

  const handleThemeToggle = async () => {
    await playClickSound();
    toggleDarkMode();
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👨‍💻' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'contact', label: 'Contact', icon: '📧' },
  ];

  const handleMenuClick = async () => {
    await playClickSound();
    setIsOpen(!isOpen);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => handleNavClick('home')}
            className="font-bold text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Portfolio
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md hover:scale-105 ${
                    activeSection === item.id
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Theme Toggle Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleThemeToggle}
              className="h-9 w-9 rounded-full border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform duration-200"
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleThemeToggle}
              className="h-9 w-9 rounded-full border-gray-200 dark:border-gray-700"
              aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMenuClick}
                  className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[320px] sm:w-[400px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8 pt-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">AA</span>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                        Asad Ali
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Full-Stack Developer
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                    Navigation
                  </h3>
                  
                  {navItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-4 text-base font-medium transition-all duration-200 rounded-xl hover:scale-[1.02] flex items-center space-x-4 group ${
                        activeSection === item.id
                          ? 'text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-200 dark:border-blue-800 shadow-sm'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent'
                      }`}
                      type="button"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {activeSection === item.id && (
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Bottom Section with extra spacing */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="space-y-4">
                    {/* Theme Toggle in Mobile Menu */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Theme
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleThemeToggle}
                        className="h-8 px-3 rounded-lg border-gray-200 dark:border-gray-600"
                      >
                        {isDarkMode ? (
                          <>
                            <Sun className="h-3 w-3 mr-2" />
                            Light
                          </>
                        ) : (
                          <>
                            <Moon className="h-3 w-3 mr-2" />
                            Dark
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {/* Contact CTA */}
                    <button
                      onClick={() => handleNavClick('contact')}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 hover:scale-[1.02] shadow-lg"
                    >
                      Let's Work Together
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;