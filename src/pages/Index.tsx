import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import { playClickSound, initializeAudio } from '@/utils/soundUtils';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Initialize audio on component mount
    initializeAudio();

    if (isLoading) return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      // Determine current section
      let current = 'home';
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = section;
          }
        }
      });
      
      setCurrentSection(current);
      
      // Show scroll-to-top button for all sections except home
      setIsScrollTopVisible(current !== 'home' && window.scrollY > 300);
    };
    
    // Use passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  const toggleDarkMode = async () => {
    await playClickSound();
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = async (sectionId: string) => {
    await playClickSound();
    const element = document.getElementById(sectionId);
    if (!element) return;

    // Use native smooth scroll for better performance
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrollToTop = async () => {
    await playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <Preloader onLoaded={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 smooth-scroll">
      <CustomCursor />
      
      {/* Navigation with Theme Toggle */}
      <Navigation scrollToSection={scrollToSection} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

      {/* Main Content Container */}
      <div ref={scrollRef} className="w-full">
        <Hero scrollToSection={scrollToSection} id="home" />
        <About id="about" />
        <Projects id="projects" />
        <Skills id="skills" isDarkMode={isDarkMode} />
        <Contact id="contact" />
        <Footer scrollToSection={scrollToSection} />
      </div>

      {/* Scroll to Top Button - Show on all sections except home */}
      {isScrollTopVisible && (
        <Button
          onClick={scrollToTop}
          variant="outline"
          size="icon"
          className="fixed bottom-8 right-8 z-40 h-12 w-12 rounded-full shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-md hover:scale-110 transition-all duration-200 border-gray-200 dark:border-gray-700"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        </Button>
      )}
    </div>
  );
};

export default Index;