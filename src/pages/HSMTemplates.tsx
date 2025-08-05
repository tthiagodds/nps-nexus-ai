import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Settings, Send, Upload, Zap, MessageSquare } from "lucide-react";
import Layout from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HSMTemplates() {
  const [showTemplateForm, setShowTemplateForm] = useState(false);
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

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="templates">Templates HSM</TabsTrigger>
            <TabsTrigger value="accounts">Tipos de Conta</TabsTrigger>
          </TabsList>

          {/* Tipos de Conta WhatsApp */}
          <TabsContent value="accounts" className="space-y-6">
            <div className="grid gap-6">
              {/* WhatsApp Business API (Enterprise) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    WhatsApp Business API (Enterprise)
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    HSM precisa ser aprovado pela Meta. Suporta imagens, botões, cabeçalhos e mídia.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-800">Conta Enterprise Conectada</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status de Aprovação</span>
                      <Badge variant="default" className="bg-green-500">Aprovado</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Templates Ativos</span>
                      <span className="font-medium">12/15</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Limite Mensal</span>
                      <span className="font-medium">50,000 mensagens</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar Preview HSM
                  </Button>
                </CardContent>
              </Card>

              {/* WhatsApp Business (Offline) */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    WhatsApp Business (Offline)
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    HSM pode ser criado sem aprovação da Meta. Integração via WAHA.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-orange-800">Configuração Pendente</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Integração WAHA</span>
                      <Badge variant="secondary">Não Configurado</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Templates Disponíveis</span>
                      <span className="font-medium">Ilimitado</span>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Configurar WAHA
                  </Button>
                </CardContent>
              </Card>
            </div>
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

        </Tabs>
      </div>
    </Layout>
  );
}