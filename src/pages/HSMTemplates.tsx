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

        <div className="space-y-6">

          {/* Templates HSM */}
          <div className="space-y-6">
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
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Template HSM</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="config" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="config">Configuração</TabsTrigger>
                      <TabsTrigger value="components">Componentes</TabsTrigger>
                      <TabsTrigger value="preview">Pré-visualização</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="config" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="template-name">Nome do Template</Label>
                          <Input id="template-name" placeholder="ex: confirmacao_pedido" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="template-language">Idioma</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o idioma" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pt_BR">Português (BR)</SelectItem>
                              <SelectItem value="en_US">English (US)</SelectItem>
                              <SelectItem value="es_ES">Español</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="template-category">Categoria</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MARKETING">Marketing</SelectItem>
                              <SelectItem value="UTILITY">Utilitário</SelectItem>
                              <SelectItem value="AUTHENTICATION">Autenticação</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="whatsapp-account">Conta WhatsApp</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a conta" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="waba-1">WABA - Empresa Principal</SelectItem>
                              <SelectItem value="waba-2">WABA - Filial Norte</SelectItem>
                              <SelectItem value="waha-1">WAHA - Suporte</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="components" className="space-y-6">
                      {/* Header Component */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Cabeçalho (Opcional)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Tipo</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="TEXT">Texto</SelectItem>
                                  <SelectItem value="IMAGE">Imagem</SelectItem>
                                  <SelectItem value="VIDEO">Vídeo</SelectItem>
                                  <SelectItem value="DOCUMENT">Documento</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Conteúdo</Label>
                              <Input placeholder="Texto do cabeçalho ou URL da mídia" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Body Component */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Corpo (Obrigatório)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label>Mensagem</Label>
                            <Textarea 
                              placeholder="Olá {{1}}, seu pedido {{2}} foi confirmado com sucesso!"
                              className="h-24"
                            />
                            <div className="text-xs text-muted-foreground">
                              Use variáveis como: {`{{1}}, {{2}}`}, etc. para conteúdo dinâmico
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Footer Component */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Rodapé (Opcional)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <Label>Texto do Rodapé</Label>
                            <Input placeholder="Texto adicional, como informações de contato" />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Buttons Component */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Botões (Opcional)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                              <div className="space-y-2">
                                <Label>Tipo</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Tipo do botão" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="QUICK_REPLY">Resposta Rápida</SelectItem>
                                    <SelectItem value="URL">URL</SelectItem>
                                    <SelectItem value="PHONE_NUMBER">Telefone</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Texto</Label>
                                <Input placeholder="Texto do botão" />
                              </div>
                              <div className="space-y-2">
                                <Label>Valor</Label>
                                <Input placeholder="URL, telefone ou payload" />
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Adicionar Botão
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="preview" className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <Label>Variáveis de Exemplo</Label>
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <Label className="text-xs">{`{{1}}`}</Label>
                              <Input placeholder="João Silva" className="text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Label className="text-xs">{`{{2}}`}</Label>
                              <Input placeholder="#12345" className="text-sm" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <Label>Preview do WhatsApp</Label>
                          <div className="max-w-sm mx-auto">
                            <div className="bg-[#128C7E] p-4 rounded-t-lg">
                              <div className="flex items-center gap-2 text-white">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                  <MessageSquare className="h-4 w-4" />
                                </div>
                                <div>
                                  <div className="font-semibold text-sm">Empresa</div>
                                  <div className="text-xs opacity-75">online</div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-[#ECE5DD] p-4 min-h-[300px] rounded-b-lg">
                              <div className="bg-white p-3 rounded-lg shadow-sm max-w-xs">
                                <div className="space-y-2">
                                  <div className="text-xs text-gray-500 font-medium">CABEÇALHO</div>
                                  <div className="text-sm font-semibold">Seu pedido foi confirmado!</div>
                                  <div className="text-sm">Olá João Silva, seu pedido #12345 foi confirmado com sucesso!</div>
                                  <div className="text-xs text-gray-500 mt-2">Empresa - Suporte</div>
                                  <div className="flex gap-1 mt-2">
                                    <Button size="sm" variant="outline" className="text-xs h-6">
                                      Ver Pedido
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-xs h-6">
                                      Contato
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Status: <Badge variant="secondary">Rascunho</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setShowTemplateForm(false)}>
                        Cancelar
                      </Button>
                      <Button variant="outline">
                        Salvar Rascunho
                      </Button>
                      <Button onClick={() => setShowTemplateForm(false)}>
                        Enviar para Aprovação
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
          </div>
        </div>
      </div>
    </Layout>
  );
}