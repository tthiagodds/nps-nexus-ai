import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Mail, MessageSquare, Smartphone, Edit, Trash2, Star, Hash, Type, ImageIcon, Video, ArrowRight, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface CampaignFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign?: any;
  mode: 'create' | 'edit';
}

interface SurveyModule {
  id: string;
  type: 'nps' | 'star' | 'text' | 'quiz' | 'image' | 'video';
  title: string;
  required: boolean;
  config: any;
}

export function CampaignForm({ open, onOpenChange, campaign, mode }: CampaignFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: campaign?.name || '',
    description: campaign?.description || '',
    type: campaign?.type || 'Email',
    quarantine: campaign?.quarantine || 30,
    reminder: campaign?.reminder || 7,
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

  const [surveyModules, setSurveyModules] = useState<SurveyModule[]>([
    {
      id: '1',
      type: 'nps',
      title: 'Pergunta NPS (0-10)',
      required: true,
      config: { question: 'De 0 a 10, o quanto você recomendaria nossa empresa?' }
    },
    {
      id: '2',
      type: 'text',
      title: 'Campo de comentário',
      required: false,
      config: { question: 'Deixe seu comentário sobre nossa empresa:' }
    }
  ]);

  const [showModuleForm, setShowModuleForm] = useState(false);
  const [newModule, setNewModule] = useState<Partial<SurveyModule>>({
    type: 'text',
    title: '',
    required: false,
    config: {}
  });

  const steps = [
    { number: 1, title: 'Informações Básicas', description: 'Nome e descrição da campanha' },
    { number: 2, title: 'Canais de Envio', description: 'Tipo de comunicação' },
    { number: 3, title: 'Quarentena e Reminder', description: 'Configurações de tempo' },
    { number: 4, title: 'Automação IA', description: 'Categorização e respostas' },
    { number: 5, title: 'Builder de Pesquisa', description: 'Módulos da pesquisa' },
    { number: 6, title: 'Template', description: 'Personalização da mensagem' }
  ];

  const moduleTypes = [
    { value: 'nps', label: 'Pergunta NPS (0-10)', icon: Hash },
    { value: 'star', label: 'Avaliação com Estrelas', icon: Star },
    { value: 'text', label: 'Campo de Texto', icon: Type },
    { value: 'quiz', label: 'Pergunta de Múltipla Escolha', icon: Hash },
    { value: 'image', label: 'Upload de Imagem', icon: ImageIcon },
    { value: 'video', label: 'Upload de Vídeo', icon: Video }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Salvando campanha:', { formData, surveyModules });
    onOpenChange(false);
  };

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const addModule = () => {
    if (newModule.type && newModule.title) {
      const module: SurveyModule = {
        id: Date.now().toString(),
        type: newModule.type as any,
        title: newModule.title,
        required: newModule.required || false,
        config: newModule.config || {}
      };
      setSurveyModules([...surveyModules, module]);
      setNewModule({ type: 'text', title: '', required: false, config: {} });
      setShowModuleForm(false);
    }
  };

  const removeModule = (id: string) => {
    setSurveyModules(surveyModules.filter(m => m.id !== id));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome da Campanha</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: NPS Pós-compra Janeiro 2025"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Descreva o objetivo desta campanha de NPS..."
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="type">Canal de Envio</Label>
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
                  <SelectItem value="Misto">Misto (Email + SMS)</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quarantine">Quarentena (dias)</Label>
                <Input 
                  id="quarantine" 
                  type="number" 
                  value={formData.quarantine}
                  onChange={(e) => setFormData({...formData, quarantine: Number(e.target.value)})}
                  placeholder="Ex: 30"
                />
                <p className="text-xs text-muted-foreground">
                  Tempo mínimo que o cliente deve aguardar antes de receber um novo disparo de NPS
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reminder">Reminder (dias)</Label>
                <Input 
                  id="reminder" 
                  type="number" 
                  value={formData.reminder}
                  onChange={(e) => setFormData({...formData, reminder: Number(e.target.value)})}
                  placeholder="Ex: 7"
                />
                <p className="text-xs text-muted-foreground">
                  Tempo para reenvio automático caso o cliente não responda
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">Como funciona:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Quarentena:</strong> Impede spam controlando frequência de envios</li>
                <li>• <strong>Reminder:</strong> Aumenta taxa de resposta com lembretes automáticos</li>
                <li>• Configurações aplicam-se a todos os disparos desta campanha</li>
              </ul>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="aiCategorization">Categorização Automática por IA</Label>
                <p className="text-sm text-muted-foreground">
                  Usar IA para categorizar automaticamente as respostas (elogio, reclamação, sugestão)
                </p>
              </div>
              <Switch
                id="aiCategorization"
                checked={formData.aiCategorization}
                onCheckedChange={(checked) => setFormData({...formData, aiCategorization: checked})}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="autoResponse">Resposta Automática por IA</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar respostas contextualizadas automaticamente (ex: detratores recebem follow-up)
                </p>
              </div>
              <Switch
                id="autoResponse"
                checked={formData.autoResponse}
                onCheckedChange={(checked) => setFormData({...formData, autoResponse: checked})}
              />
            </div>

            {(formData.aiCategorization || formData.autoResponse) && (
              <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  🤖 Recursos de IA Ativados
                </h4>
                <ul className="text-sm space-y-1">
                  {formData.aiCategorization && (
                    <li>✓ Categorização automática de feedbacks</li>
                  )}
                  {formData.autoResponse && (
                    <li>✓ Respostas automáticas contextualizadas</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Builder de Pesquisa</h3>
                <p className="text-sm text-muted-foreground">
                  Configure os módulos que compõem sua pesquisa NPS
                </p>
              </div>
              <Button onClick={() => setShowModuleForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Módulo
              </Button>
            </div>

            <div className="space-y-3">
              {surveyModules.map((module, index) => (
                <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{index + 1}</Badge>
                    <div>
                      <h4 className="font-medium">{module.title}</h4>
                      <p className="text-sm text-muted-foreground capitalize">{module.type}</p>
                    </div>
                    {module.required && (
                      <Badge variant="destructive" className="text-xs">Obrigatório</Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {!module.required && (
                      <Button size="sm" variant="ghost" onClick={() => removeModule(module.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Module Form Dialog */}
            {showModuleForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-background p-6 rounded-lg max-w-md w-full mx-4">
                  <h3 className="text-lg font-semibold mb-4">Novo Módulo</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Tipo de Módulo</Label>
                      <Select 
                        value={newModule.type} 
                        onValueChange={(value) => setNewModule({...newModule, type: value as any})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {moduleTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <type.icon className="h-4 w-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Título/Pergunta</Label>
                      <Input 
                        value={newModule.title || ''}
                        onChange={(e) => setNewModule({...newModule, title: e.target.value})}
                        placeholder="Ex: Como você avalia nosso atendimento?"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={newModule.required || false}
                        onCheckedChange={(checked) => setNewModule({...newModule, required: checked})}
                      />
                      <Label>Campo obrigatório</Label>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowModuleForm(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={addModule}>
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Template da Mensagem</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure a mensagem que será enviada aos clientes com o link da pesquisa
              </p>
            </div>

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
                placeholder="Olá [NOME]! Gostaríamos de saber como foi sua experiência conosco. Clique no link abaixo para responder nossa pesquisa: [LINK]"
                rows={8}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use [NOME] para o nome do cliente e [LINK] para o link da pesquisa
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-semibold mb-2">Preview da Pesquisa:</h4>
              <div className="space-y-2">
                {surveyModules.map((module, index) => (
                  <div key={module.id} className="text-sm">
                    {index + 1}. {module.title} {module.required && <span className="text-red-500">*</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
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

        {/* Step Progress */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep >= step.number ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
              `}>
                {step.number}
              </div>
              <div className="ml-2 hidden md:block">
                <div className="text-sm font-medium">{step.title}</div>
                <div className="text-xs text-muted-foreground">{step.description}</div>
              </div>
              {index < steps.length - 1 && (
                <div className="w-8 h-px bg-border mx-4 hidden md:block" />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              
              {currentStep < steps.length ? (
                <Button type="button" onClick={nextStep}>
                  Próximo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit">
                  {mode === 'create' ? 'Criar Campanha' : 'Salvar Alterações'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}