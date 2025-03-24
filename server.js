import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import db, { initializeDatabase } from './db.js'; // Certifique-se de que está exportando corretamente no arquivo db.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const emailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;

// Configuração do transporte de email (apenas se as credenciais estiverem disponíveis)
let transporter = null;
if (emailConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

// Configuração do multer para armazenar arquivos no diretório 'uploads'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '/public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(express.json()); // Para lidar com JSON no body
app.use(express.urlencoded({ extended: true })); // Para suportar form-data

// Rota para upload de imagens
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
  }

  // Retorna a URL da imagem enviada
  const imageUrl = `http://localhost:${PORT}/public/uploads/${req.file.filename}`;
  res.json({ success: true, filePath: imageUrl });
});

app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));

// --- ENDPOINTS DE MENSAGENS ---

// Endpoint para listar todas as mensagens
app.get('/messages/list', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM messages ORDER BY date DESC', []);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).json({ error: 'Erro ao buscar mensagens do banco de dados' });
  }
});

// Endpoint para enviar uma nova mensagem
app.post('/messages/send', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validação básica
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    const newMessage = {
      id: uuidv4(),
      name,
      email,
      phone: phone || 'Não informado',
      subject,
      message,
      date: new Date().toISOString(),
    };

    // Tenta enviar o email apenas se as credenciais estiverem configuradas
    if (emailConfigured && transporter) {
      try {
        const mailOptions = {
          from: `"Formulário de Contato" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_RECEIVER || 'contato@rodrigohoracio.com',
          subject: `Nova mensagem: ${subject}`,
          html: `
            <h1>Nova mensagem de contato</h1>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
            <p><strong>Assunto:</strong> ${subject}</p>
            <p><strong>Mensagem:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        newMessage.emailSent = true;
      } catch (emailError) {
        console.error('Erro ao enviar email:', emailError);
        newMessage.emailSent = false;
        newMessage.emailError = emailError.message;
      }
    } else {
      console.log('Configuração de email não disponível. Email não enviado.');
      newMessage.emailSent = false;
      newMessage.emailError = 'Configuração de email não disponível';
    }

    // Salva a mensagem no banco de dados
    await db.query(
      'INSERT INTO messages (id, name, email, phone, subject, message, date, email_sent, email_error) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
        newMessage.id,
        newMessage.name,
        newMessage.email,
        newMessage.phone,
        newMessage.subject,
        newMessage.message,
        newMessage.date,
        newMessage.emailSent || false,
        newMessage.emailError || null
      ]
    );

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
    res.status(500).json({ error: 'Erro ao processar mensagem' });
  }
});

// Endpoint para excluir uma mensagem pelo ID
app.delete('/messages/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.query('DELETE FROM messages WHERE id = $1 RETURNING *', [id]);
    
    if (result.rowCount > 0) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao excluir mensagem:', error);
    res.status(500).json({ error: 'Erro ao excluir mensagem' });
  }
});

// --- ENDPOINTS DE PERFIL ---

// Endpoint para obter o perfil completo com educação e experiência
app.get('/profile', async (req, res) => {
  try {
    const profile = await db.query('SELECT * FROM profiles WHERE id = $1', ['default-profile']);
    if (profile.rows.length === 0) {
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }
    res.json(profile.rows[0]);
  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
    res.status(500).json({ error: 'Erro ao carregar perfil.' });
  }
});

// Endpoint para atualizar as informações básicas do perfil
app.put('/profile', async (req, res) => {
  const { id, name, title, shortBio, longBio, photo } = req.body;
  try {
    await db.query(
      'UPDATE profiles SET name = $1, title = $2, short_bio = $3, long_bio = $4, photo = $5, updated_at = NOW() WHERE id = $6',
      [name, title, shortBio, longBio, photo, id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil.' });
  }
});

// Endpoint para adicionar/atualizar uma formação acadêmica
app.post('/profile/education', async (req, res) => {
  try {
    const { id, period, title, institution, description, orderIndex } = req.body;
    
    if (!period || !title || !institution) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }
    
    let educationId = id;
    let result;
    
    if (educationId) {
      // Atualizar formação existente
      result = await db.query(
        'UPDATE education SET period = $1, title = $2, institution = $3, description = $4, order_index = $5, updated_at = NOW() WHERE id = $6 AND profile_id = $7 RETURNING *',
        [period, title, institution, description || null, orderIndex || 0, educationId, 'default-profile']
      );
      
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Formação acadêmica não encontrada' });
      }
    } else {
      // Adicionar nova formação
      educationId = `edu-${uuidv4()}`;
      result = await db.query(
        'INSERT INTO education (id, profile_id, period, title, institution, description, order_index, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *',
        [educationId, 'default-profile', period, title, institution, description || null, orderIndex || 0]
      );
    }
    
    res.status(201).json({
      id: result.rows[0].id,
      period: result.rows[0].period,
      title: result.rows[0].title,
      institution: result.rows[0].institution,
      description: result.rows[0].description,
      orderIndex: result.rows[0].order_index
    });
  } catch (error) {
    console.error('Erro ao salvar formação acadêmica:', error);
    res.status(500).json({ error: 'Erro ao salvar formação acadêmica' });
  }
});

