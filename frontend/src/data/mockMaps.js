// Mock data para mapas de Tibia
export const mockMaps = [
  {
    id: '1',
    title: 'Fortaleza do Abismo',
    slug: 'fortaleza-do-abismo',
    description: 'Mapa épico de dungeon com múltiplos níveis, ideal para raids e boss fights. Design sombrio com elementos de fogo e lava.',
    tags: ['dungeon', 'boss', 'raid', 'fire'],
    size: 'Grande',
    complexity: 'Avançado',
    thumbnail: 'https://picsum.photos/seed/dungeon1/800/600',
    images: [
      'https://picsum.photos/seed/dungeon1/1200/900',
      'https://picsum.photos/seed/dungeon2/1200/900'
    ],
    author: 'Iago Delina',
    status: 'available',
    createdAt: '2025-01-15'
  },
  {
    id: '2',
    title: 'Deserto de Ankrahmun',
    slug: 'deserto-ankrahmun',
    description: 'Vasto deserto com pirâmides e templos antigos. Perfeito para aventuras arqueológicas e quests épicas.',
    tags: ['desert', 'quest', 'pyramid', 'ancient'],
    size: 'Enorme',
    complexity: 'Épico',
    thumbnail: 'https://picsum.photos/seed/desert1/800/600',
    images: [
      'https://picsum.photos/seed/desert1/1200/900',
      'https://picsum.photos/seed/desert2/1200/900'
    ],
    author: 'Iago Delina',
    status: 'available',
    createdAt: '2025-01-10'
  },
  {
    id: '3',
    title: 'Cidade de Edron',
    slug: 'cidade-edron',
    description: 'Cidade medieval completa com castelo, mercado, docks e áreas residenciais. Ideal para servidores RP.',
    tags: ['city', 'medieval', 'roleplay', 'castle'],
    size: 'Colossal',
    complexity: 'Épico',
    thumbnail: 'https://picsum.photos/seed/city1/800/600',
    images: [
      'https://picsum.photos/seed/city1/1200/900',
      'https://picsum.photos/seed/city2/1200/900'
    ],
    author: 'Iago Delina',
    status: 'available',
    createdAt: '2025-01-05'
  },
  {
    id: '4',
    title: 'Arquipélago das Sombras',
    slug: 'arquipelago-sombras',
    description: 'Conjunto de ilhas misteriosas conectadas por pontes e portais. Excelente para PvP e territórios.',
    tags: ['island', 'pvp', 'ocean', 'mysterious'],
    size: 'Colossal',
    complexity: 'Avançado',
    thumbnail: 'https://picsum.photos/seed/island1/800/600',
    images: [
      'https://picsum.photos/seed/island1/1200/900',
      'https://picsum.photos/seed/island2/1200/900'
    ],
    author: 'Iago Delina',
    status: 'available',
    createdAt: '2024-12-20'
  },
  {
    id: '5',
    title: 'Caverna Congelada',
    slug: 'caverna-congelada',
    description: 'Dungeon de gelo com cristais mágicos e criaturas congeladas. Visual único para áreas de alta level.',
    tags: ['dungeon', 'ice', 'crystal', 'magic'],
    size: 'Médio',
    complexity: 'Intermediário',
    thumbnail: 'https://picsum.photos/seed/ice1/800/600',
    images: [
      'https://picsum.photos/seed/ice1/1200/900',
      'https://picsum.photos/seed/ice2/1200/900'
    ],
    author: 'Iago Delina',
    status: 'available',
    createdAt: '2024-12-15'
  },
  {
    id: '6',
    title: 'Floresta Ancestral',
    slug: 'floresta-ancestral',
    description: 'Floresta densa com árvores gigantes, ruínas élficas e fauna mágica. Perfeito para hunting grounds.',
    tags: ['forest', 'nature', 'elf', 'hunting'],
    size: 'Grande',
    complexity: 'Intermediário',
    thumbnail: 'https://picsum.photos/seed/forest1/800/600',
    images: [
      'https://picsum.photos/seed/forest1/1200/900',
      'https://picsum.photos/seed/forest2/1200/900'
    ],
    author: 'Iago Delina',
    status: 'available',
    createdAt: '2024-12-10'
  },
  {
    id: '7',
    title: 'Vulcão Carmesim',
    slug: 'vulcao-carmesim',
    description: 'Mapa de vulcão ativo com rios de lava e plataformas rochosas. Extremamente desafiador para players avançados.',
    tags: ['volcano', 'fire', 'lava', 'extreme'],
    size: 'Grande',
    complexity: 'Avançado',
    thumbnail: 'https://picsum.photos/seed/volcano1/800/600',
    images: [
      'https://picsum.photos/seed/volcano1/1200/900',
      'https://picsum.photos/seed/volcano2/1200/900'
    ],
    author: 'Iago Delina',
    status: 'sold',
    createdAt: '2024-12-01'
  },
  {
    id: '8',
    title: 'Porto Celestial',
    slug: 'porto-celestial',
    description: 'Porto medieval com docas, navios e área comercial movimentada. Ideal para economia e trade no servidor.',
    tags: ['port', 'city', 'trade', 'ocean'],
    size: 'Enorme',
    complexity: 'Intermediário',
    thumbnail: 'https://picsum.photos/seed/port1/800/600',
    images: [
      'https://picsum.photos/seed/port1/1200/900',
      'https://picsum.photos/seed/port2/1200/900'
    ],
    author: 'Iago Delina',
    status: 'available',
    createdAt: '2024-11-25'
  }
];

export const getAllTags = () => {
  const tagsSet = new Set();
  mockMaps.forEach(map => {
    map.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};
