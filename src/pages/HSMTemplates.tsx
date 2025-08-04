import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Settings, Send, Upload, Zap } from "lucide-react";
import Layout from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HSMTemplates() {
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [showDispatchForm, setShowDispatchForm] = useState(false);
  const [showAutomationForm, setShowAutomationForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const templates = [
    {
      id: 1,
      name: "Confirmação de Pedido",
      status: "Aprovado",
      category: "Transacional",
      lastUsed: "22/01/2025",
      usage: 150
    },
    {
      id: 2,
      name: "Atualização de Rastreio",
      status: "Pendente",
      category: "Logística",
      lastUsed: "20/01/2025",
      usage: 89
    }
  ];

  const automations = [
    {
      id: 1,
      name: "Rastreio Atualizado",
      trigger: "webhook_tracking",
      template: "Atualização de Rastreio",
      status: "Ativo",
      executions: 45
    }
  ];

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">HSM Templates</h1>
            <p className="text-muted-foreground">Gerencie templates e automações do WhatsApp Business</p>
          </div>
        </div>

        <Tabs defaultValue="config" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="config">Configuração Meta</TabsTrigger>
            <TabsTrigger value="templates">Templates HSM</TabsTrigger>
            <TabsTrigger value="dispatch">Disparos</TabsTrigger>
            <TabsTrigger value="automation">Automações</TabsTrigger>
          </TabsList>

          {/* Configuração Meta */}
          <TabsContent value="config" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Integração Meta Business
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-id">Business Account ID</Label>
                    <Input id="business-id" placeholder="Insira o ID da conta comercial" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Número Enterprise</Label>
                    <Input id="phone-number" placeholder="Ex: +5511999999999" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="access-token">Access Token</Label>
                  <Input id="access-token" type="password" placeholder="Insira o token de acesso" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" placeholder="URL para receber webhooks" />
                </div>
                
                <Button className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Salvar Configuração
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates HSM */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar templates..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Dialog open={showTemplateForm} onOpenChange={setShowTemplateForm}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Template
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Novo Template HSM</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="template-name">Nome do Template</Label>
                        <Input id="template-name" placeholder="Ex: confirmacao_pedido" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="template-category">Categoria</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="transactional">Transacional</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="utility">Utilitário</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="template-content">Conteúdo do Template</Label>
                      <Textarea 
                        id="template-content"
                        placeholder="Olá {{1}}, seu pedido {{2}} foi confirmado..."
                        className="h-32"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Variáveis</Label>
                      <div className="text-sm text-muted-foreground">
                        Use variáveis dinâmicas como: nome, pedido, etc.
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowTemplateForm(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={() => setShowTemplateForm(false)}>
                        Criar Template
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="space-y-4 p-6">
                  {filteredTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold">{template.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{template.category}</Badge>
                            <Badge variant={template.status === "Aprovado" ? "default" : "secondary"}>
                              {template.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">{template.usage}</div>
                          <div className="text-xs text-muted-foreground">Usos</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Último uso: {template.lastUsed}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disparos */}
          <TabsContent value="dispatch" className="space-y-6">
            <Dialog open={showDispatchForm} onOpenChange={setShowDispatchForm}>
              <DialogTrigger asChild>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Novo Disparo HSM
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Novo Disparo HSM</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dispatch-template">Template</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id.toString()}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Lista de Contatos</Label>
                    <Button variant="outline" className="w-full h-20 flex flex-col">
                      <Upload className="h-6 w-6 mb-2" />
                      Upload de Planilha CSV
                    </Button>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowDispatchForm(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => setShowDispatchForm(false)}>
                      Enviar Disparos
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Automações */}
          <TabsContent value="automation" className="space-y-6">
            <Dialog open={showAutomationForm} onOpenChange={setShowAutomationForm}>
              <DialogTrigger asChild>
                <Button>
                  <Zap className="h-4 w-4 mr-2" />
                  Nova Automação
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Nova Automação</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="automation-name">Nome da Automação</Label>
                    <Input id="automation-name" placeholder="Ex: Rastreio Atualizado" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-endpoint">Endpoint da API do Cliente</Label>
                    <Input id="api-endpoint" placeholder="https://api.cliente.com/webhook" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="trigger-event">Evento Gatilho</Label>
                    <Input id="trigger-event" placeholder="Ex: order_tracking_updated" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="automation-template">Template HSM</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id.toString()}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAutomationForm(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => setShowAutomationForm(false)}>
                      Criar Automação
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Card>
              <CardHeader>
                <CardTitle>Automações Ativas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automations.map((automation) => (
                    <div key={automation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold">{automation.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{automation.trigger}</Badge>
                            <Badge variant="outline">{automation.template}</Badge>
                            <Badge variant={automation.status === "Ativo" ? "default" : "secondary"}>
                              {automation.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{automation.executions}</div>
                        <div className="text-xs text-muted-foreground">Execuções</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}