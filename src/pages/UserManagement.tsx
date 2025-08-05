import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Users, Shield, User, Crown } from "lucide-react";
import Layout from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ConfirmModal } from "@/components/ConfirmModal";

export default function UserManagement() {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@empresa.com",
      role: "admin",
      status: "Ativo",
      lastLogin: "Há 2 horas",
      createdAt: "15/01/2025"
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@empresa.com",
      role: "manager",
      status: "Ativo",
      lastLogin: "Há 1 dia",
      createdAt: "10/01/2025"
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@empresa.com",
      role: "viewer",
      status: "Inativo",
      lastLogin: "Há 1 semana",
      createdAt: "05/01/2025"
    }
  ];

  const roles = [
    { 
      value: "admin", 
      label: "Administrador", 
      description: "Acesso total ao sistema",
      icon: Crown,
      color: "text-yellow-600"
    },
    { 
      value: "manager", 
      label: "Gerente", 
      description: "Acesso a relatórios e configurações",
      icon: Shield,
      color: "text-blue-600"
    },
    { 
      value: "viewer", 
      label: "Visualizador", 
      description: "Apenas visualização de dados",
      icon: User,
      color: "text-green-600"
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewUser = () => {
    setSelectedUser(null);
    setFormMode('create');
    setShowUserForm(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setFormMode('edit');
    setShowUserForm(true);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const getRoleInfo = (roleValue: string) => {
    return roles.find(role => role.value === roleValue) || roles[2];
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin": return "default";
      case "manager": return "secondary";
      case "viewer": return "outline";
      default: return "outline";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Usuários</h1>
            <p className="text-muted-foreground">Gerencie usuários e permissões do sistema</p>
          </div>
          <Button onClick={handleNewUser}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Usuário
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{users.length}</p>
                  <p className="text-sm text-muted-foreground">Total de Usuários</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Crown className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
                  <p className="text-sm text-muted-foreground">Administradores</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{users.filter(u => u.role === 'manager').length}</p>
                  <p className="text-sm text-muted-foreground">Gerentes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{users.filter(u => u.status === 'Ativo').length}</p>
                  <p className="text-sm text-muted-foreground">Usuários Ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Usuários</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuários..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => {
                const roleInfo = getRoleInfo(user.role);
                const RoleIcon = roleInfo.icon;
                
                return (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full bg-muted ${roleInfo.color}`}>
                        <RoleIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getRoleBadgeVariant(user.role)}>
                            {roleInfo.label}
                          </Badge>
                          <Badge variant={user.status === "Ativo" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Último login: {user.lastLogin}</p>
                        <p className="text-xs text-muted-foreground">Criado em: {user.createdAt}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* User Form Modal */}
        <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {formMode === 'create' ? 'Novo Usuário' : 'Editar Usuário'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user-name">Nome Completo</Label>
                  <Input 
                    id="user-name" 
                    placeholder="Ex: João Silva"
                    defaultValue={selectedUser?.name || ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input 
                    id="user-email" 
                    type="email"
                    placeholder="usuario@empresa.com"
                    defaultValue={selectedUser?.email || ""}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-role">Nível de Acesso</Label>
                <Select defaultValue={selectedUser?.role || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível de acesso" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => {
                      const Icon = role.icon;
                      return (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${role.color}`} />
                            <div>
                              <p className="font-medium">{role.label}</p>
                              <p className="text-xs text-muted-foreground">{role.description}</p>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {formMode === 'create' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-password">Senha</Label>
                    <Input id="user-password" type="password" placeholder="••••••••" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="user-confirm-password">Confirmar Senha</Label>
                    <Input id="user-confirm-password" type="password" placeholder="••••••••" />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowUserForm(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setShowUserForm(false)}>
                  {formMode === 'create' ? 'Criar Usuário' : 'Salvar Alterações'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
          title="Excluir Usuário"
          description={`Tem certeza que deseja excluir o usuário "${selectedUser?.name}"? Esta ação não pode ser desfeita.`}
          confirmText="Excluir"
          onConfirm={() => {
            console.log('Usuário excluído:', selectedUser);
          }}
          variant="destructive"
        />
      </div>
    </Layout>
  );
}