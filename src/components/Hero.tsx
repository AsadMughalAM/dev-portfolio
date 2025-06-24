import { Button } from '@/components/ui/button';
import { ArrowDown, Download } from 'lucide-react';
import { playClickSound } from '@/utils/soundUtils';
import asad from '../assets/pic.png';
import { useState, useEffect } from 'react';

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
  id: string;
}

const Hero = ({ scrollToSection, id }: HeroProps) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [typingForward, setTypingForward] = useState(true);

  const fullText = "Hello, I'm Asad Ali";
  const namePart = 'Asad Ali';
  const nameStartIndex = fullText.indexOf(namePart);

  useEffect(() => {
    let i = 0;
    let interval: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;
    setDisplayedText('');
    setIsTyping(true);
    setTypingForward(true);

    const startTyping = () => {
      interval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayedText(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          pauseTimeout = setTimeout(() => {
            setTypingForward(false);
            setIsTyping(true);
            startErasing();
          }, 1200); // Pause after typing
        }
      }, 100);
    };

    const startErasing = () => {
      i = fullText.length;
      interval = setInterval(() => {
        if (i > 0) {
          setDisplayedText(fullText.substring(0, i - 1));
          i--;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          pauseTimeout = setTimeout(() => {
            setTypingForward(true);
            setIsTyping(true);
            startTyping();
          }, 800); // Pause after erasing
        }
      }, 50);
    };

    startTyping();
    return () => {
      clearInterval(interval);
      clearTimeout(pauseTimeout);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const scrollToAbout = async () => {
    await playClickSound();
    scrollToSection('about');
  };

  const downloadResume = async () => {
    await playClickSound();
    
    try {
      // Method 1: Try Google Drive direct download
      const fileId = '1PxTiZbQfdPLLkdTnQM2ekWhRqLuKj9te';
      const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      
      // Create a temporary link element for download
      const link = document.createElement('a');
      link.href = directDownloadUrl;
      link.setAttribute('download', 'AsadAli-Resume.pdf');
      link.setAttribute('target', '_blank');
      link.style.display = 'none';
      
      // Add to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Fallback: If direct download doesn't work, open in new tab
      setTimeout(() => {
        // Method 2: Open Google Drive view link in new tab
        const viewUrl = `https://drive.google.com/file/d/${fileId}/view`;
        window.open(viewUrl, '_blank', 'noopener,noreferrer');
      }, 1000);
      
    } catch (error) {
      console.error('Download failed:', error);
      
      // Method 3: Final fallback - open view link
      const fileId = '1PxTiZbQfdPLLkdTnQM2ekWhRqLuKj9te';
      const viewUrl = `https://drive.google.com/file/d/${fileId}/view`;
      window.open(viewUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const part1 = displayedText.substring(0, nameStartIndex);
  const part2 = displayedText.substring(nameStartIndex);

  return (
    <section id={id} className="min-h-screen flex items-center justify-center pt-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Profile Image */}
          <div className="mb-8 mt-16 lg:mt-0 flex justify-center pt-3">
            <div className="relative w-56 h-56 md:w-64 md:h-64 profile-container">
              {/* The image itself now covers the center of the ::before pseudo-element's gradient */}
              <img
                src={asad}
                alt="Professional headshot"
                className="w-full h-full object-cover rounded-full bg-background"
              />
            </div>
          </div>

          {/* Welcome Message */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 h-24 md:h-32 flex justify-center items-center">
            <span>
              {part1}
              <span className="text-blue-600 dark:text-blue-400">{part2}</span>
            </span>
            {isTyping && <span className="animate-typing-cursor ml-2 text-blue-600 dark:text-blue-400">|</span>}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Full-Stack Web Developer passionate about creating beautiful, 
            functional web applications that solve real-world problems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={scrollToAbout}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 transform hover:scale-105 transition-transform duration-300"
            >
              Learn More About Me
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            
            <Button
              onClick={downloadResume}
              variant="outline"
              size="lg"
              className="px-8 py-3 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:scale-105 transition-transform duration-300"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;