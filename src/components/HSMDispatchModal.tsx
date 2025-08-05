import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Settings, Send } from "lucide-react";
import { useState } from "react";
import { HSMTemplateEditor } from "@/components/HSMTemplateEditor";

interface HSMDispatchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: any[];
  availableFields: any[];
}

export function HSMDispatchModal({ open, onOpenChange, templates, availableFields }: HSMDispatchModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showHSMEditor, setShowHSMEditor] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Novo Disparo HSM
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Seleção de Template */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dispatch-template">Template HSM</Label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id.toString()}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowHSMEditor(true)}
                    disabled={!selectedTemplate}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar Variáveis
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Selecione um template e configure as variáveis dinâmicas
                </p>
              </div>
            </div>

            {/* Variáveis Disponíveis */}
            {selectedTemplate && (
              <div className="space-y-3">
                <Label>Variáveis Disponíveis na Visualização</Label>
                <div className="flex flex-wrap gap-2">
                  {availableFields.map((field) => (
                    <Button key={field.name} variant="outline" size="sm">
                      {`{{${field.name}}}`}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Estas variáveis podem ser mapeadas no template HSM
                </p>
              </div>
            )}
            
            {/* Upload de Contatos */}
            <div className="space-y-4">
              <Label>Lista de Contatos</Label>
              <Button variant="outline" className="w-full h-20 flex flex-col">
                <Upload className="h-6 w-6 mb-2" />
                Upload de Planilha CSV
                <span className="text-xs text-muted-foreground">
                  Arquivo deve conter as colunas correspondentes às variáveis
                </span>
              </Button>
            </div>

            {/* Ações */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button disabled={!selectedTemplate}>
                <Send className="h-4 w-4 mr-2" />
                Enviar Disparos
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* HSM Template Editor */}
      <HSMTemplateEditor
        open={showHSMEditor}
        onOpenChange={setShowHSMEditor}
        availableFields={availableFields}
        onSave={(templateId, mappings) => {
          console.log('HSM Template configurado:', { templateId, mappings });
          setShowHSMEditor(false);
        }}
      />
    </>
  );
}