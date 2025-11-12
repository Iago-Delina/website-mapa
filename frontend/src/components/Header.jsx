import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import DiscordIcon from './icons/DiscordIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-emerald-500/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
              Xhyz
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'text-emerald-400' 
                  : 'text-gray-400 hover:text-emerald-300'
              }`}
            >
              Galeria
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive('/about') 
                  ? 'text-emerald-400' 
                  : 'text-gray-400 hover:text-emerald-300'
              }`}
            >
              Sobre
            </Link>
          </nav>

          {/* Contact Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 transition-all duration-300"
              onClick={() => window.open('https://discord.com', '_blank')}
            >
              <FaDiscord className="mr-2 h-4 w-4" />
              Discord
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
              onClick={() => window.open('https://wa.me/', '_blank')}
            >
              <FaWhatsapp className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-emerald-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 space-y-4 animate-in slide-in-from-top duration-300">
            <Link
              to="/"
              className={`block text-sm font-medium transition-colors ${
                isActive('/') ? 'text-emerald-400' : 'text-gray-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Galeria
            </Link>
            <Link
              to="/about"
              className={`block text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-emerald-400' : 'text-gray-400'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 w-full justify-center"
                onClick={() => window.open('https://discord.com', '_blank')}
              >
                <FaDiscord className="mr-2 h-4 w-4" />
                Discord
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white w-full justify-center"
                onClick={() => window.open('https://wa.me/', '_blank')}
              >
                <FaWhatsapp className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
