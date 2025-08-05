import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, MessageSquare, Phone, Bot, Save } from "lucide-react";
import Layout from "@/components/Layout";

export default function ChannelConfig() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuração de Canais</h1>
          <p className="text-muted-foreground">Configure as integrações com canais de disparo</p>
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="sms">SMS - Infobip</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp Business</TabsTrigger>
            <TabsTrigger value="whatsapp-enterprise">WhatsApp Enterprise</TabsTrigger>
            <TabsTrigger value="ai">WAHA Integration</TabsTrigger>
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
                  Configuração de SMS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sms-provider">Provedor SMS</Label>
                    <Input id="sms-provider" placeholder="Twillio, AWS SNS, etc." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sms-api-key">API Key</Label>
                    <Input id="sms-api-key" placeholder="••••••••••••••••" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-sender">Remetente</Label>
                  <Input id="sms-sender" placeholder="SENTai" />
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  WhatsApp Business
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-number">Número do WhatsApp Business</Label>
                  <Input id="whatsapp-number" placeholder="+55 11 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-api-key">Chave API</Label>
                  <Input id="whatsapp-api-key" placeholder="Chave da API do WhatsApp Business" />
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

          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Integração SMS - Infobip
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="infobip-api-key">API Key</Label>
                    <Input id="infobip-api-key" placeholder="Chave da API Infobip" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="infobip-base-url">Base URL</Label>
                    <Input id="infobip-base-url" placeholder="https://api.infobip.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="infobip-sender">Sender ID</Label>
                  <Input id="infobip-sender" placeholder="Nome do remetente" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="infobip-scenario">Scenario Key</Label>
                  <Input id="infobip-scenario" placeholder="Chave do cenário" />
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}