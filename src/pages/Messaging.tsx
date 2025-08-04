import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, Send, Settings, Users, MessageSquare, Zap } from "lucide-react";
import Layout from "@/components/Layout";

export default function Messaging() {
  const [whatsappConnected, setWhatsappConnected] = useState(true);
  const [message, setMessage] = useState("");

  const campaigns = [
    { id: 1, name: "Pesquisa Satisfação Jan", type: "WhatsApp", sent: 234, delivered: 228, read: 156, status: "Ativa" },
    { id: 2, name: "Follow-up SMS", type: "SMS", sent: 145, delivered: 143, read: 98, status: "Concluída" },
    { id: 3, name: "HSM Template Promocional", type: "HSM", sent: 567, delivered: 554, read: 423, status: "Ativa" }
  ];

  const templates = [
    { id: 1, name: "Pesquisa NPS", type: "HSM", language: "pt_BR", status: "Aprovado" },
    { id: 2, name: "Lembrete Avaliação", type: "Template", language: "pt_BR", status: "Pendente" },
    { id: 3, name: "Agradecimento", type: "Template", language: "pt_BR", status: "Aprovado" }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mensageria & SMS</h1>
            <p className="text-muted-foreground">Gerencie envios de WhatsApp, SMS e HSM Templates</p>
          </div>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </div>

        {/* Connection Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-8 w-8 text-success" />
                  <div>
                    <h3 className="font-semibold">WhatsApp Business</h3>
                    <p className="text-sm text-muted-foreground">Meta API conectada</p>
                  </div>
                </div>
                <Switch 
                  checked={whatsappConnected}
                  onCheckedChange={setWhatsappConnected}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="text-sm text-muted-foreground">Mensagens enviadas</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-warning" />
                <div>
                  <div className="text-2xl font-bold">94%</div>
                  <div className="text-sm text-muted-foreground">Taxa de entrega</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList>
            <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
            <TabsTrigger value="templates">Templates HSM</TabsTrigger>
            <TabsTrigger value="send">Envio Avulso</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Campanhas de Mensageria</CardTitle>
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Nova Campanha
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <h4 className="font-semibold">{campaign.name}</h4>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline">{campaign.type}</Badge>
                            <Badge variant={campaign.status === "Ativa" ? "default" : "secondary"}>
                              {campaign.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-6 text-sm">
                        <div className="text-center">
                          <div className="font-semibold">{campaign.sent}</div>
                          <div className="text-muted-foreground">Enviadas</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{campaign.delivered}</div>
                          <div className="text-muted-foreground">Entregues</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{campaign.read}</div>
                          <div className="text-muted-foreground">Lidas</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Templates HSM</CardTitle>
                  <Button>Novo Template</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{template.name}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{template.type}</Badge>
                          <Badge variant="outline">{template.language}</Badge>
                          <Badge variant={template.status === "Aprovado" ? "default" : "secondary"}>
                            {template.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Editar</Button>
                        <Button size="sm">Usar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="send">
            <Card>
              <CardHeader>
                <CardTitle>Envio Avulso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo de Envio</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="hsm">HSM Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Destinatários</label>
                    <Input placeholder="Números separados por vírgula" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mensagem</label>
                  <Textarea 
                    placeholder="Digite sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                  <div className="text-sm text-muted-foreground text-right">
                    {message.length}/160 caracteres
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline">Salvar como Template</Button>
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance por Canal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { channel: "WhatsApp", sent: 856, delivered: 842, rate: 98.4 },
                      { channel: "SMS", sent: 234, delivered: 229, rate: 97.9 },
                      { channel: "HSM", sent: 157, delivered: 154, rate: 98.1 }
                    ].map((channel, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">{channel.channel}</span>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            {channel.delivered}/{channel.sent}
                          </div>
                          <div className="text-sm font-semibold">{channel.rate}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horários de Melhor Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { time: "09:00 - 12:00", rate: 94, responses: 234 },
                      { time: "14:00 - 17:00", rate: 89, responses: 187 },
                      { time: "19:00 - 21:00", rate: 76, responses: 123 }
                    ].map((time, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="font-medium">{time.time}</span>
                        <div className="text-right">
                          <div className="text-sm font-semibold">{time.rate}% entrega</div>
                          <div className="text-sm text-muted-foreground">{time.responses} respostas</div>
                        </div>
                      </div>
                    ))}
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