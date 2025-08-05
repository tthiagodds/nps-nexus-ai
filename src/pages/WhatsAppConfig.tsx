import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Smartphone, CheckCircle, XCircle, Save, TestTube } from "lucide-react";
import Layout from "@/components/Layout";

export default function WhatsAppConfig() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Conexão WhatsApp</h1>
          <p className="text-muted-foreground">Configure as integrações com WhatsApp Business e Meta API</p>
        </div>

        <Tabs defaultValue="meta" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="meta">Meta Business API</TabsTrigger>
            <TabsTrigger value="business">WhatsApp Business</TabsTrigger>
          </TabsList>

          <TabsContent value="meta" className="space-y-4">
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
                    <Label htmlFor="business-account-id">Business Account ID</Label>
                    <Input 
                      id="business-account-id" 
                      placeholder="ID da conta business Meta" 
                      defaultValue="123456789012345"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone-number-id">Phone Number ID</Label>
                    <Input 
                      id="phone-number-id" 
                      placeholder="ID do número do telefone" 
                      defaultValue="987654321098765"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="access-token">Access Token</Label>
                  <Input 
                    id="access-token" 
                    type="password"
                    placeholder="Token de acesso permanente" 
                    defaultValue="••••••••••••••••••••••••••••••••••••••••"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input 
                    id="webhook-url" 
                    placeholder="https://seu-dominio.com/webhook/whatsapp" 
                    defaultValue="https://sentai.app/webhook/whatsapp"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verify-token">Verify Token</Label>
                  <Input 
                    id="verify-token" 
                    placeholder="Token de verificação do webhook" 
                    defaultValue="sentai-webhook-verify-token"
                  />
                </div>

                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm">Status: Conectado</span>
                  <Badge className="ml-auto">Ativo</Badge>
                </div>

                <div className="flex gap-2">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações
                  </Button>
                  <Button variant="outline">
                    <TestTube className="h-4 w-4 mr-2" />
                    Testar Conexão
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações da Conta</CardTitle>
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
                    <Badge>Verificado</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Limite de Mensagens</p>
                    <p className="font-medium">1000/dia</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  WhatsApp Business Comum
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                  <p className="text-sm text-yellow-700 dark:text-yellow-200">
                    <strong>Atenção:</strong> Esta integração é limitada e não oficial. 
                    Recomendamos o uso da Meta Business API para uso empresarial.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-phone">Número do WhatsApp Business</Label>
                  <Input 
                    id="business-phone" 
                    placeholder="+55 11 99999-9999" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-api-key">Chave de API (Terceiros)</Label>
                  <Input 
                    id="business-api-key" 
                    type="password"
                    placeholder="Chave de integração via serviço terceirizado" 
                  />
                </div>

                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <XCircle className="h-5 w-5 text-destructive" />
                  <span className="text-sm">Status: Não Configurado</span>
                  <Badge variant="destructive" className="ml-auto">Inativo</Badge>
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