import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  BookOpen,
  Trophy,
  Newspaper,
  Users
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Help Center', href: '/help' },
  ];

  const educationLinks = [
    { name: 'Basic Education', href: '/curriculum/basic', icon: BookOpen },
    { name: 'JHS Resources', href: '/curriculum/jhs', icon: BookOpen },
    { name: 'SHS Materials', href: '/curriculum/shs', icon: BookOpen },
    { name: 'Tertiary Content', href: '/curriculum/tertiary', icon: BookOpen },
  ];

  const serviceLinks = [
    { name: 'Mock Exams', href: '/assessments/mock-exams', icon: Trophy },
    { name: 'Practice Tests', href: '/assessments/practice', icon: Trophy },
    { name: 'News & Updates', href: '/news', icon: Newspaper },
    { name: 'Teacher Resources', href: '/teachers', icon: Users },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'YouTube', href: '#', icon: Youtube },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">EduGhana</span>
                <span className="text-xs text-muted-foreground">Learn • Grow • Excel</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ghana's premier educational platform providing comprehensive curriculum resources, 
              assessments, and teaching materials for all educational levels.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Accra, Ghana</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+233 XX XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@eduglhana.com</span>
              </div>
            </div>
          </div>

          {/* Education Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Education</h3>
            <ul className="space-y-2">
              {educationLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="pt-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Quick Links</h4>
              <ul className="space-y-1">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Stay Connected</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest educational updates and resources.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
            <div className="pt-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors group"
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© {currentYear} EduGhana. All rights reserved.</span>
              <div className="hidden md:flex items-center space-x-1">
                <span>Made with</span>
                <span className="text-red-500">❤️</span>
                <span>in Ghana</span>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Cultural Pattern Decoration */}
      <div className="h-2 kente-pattern opacity-50"></div>
    </footer>
  );
};

export default Footer;

