import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, AlertCircle } from "lucide-react";

interface CampaignImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CampaignImportModal({ open, onOpenChange }: CampaignImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    
    setUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      onOpenChange(false);
      setFile(null);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Importar Campanha NPS</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              O arquivo deve conter as seguintes colunas obrigatórias: <strong>nome_cliente, identificador_cliente, nota</strong>
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Nome da Campanha Importada</Label>
              <Input 
                id="campaign-name" 
                placeholder="Ex: Campanha NPS Janeiro 2024"
              />
            </div>

            <div className="space-y-2">
              <Label>Arquivo de Dados</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-muted-foreground">
                        {file ? file.name : "Clique para selecionar um arquivo CSV ou Excel"}
                      </span>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Formato Esperado:</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div><strong>nome_cliente:</strong> Nome completo do cliente</div>
                <div><strong>identificador_cliente:</strong> ID único do cliente</div>
                <div><strong>nota:</strong> Score NPS (0-10)</div>
                <div><strong>email (opcional):</strong> Email do cliente</div>
                <div><strong>data_resposta (opcional):</strong> Data da resposta</div>
                <div><strong>comentario (opcional):</strong> Comentário do cliente</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={uploading}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleImport}
              disabled={!file || uploading}
            >
              {uploading ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                  Importando...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Importar
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}