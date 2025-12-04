import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import DiscordIcon from './icons/DiscordIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

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
              {t('professionalMapsForTibia')} {t('transformServer')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('links')}</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                {t('gallery')}
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-emerald-400 text-sm transition-colors">
                {t('about')}
              </Link>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('contact')}</h3>
            <div className="space-y-3">
              <a
                href="https://discord.gg/hGm4sMgjzw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-emerald-400 text-sm transition-colors group"
              >
                <DiscordIcon className="mr-2 group-hover:scale-110 transition-transform" size={16} />
                {t('discord')}
              </a>
              <a
                href="https://wa.me/5511971553195"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-emerald-400 text-sm transition-colors group"
              >
                <WhatsAppIcon className="mr-2 group-hover:scale-110 transition-transform" size={16} />
                {t('whatsapp')}
              </a>
              <a
                href="mailto:contato@xhyz.com"
                className="flex items-center text-gray-400 hover:text-emerald-400 text-sm transition-colors group"
              >
                <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                {t('email')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-emerald-500/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © {currentYear} Xhyz. {t('allRightsReserved')}
          </p>
          <p className="text-gray-500 text-sm">
            {t('developedWithLove')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