// Endpoint para excluir uma formação acadêmica
app.delete('/profile/education/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.query('DELETE FROM education WHERE id = $1 AND profile_id = $2 RETURNING *', [id, 'default-profile']);
    
    if (result.rowCount > 0) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ error: 'Formação acadêmica não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao excluir formação acadêmica:', error);
    res.status(500).json({ error: 'Erro ao excluir formação acadêmica' });
  }
});

// Endpoint para adicionar/atualizar uma experiência profissional
app.post('/profile/experience', async (req, res) => {
  try {
    const { id, period, title, company, description, orderIndex } = req.body;
    
    if (!period || !title || !company) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }
    
    let experienceId = id;
    let result;
    
    if (experienceId) {
      // Atualizar experiência existente
      result = await db.query(
        'UPDATE experience SET period = $1, title = $2, company = $3, description = $4, order_index = $5, updated_at = NOW() WHERE id = $6 AND profile_id = $7 RETURNING *',
        [period, title, company, description || null, orderIndex || 0, experienceId, 'default-profile']
      );
      
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Experiência profissional não encontrada' });
      }
    } else {
      // Adicionar nova experiência
      experienceId = `exp-${uuidv4()}`;
      result = await db.query(
        'INSERT INTO experience (id, profile_id, period, title, company, description, order_index, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *',
        [experienceId, 'default-profile', period, title, company, description || null, orderIndex || 0]
      );
    }
    
    res.status(201).json({
      id: result.rows[0].id,
      period: result.rows[0].period,
      title: result.rows[0].title,
      company: result.rows[0].company,
      description: result.rows[0].description,
      orderIndex: result.rows[0].order_index
    });
  } catch (error) {
    console.error('Erro ao salvar experiência profissional:', error);
    res.status(500).json({ error: 'Erro ao salvar experiência profissional' });
  }
});

// Endpoint para excluir uma experiência profissional
app.delete('/profile/experience/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.query('DELETE FROM experience WHERE id = $1 AND profile_id = $2 RETURNING *', [id, 'default-profile']);
    
    if (result.rowCount > 0) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ error: 'Experiência profissional não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao excluir experiência profissional:', error);
    res.status(500).json({ error: 'Erro ao excluir experiência profissional' });
  }
});

// --- ENDPOINTS DE PROJETOS ---

// Endpoint para listar todos os projetos
app.get('/projects', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM projects ORDER BY order_index, created_at DESC', []);
    
    // Formatar a resposta
    const projects = result.rows.map(project => ({
      id: project.id,
      title: project.title,
      category: project.category,
      year: project.year,
      client: project.client,
      location: project.location,
      description: project.description,
      detailedDescription: project.detailed_description,
      coverImage: project.cover_image,
      images: JSON.parse(project.images),
      tags: JSON.parse(project.tags),
      featured: project.featured,
      orderIndex: project.order_index
    }));
    
    res.status(200).json(projects);
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    res.status(500).json({ error: 'Erro ao buscar projetos' });
  }
});

// Endpoint para obter um projeto pelo ID
app.get('/projects/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.query('SELECT * FROM projects WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    
    const project = result.rows[0];
    
    // Formatar a resposta
    const formattedProject = {
      id: project.id,
      title: project.title,
      category: project.category,
      year: project.year,
      client: project.client,
      location: project.location,
      description: project.description,
      detailedDescription: project.detailed_description,
      coverImage: project.cover_image,
      images: JSON.parse(project.images),
      tags: JSON.parse(project.tags),
      featured: project.featured,
      orderIndex: project.order_index
    };
    
    res.status(200).json(formattedProject);
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    res.status(500).json({ error: 'Erro ao buscar projeto' });
  }
});

