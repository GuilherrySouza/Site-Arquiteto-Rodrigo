export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  emailSent?: boolean;
  emailError?: string;
}

// URL base da API - deve ser substituída pela URL real do seu backend
const API_URL = 'http://localhost:3001/messages';

// Função para recuperar todas as mensagens
export const getMessages = async (): Promise<ContactMessage[]> => {
  try {
    const response = await fetch(`${API_URL}/list`);
    
    if (!response.ok) {
      throw new Error('Falha ao buscar mensagens');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    return [];
  }
};

// Função para adicionar uma nova mensagem e enviar email
export const saveMessage = async (message: Omit<ContactMessage, 'id' | 'date' | 'emailSent' | 'emailError'>): Promise<ContactMessage> => {
  try {
    const response = await fetch(`${API_URL}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Falha ao enviar mensagem');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw error; // Propaga o erro para ser tratado pelo componente
  }
};

// Função para remover uma mensagem
export const deleteMessage = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Falha ao excluir mensagem');
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao excluir mensagem:', error);
    return false;
  }
};

// Função para verificar o status da configuração de email
export const checkEmailStatus = async (): Promise<{ configured: boolean; user: string | null }> => {
  try {
    const response = await fetch('http://localhost:3001/email-status');
    
    if (!response.ok) {
      throw new Error('Falha ao verificar status do email');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao verificar status do email:', error);
    return { configured: false, user: null };
  }
};