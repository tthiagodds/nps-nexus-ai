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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="ai">IA Automática</TabsTrigger>
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
                  Configuração do WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-business-id">Business Account ID</Label>
                    <Input id="whatsapp-business-id" placeholder="ID da conta business" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp-phone">Número do Telefone</Label>
                    <Input id="whatsapp-phone" placeholder="+55 11 99999-9999" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-token">Access Token</Label>
                  <Input id="whatsapp-token" placeholder="••••••••••••••••" />
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Envio Automático por IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="ai-auto-send" />
                  <Label htmlFor="ai-auto-send">Habilitar envio automático de mensagens por IA</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ai-trigger">Gatilho para Envio</Label>
                  <Input id="ai-trigger" placeholder="ex: Score NPS < 7" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ai-delay">Delay para Envio (minutos)</Label>
                  <Input id="ai-delay" placeholder="30" type="number" />
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