import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Plus, X, Type, Hash, Calendar, DollarSign } from "lucide-react";

interface HSMTemplate {
  id: string;
  name: string;
  content: string;
  variables: string[];
}

interface VariableMapping {
  templateVar: string;
  dataField: string;
  type: 'text' | 'number' | 'date' | 'currency';
}

interface HSMTemplateEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template?: HSMTemplate;
  availableFields: { name: string; label: string; type: 'text' | 'number' | 'date' | 'currency' }[];
  onSave: (templateId: string, mappings: VariableMapping[]) => void;
}

const hsmlTemplates: HSMTemplate[] = [
  {
    id: "recovery",
    name: "Recuperação NPS",
    content: "Olá {{cliente}}, sentimos muito que sua experiência não foi satisfatória. Nossa equipe entrará em contato em até {{tempo}} para resolver. Pedido: {{pedido}}",
    variables: ["{{cliente}}", "{{tempo}}", "{{pedido}}"]
  },
  {
    id: "welcome_premium",
    name: "Welcome Premium",
    content: "Parabéns {{cliente}}! Você agora é um cliente {{categoria}} e tem benefícios exclusivos. Seu cashback é de {{valor}}%.",
    variables: ["{{cliente}}", "{{categoria}}", "{{valor}}"]
  },
  {
    id: "delivery_confirmation",
    name: "Confirmação de Entrega",
    content: "Oi {{cliente}}, seu pedido {{numero_pedido}} no valor de {{valor_pedido}} foi entregue em {{data_entrega}}. Avalie sua experiência: {{link_avaliacao}}",
    variables: ["{{cliente}}", "{{numero_pedido}}", "{{valor_pedido}}", "{{data_entrega}}", "{{link_avaliacao}}"]
  },
  {
    id: "birthday",
    name: "Aniversário",
    content: "🎉 Feliz aniversário {{cliente}}! Preparamos um desconto especial de {{desconto}}% válido até {{data_validade}}. Use o cupom: {{codigo_cupom}}",
    variables: ["{{cliente}}", "{{desconto}}", "{{data_validade}}", "{{codigo_cupom}}"]
  }
];

const variableTypes = [
  { type: 'text', icon: Type, label: 'Texto' },
  { type: 'number', icon: Hash, label: 'Número' },
  { type: 'date', icon: Calendar, label: 'Data' },
  { type: 'currency', icon: DollarSign, label: 'Moeda' }
];

export function HSMTemplateEditor({ open, onOpenChange, template, availableFields, onSave }: HSMTemplateEditorProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(template?.id || '');
  const [variableMappings, setVariableMappings] = useState<VariableMapping[]>([]);

  const selectedTemplate = hsmlTemplates.find(t => t.id === selectedTemplateId);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = hsmlTemplates.find(t => t.id === templateId);
    if (template) {
      // Initialize mappings for all variables
      const initialMappings: VariableMapping[] = template.variables.map(variable => ({
        templateVar: variable,
        dataField: '',
        type: 'text'
      }));
      setVariableMappings(initialMappings);
    }
  };

  const updateMapping = (templateVar: string, field: string) => {
    const fieldDef = availableFields.find(f => f.name === field);
    setVariableMappings(prev => 
      prev.map(mapping => 
        mapping.templateVar === templateVar 
          ? { ...mapping, dataField: field, type: fieldDef?.type || 'text' }
          : mapping
      )
    );
  };

  const handleSave = () => {
    if (selectedTemplateId && variableMappings.every(m => m.dataField)) {
      onSave(selectedTemplateId, variableMappings);
      onOpenChange(false);
    }
  };

  const renderPreview = () => {
    if (!selectedTemplate) return null;

    let preview = selectedTemplate.content;
    variableMappings.forEach(mapping => {
      if (mapping.dataField) {
        const field = availableFields.find(f => f.name === mapping.dataField);
        const displayValue = field?.label || mapping.dataField;
        preview = preview.replace(mapping.templateVar, `[${displayValue}]`);
      }
    });

    return preview;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Editor de Template HSM
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template Selection and Mapping */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>Selecionar Template HSM</Label>
                <Select value={selectedTemplateId} onValueChange={handleTemplateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha um template" />
                  </SelectTrigger>
                  <SelectContent>
                    {hsmlTemplates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTemplate && (
                <div className="p-4 border rounded-lg bg-muted/50">
                  <Label className="text-sm font-medium">Template Original:</Label>
                  <p className="text-sm mt-1 whitespace-pre-wrap">{selectedTemplate.content}</p>
                </div>
              )}
            </div>

            {selectedTemplate && (
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Mapeamento de Variáveis</Label>
                  <p className="text-sm text-muted-foreground">
                    Conecte as variáveis do template aos campos da sua visualização
                  </p>
                </div>

                <div className="space-y-3">
                  {selectedTemplate.variables.map((variable) => {
                    const mapping = variableMappings.find(m => m.templateVar === variable);
                    const fieldType = mapping?.type || 'text';
                    const typeIcon = variableTypes.find(t => t.type === fieldType)?.icon || Type;
                    const TypeIcon = typeIcon;

                    return (
                      <div key={variable} className="grid grid-cols-2 gap-4 items-end">
                        <div className="space-y-1">
                          <Label className="text-xs">Variável do Template</Label>
                          <div className="flex items-center gap-2 p-2 border rounded bg-background">
                            <Badge variant="outline" className="text-xs">
                              {variable}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs">Campo da Visualização</Label>
                          <div className="relative">
                            <Select
                              value={mapping?.dataField || ''}
                              onValueChange={(field) => updateMapping(variable, field)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o campo" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableFields.map(field => {
                                  const FieldIcon = variableTypes.find(t => t.type === field.type)?.icon || Type;
                                  return (
                                    <SelectItem key={field.name} value={field.name}>
                                      <div className="flex items-center gap-2">
                                        <FieldIcon className="h-4 w-4" />
                                        {field.label}
                                        <Badge variant="outline" className="text-xs ml-auto">
                                          {variableTypes.find(t => t.type === field.type)?.label}
                                        </Badge>
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            {mapping?.dataField && (
                              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                                <TypeIcon className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Preview da Mensagem</Label>
              <p className="text-sm text-muted-foreground">
                Veja como a mensagem ficará com os dados mapeados
              </p>
            </div>

            <div className="p-4 border rounded-lg min-h-[200px] bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">WhatsApp Business</p>
                  <p className="text-xs text-muted-foreground">Agora</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <p className="text-sm whitespace-pre-wrap">
                  {selectedTemplate ? renderPreview() : 'Selecione um template para ver o preview'}
                </p>
              </div>
            </div>

            {selectedTemplate && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Variáveis Detectadas:</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.variables.map(variable => {
                    const mapping = variableMappings.find(m => m.templateVar === variable);
                    const isMapped = mapping?.dataField;
                    
                    return (
                      <Badge 
                        key={variable} 
                        variant={isMapped ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {variable}
                        {isMapped && ' ✓'}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!selectedTemplateId || !variableMappings.every(m => m.dataField)}
          >
            Salvar Mapeamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}