import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SurveyModule {
  id: string;
  type: 'nps' | 'star' | 'text' | 'quiz' | 'image' | 'video';
  title: string;
  required: boolean;
  config: any;
}

interface SurveyPreviewProps {
  modules: SurveyModule[];
  className?: string;
}

export function SurveyPreview({ modules, className }: SurveyPreviewProps) {
  const renderModule = (module: SurveyModule) => {
    switch (module.type) {
      case 'nps':
        return (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>0 - Não recomendaria</span>
              <span>10 - Recomendaria totalmente</span>
            </div>
            <div className="flex gap-2 justify-center">
              {Array.from({length: 11}, (_, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 p-0"
                  disabled
                >
                  {i}
                </Button>
              ))}
            </div>
          </div>
        );

      case 'star':
        return (
          <div className="flex gap-1 justify-center">
            {Array.from({length: 5}, (_, i) => (
              <Star key={i} className="w-6 h-6 text-muted-foreground hover:text-yellow-400 cursor-pointer" />
            ))}
          </div>
        );

      case 'text':
        return (
          <Textarea 
            placeholder="Digite sua resposta aqui..."
            disabled
            className="resize-none"
          />
        );

      case 'quiz':
        return (
          <div className="space-y-2">
            {['Opção A', 'Opção B', 'Opção C', 'Opção D'].map((option, i) => (
              <div key={i} className="flex items-center gap-2">
                <input type="radio" disabled className="w-4 h-4" />
                <span className="text-sm">{option}</span>
              </div>
            ))}
          </div>
        );

      case 'image':
        return (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Clique para enviar uma imagem</p>
          </div>
        );

      case 'video':
        return (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Clique para enviar um vídeo</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-center">Preview da Pesquisa</CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Como o cliente verá a pesquisa
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {modules.map((module, index) => (
          <div key={module.id} className="space-y-3 p-4 border rounded-lg bg-card">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {index + 1}
              </Badge>
              <h4 className="font-medium text-sm">
                {module.title}
                {module.required && <span className="text-destructive ml-1">*</span>}
              </h4>
            </div>
            {renderModule(module)}
          </div>
        ))}
        
        {modules.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum módulo adicionado ainda</p>
            <p className="text-sm">Adicione módulos para ver o preview</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}