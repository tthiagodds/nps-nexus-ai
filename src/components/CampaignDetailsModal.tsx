import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Users, MessageCircle, Bot, BrainCircuit } from "lucide-react";

interface CampaignDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: any;
}

export function CampaignDetailsModal({ open, onOpenChange, campaign }: CampaignDetailsModalProps) {
  if (!campaign) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Resumo da Campanha - {campaign.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nome da Campanha</p>
                  <p className="font-medium">{campaign.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={campaign.status === "Ativa" ? "default" : "secondary"}>
                    {campaign.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Público Alvo</p>
                  <p className="font-medium">{campaign.target || "Clientes Premium"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Canais</p>
                  <div className="flex gap-1">
                    {campaign.channels?.map((channel: string, index: number) => (
                      <Badge key={index} variant="outline">{channel}</Badge>
                    )) || <Badge variant="outline">Email</Badge>}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data de Criação</p>
                  <p className="font-medium">{campaign.created || "15/01/2025"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Última Atualização</p>
                  <p className="font-medium">{campaign.lastUpdate || "20/01/2025"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métricas da Campanha */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Métricas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{campaign.sent || 1250}</div>
                  <div className="text-sm text-muted-foreground">Enviados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{campaign.responses || 567}</div>
                  <div className="text-sm text-muted-foreground">Respostas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{campaign.avgScore || "8.2"}</div>
                  <div className="text-sm text-muted-foreground">NPS Médio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">{campaign.responseRate || "45%"}</div>
                  <div className="text-sm text-muted-foreground">Taxa de Resposta</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status das IAs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Status das IAs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">IA de Categorização</p>
                      <p className="text-sm text-muted-foreground">Classifica automaticamente as opiniões</p>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-500">Ativa</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">IA de Resposta Automática</p>
                      <p className="text-sm text-muted-foreground">Responde automaticamente para NPS baixo</p>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-500">Ativa</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bot className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">IA de Análise de Sentimento</p>
                      <p className="text-sm text-muted-foreground">Analisa o sentimento das respostas</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Inativa</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}