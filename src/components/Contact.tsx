import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Github, Linkedin, Send, ExternalLink, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { playClickSound } from '@/utils/soundUtils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactProps {
  id: string;
}

const Contact = ({ id }: ContactProps) => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const onSubmit = async (data: ContactFormValues) => {
    await playClickSound();
    
    try {
      const formData = {
        "form-name": "contact",
        ...data
      };

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: 'Message Sent Successfully! 🎉',
          description: "Thank you for your message. I'll get back to you within 24 hours!",
        });
        reset();
        
        // Reset success state after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Failed to Send Message',
        description: "There was an error sending your message. Please try the Gmail option below or email me directly.",
        variant: "destructive",
      });
    }
  };

  const handleGmailFallback = async () => {
    await playClickSound();
    
    const subject = 'Portfolio Contact Message';
    const body = 'Hello Asad,\n\nI would like to get in touch with you.\n\nBest regards';
    
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=am127955@gmail.com&su=${encodedSubject}&body=${encodedBody}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSocialClick = async (url: string) => {
    await playClickSound();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/AsadMughalAM',
      color: 'text-gray-900 dark:text-white'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/asad-ali-161b82250',
      color: 'text-blue-600'
    },
    {
      name: 'Email via Gmail',
      icon: Mail,
      url: '#',
      color: 'text-red-600',
      onClick: handleGmailFallback
    }
  ];

  return (
    <section id={id} className="py-20 bg-white dark:bg-gray-900 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            I'm always interested in new opportunities and collaborations. 
            Let's discuss how we can work together!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                Send Me a Message
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Fill out the form below and I'll receive your message instantly via Netlify Forms.
              </p>
            </CardHeader>

            <CardContent>
              {/* Netlify Forms Setup (hidden field) */}
              <form 
                name="contact" 
                netlify 
                hidden
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
                <input type="text" name="name" />
                <input type="email" name="email" />
                <textarea name="message"></textarea>
              </form>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" data-netlify="true" data-netlify-honeypot="bot-field" name="contact">
                  {/* Honeypot field for spam protection */}
                  <input type="hidden" name="form-name" value="contact" />
                  <div style={{ display: 'none' }}>
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name *
                    </label>
                    <Input
                      id="name"
                      {...register('name')}
                      className="w-full"
                      placeholder="Your Name"
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1" role="alert">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="w-full"
                      placeholder="your.email@example.com"
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1" role="alert">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      className="w-full min-h-[120px]"
                      placeholder="Your message here..."
                      aria-invalid={errors.message ? 'true' : 'false'}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1" role="alert">{errors.message.message}</p>}
                  </div>

                  <div className="space-y-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-medium flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Having trouble? Try the backup option:
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGmailFallback}
                        className="text-sm flex items-center gap-2"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Send via Gmail
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Info & Social Links */}
          <div className="space-y-8">
            <Card className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or 
                opportunities to be part of your vision. Feel free to reach out through any of these channels.
              </p>

              <div className="space-y-4">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <button
                      key={link.name}
                      onClick={link.onClick || (() => handleSocialClick(link.url))}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-300 hover:scale-105 w-full text-left"
                      aria-label={`Contact via ${link.name}`}
                    >
                      <IconComponent className={`h-6 w-6 ${link.color}`} />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {link.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Available for Freelance Work
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Currently accepting new projects and collaborations
              </p>
            </Card>

            <Card className="p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 rounded-xl">
              <div className="flex items-start space-x-3">
                <Send className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-1">
                    Netlify Forms Integration
                  </h4>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Your message will be delivered instantly via Netlify's secure form handling. 
                    I'll receive an email notification immediately.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;