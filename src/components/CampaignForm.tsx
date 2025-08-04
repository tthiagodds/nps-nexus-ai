import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Mail, MessageSquare, Smartphone } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CampaignFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign?: any;
  mode: 'create' | 'edit';
}

export function CampaignForm({ open, onOpenChange, campaign, mode }: CampaignFormProps) {
  const [formData, setFormData] = useState({
    name: campaign?.name || '',
    type: campaign?.type || 'Email',
    description: campaign?.description || '',
    aiCategorization: campaign?.aiCategorization || false,
    autoResponse: campaign?.autoResponse || false,
    template: {
      subject: campaign?.template?.subject || '',
      message: campaign?.template?.message || '',
      style: campaign?.template?.style || 'modern'
    },
    targetAudience: campaign?.targetAudience || 'all',
    schedule: campaign?.schedule || 'immediate'
  });

  const [showTemplateEditor, setShowTemplateEditor] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de salvamento
    console.log('Salvando campanha:', formData);
    onOpenChange(false);
  };

  const previewTemplates = {
    modern: {
      backgroundColor: '#ffffff',
      headerColor: '#059669',
      textColor: '#374151'
    },
    classic: {
      backgroundColor: '#f9fafb',
      headerColor: '#1f2937',
      textColor: '#374151'
    },
    minimal: {
      backgroundColor: '#ffffff',
      headerColor: '#6b7280',
      textColor: '#111827'
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Nova Campanha NPS' : 'Editar Campanha'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome da Campanha</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ex: NPS Pós-compra"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Tipo de Envio</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Email">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </div>
                      </SelectItem>
                      <SelectItem value="SMS">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          SMS
                        </div>
                      </SelectItem>
                      <SelectItem value="Meta">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          Meta (WhatsApp)
                        </div>
                      </SelectItem>
                      <SelectItem value="Misto">Misto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descreva o objetivo desta campanha..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Configurações de IA */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configurações de IA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="aiCategorization">Categorização Automática</Label>
                  <p className="text-sm text-muted-foreground">
                    Usar IA para categorizar automaticamente as respostas dos clientes
                  </p>
                </div>
                <Switch
                  id="aiCategorization"
                  checked={formData.aiCategorization}
                  onCheckedChange={(checked) => setFormData({...formData, aiCategorization: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoResponse">Resposta Automática</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar respostas automáticas baseadas no contexto (ex: detratores recebem mensagem personalizada)
                  </p>
                </div>
                <Switch
                  id="autoResponse"
                  checked={formData.autoResponse}
                  onCheckedChange={(checked) => setFormData({...formData, autoResponse: checked})}
                />
              </div>

              {formData.autoResponse && (
                <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">
                    ℹ️ Quando ativado, a IA analisará o feedback e enviará respostas contextualizadas automaticamente.
                    Por exemplo: detratores recebem mensagens de follow-up personalizadas.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Template */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Template da Mensagem</CardTitle>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setShowTemplateEditor(!showTemplateEditor)}
                >
                  {showTemplateEditor ? 'Ocultar Editor' : 'Editar Template'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showTemplateEditor ? (
                <div className="space-y-4">
                  {formData.type === 'Email' && (
                    <div>
                      <Label htmlFor="subject">Assunto do Email</Label>
                      <Input
                        id="subject"
                        value={formData.template.subject}
                        onChange={(e) => setFormData({
                          ...formData,
                          template: {...formData.template, subject: e.target.value}
                        })}
                        placeholder="Como foi sua experiência conosco?"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      value={formData.template.message}
                      onChange={(e) => setFormData({
                        ...formData,
                        template: {...formData.template, message: e.target.value}
                      })}
                      placeholder="Olá! Gostaríamos de saber como foi sua experiência..."
                      rows={6}
                    />
                  </div>

                  {formData.type === 'Email' && (
                    <div>
                      <Label>Estilo do Template</Label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {Object.entries(previewTemplates).map(([style, colors]) => (
                          <div
                            key={style}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.template.style === style ? 'border-primary' : 'border-border'
                            }`}
                            onClick={() => setFormData({
                              ...formData,
                              template: {...formData.template, style}
                            })}
                            style={{ backgroundColor: colors.backgroundColor }}
                          >
                            <div className="space-y-2">
                              <div 
                                className="h-4 rounded"
                                style={{ backgroundColor: colors.headerColor }}
                              />
                              <div 
                                className="h-2 w-3/4 rounded"
                                style={{ backgroundColor: colors.textColor + '40' }}
                              />
                              <div 
                                className="h-2 w-1/2 rounded"
                                style={{ backgroundColor: colors.textColor + '40' }}
                              />
                            </div>
                            <p className="text-xs mt-2 capitalize font-medium">{style}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 border rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">
                    Clique em "Editar Template" para personalizar a mensagem que será enviada aos clientes.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configurações Avançadas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configurações de Envio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="targetAudience">Público-alvo</Label>
                  <Select value={formData.targetAudience} onValueChange={(value) => setFormData({...formData, targetAudience: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os clientes</SelectItem>
                      <SelectItem value="recent">Clientes recentes (últimos 30 dias)</SelectItem>
                      <SelectItem value="repeat">Clientes recorrentes</SelectItem>
                      <SelectItem value="first-time">Primeira compra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="schedule">Agendamento</Label>
                  <Select value={formData.schedule} onValueChange={(value) => setFormData({...formData, schedule: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Envio imediato</SelectItem>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Criar Campanha' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}