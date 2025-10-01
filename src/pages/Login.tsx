import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");
  const [idEmpresa, setIdEmpresa] = useState("1");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  // Lista de empresas disponíveis
  const empresas = [
    { value: "1", label: "Novo Mundo" },
    { value: "2", label: "SisGest" },
    { value: "3", label: "Vivacom" }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validações básicas antes de enviar
    if (!username.trim()) {
      setError("Por favor, digite seu usuário.");
      return;
    }
    
    if (!password.trim()) {
      setError("Por favor, digite sua senha.");
      return;
    }
    
    if (!idEmpresa) {
      setError("Por favor, selecione uma empresa.");
      return;
    }

    try {
      await login(username, password, idEmpresa);
      
      // Redirecionar para a página solicitada ou dashboard
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Erro capturado na página de login:', err);
      
      // Garantir que sempre temos uma mensagem amigável
      let errorMessage = "Erro inesperado. Tente novamente.";
      
      if (err && err.message && typeof err.message === 'string') {
        errorMessage = err.message;
      } else if (err && typeof err === 'string') {
        errorMessage = err;
      }
      
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
            <span className="text-primary-foreground font-bold text-xl">S</span>
          </div>
          <CardTitle className="text-2xl font-bold">SENTai</CardTitle>
          <CardDescription>
            Faça login em sua conta para acessar a plataforma de NPS
          </CardDescription>
          {error && error.includes('conectar ao servidor') && (
            <div className="mt-2 text-xs text-orange-600 bg-orange-50 p-2 rounded">
              💡 Dica: Verifique se a API está rodando em http://localhost/nps-nexus-ai-api
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="id_empresa">Empresa</Label>
              <Select value={idEmpresa} onValueChange={setIdEmpresa} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma empresa" />
                </SelectTrigger>
                <SelectContent>
                  {empresas.map((empresa) => (
                    <SelectItem key={empresa.value} value={empresa.value}>
                      {empresa.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            
            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate("/register")}
                className="text-sm"
                disabled={isLoading}
              >
                Não tem uma conta? Cadastre-se
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}