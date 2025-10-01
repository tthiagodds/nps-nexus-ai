import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Heart, 
  Send, 
  Clock, 
  CheckCircle, 
  Frown, 
  Meh, 
  Smile,
  BarChart3,
  MessageSquare,
  Star,
  CalendarIcon,
  Filter,
  Eye
} from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Dashboard() {
  const { user } = useAuth();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 1),
    to: new Date(2025, 0, 22),
  });

  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([
    "NPS SMS", "NPS EMAIL", "NPS MISTO"
  ]);

  const npsData = [
    { nome: "NPS SMS", opinioes: 20, detratores: 5, neutros: 5, promotores: 10, nps: 54, nota: 10, cliente: "David", comentario: "Parabéns, eu gostei", data: "22/01/2025" },
    { nome: "NPS EMAIL", opinioes: 50, detratores: 10, neutros: 10, promotores: 30, nps: 49, nota: 2, cliente: "Thiago", comentario: "Muito ruim esse site", data: "21/01/2025" },
    { nome: "NPS MISTO", opinioes: 30, detratores: 5, neutros: 5, promotores: 20, nps: 57, nota: 5, cliente: "Thanos", comentario: "Mais ou menos ein", data: "20/01/2025" },
  ];

  const handleCampaignToggle = (campaignName: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignName) 
        ? prev.filter(name => name !== campaignName)
        : [...prev, campaignName]
    );
  };

  const filteredData = npsData.filter(campaign => selectedCampaigns.includes(campaign.nome));

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Bem vindo, {user?.name || 'Usuário'}!
          </h1>
          <p className="text-muted-foreground">Overview</p>
          {user && (
            <div className="mt-2 text-sm text-muted-foreground">
              <span>Logado como: {user.username} | Empresa: {user.id_empresa}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros ({selectedCampaigns.length})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filtro de Campanhas</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Selecione as campanhas que deseja visualizar no dashboard:
                </p>
                <div className="space-y-3">
                  {npsData.map((campaign) => (
                    <div key={campaign.nome} className="flex items-center space-x-2">
                      <Checkbox
                        id={campaign.nome}
                        checked={selectedCampaigns.includes(campaign.nome)}
                        onCheckedChange={() => handleCampaignToggle(campaign.nome)}
                      />
                      <Label htmlFor={campaign.nome} className="flex-1 cursor-pointer">
                        {campaign.nome}
                      </Label>
                      <Badge variant="outline">{campaign.opinioes} opiniões</Badge>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCampaigns(npsData.map(c => c.nome))}
                  className="w-full"
                >
                  Selecionar Todas
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal min-w-64",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd/MM/yyyy")} -{" "}
                      {format(date.to, "dd/MM/yyyy")}
                    </>
                  ) : (
                    format(date.from, "dd/MM/yyyy")
                  )
                ) : (
                  <span>Selecionar período</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Avaliações"
          value="100"
          icon={Heart}
          variant="secondary"
        />
        <MetricCard
          title="Disparos"
          value="131"
          icon={Send}
          variant="secondary"
        />
        <MetricCard
          title="Tx. de Resposta"
          value="77%"
          icon={Clock}
          variant="secondary"
        />
        <MetricCard
          title="Tx. de Comentários"
          value="68%"
          icon={MessageSquare}
          variant="secondary"
        />
      </div>

      {/* NPS Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Detratores"
          value="20"
          percentage="12%"
          icon={Frown}
          variant="destructive"
        />
        <MetricCard
          title="Neutros"
          value="36"
          percentage="21%"
          icon={Meh}
          variant="warning"
        />
        <MetricCard
          title="Promotores"
          value="73"
          percentage="51%"
          icon={Smile}
          variant="success"
        />
        <MetricCard
          title="NPS"
          value="52"
          icon={BarChart3}
          variant="secondary"
        />
      </div>

      {/* Campaign Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Por campanha</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2 text-sm font-medium text-muted-foreground border-b pb-2">
                <span>Nome</span>
                <span>Opiniões</span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                </span>
                <span>NPS</span>
              </div>

              {filteredData.map((campaign, index) => (
                <div key={index} className="grid grid-cols-7 gap-2 text-sm py-2 border-b last:border-b-0">
                  <span className="font-medium">{campaign.nome}</span>
                  <span>{campaign.opinioes}</span>
                  <span>{campaign.detratores}</span>
                  <span>{campaign.neutros}</span>
                  <span>{campaign.promotores}</span>
                  <span className="font-semibold">{campaign.nps}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Últimas opiniões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-2 text-sm font-medium text-muted-foreground border-b pb-2">
                <span>Campanha</span>
                <span>Data</span>
                <span>Nota</span>
                <span>Cliente</span>
                <span>Comentário</span>
                <span>Ações</span>
              </div>

              {filteredData.map((opinion, index) => (
                <Dialog key={index}>
                  <div className="grid grid-cols-6 gap-2 text-sm py-2 border-b last:border-b-0 hover:bg-muted/50 cursor-pointer">
                    <span className="font-medium text-xs">{opinion.nome}</span>
                    <span className="text-xs text-muted-foreground">{opinion.data}</span>
                    <div className="flex items-center">
                      <Badge variant={opinion.nota >= 9 ? "default" : opinion.nota >= 7 ? "secondary" : "destructive"}>
                        {opinion.nota}
                      </Badge>
                    </div>
                    <span className="font-medium">{opinion.cliente}</span>
                    <span className="text-muted-foreground truncate">{opinion.comentario}</span>
                    <div className="flex gap-1">
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Detalhes da Opinião</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Campanha</Label>
                          <p className="text-sm">{opinion.nome}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Data</Label>
                          <p className="text-sm">{opinion.data}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Cliente</Label>
                          <p className="text-sm">{opinion.cliente}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Nota</Label>
                          <Badge variant={opinion.nota >= 9 ? "default" : opinion.nota >= 7 ? "secondary" : "destructive"}>
                            {opinion.nota}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Comentário Completo</Label>
                        <p className="text-sm border rounded p-2 bg-muted">{opinion.comentario}</p>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Responder Cliente
                        </Button>
                        <Button variant="outline">Marcar como Resolvido</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}