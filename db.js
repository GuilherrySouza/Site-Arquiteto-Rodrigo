import pkg from 'pg';
const { Pool } = pkg;
import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import { projectsData } from './server.js'; // Ajuste a importação para importar apenas projectsData

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
});

// Configuração do banco de dados
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASS || 'genilda1.',
  port: process.env.DB_PORT || 5432,
});

// Inicialização do banco de dados
export const initializeDatabase = async () => {
  const client = await pool.connect();
  try {
    console.log('Inicializando banco de dados...');
    
    // Cria a tabela de mensagens se não existir
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        date TIMESTAMP NOT NULL,
        email_sent BOOLEAN,
        email_error TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX IF NOT EXISTS messages_date_idx ON messages(date);
    `);
    
    // Cria a tabela de perfis se não existir
    await client.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        short_bio TEXT NOT NULL,
        long_bio JSONB NOT NULL,
        photo TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    // Cria a tabela de educação se não existir
    await client.query(`
      CREATE TABLE IF NOT EXISTS education (
        id VARCHAR(255) PRIMARY KEY,
        profile_id VARCHAR(255) NOT NULL,
        period VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        institution VARCHAR(255) NOT NULL,
        description TEXT,
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
      );
      
      CREATE INDEX IF NOT EXISTS education_profile_id_idx ON education(profile_id);
      CREATE INDEX IF NOT EXISTS education_order_idx ON education(order_index);
    `);

    // Cria a tabela de experiência se não existir
    await client.query(`
CREATE TABLE IF NOT EXISTS experience (
  id VARCHAR(255) PRIMARY KEY,
  profile_id VARCHAR(255) NOT NULL,
  period VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);
      
      CREATE INDEX IF NOT EXISTS experience_profile_id_idx ON experience(profile_id);
      CREATE INDEX IF NOT EXISTS experience_order_idx ON experience(order_index);
    `);
    
    // Cria a tabela de projetos se não existir
    await client.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        year VARCHAR(50) NOT NULL,
        client VARCHAR(255),
        location VARCHAR(255),
        description TEXT NOT NULL,
        detailed_description TEXT,
        cover_image TEXT NOT NULL,
        images JSONB NOT NULL,
        tags JSONB NOT NULL,
        featured BOOLEAN DEFAULT FALSE,
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS projects_category_idx ON projects(category);
      CREATE INDEX IF NOT EXISTS projects_featured_idx ON projects(featured);
      CREATE INDEX IF NOT EXISTS projects_order_idx ON projects(order_index);
    `);
    
    console.log('Banco de dados inicializado com sucesso!');

    // Verificar se já existe um perfil padrão, caso contrário, cria um
    const defaultProfileCheck = await client.query('SELECT COUNT(*) FROM profiles');
    if (parseInt(defaultProfileCheck.rows[0].count) === 0) {
      console.log('Criando perfil padrão...');
      
      const defaultProfile = {
        id: 'default-profile',
        name: 'Rodrigo Horacio',
        title: 'Arquiteto e Urbanista',
        shortBio: 'Arquiteto e Urbanista apaixonado pela transformação de espaços e pela criação de ambientes que proporcionam experiências únicas.',
        longBio: JSON.stringify([
          'Sou formado em Arquitetura e Urbanismo pela Universidade XYZ, com especialização em Design de Interiores e Sustentabilidade. Ao longo dos anos, desenvolvi projetos para diversos segmentos, desde residenciais até comerciais, sempre buscando aliar estética, funcionalidade e sustentabilidade.',
          'Minha abordagem é centrada no cliente, buscando compreender suas necessidades, estilo de vida e sonhos para criar espaços personalizados que reflitam sua identidade. Acredito que a arquitetura vai além da estética; ela deve melhorar a qualidade de vida das pessoas e criar ambientes que inspirem e emocionem.',
          'Trabalho com uma equipe multidisciplinar de profissionais, garantindo excelência em todas as etapas do projeto, desde a concepção até a execução final. Cada projeto é único e recebe atenção personalizada para garantir que o resultado final supere as expectativas.'
        ]),
        photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
      };
      
      
      // Adicionar educação padrão
      const defaultEducation = [
        {
          id: 'edu1',
          profileId: 'default-profile',
          period: '2010 - 2015',
          title: 'Bacharel em Arquitetura e Urbanismo',
          institution: 'Universidade XYZ',
          orderIndex: 0
        },
        {
          id: 'edu2',
          profileId: 'default-profile',
          period: '2016 - 2017',
          title: 'Especialização em Design de Interiores',
          institution: 'Instituto ABC',
          orderIndex: 1
        },
        {
          id: 'edu3',
          profileId: 'default-profile',
          period: '2018 - 2019',
          title: 'Mestrado em Arquitetura Sustentável',
          institution: 'Universidade Internacional',
          orderIndex: 2
        }
      ];
      
      for (const edu of defaultEducation) {
        await client.query(
          'INSERT INTO education (id, profile_id, period, title, institution, order_index, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())',
          [edu.id, edu.profileId, edu.period, edu.title, edu.institution, edu.orderIndex]
        );
      }
      
      // Adicionar experiência padrão
      const defaultExperience = [
        {
          id: 'exp1',
          profileId: 'default-profile',
          period: '2015 - 2018',
          title: 'Arquiteto Junior',
          company: 'Escritório de Arquitetura XYZ',
          orderIndex: 0
        },
        {
          id: 'exp2',
          profileId: 'default-profile',
          period: '2018 - 2021',
          title: 'Arquiteto Sênior',
          company: 'Construtora ABC',
          orderIndex: 1
        },
        {
          id: 'exp3',
          profileId: 'default-profile',
          period: '2021 - Presente',
          title: 'Arquiteto & Diretor Criativo',
          company: 'Estúdio Rodrigo Horacio',
          orderIndex: 2
        }
      ];
      
      for (const exp of defaultExperience) {
        await client.query(
          'INSERT INTO experience (id, profile_id, period, title, company, order_index, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())',
          [exp.id, exp.profileId, exp.period, exp.title, exp.company, exp.orderIndex]
        );
      }
      
      console.log('Perfil padrão criado com sucesso!');
    }
    
    // Verificar se já existem projetos, caso contrário, migrar dos dados estáticos
    const projectsCheck = await client.query('SELECT COUNT(*) FROM projects');
    if (parseInt(projectsCheck.rows[0].count) === 0) {
        console.log(`Migrando ${projectsData.length} projetos para o banco de dados...`);
        
        for (let i = 0; i < projectsData.length; i++) {
          const project = projectsData[i];
          await client.query(
            `INSERT INTO projects 
            (id, title, category, year, client, location, description, detailed_description, 
            cover_image, images, tags, featured, order_index, created_at, updated_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())`,
            [
              project.id,
              project.title,
              project.category,
              project.year,
              project.client,
              project.location,
              project.description,
              project.detailedDescription || '',
              project.coverImage,
              JSON.stringify(project.images),
              JSON.stringify(project.tags),
              project.featured || false,
              i
            ]
          );
        }
        console.log('Projetos migrados com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao migrar projetos:', error);
    } finally {
      client.release();
    }

  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Defina seus modelos aqui
    // ...

    await sequelize.sync({ force: true });
    console.log('Banco de dados sincronizado.');

  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
};

export default sequelize;