import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Phone, Plus, Edit, Trash2, Eye, Palette, Type, Link2 } from "lucide-react";
import Layout from "@/components/Layout";

interface Template {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'whatsapp';
  subject?: string;
  content: string;
  variables: string[];
  hsmTemplate?: string;
}

export default function CommunicationTemplates() {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Pesquisa de Satisfação',
      type: 'email',
      subject: 'Sua opinião é importante para nós!',
      content: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">{{company_name}}</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Pesquisa de Satisfação 2025</p>
          </div>
          
          <div style="padding: 40px 20px; background: white;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">Prezado(a) {{customer_name}},</p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Na {{company_name}}, sua opinião é fundamental para melhorarmos cada vez mais nossos serviços.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Pensando nisso, convidamos você a participar da nossa <strong>Pesquisa de Satisfação 2025</strong>.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="{{survey_link}}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
                Responder Pesquisa
              </a>
            </div>
            
            <p style="font-size: 14px; line-height: 1.6; color: #666; text-align: center;">
              A pesquisa leva menos de 5 minutos para ser concluída.
            </p>
          </div>
        </div>
      `,
      variables: ['company_name', 'customer_name', 'survey_link']
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({
    name: '',
    type: 'email',
    subject: '',
    content: '',
    variables: []
  });

  const EmailBuilder = ({ template, onChange }: { template: Partial<Template>; onChange: (template: Partial<Template>) => void }) => {
    const insertVariable = (variable: string) => {
      const content = template.content || '';
      const newContent = content + `{{${variable}}}`;
      onChange({ ...template, content: newContent });
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nome do Template</Label>
            <Input 
              value={template.name || ''} 
              onChange={(e) => onChange({ ...template, name: e.target.value })}
              placeholder="Ex: Pesquisa de Satisfação"
            />
          </div>
          <div className="space-y-2">
            <Label>Assunto do Email</Label>
            <Input 
              value={template.subject || ''} 
              onChange={(e) => onChange({ ...template, subject: e.target.value })}
              placeholder="Ex: Sua opinião é importante!"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Variáveis Disponíveis</Label>
          <div className="flex flex-wrap gap-2">
            {['company_name', 'customer_name', 'survey_link', 'customer_email', 'phone'].map((variable) => (
              <Button
                key={variable}
                variant="outline"
                size="sm"
                onClick={() => insertVariable(variable)}
                className="text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                {variable}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Conteúdo HTML</Label>
          <div className="flex gap-2 mb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const content = template.content || '';
                onChange({ ...template, content: content + '<h1></h1>' });
              }}
            >
              <Type className="h-4 w-4 mr-1" />
              Título
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const content = template.content || '';
                onChange({ ...template, content: content + '<a href="{{survey_link}}" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Clique Aqui</a>' });
              }}
            >
              <Link2 className="h-4 w-4 mr-1" />
              Botão
            </Button>
          </div>
          <Textarea 
            value={template.content || ''} 
            onChange={(e) => onChange({ ...template, content: e.target.value })}
            className="min-h-[300px] font-mono text-sm"
            placeholder="Digite o HTML do email ou use os botões acima para inserir elementos..."
          />
        </div>
      </div>
    );
  };

  const PreviewEmail = ({ template }: { template: Template }) => {
    const previewContent = template.content
      .replace(/\{\{company_name\}\}/g, 'Empresa Exemplo')
      .replace(/\{\{customer_name\}\}/g, 'João Silva')
      .replace(/\{\{survey_link\}\}/g, '#')
      .replace(/\{\{customer_email\}\}/g, 'joao@exemplo.com')
      .replace(/\{\{phone\}\}/g, '+55 11 99999-9999');

    return (
      <div className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Assunto:</p>
          <p className="font-medium">{template.subject}</p>
        </div>
        <div className="border rounded-lg overflow-hidden">
          <div dangerouslySetInnerHTML={{ __html: previewContent }} />
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Templates de Comunicação</h1>
            <p className="text-muted-foreground">Gerencie templates para emails, SMS e WhatsApp</p>
          </div>
          <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Criar Novo Template</DialogTitle>
              </DialogHeader>
              
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="email" onClick={() => setNewTemplate({ ...newTemplate, type: 'email' })}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="sms" onClick={() => setNewTemplate({ ...newTemplate, type: 'sms' })}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    SMS
                  </TabsTrigger>
                  <TabsTrigger value="whatsapp" onClick={() => setNewTemplate({ ...newTemplate, type: 'whatsapp' })}>
                    <Phone className="h-4 w-4 mr-2" />
                    WhatsApp
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4">
                  <EmailBuilder template={newTemplate} onChange={setNewTemplate} />
                </TabsContent>

                <TabsContent value="sms" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nome do Template</Label>
                      <Input 
                        value={newTemplate.name || ''} 
                        onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                        placeholder="Ex: Lembrete de Pesquisa"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Conteúdo da Mensagem</Label>
                      <Textarea 
                        value={newTemplate.content || ''} 
                        onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                        placeholder="Olá {{customer_name}}, participe da nossa pesquisa: {{survey_link}}"
                        className="min-h-[100px]"
                      />
                      <p className="text-xs text-muted-foreground">Máximo 160 caracteres para SMS padrão</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="whatsapp" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nome do Template</Label>
                      <Input 
                        value={newTemplate.name || ''} 
                        onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                        placeholder="Ex: Convite Pesquisa WhatsApp"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Selecionar HSM Template</Label>
                      <Select onValueChange={(value) => setNewTemplate({ ...newTemplate, hsmTemplate: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha um HSM template aprovado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="survey_invitation">Convite Pesquisa</SelectItem>
                          <SelectItem value="satisfaction_survey">Pesquisa Satisfação</SelectItem>
                          <SelectItem value="feedback_request">Solicitação Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => {
                  // Aqui salvaria o template
                  setShowCreateModal(false);
                  setNewTemplate({ name: '', type: 'email', content: '', variables: [] });
                }}>
                  Salvar Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {template.type === 'email' && <Mail className="h-5 w-5 text-primary" />}
                      {template.type === 'sms' && <MessageSquare className="h-5 w-5 text-primary" />}
                      {template.type === 'whatsapp' && <Phone className="h-5 w-5 text-primary" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{template.type.toUpperCase()}</Badge>
                        {template.subject && (
                          <span className="text-sm text-muted-foreground">• {template.subject}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog open={showPreview && previewTemplate?.id === template.id} onOpenChange={(open) => {
                      setShowPreview(open);
                      if (!open) setPreviewTemplate(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setPreviewTemplate(template)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Preview: {template.name}</DialogTitle>
                        </DialogHeader>
                        {template.type === 'email' && <PreviewEmail template={template} />}
                        {template.type === 'sms' && (
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm">{template.content.replace(/\{\{(\w+)\}\}/g, '[EXEMPLO]')}</p>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {template.variables.map((variable) => (
                    <Badge key={variable} variant="outline">
                      {variable}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}