import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  status: string;
  foto_perfil: string | null;
  id_empresa: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string, id_empresa: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se há token armazenado no localStorage
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // Verificar se os dados do usuário são válidos
        if (parsedUser && parsedUser.id && parsedUser.username) {
          setToken(storedToken);
          setUser(parsedUser);
        } else {
          console.warn('Dados de usuário inválidos encontrados, limpando localStorage');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
        }
      } catch (error) {
        console.error('Erro ao fazer parse dos dados do usuário:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string, id_empresa: string) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost/nps-nexus-ai-api/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          id_empresa,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        // Se não conseguir fazer parse do JSON
        if (response.status === 404) {
          throw new Error('Serviço de autenticação não encontrado. Verifique se a API está rodando.');
        }
        throw new Error('Erro na comunicação com o servidor. Resposta inválida recebida.');
      }

      // Tratar respostas de sucesso (200)
      if (response.status === 200) {
        if (data.success === true) {
          const { token: authToken, user: userData } = data.data || {};
          
          if (!authToken || !userData) {
            throw new Error('Resposta do servidor incompleta. Token ou dados do usuário não encontrados.');
          }
          
          setToken(authToken);
          setUser(userData);
          
          // Armazenar no localStorage
          localStorage.setItem('auth_token', authToken);
          localStorage.setItem('auth_user', JSON.stringify(userData));
          return; // Login realizado com sucesso
        } else {
          // success: false com status 200
          throw new Error(data.message || 'Falha na autenticação. Verifique suas credenciais.');
        }
      }

      // Tratar respostas de erro (401)
      if (response.status === 401) {
        if (data.success === false) {
          throw new Error(data.message || 'Credenciais inválidas. Verifique usuário, senha e empresa.');
        }
        throw new Error('Não autorizado. Verifique suas credenciais.');
      }

      // Tratar outros códigos de status
      if (response.status === 400) {
        throw new Error(data.message || 'Dados inválidos. Verifique os campos preenchidos.');
      }
      
      if (response.status === 403) {
        throw new Error(data.message || 'Acesso negado. Usuário pode estar inativo.');
      }
      
      if (response.status === 404) {
        throw new Error('Serviço de autenticação não encontrado. Verifique se a API está rodando.');
      }
      
      if (response.status === 422) {
        throw new Error(data.message || 'Dados de entrada inválidos. Verifique os campos.');
      }
      
      if (response.status === 500) {
        throw new Error('Erro interno do servidor. Tente novamente em alguns instantes.');
      }
      
      if (response.status === 503) {
        throw new Error('Serviço temporariamente indisponível. Tente novamente em alguns minutos.');
      }

      // Para qualquer outro status não tratado
      throw new Error(data.message || `Erro inesperado (${response.status}). Tente novamente.`);
      
    } catch (error: any) {
      console.error('Erro detalhado no login:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      
      // Tratar erros de rede/conectividade
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão com a internet e se a API está rodando.');
      }
      
      if (error.name === 'SyntaxError') {
        throw new Error('Erro na comunicação com o servidor. Resposta inválida recebida.');
      }
      
      // Se o erro já foi tratado (tem uma mensagem específica), repassar
      if (error.message && typeof error.message === 'string') {
        throw error;
      }
      
      // Erro genérico para casos completamente não tratados
      throw new Error('Erro inesperado durante o login. Tente novamente ou contate o suporte.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      // Limpar estado do React
      setUser(null);
      setToken(null);
      
      // Limpar localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      
      // Também limpar qualquer outro dado relacionado que possa existir
      localStorage.removeItem('user_preferences');
      localStorage.removeItem('session_data');
      
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro durante logout:', error);
      
      // Mesmo com erro, garantir que o estado seja limpo
      setUser(null);
      setToken(null);
      
      // Tentar limpar localStorage mesmo com erro
      try {
        localStorage.clear();
      } catch (storageError) {
        console.error('Erro ao limpar localStorage:', storageError);
      }
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};