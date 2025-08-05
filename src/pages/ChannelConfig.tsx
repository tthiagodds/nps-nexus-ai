import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Phone, Bot, Save, Plus, Trash2, Settings } from "lucide-react";
import Layout from "@/components/Layout";

interface Channel {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'whatsapp-business' | 'whatsapp-enterprise';
  status: 'connected' | 'disconnected' | 'error';
  config: Record<string, any>;
}

export default function ChannelConfig() {
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: '1',
      name: 'Email Principal',
      type: 'email',
      status: 'connected',
      config: { smtp: 'smtp.gmail.com', port: 587 }
    },
    {
      id: '2', 
      name: 'SMS Infobip',
      type: 'sms',
      status: 'connected',
      config: { apiKey: '***', baseUrl: 'https://api.infobip.com' }
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedChannelType, setSelectedChannelType] = useState<Channel['type']>('email');

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configuração de Canais</h1>
            <p className="text-muted-foreground">Configure múltiplos canais de disparo</p>
          </div>
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Canal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Novo Canal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tipo de Canal</Label>
                  <Select value={selectedChannelType} onValueChange={(value: Channel['type']) => setSelectedChannelType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="whatsapp-business">WhatsApp Business (WAHA)</SelectItem>
                      <SelectItem value="whatsapp-enterprise">WhatsApp Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Nome do Canal</Label>
                  <Input placeholder="Ex: Email Marketing, SMS Promocional" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setShowCreateModal(false)}>
                    Criar Canal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lista de Canais Existentes */}
        <div className="grid gap-4">
          {channels.map((channel) => (
            <Card key={channel.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {channel.type === 'email' && <Mail className="h-5 w-5 text-primary" />}
                      {channel.type === 'sms' && <MessageSquare className="h-5 w-5 text-primary" />}
                      {(channel.type === 'whatsapp-business' || channel.type === 'whatsapp-enterprise') && <Phone className="h-5 w-5 text-primary" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{channel.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">
                          {channel.type === 'email' && 'Email'}
                          {channel.type === 'sms' && 'SMS'}
                          {channel.type === 'whatsapp-business' && 'WhatsApp Business'}
                          {channel.type === 'whatsapp-enterprise' && 'WhatsApp Enterprise'}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <div className={`h-2 w-2 rounded-full ${
                            channel.status === 'connected' ? 'bg-green-500' : 
                            channel.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                          }`} />
                          <span className="text-sm text-muted-foreground capitalize">{channel.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="whatsapp-business">WhatsApp Business (WAHA)</TabsTrigger>
            <TabsTrigger value="whatsapp-enterprise">WhatsApp Enterprise</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Configuração de Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">Servidor SMTP</Label>
                    <Input id="smtp-host" placeholder="smtp.gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">Porta</Label>
                    <Input id="smtp-port" placeholder="587" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-user">Usuário</Label>
                    <Input id="email-user" placeholder="seu-email@gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-pass">Senha</Label>
                    <Input id="email-pass" type="password" placeholder="••••••••" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="email-ssl" />
                  <Label htmlFor="email-ssl">Usar SSL/TLS</Label>
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Configuração SMS - Infobip
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="infobip-api-key">API Key</Label>
                    <Input id="infobip-api-key" placeholder="Sua chave da API Infobip" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="infobip-base-url">Base URL</Label>
                    <Input id="infobip-base-url" placeholder="https://api.infobip.com" defaultValue="https://api.infobip.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="infobip-username">Username</Label>
                    <Input id="infobip-username" placeholder="Seu username Infobip" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="infobip-password">Password</Label>
                    <Input id="infobip-password" type="password" placeholder="••••••••••••••••" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-sender">Sender ID</Label>
                  <Input id="sms-sender" placeholder="Nome do remetente (max 11 caracteres)" />
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp-business" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  WhatsApp Business (WAHA)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="waha-url">WAHA Server URL</Label>
                    <Input id="waha-url" placeholder="http://localhost:3000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waha-api-key">API Key</Label>
                    <Input id="waha-api-key" placeholder="Sua chave da API WAHA" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="waha-session">Session Name</Label>
                    <Input id="waha-session" placeholder="default" defaultValue="default" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waha-webhook">Webhook URL</Label>
                    <Input id="waha-webhook" placeholder="https://seu-dominio.com/webhook" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waha-phone">Phone Number</Label>
                  <Input id="waha-phone" placeholder="+5511999999999" />
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp-enterprise" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  WhatsApp Enterprise (Meta API)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-business-id">Business Account ID</Label>
                    <Input id="whatsapp-business-id" placeholder="ID da conta business" defaultValue="123456789012345" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-phone">Phone Number ID</Label>
                    <Input id="whatsapp-phone" placeholder="ID do número do telefone" defaultValue="987654321098765" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-token">Access Token</Label>
                  <Input id="whatsapp-token" type="password" placeholder="••••••••••••••••" defaultValue="••••••••••••••••••••••••••••••••••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" placeholder="https://seu-dominio.com/webhook/whatsapp" defaultValue="https://sentai.app/webhook/whatsapp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verify-token">Verify Token</Label>
                  <Input id="verify-token" placeholder="Token de verificação do webhook" defaultValue="sentai-webhook-verify-token" />
                </div>

                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Status: Conectado</span>
                  <div className="ml-auto text-xs text-muted-foreground">
                    Última sincronização: 2 min atrás
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações
                  </Button>
                  <Button variant="outline">
                    Testar Conexão
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações da Conta Meta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nome da Empresa</p>
                    <p className="font-medium">SENTai Solutions</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Número do WhatsApp</p>
                    <p className="font-medium">+55 11 98765-4321</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status da Verificação</p>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Verificado</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Limite de Mensagens</p>
                    <p className="font-medium">850/1000 por dia</p>
                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </Layout>
  );
}