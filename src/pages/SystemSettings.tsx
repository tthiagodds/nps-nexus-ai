import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Settings, 
  Users, 
  Shield, 
  Clock, 
  CreditCard, 
  Upload, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Building,
  Mail,
  Phone,
  Globe,
  GripVertical,
  Loader2,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import Layout from "@/components/Layout";
import { empresaAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function SystemSettings() {
  const { empresa } = useAuth();
  
  // Estados para dados da empresa
  const [empresaData, setEmpresaData] = useState({
    nome_empresa: '',
    razao_social: '',
    cpf_cnpj: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    email: '',
    website: '',
    logo_empresa: ''
  });
  
  // Estados de controle
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  
  // Estados legados (manter para compatibilidade)
  const [systemName, setSystemName] = useState("OpinionHub Pro");
  const [timezone, setTimezone] = useState("America/Sao_Paulo");
  const [logo, setLogo] = useState("/placeholder.svg");

  // Carregar dados da empresa ao montar o componente
  useEffect(() => {
    const loadEmpresaData = async () => {
      try {
        setIsLoading(true);
        const data = await empresaAPI.get();
        
        setEmpresaData({
          nome_empresa: data.nome_empresa ?? '',
          razao_social: data.razao_social ?? '',
          cpf_cnpj: data.cpf_cnpj ?? '',
          endereco: data.logradouro ?? '', // API usa 'logradouro'
          numero: data.numero ?? '',
          complemento: data.complemento ?? '',
          bairro: data.bairro ?? '',
          cidade: data.cidade ?? '',
          estado: data.estado ?? '',
          cep: data.cep ?? '',
          telefone: data.telefone ?? '',
          email: data.email ?? '',
          website: data.website ?? '',
          logo_empresa: data.logo_empresa ?? ''
        });
        
        // Atualizar estados legados
        setSystemName(data.nome_empresa || "OpinionHub Pro");
        if (data.logo_empresa) {
          setLogo(data.logo_empresa);
        }
      } catch (error: any) {
        console.error('Erro ao carregar dados da empresa:', error);
        
        // Verificar se é erro de ID da empresa
        if (error.message && error.message.includes('ID da empresa')) {
          setMessage({ 
            type: 'error', 
            text: 'Erro: ID da empresa não encontrado. Faça login novamente.' 
          });
        } else {
          setMessage({ 
            type: 'error', 
            text: error.message || 'Erro ao carregar dados da empresa. Tente novamente.' 
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadEmpresaData();
  }, []);

  // Função para atualizar campo da empresa
  const handleEmpresaChange = (field: string, value: string) => {
    setEmpresaData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função para salvar dados da empresa
  const handleSaveEmpresa = async () => {
    try {
      setIsSaving(true);
      setMessage({ type: '', text: '' });
      
      await empresaAPI.update(empresaData);
      
      setMessage({ 
        type: 'success', 
        text: 'Dados da empresa salvos com sucesso!' 
      });
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
    } catch (error: any) {
      console.error('Erro ao salvar dados da empresa:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Erro ao salvar dados da empresa. Tente novamente.' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Mock data
  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@empresa.com",
      type: "Administrador",
      permissions: ["Campanhas", "Relatórios", "Usuários", "Configurações"],
      status: "Ativo",
      lastLogin: "2025-01-22 14:30",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@empresa.com",
      type: "Operador",
      permissions: ["Campanhas", "Relatórios"],
      status: "Ativo",
      lastLogin: "2025-01-22 10:15",
      createdAt: "2024-03-10"
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@empresa.com",
      type: "Visualizador",
      permissions: ["Relatórios"],
      status: "Inativo",
      lastLogin: "2025-01-20 16:45",
      createdAt: "2024-06-20"
    }
  ];

  const planUsage = {
    plan: "Enterprise",
    apiCalls: { used: 8750, limit: 10000 },
    dispatches: { used: 2547, limit: 5000 },
    aiRequests: { used: 345, limit: 500 },
    smsPackage: { used: 1200, limit: 2000 },
    whatsappPackage: { used: 890, limit: 1500 },
    emailPackage: { used: 3200, limit: 5000 }
  };

  const availablePermissions = [
    "Campanhas",
    "Relatórios", 
    "Usuários",
    "Configurações",
    "Templates",
    "Disparos",
    "Analytics",
    "Integrações"
  ];

  const userTypes = [
    { value: "admin", label: "Administrador", description: "Acesso total ao sistema" },
    { value: "operator", label: "Operador", description: "Pode criar e gerenciar campanhas" },
    { value: "viewer", label: "Visualizador", description: "Apenas visualização de relatórios" },
    { value: "analyst", label: "Analista", description: "Acesso a relatórios e analytics" }
  ];

  const timezones = [
    "America/Sao_Paulo",
    "America/New_York",
    "Europe/London",
    "Europe/Madrid",
    "Asia/Tokyo",
    "Australia/Sydney"
  ];

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogo(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configurações do Sistema</h1>
            <p className="text-muted-foreground">Gerencie configurações gerais, usuários e planos</p>
          </div>
          <Button onClick={handleSaveEmpresa} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </>
            )}
          </Button>
        </div>

        {/* Mensagem de feedback */}
        {message.text && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
            {message.type === 'error' ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Permissões
            </TabsTrigger>
            <TabsTrigger value="plan" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Plano & Uso
            </TabsTrigger>
          </TabsList>

          {/* Configurações Gerais */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Informações da Empresa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      <span className="ml-2">Carregando dados da empresa...</span>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome_empresa">Nome da Empresa</Label>
                          <Input
                            id="nome_empresa"
                            value={empresaData.nome_empresa}
                            onChange={(e) => handleEmpresaChange('nome_empresa', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="razao_social">Razão Social</Label>
                          <Input
                            id="razao_social"
                            value={empresaData.razao_social}
                            onChange={(e) => handleEmpresaChange('razao_social', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cpf_cnpj">CNPJ</Label>
                          <Input
                            id="cpf_cnpj"
                            value={empresaData.cpf_cnpj}
                            readOnly
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">O CNPJ não pode ser alterado</p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Corporativo</Label>
                          <Input
                            id="email"
                            type="email"
                            value={empresaData.email}
                            onChange={(e) => handleEmpresaChange('email', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="telefone">Telefone</Label>
                          <Input
                            id="telefone"
                            value={empresaData.telefone}
                            onChange={(e) => handleEmpresaChange('telefone', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={empresaData.website}
                            onChange={(e) => handleEmpresaChange('website', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-3">Endereço</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cep">CEP</Label>
                            <Input
                              id="cep"
                              value={empresaData.cep}
                              onChange={(e) => handleEmpresaChange('cep', e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="endereco">Logradouro</Label>
                            <Input
                              id="endereco"
                              value={empresaData.endereco}
                              onChange={(e) => handleEmpresaChange('endereco', e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="numero">Número</Label>
                            <Input
                              id="numero"
                              value={empresaData.numero}
                              onChange={(e) => handleEmpresaChange('numero', e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="complemento">Complemento</Label>
                            <Input
                              id="complemento"
                              value={empresaData.complemento}
                              onChange={(e) => handleEmpresaChange('complemento', e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="bairro">Bairro</Label>
                            <Input
                              id="bairro"
                              value={empresaData.bairro}
                              onChange={(e) => handleEmpresaChange('bairro', e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cidade">Cidade</Label>
                            <Input
                              id="cidade"
                              value={empresaData.cidade}
                              onChange={(e) => handleEmpresaChange('cidade', e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="estado">Estado</Label>
                            <Input
                              id="estado"
                              value={empresaData.estado}
                              onChange={(e) => handleEmpresaChange('estado', e.target.value)}
                              maxLength={2}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Configurações de Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemName">Nome do Sistema</Label>
                    <Input
                      id="systemName"
                      value={systemName}
                      onChange={(e) => setSystemName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timezones.map((tz) => (
                          <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Logo da Empresa</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 border rounded-lg flex items-center justify-center bg-muted">
                        <img 
                          src={empresaData.logo_empresa || logo} 
                          alt="Logo" 
                          className="w-full h-full object-contain rounded" 
                        />
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                          id="logo-upload"
                        />
                        <Button variant="outline" asChild>
                          <label htmlFor="logo-upload" className="cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Logo
                          </label>
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">
                          Para atualizar o logo da empresa, use o campo específico acima
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Outras tabs permanecem iguais... */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Usuários (Mock)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Funcionalidade de usuários em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>Permissões (Mock)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Funcionalidade de permissões em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plan">
            <Card>
              <CardHeader>
                <CardTitle>Plano & Uso (Mock)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Funcionalidade de planos em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}