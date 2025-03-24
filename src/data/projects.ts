export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  location: string;
  description: string;
  detailedDescription?: string;
  coverImage: string;
  images: string[];
  tags: string[];
  featured?: boolean;
}

// Projetos armazenados em formato JSON para facilitar atualização
export const projects: Project[] = [
  {
    id: "casa-moderna",
    title: "Casa Moderna SP",
    category: "Residencial",
    year: "2023",
    client: "Família Silva",
    location: "São Paulo, Brasil",
    description: "Projeto residencial contemporâneo com foco em eficiência energética e integração com a natureza.",
    detailedDescription: "Esta residência contemporânea projetada para uma família em São Paulo foi concebida para harmonizar luxo, funcionalidade e sustentabilidade. O projeto valoriza a entrada de luz natural através de amplas aberturas e pé-direito duplo, criando espaços arejados e luminosos. A integração com o jardim externo se dá através de portas de vidro do piso ao teto, diluindo os limites entre interior e exterior.\n\nMateriais naturais como madeira, pedra e concreto aparente foram combinados para criar uma paleta equilibrada e atemporal. Sistemas de automação residencial e soluções de eficiência energética, como painéis solares e aproveitamento de água da chuva, foram incorporados de forma discreta, tornando a casa não apenas bela, mas também sustentável e eficiente.",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    ],
    tags: ["Residencial", "Contemporâneo", "Sustentável", "Design de Interiores"],
    featured: true
  },
  {
    id: "apartamento-higienopolis",
    title: "Apartamento Higienópolis",
    category: "Design de Interiores",
    year: "2022",
    client: "Casal Marques",
    location: "São Paulo, Brasil",
    description: "Reforma completa de apartamento histórico, preservando elementos originais e trazendo toques contemporâneos.",
    detailedDescription: "Este projeto de reforma transformou um apartamento clássico no bairro histórico de Higienópolis em São Paulo. O desafio foi preservar os elementos arquitetônicos originais, como molduras de gesso, piso de taco e portas, enquanto se introduzia uma linguagem contemporânea e funcional.\n\nO layout foi reconfigurado para privilegiar ambientes integrados e multifuncionais, atendendo ao estilo de vida dos moradores. A cozinha foi completamente reformulada com um conceito aberto, conectando-se à sala de jantar através de uma bancada em mármore que serve tanto como apoio para refeições quanto como local de trabalho.\n\nA paleta de cores em tons neutros foi pontuada por elementos em madeira natural e detalhes em latão, criando um ambiente sofisticado e acolhedor. A iluminação foi cuidadosamente planejada com diferentes circuitos e intensidades, valorizando tanto os aspectos arquitetônicos quanto as obras de arte da coleção dos proprietários.",
    coverImage: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    images: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    tags: ["Apartamento", "Reforma", "Interiores", "Clássico Contemporâneo"],
    featured: true
  },
  {
    id: "cafe-centro",
    title: "Café Centro Cultural",
    category: "Comercial",
    year: "2022",
    client: "Centro Cultural",
    location: "Rio de Janeiro, Brasil",
    description: "Projeto de um café dentro de um centro cultural, com desenho que reflete a identidade do espaço.",
    detailedDescription: "Este café localizado dentro de um importante centro cultural no Rio de Janeiro foi projetado para ser uma extensão da experiência artística do local. O conceito incorpora elementos da arquitetura brasileira modernista, com uma reinterpretação contemporânea.\n\nO espaço de 120m² foi organizado em diferentes zonas que atendem a diversas necessidades dos visitantes: desde mesas individuais para trabalho até áreas de lounge para grupos. O mobiliário foi desenhado exclusivamente para o projeto, utilizando madeiras brasileiras e tecidos de produção local.\n\nUm grande painel artístico desenvolvido em colaboração com um artista local torna-se o ponto focal do ambiente, enquanto a iluminação natural abundante é complementada por um sistema de iluminação artificial que se adapta ao longo do dia, criando diferentes atmosferas conforme o horário e a programação do centro cultural.",
    coverImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80",
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    ],
    tags: ["Comercial", "Café", "Modernista", "Mobiliário Personalizado"],
    featured: false
  },
  {
    id: "edificio-corporativo",
    title: "Edifício Nova Empresa",
    category: "Corporativo",
    year: "2021",
    client: "Nova Empresa S.A.",
    location: "Belo Horizonte, Brasil",
    description: "Projeto de retrofit de um edifício corporativo dos anos 80, com foco em sustentabilidade e bem-estar.",
    detailedDescription: "Este projeto de retrofit transformou um edifício corporativo dos anos 80 em Belo Horizonte em um ambiente de trabalho contemporâneo e sustentável. A fachada original foi renovada com um sistema de pele de vidro de alto desempenho térmico, reduzindo significativamente o consumo energético do edifício.\n\nO layout interno foi completamente redesenhado para atender às novas dinâmicas de trabalho, com espaços flexíveis que podem ser reconfigurados conforme a necessidade. Áreas de convivência, salas de reunião e espaços de trabalho colaborativo se alternam com zonas de foco e concentração.\n\nO projeto paisagístico incorporou jardins verticais e horizontais em diversos pontos do edifício, melhorando a qualidade do ar e criando conexões visuais com elementos naturais. O terraço foi transformado em uma área de descompressão com vista panorâmica para a cidade, servindo como extensão das áreas de trabalho informais.\n\nO projeto recebeu certificação LEED Gold por suas estratégias sustentáveis, incluindo captação de água de chuva, uso de materiais de baixo impacto ambiental e sistemas de automação para eficiência energética.",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    tags: ["Corporativo", "Retrofit", "Sustentável", "LEED"],
    featured: true
  },
  {
    id: "casa-praia",
    title: "Casa Praia dos Coqueiros",
    category: "Residencial",
    year: "2020",
    client: "Família Mendes",
    location: "Bahia, Brasil",
    description: "Casa de praia que mescla arquitetura contemporânea com técnicas locais tradicionais e materiais naturais.",
    detailedDescription: "Localizada na costa da Bahia, esta casa de praia foi projetada para ser uma extensão do ambiente natural. A arquitetura se integra à paisagem através de amplos espaços abertos, tetos altos e uma constante conexão visual com o mar e a vegetação circundante.\n\nO projeto valorizou técnicas construtivas locais e materiais da região, como a madeira de demolição, pedras naturais e palha. Estas escolhas não apenas reduzem o impacto ambiental da construção, mas também estabelecem uma linguagem visual que dialoga com a arquitetura vernacular da região.\n\nO programa foi distribuído em pavilhões interconectados por decks e jardins, permitindo que a brisa marítima percorra livremente todos os ambientes. A sala principal possui portas de correr que, quando abertas, diluem completamente a divisão entre interior e exterior, criando um grande espaço de convivência integrado com a piscina e o mar ao fundo.\n\nSistemas passivos de ventilação e resfriamento, como grandes beirais, pé-direito alto e posicionamento estratégico das aberturas, garantem conforto térmico com mínimo uso de climatização artificial.",
    coverImage: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
    ],
    tags: ["Residencial", "Casa de Praia", "Sustentável", "Vernacular"],
    featured: false
  },
  {
    id: "loja-conceito",
    title: "Loja Conceito Moda",
    category: "Comercial",
    year: "2022",
    client: "Marca de Moda",
    location: "São Paulo, Brasil",
    description: "Loja conceito para marca de moda que reflete os valores da marca através de uma experiência imersiva de compra.",
    detailedDescription: "Para esta marca de moda brasileira, desenvolvemos uma loja conceito que vai além do espaço comercial tradicional para criar uma experiência imersiva que comunica os valores e a estética da marca. O projeto ocupa um antigo galpão industrial em São Paulo, preservando elementos estruturais originais enquanto insere intervenções contemporâneas.\n\nO espaço foi concebido como uma galeria flexível, onde os sistemas expositivos podem ser facilmente reconfigurados para diferentes coleções ou eventos. Painéis móveis, estruturas suspensas e módulos customizáveis permitem que a loja se transforme completamente com cada nova temporada.\n\nA materialidade combina o concreto aparente original com detalhes em madeira natural e aço corten, complementados por tecidos desenvolvidos em colaboração com artesãos locais. A iluminação foi cuidadosamente projetada para criar atmosferas distintas dentro do mesmo ambiente, direcionando a atenção do visitante e destacando peças específicas da coleção.\n\nO projeto também inclui um café e uma pequena biblioteca, incentivando os clientes a prolongarem sua permanência e transformando a loja em um ponto de encontro cultural.",
    coverImage: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    ],
    tags: ["Comercial", "Loja", "Experiência", "Design de Interiores"],
    featured: true
  }
];

