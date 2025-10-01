import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const performLogout = async (redirectPath: string = '/login') => {
    try {
      console.log('Iniciando processo de logout...');
      
      // Realizar logout
      logout();
      
      // Aguardar um momento para garantir que o estado foi atualizado
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('Logout concluído, redirecionando para:', redirectPath);
      
      // Redirecionar
      navigate(redirectPath, { replace: true });
      
      // Recarregar a página para garantir limpeza completa do estado
      setTimeout(() => {
        window.location.href = redirectPath;
      }, 200);
      
    } catch (error) {
      console.error('Erro durante logout:', error);
      
      // Em caso de erro, forçar redirecionamento
      window.location.href = redirectPath;
    }
  };

  return { performLogout };
};