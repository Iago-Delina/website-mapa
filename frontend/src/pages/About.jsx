import React from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Palette, Zap, Heart, Mail } from 'lucide-react';
import DiscordIcon from '../components/icons/DiscordIcon';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0f1011] to-[#0a0a0b]">
      {/* Hero */}
      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {t('aboutXhyz')}
          </h1>
          <p className="text-xl text-gray-400 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            {t('creatingEpicWorlds')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Story */}
          <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-emerald-500/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">{t('ourStory')}</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                {t('storyText1')}
              </p>
              <p>
                {t('storyText2')}
              </p>
            </div>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-emerald-500/20 p-6 text-center group hover:border-emerald-400/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Palette className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('uniqueDesign')}</h3>
              <p className="text-gray-400 text-sm">
                {t('uniqueDesignDesc')}
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-emerald-500/20 p-6 text-center group hover:border-emerald-400/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('fastDelivery')}</h3>
              <p className="text-gray-400 text-sm">
                {t('fastDeliveryDesc')}
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-emerald-500/20 p-6 text-center group hover:border-emerald-400/50 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('dedicatedSupport')}</h3>
              <p className="text-gray-400 text-sm">
                {t('dedicatedSupportDesc')}
              </p>
            </Card>
          </div>

          {/* Services */}
          <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-emerald-500/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">{t('services')}</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">{t('customMaps')}</h3>
                  <p className="text-gray-400 text-sm">{t('customMapsDesc')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">{t('mapModification')}</h3>
                  <p className="text-gray-400 text-sm">{t('mapModificationDesc')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">{t('consulting')}</h3>
                  <p className="text-gray-400 text-sm">{t('consultingDesc')}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border-emerald-500/30 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              {t('readyToCreate')}
            </h2>
            <p className="text-gray-300 mb-6">
              {t('discussProject')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.open('https://discord.com', '_blank')}
              >
                <DiscordIcon className="mr-2" size={20} />
                {t('discord')}
              </Button>
              <Button
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.open('https://wa.me/5511971553195', '_blank')}
              >
                <WhatsAppIcon className="mr-2" size={20} />
                {t('whatsapp')}
              </Button>
              <Button
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 hover:border-emerald-400"
                onClick={() => window.location.href = 'mailto:contato@xhyz.com'}
              >
                <Mail className="mr-2 h-4 w-4" />
                {t('email')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
