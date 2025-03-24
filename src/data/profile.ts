export interface Education {
    id: string;
    period: string;
    title: string;
    institution: string;
    description?: string;
    orderIndex?: number;
  }
  
  export interface Experience {
    id: string;
    period: string;
    title: string;
    company: string;
    description?: string;
    orderIndex?: number;
  }
  
  export interface ProfileData {
    name: string;
    title: string;
    shortBio: string;
    longBio: string[];
    photo: string;
    education: Education[];
    experience: Experience[];
  }
  
  // Dados padrão do perfil (como fallback)
  const defaultProfile: ProfileData = {
    name: "Rodrigo Horacio",
    title: "Arquiteto e Urbanista",
    shortBio: "Arquiteto e Urbanista apaixonado pela transformação de espaços e pela criação de ambientes que proporcionam experiências únicas.",
    longBio: [
      "Sou formado em Arquitetura e Urbanismo pela Universidade XYZ, com especialização em Design de Interiores e Sustentabilidade. Ao longo dos anos, desenvolvi projetos para diversos segmentos, desde residenciais até comerciais, sempre buscando aliar estética, funcionalidade e sustentabilidade.",
      "Minha abordagem é centrada no cliente, buscando compreender suas necessidades, estilo de vida e sonhos para criar espaços personalizados que reflitam sua identidade. Acredito que a arquitetura vai além da estética; ela deve melhorar a qualidade de vida das pessoas e criar ambientes que inspirem e emocionem.",
      "Trabalho com uma equipe multidisciplinar de profissionais, garantindo excelência em todas as etapas do projeto, desde a concepção até a execução final. Cada projeto é único e recebe atenção personalizada para garantir que o resultado final supere as expectativas."
    ],
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    education: [
      {
        id: "edu1",
        period: "2010 - 2015",
        title: "Bacharel em Arquitetura e Urbanismo",
        institution: "Universidade XYZ"
      },
      {
        id: "edu2",
        period: "2016 - 2017",
        title: "Especialização em Design de Interiores",
        institution: "Instituto ABC"
      },
      {
        id: "edu3",
        period: "2018 - 2019",
        title: "Mestrado em Arquitetura Sustentável",
        institution: "Universidade Internacional"
      }
    ],
    experience: [
      {
        id: "exp1",
        period: "2015 - 2018",
        title: "Arquiteto Junior",
        company: "Escritório de Arquitetura XYZ"
      },
      {
        id: "exp2",
        period: "2018 - 2021",
        title: "Arquiteto Sênior",
        company: "Construtora ABC"
      },
      {
        id: "exp3",
        period: "2021 - Presente",
        title: "Arquiteto & Diretor Criativo",
        company: "Estúdio Rodrigo Horacio"
      }
    ]
  };
  
  // API URL base
  const API_BASE_URL = 'http://localhost:4000';
  
  // Função para carregar os dados do perfil da API
  export const loadProfile = async (): Promise<ProfileData> => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`);
      
      if (!response.ok) {
        console.error('Erro ao carregar perfil da API:', response.statusText);
        // Fallback para localStorage se a API falhar
        return loadProfileFromLocalStorage();
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      // Fallback para localStorage se a API falhar
      return loadProfileFromLocalStorage();
    }
  };
  
  // Função auxiliar para carregar o perfil do localStorage (como fallback)
  const loadProfileFromLocalStorage = (): ProfileData => {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('architecture-profile');
      if (savedProfile) {
        try {
          return JSON.parse(savedProfile);
        } catch (error) {
          console.error('Erro ao carregar dados do perfil do localStorage:', error);
        }
      }
    }
    return defaultProfile;
  };
  
  // Função para salvar os dados básicos do perfil na API
  export const saveProfileBasic = async (profile: ProfileData): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/basic`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profile.name,
          title: profile.title,
          shortBio: profile.shortBio,
          longBio: profile.longBio,
          photo: profile.photo
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar perfil');
      }
      
      // Também salvamos no localStorage como backup
      saveProfileToLocalStorage(profile);
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      // Tenta salvar no localStorage como fallback
      saveProfileToLocalStorage(profile);
      return false;
    }
  };
  
  // Função auxiliar para salvar o perfil no localStorage (como backup/fallback)
  const saveProfileToLocalStorage = (profile: ProfileData): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('architecture-profile', JSON.stringify(profile));
    }
  };
  
  // Função para adicionar/atualizar uma formação acadêmica
  export const saveEducation = async (education: Partial<Education>): Promise<Education | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/education`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(education),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar formação');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao salvar formação:', error);
      return null;
    }
  };
  
  // Função para remover uma formação acadêmica
  export const deleteEducation = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/education/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao excluir formação');
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao excluir formação:', error);
      return false;
    }
  };
  
  // Função para adicionar/atualizar uma experiência profissional
  export const saveExperience = async (experience: Partial<Experience>): Promise<Experience | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/experience`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(experience),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar experiência');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao salvar experiência:', error);
      return null;
    }
  };
  
  // Função para remover uma experiência profissional
  export const deleteExperience = async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/experience/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao excluir experiência');
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao excluir experiência:', error);
      return false;
    }
  };
  
  