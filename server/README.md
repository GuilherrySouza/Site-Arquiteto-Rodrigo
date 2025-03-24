# Servidor de Mensagens de Contato

Este servidor implementa uma API para gerenciar mensagens de contato e enviar emails, utilizando PostgreSQL como banco de dados.

## Endpoints

- `GET /messages/list` - Retorna todas as mensagens
- `POST /messages/send` - Adiciona uma nova mensagem e envia email
- `DELETE /messages/:id` - Remove uma mensagem específica
- `GET /email-status` - Verifica o status da configuração de email

## Configuração

### Variáveis de ambiente

#### Servidor e Email
- `PORT` - Porta em que o servidor rodará (padrão: 3001)
- `EMAIL_HOST` - Host do servidor SMTP (padrão: smtp.gmail.com)
- `EMAIL_PORT` - Porta do servidor SMTP (padrão: 587)
- `EMAIL_USER` - Email para envio das mensagens
- `EMAIL_PASSWORD` - Senha do email (ou senha de aplicativo para Gmail)
- `EMAIL_RECEIVER` - Email que receberá as mensagens de contato

#### Banco de Dados PostgreSQL
- `DB_USER` - Usuário do PostgreSQL (padrão: postgres)
- `DB_PASSWORD` - Senha do PostgreSQL (padrão: postgres)
- `DB_HOST` - Host do PostgreSQL (padrão: localhost)
- `DB_PORT` - Porta do PostgreSQL (padrão: 5432)
- `DB_NAME` - Nome do banco de dados (padrão: contact_messages)

### Configuração do PostgreSQL

Antes de executar o servidor, você precisa:

1. Instalar o PostgreSQL em seu sistema:
   - [Download PostgreSQL](https://www.postgresql.org/download/)
   
2. Criar um banco de dados:
   ```sql
   CREATE DATABASE contact_messages;
   ```

3. A aplicação criará automaticamente a tabela necessária na primeira execução.

### Configuração do Gmail

Se você estiver usando o Gmail, siga estas etapas:

1. Ative a verificação em duas etapas na sua conta Google:
   - Acesse [Segurança da Conta Google](https://myaccount.google.com/security)
   - Ative a "Verificação em duas etapas"

2. Crie uma senha de aplicativo:
   - Acesse [Senhas de aplicativo](https://myaccount.google.com/apppasswords)
   - Selecione "Outro (nome personalizado)" como aplicativo
   - Digite um nome (ex: "Formulário de Contato")
   - Clique em "Gerar"
   - Copie a senha gerada de 16 caracteres

3. Use a senha gerada como `EMAIL_PASSWORD` nas variáveis de ambiente

### Instalação

```bash
cd server
npm install
```

### Execução

Para iniciar o servidor com configurações padrão:

```bash
node index.js
```

Para iniciar com configuração completa:

**Linux/Mac:**
```bash
DB_USER=postgres DB_PASSWORD=suasenha DB_NAME=contact_messages EMAIL_USER=seu-email@gmail.com EMAIL_PASSWORD=sua-senha-de-aplicativo EMAIL_RECEIVER=destino@email.com node index.js
```

**Windows (PowerShell):**
```powershell
$env:DB_USER="postgres"; $env:DB_PASSWORD="suasenha"; $env:DB_NAME="contact_messages"; $env:EMAIL_USER="seu-email@gmail.com"; $env:EMAIL_PASSWORD="sua-senha-de-aplicativo"; $env:EMAIL_RECEIVER="destino@email.com"; node index.js
```

**Windows (CMD):**
```cmd
set DB_USER=postgres
set DB_PASSWORD=suasenha
set DB_NAME=contact_messages
set EMAIL_USER=seu-email@gmail.com
set EMAIL_PASSWORD=sua-senha-de-aplicativo
set EMAIL_RECEIVER=destino@email.com
node index.js
```

## Produção

Para ambientes de produção, é recomendado:

1. Utilizar variáveis de ambiente para todas as configurações sensíveis
2. Implementar autenticação para proteger os endpoints
3. Configurar HTTPS para segurança das comunicações
4. Considerar a utilização de um serviço de banco de dados gerenciado (como Amazon RDS, Google Cloud SQL ou Azure Database for PostgreSQL)
