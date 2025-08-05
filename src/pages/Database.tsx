import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Database, Plus, Folder, Filter, Download, Edit, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";

export default function DatabasePage() {
  const endpoints = [
    { id: 1, name: "CRM Principal", url: "https://api.empresa.com/customers", status: "Conectado", records: 12450 },
    { id: 2, name: "E-commerce", url: "https://api.loja.com/orders", status: "Conectado", records: 8900 },
    { id: 3, name: "SAC Telefônico", url: "https://api.sac.com/tickets", status: "Erro", records: 0 },
  ];

  const folders = [
    { id: 1, name: "Clientes Ativos", endpoint: "CRM Principal", filters: "status = ativo", records: 8300 },
    { id: 2, name: "Pedidos Entregues", endpoint: "E-commerce", filters: "status = entregue", records: 7200 },
    { id: 3, name: "Tickets Resolvidos", endpoint: "SAC Telefônico", filters: "status = resolvido", records: 450 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Base de Dados</h1>
            <p className="text-muted-foreground">Gerencie endpoints e visualizações de dados</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Endpoint
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Endpoint</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="endpoint-name">Nome do Endpoint</Label>
                  <Input id="endpoint-name" placeholder="Ex: CRM Principal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endpoint-url">URL da API</Label>
                  <Input id="endpoint-url" placeholder="https://api.exemplo.com/dados" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endpoint-auth">Token de Autenticação</Label>
                  <Input id="endpoint-auth" placeholder="Bearer token ou API key" />
                </div>
                <Button className="w-full">Conectar Endpoint</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Endpoints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Endpoints Configurados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {endpoints.map((endpoint) => (
                <div key={endpoint.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Database className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{endpoint.name}</p>
                      <p className="text-sm text-muted-foreground">{endpoint.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant={endpoint.status === "Conectado" ? "default" : "destructive"}>
                        {endpoint.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{endpoint.records.toLocaleString()} registros</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Visualizações/Pastas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Visualizações Criadas
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Visualização
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar Nova Visualização</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="view-name">Nome da Visualização</Label>
                      <Input id="view-name" placeholder="Ex: Clientes Premium" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="view-endpoint">Endpoint Base</Label>
                      <select className="w-full p-2 border rounded-md">
                        <option>CRM Principal</option>
                        <option>E-commerce</option>
                        <option>SAC Telefônico</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="view-filters">Filtros</Label>
                      <Input id="view-filters" placeholder="Ex: status = premium AND valor > 1000" />
                    </div>
                    <Button className="w-full">Criar Visualização</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {folders.map((folder) => (
                <div key={folder.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Folder className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{folder.name}</p>
                      <p className="text-sm text-muted-foreground">Base: {folder.endpoint}</p>
                      <p className="text-xs text-muted-foreground">Filtros: {folder.filters}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{folder.records.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">registros</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}