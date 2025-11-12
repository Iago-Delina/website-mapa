import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import DiscordIcon from './icons/DiscordIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0b] border-t border-emerald-500/10 mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3">
              Xhyz
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Mapas profissionais para servidores de Tibia.
              Transforme seu servidor com designs únicos e épicos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                Galeria
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                Sobre
              </Link>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-emerald-400 text-sm transition-colors group"
              >
                <DiscordIcon className="mr-2 group-hover:scale-110 transition-transform" size={16} />
                Discord
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-emerald-400 text-sm transition-colors group"
              >
                <FaWhatsapp className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                WhatsApp
              </a>
              <a
                href="mailto:contato@xhyz.com"
                className="flex items-center text-gray-400 hover:text-emerald-400 text-sm transition-colors group"
              >
                <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-emerald-500/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © {currentYear} Xhyz. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm">
            Desenvolvido com ❤️ para a comunidade Tibia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
