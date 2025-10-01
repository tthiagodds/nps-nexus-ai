// Configuração base da API
const API_BASE_URL = 'http://localhost/nps-nexus-ai-api/api/v1';

// Função para obter o token do localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Função para obter o id_empresa do usuário logado
const getUserEmpresaId = (): number | null => {
  const storedUser = localStorage.getItem('auth_user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      return user.id_empresa || null;
    } catch (error) {
      console.error('Erro ao fazer parse dos dados do usuário:', error);
      return null;
    }
  }
  return null;
};

// Função para fazer requisições autenticadas
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  // Se o token expirou (401), redirecionar para login
  if (response.status === 401) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    window.location.href = '/login';
    throw new Error('Token expirado');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro na requisição');
  }

  return data;
};

// Métodos específicos para diferentes tipos de requisição
export const api = {
  get: (endpoint: string) => 
    apiRequest(endpoint, { method: 'GET' }),
  
  post: (endpoint: string, data: any) => 
    apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  put: (endpoint: string, data: any) => 
    apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (endpoint: string) => 
    apiRequest(endpoint, { method: 'DELETE' }),
};

// Tipos para as requisições de empresa
interface EmpresaData {
  id_empresa?: number;
  nome_empresa?: string;
  razao_social?: string;
  cpf_cnpj?: string;
  logradouro?: string;  // API usa 'logradouro' em vez de 'endereco'
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  telefone?: string;
  telefone_contato?: string;
  nome_contato?: string;
  email?: string;
  website?: string;
  site_empresa?: string;
  id_segmento?: number;
  logo_empresa?: string;
  status?: number;
  responsavel?: string;
  created_at?: string;
  updated_at?: string;
}

// Interface para dados do formulário (usando 'endereco' no frontend)
interface FormEmpresaData {
  nome_empresa?: string;
  razao_social?: string;
  cpf_cnpj?: string;
  endereco?: string;  // Frontend usa 'endereco'
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  telefone?: string;
  email?: string;
  website?: string;
  site_empresa?: string;
  responsavel?: string;
  nome_contato?: string;
  telefone_contato?: string;
  logo_empresa?: string;
}

// Exportar interfaces para uso em outros arquivos
export type { EmpresaData, FormEmpresaData };

// Funções específicas para empresas
export const empresaAPI = {
  // Obter dados da empresa atual do usuário logado
  get: async (): Promise<EmpresaData> => {
    const id_empresa = getUserEmpresaId();
    if (!id_empresa) {
      throw new Error('ID da empresa não encontrado. Faça login novamente.');
    }
    
    const response = await apiRequest('/companies/get', {
      method: 'POST',
      body: JSON.stringify({ id_empresa }),
    });
    return response.data.empresa; // Acessar data.empresa
  },

  // Listar empresas (se o usuário tiver permissão)
  list: async (): Promise<EmpresaData[]> => {
    const response = await apiRequest('/companies/list', {
      method: 'POST',
      body: JSON.stringify({}), // Token no header é suficiente para listar
    });
    return response.data;
  },

  // Atualizar dados da empresa
  update: async (data: Partial<FormEmpresaData>): Promise<EmpresaData> => {
    const id_empresa = getUserEmpresaId();
    if (!id_empresa) {
      throw new Error('ID da empresa não encontrado. Faça login novamente.');
    }
    
    // Mapear campos do formulário para os nomes esperados pela API
    const updateData = {
      id_empresa,
      nome_empresa: data.nome_empresa,
      razao_social: data.razao_social,
      logradouro: data.endereco, // Mapear 'endereco' para 'logradouro'
      numero: data.numero,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
      telefone: data.telefone,
      email: data.email,
      website: data.website,
      site_empresa: data.site_empresa,
      responsavel: data.responsavel,
      nome_contato: data.nome_contato,
      telefone_contato: data.telefone_contato,
      logo_empresa: data.logo_empresa
    };
    
    const response = await apiRequest('/companies/update', {
      method: 'POST',
      body: JSON.stringify(updateData),
    });
    return response.data.empresa || response.data;
  },
};

export default api;