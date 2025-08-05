import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Plus, Folder, Filter, Download, Edit, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";
import { AdvancedFilterBuilder } from "@/components/AdvancedFilterBuilder";

export default function DatabasePage() {
  const [filterGroups, setFilterGroups] = useState([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState('');

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

  // Mock available fields based on selected endpoint
  const getAvailableFields = (endpointName: string) => {
    const fieldsByEndpoint = {
      "CRM Principal": [
        { name: 'nome_cliente', label: 'Nome do Cliente', type: 'text' as const },
        { name: 'email', label: 'Email', type: 'text' as const },
        { name: 'status', label: 'Status', type: 'text' as const },
        { name: 'data_cadastro', label: 'Data de Cadastro', type: 'date' as const },
        { name: 'valor_total_compras', label: 'Valor Total de Compras', type: 'currency' as const },
        { name: 'ativo', label: 'Cliente Ativo', type: 'boolean' as const }
      ],
      "E-commerce": [
        { name: 'numero_pedido', label: 'Número do Pedido', type: 'text' as const },
        { name: 'status', label: 'Status do Pedido', type: 'text' as const },
        { name: 'valor_pedido', label: 'Valor do Pedido', type: 'currency' as const },
        { name: 'data_pedido', label: 'Data do Pedido', type: 'date' as const },
        { name: 'data_entrega', label: 'Data de Entrega', type: 'date' as const },
        { name: 'quantidade_itens', label: 'Quantidade de Itens', type: 'number' as const }
      ],
      "SAC Telefônico": [
        { name: 'numero_ticket', label: 'Número do Ticket', type: 'text' as const },
        { name: 'status', label: 'Status', type: 'text' as const },
        { name: 'prioridade', label: 'Prioridade', type: 'text' as const },
        { name: 'data_abertura', label: 'Data de Abertura', type: 'date' as const },
        { name: 'data_resolucao', label: 'Data de Resolução', type: 'date' as const },
        { name: 'tempo_resolucao', label: 'Tempo de Resolução (horas)', type: 'number' as const }
      ]
    };
    
    return fieldsByEndpoint[endpointName] || [];
  };

  const availableFields = selectedEndpoint ? getAvailableFields(selectedEndpoint) : [];

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
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Nova Visualização</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="view-name">Nome da Visualização</Label>
                        <Input id="view-name" placeholder="Ex: Clientes Premium" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="view-endpoint">Endpoint Base</Label>
                        <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um endpoint" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CRM Principal">CRM Principal</SelectItem>
                            <SelectItem value="E-commerce">E-commerce</SelectItem>
                            <SelectItem value="SAC Telefônico">SAC Telefônico</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {selectedEndpoint && (
                      <AdvancedFilterBuilder
                        value={filterGroups}
                        onChange={setFilterGroups}
                        availableFields={availableFields}
                      />
                    )}

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button disabled={!selectedEndpoint}>Criar Visualização</Button>
                    </div>
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