// Endpoint para criar um novo projeto
app.post('/projects', async (req, res) => {
  try {
    const {
      title,
      category,
      year,
      client,
      location,
      description,
      detailedDescription,
      coverImage,
      images,
      tags,
      featured,
      orderIndex
    } = req.body;
    
    // Validação básica
    if (!title || !category || !description || !coverImage || !images || !tags) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }
    
    // Gerar ID a partir do título
    const id = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .substring(0, 30);
    
    // Verificar se já existe um projeto com este ID
    const existingProject = await db.query('SELECT id FROM projects WHERE id = $1', [id]);
    
    if (existingProject.rows.length > 0) {
      return res.status(409).json({ error: 'Já existe um projeto com este título/ID' });
    }
    
    // Inserir o novo projeto
    const result = await db.query(
      `INSERT INTO projects 
      (id, title, category, year, client, location, description, detailed_description, 
      cover_image, images, tags, featured, order_index, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW()) 
      RETURNING *`,
      [
        id,
        title,
        category,
        year || 'N/A',
        client || 'N/A',
        location || 'N/A',
        description,
        detailedDescription || '',
        coverImage,
        JSON.stringify(images),
        JSON.stringify(tags),
        featured || false,
        orderIndex || 0
      ]
    );
    
    const newProject = result.rows[0];
    
    // Formatar a resposta
    const formattedProject = {
      id: newProject.id,
      title: newProject.title,
      category: newProject.category,
      year: newProject.year,
      client: newProject.client,
      location: newProject.location,
      description: newProject.description,
      detailedDescription: newProject.detailed_description,
      coverImage: newProject.cover_image,
      images: JSON.parse(newProject.images),
      tags: JSON.parse(newProject.tags),
      featured: newProject.featured,
      orderIndex: newProject.order_index
    };
    
    res.status(201).json(formattedProject);
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    res.status(500).json({ error: 'Erro ao criar projeto' });
  }
});

// Endpoint para atualizar um projeto
app.put('/projects/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const {
      title,
      category,
      year,
      client,
      location,
      description,
      detailedDescription,
      coverImage,
      images,
      tags,
      featured,
      orderIndex
    } = req.body;
    
    // Validação básica
    if (!title || !category || !description || !coverImage || !images || !tags) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }
    
    // Atualizar o projeto
    const result = await db.query(
      `UPDATE projects SET 
      title = $1, category = $2, year = $3, client = $4, location = $5, 
      description = $6, detailed_description = $7, cover_image = $8, 
      images = $9, tags = $10, featured = $11, order_index = $12, updated_at = NOW() 
      WHERE id = $13 RETURNING *`,
      [
        title,
        category,
        year || 'N/A',
        client || 'N/A',
        location || 'N/A',
        description,
        detailedDescription || '',
        coverImage,
        JSON.stringify(images),
        JSON.stringify(tags),
        featured || false,
        orderIndex || 0,
        id
      ]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    
    const updatedProject = result.rows[0];
    
    // Formatar a resposta
    const formattedProject = {
      id: updatedProject.id,
      title: updatedProject.title,
      category: updatedProject.category,
      year: updatedProject.year,
      client: updatedProject.client,
      location: updatedProject.location,
      description: updatedProject.description,
      detailedDescription: updatedProject.detailed_description,
      coverImage: updatedProject.cover_image,
      images: JSON.parse(updatedProject.images),
      tags: JSON.parse(updatedProject.tags),
      featured: updatedProject.featured,
      orderIndex: updatedProject.order_index
    };
    
    res.status(200).json(formattedProject);
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    res.status(500).json({ error: 'Erro ao atualizar projeto' });
  }
});

// Endpoint para excluir um projeto
app.delete('/projects/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    
    res.status(200).json({ success: true, message: 'Projeto excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir projeto:', error);
    res.status(500).json({ error: 'Erro ao excluir projeto' });
  }
});

// Endpoint para verificar o status da configuração de email
app.get('/email-status', (req, res) => {
  res.json({
    configured: !!emailConfigured,
    user: process.env.EMAIL_USER ? `${process.env.EMAIL_USER.substring(0, 3)}...` : null
  });
});

// Inicializar o banco de dados e então iniciar o servidor
(async () => {
  try {
    await initializeDatabase();
    
    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error);
  }
})();

const projectsData = [
  // ...seus dados de projetos...
];

export { projectsData };
export default app;