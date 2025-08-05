import { useState } from "react";
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
  GripVertical
} from "lucide-react";
import Layout from "@/components/Layout";

export default function SystemSettings() {
  const [systemName, setSystemName] = useState("OpinionHub Pro");
  const [timezone, setTimezone] = useState("America/Sao_Paulo");
  const [logo, setLogo] = useState("/placeholder.svg");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

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
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>

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
                  <div className="space-y-2">
                    <Label htmlFor="systemName">Nome do Sistema</Label>
                    <Input
                      id="systemName"
                      value={systemName}
                      onChange={(e) => setSystemName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Logo da Empresa</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 border rounded-lg flex items-center justify-center bg-muted">
                        <img src={logo} alt="Logo" className="w-full h-full object-contain rounded" />
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
                      </div>
                    </div>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Configurações de Contato
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Email de Suporte</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="supportEmail"
                        placeholder="suporte@empresa.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportPhone">Telefone de Suporte</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="supportPhone"
                        placeholder="+55 11 9999-9999"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website da Empresa</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="website"
                        placeholder="https://empresa.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gestão de Usuários */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Gestão de Usuários</CardTitle>
                  <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Usuário
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>
                          {selectedUser ? "Editar Usuário" : "Novo Usuário"}
                        </DialogTitle>
                        <DialogDescription>
                          Preencha os dados do usuário e defina suas permissões
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="userName">Nome Completo</Label>
                          <Input id="userName" placeholder="João Silva" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="userEmail">Email</Label>
                          <Input id="userEmail" type="email" placeholder="joao@empresa.com" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="userType">Tipo de Usuário</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              {userTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex flex-col">
                                    <span>{type.label}</span>
                                    <span className="text-xs text-muted-foreground">{type.description}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <div className="flex items-center space-x-2">
                            <Switch />
                            <Label>Usuário Ativo</Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Permissões</Label>
                        <div className="grid grid-cols-2 gap-2 p-4 border rounded-lg">
                          {availablePermissions.map((permission) => (
                            <div key={permission} className="flex items-center space-x-2">
                              <input type="checkbox" id={permission} />
                              <Label htmlFor={permission} className="text-sm">{permission}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsUserModalOpen(false)}>
                          Cancelar
                        </Button>
                        <Button>
                          {selectedUser ? "Salvar Alterações" : "Criar Usuário"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Permissões</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Último Login</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{user.name}</span>
                            <span className="text-sm text-muted-foreground">{user.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.permissions.slice(0, 2).map((perm) => (
                              <Badge key={perm} variant="secondary" className="text-xs">
                                {perm}
                              </Badge>
                            ))}
                            {user.permissions.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{user.permissions.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Ativo" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuração de Permissões */}
          <TabsContent value="permissions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tipos de Usuário</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userTypes.map((type) => (
                      <div key={type.value} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{type.label}</h4>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Permissões Disponíveis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {availablePermissions.map((permission) => (
                      <div key={permission} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                          <span>{permission}</span>
                        </div>
                        <Switch />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Plano e Uso */}
          <TabsContent value="plan">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Plano Atual: {planUsage.plan}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Chamadas de API</span>
                        <span className="text-sm text-muted-foreground">
                          {planUsage.apiCalls.used.toLocaleString()} / {planUsage.apiCalls.limit.toLocaleString()}
                        </span>
                      </div>
                      <Progress 
                        value={getUsagePercentage(planUsage.apiCalls.used, planUsage.apiCalls.limit)}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Disparos de Mensagem</span>
                        <span className="text-sm text-muted-foreground">
                          {planUsage.dispatches.used.toLocaleString()} / {planUsage.dispatches.limit.toLocaleString()}
                        </span>
                      </div>
                      <Progress 
                        value={getUsagePercentage(planUsage.dispatches.used, planUsage.dispatches.limit)}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Requisições de AI</span>
                        <span className="text-sm text-muted-foreground">
                          {planUsage.aiRequests.used} / {planUsage.aiRequests.limit}
                        </span>
                      </div>
                      <Progress 
                        value={getUsagePercentage(planUsage.aiRequests.used, planUsage.aiRequests.limit)}
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pacotes de Comunicação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">SMS (Infobip)</span>
                        <Badge variant="outline">
                          {planUsage.smsPackage.used} / {planUsage.smsPackage.limit}
                        </Badge>
                      </div>
                      <Progress 
                        value={getUsagePercentage(planUsage.smsPackage.used, planUsage.smsPackage.limit)}
                        className="h-2"
                      />
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">WhatsApp</span>
                        <Badge variant="outline">
                          {planUsage.whatsappPackage.used} / {planUsage.whatsappPackage.limit}
                        </Badge>
                      </div>
                      <Progress 
                        value={getUsagePercentage(planUsage.whatsappPackage.used, planUsage.whatsappPackage.limit)}
                        className="h-2"
                      />
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Email</span>
                        <Badge variant="outline">
                          {planUsage.emailPackage.used} / {planUsage.emailPackage.limit}
                        </Badge>
                      </div>
                      <Progress 
                        value={getUsagePercentage(planUsage.emailPackage.used, planUsage.emailPackage.limit)}
                        className="h-2"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full">
                      Upgrade de Plano
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}