export const categories = [
  "Todos", 
  "Residencial", 
  "Comercial", 
  "Corporativo", 
  "Design de Interiores"
];

// Função para carregar projetos do localStorage, se disponível
export const loadProjects = (): Project[] => {
  if (typeof window !== 'undefined') {
    const savedProjects = localStorage.getItem('architecture-projects');
    if (savedProjects) {
      try {
        return JSON.parse(savedProjects);
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      }
    }
  }
  return projects;
};

// Função para salvar projetos no localStorage
export const saveProjects = (updatedProjects: Project[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('architecture-projects', JSON.stringify(updatedProjects));
  }
};

// Função para atualizar um projeto específico
export const updateProject = (updatedProject: Project): Project[] => {
  const currentProjects = loadProjects();
  const index = currentProjects.findIndex(p => p.id === updatedProject.id);
  
  if (index >= 0) {
    currentProjects[index] = updatedProject;
    saveProjects(currentProjects);
  }
  
  return currentProjects;
};

// Função para adicionar um novo projeto
export const addProject = (newProject: Project): Project[] => {
  const currentProjects = loadProjects();
  const updatedProjects = [...currentProjects, newProject];
  saveProjects(updatedProjects);
  return updatedProjects;
};

// Função para remover um projeto
export const removeProject = (projectId: string): Project[] => {
  const currentProjects = loadProjects();
  const updatedProjects = currentProjects.filter(p => p.id !== projectId);
  saveProjects(updatedProjects);
  return updatedProjects;
};