import React, { createContext, useContext, useState } from 'react';

const translations = {
  pt: {
    // Header
    gallery: 'Galeria',
    about: 'Sobre',
    discord: 'Discord',
    whatsapp: 'WhatsApp',
    
    // Gallery
    professionalMaps: 'Mapas Profissionais',
    forTibiaServers: 'para servidores de Tibia',
    searchMaps: 'Buscar mapas...',
    filters: 'Filtros',
    clear: 'Limpar',
    filterByCategory: 'Filtrar por categoria',
    mapsFound: 'mapas encontrados',
    mapFound: 'mapa encontrado',
    noMapsFound: 'Nenhum mapa encontrado',
    tryAdjusting: 'Tente ajustar os filtros ou buscar por outro termo.',
    clearFilters: 'Limpar filtros',
    
    // Map Card
    available: 'Disponível',
    sold: 'Vendido',
    soldTo: 'Vendido',
    size: 'Tamanho',
    
    // Map Detail
    backToGallery: 'Voltar para Galeria',
    aboutMap: 'Sobre o Mapa',
    specifications: 'Especificações',
    complexity: 'Complexidade',
    creationDate: 'Data de Criação',
    author: 'Autor',
    categories: 'Categorias',
    interestedInMap: 'Interessado neste mapa?',
    contactForQuote: 'Entre em contato para solicitar orçamento ou tirar dúvidas.',
    contactViaDiscord: 'Contato via Discord',
    contactViaWhatsApp: 'Contato via WhatsApp',
    downloadPreview: 'Download Preview (Baixa Resolução)',
    quoteOnRequest: 'Orçamento Sob Consulta',
    contactForCustomPricing: 'Entre em contato para valores personalizados',
    
    // About
    aboutXhyz: 'Sobre o Xhyz',
    creatingEpicWorlds: 'Criando mundos épicos para a comunidade Tibia',
    ourStory: 'Nossa História',
    storyText1: 'O Xhyz nasceu da paixão por criar experiências únicas e memoráveis para servidores de Tibia. Com anos de experiência em design de mapas e profundo conhecimento do universo do jogo, nos dedicamos a transformar ideias em realidade digital.',
    storyText2: 'Cada mapa é cuidadosamente elaborado com atenção aos detalhes, equilíbrio de gameplay e estética visual impressionante. Nosso objetivo é fornecer aos administradores de servidores ferramentas para criar mundos que seus jogadores vão amar explorar.',
    uniqueDesign: 'Design Único',
    uniqueDesignDesc: 'Cada mapa é uma obra de arte original, criada especialmente para as necessidades do seu projeto.',
    fastDelivery: 'Entrega Rápida',
    fastDeliveryDesc: 'Processos otimizados para garantir que seu mapa esteja pronto no menor tempo possível.',
    dedicatedSupport: 'Suporte Dedicado',
    dedicatedSupportDesc: 'Estamos sempre disponíveis para ajustar e personalizar conforme suas necessidades.',
    services: 'Serviços',
    customMaps: 'Mapas Customizados',
    customMapsDesc: 'Criação de mapas do zero baseados em suas especificações e requisitos.',
    mapModification: 'Modificação de Mapas',
    mapModificationDesc: 'Adaptação e melhoria de mapas existentes para atender novas necessidades.',
    consulting: 'Consultoria',
    consultingDesc: 'Orientação sobre design de mapas, balanceamento e melhores práticas.',
    readyToCreate: 'Pronto para criar algo incrível?',
    discussProject: 'Entre em contato e vamos discutir seu projeto!',
    email: 'Email',
    
    // Footer
    professionalMapsForTibia: 'Mapas profissionais para servidores de Tibia.',
    transformServer: 'Transforme seu servidor com designs únicos e épicos.',
    links: 'Links',
    contact: 'Contato',
    allRightsReserved: 'Todos os direitos reservados.',
    developedWithLove: 'Desenvolvido com ❤️ para a comunidade Tibia',
    
    // Map Sizes
    'Minúsculo': 'Minúsculo',
    'Pequeno': 'Pequeno',
    'Médio': 'Médio',
    'Grande': 'Grande',
    'Enorme': 'Enorme',
    'Colossal': 'Colossal',
    
    // Map Complexity
    'Básico': 'Básico',
    'Intermediário': 'Intermediário',
    'Avançado': 'Avançado',
    'Épico': 'Épico'
  },
  en: {
    // Header
    gallery: 'Gallery',
    about: 'About',
    discord: 'Discord',
    whatsapp: 'WhatsApp',
    
    // Gallery
    professionalMaps: 'Professional Maps',
    forTibiaServers: 'for Tibia servers',
    searchMaps: 'Search maps...',
    filters: 'Filters',
    clear: 'Clear',
    filterByCategory: 'Filter by category',
    mapsFound: 'maps found',
    mapFound: 'map found',
    noMapsFound: 'No maps found',
    tryAdjusting: 'Try adjusting the filters or searching for another term.',
    clearFilters: 'Clear filters',
    
    // Map Card
    available: 'Available',
    sold: 'Sold',
    soldTo: 'Sold',
    size: 'Size',
    
    // Map Detail
    backToGallery: 'Back to Gallery',
    aboutMap: 'About the Map',
    specifications: 'Specifications',
    complexity: 'Complexity',
    creationDate: 'Creation Date',
    author: 'Author',
    categories: 'Categories',
    interestedInMap: 'Interested in this map?',
    contactForQuote: 'Get in touch to request a quote or ask questions.',
    contactViaDiscord: 'Contact via Discord',
    contactViaWhatsApp: 'Contact via WhatsApp',
    downloadPreview: 'Download Preview (Low Resolution)',
    quoteOnRequest: 'Quote on Request',
    contactForCustomPricing: 'Contact us for custom pricing',
    
    // About
    aboutXhyz: 'About Xhyz',
    creatingEpicWorlds: 'Creating epic worlds for the Tibia community',
    ourStory: 'Our Story',
    storyText1: 'Xhyz was born from the passion to create unique and memorable experiences for Tibia servers. With years of experience in map design and deep knowledge of the game universe, we are dedicated to transforming ideas into digital reality.',
    storyText2: 'Each map is carefully crafted with attention to detail, gameplay balance, and stunning visual aesthetics. Our goal is to provide server administrators with tools to create worlds that their players will love to explore.',
    uniqueDesign: 'Unique Design',
    uniqueDesignDesc: 'Each map is an original work of art, created especially for your project needs.',
    fastDelivery: 'Fast Delivery',
    fastDeliveryDesc: 'Optimized processes to ensure your map is ready in the shortest time possible.',
    dedicatedSupport: 'Dedicated Support',
    dedicatedSupportDesc: 'We are always available to adjust and customize according to your needs.',
    services: 'Services',
    customMaps: 'Custom Maps',
    customMapsDesc: 'Creating maps from scratch based on your specifications and requirements.',
    mapModification: 'Map Modification',
    mapModificationDesc: 'Adaptation and improvement of existing maps to meet new needs.',
    consulting: 'Consulting',
    consultingDesc: 'Guidance on map design, balancing, and best practices.',
    readyToCreate: 'Ready to create something amazing?',
    discussProject: 'Get in touch and let\'s discuss your project!',
    email: 'Email',
    
    // Footer
    professionalMapsForTibia: 'Professional maps for Tibia servers.',
    transformServer: 'Transform your server with unique and epic designs.',
    links: 'Links',
    contact: 'Contact',
    allRightsReserved: 'All rights reserved.',
    developedWithLove: 'Developed with ❤️ for the Tibia community'
  }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pt');

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
