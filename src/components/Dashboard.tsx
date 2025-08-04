import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  Filter
} from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Dashboard() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 1),
    to: new Date(2025, 0, 22),
  });

  const npsData = [
    { nome: "NPS SMS", opinioes: 20, detratores: 5, neutros: 5, promotores: 10, nps: 54, nota: 10, cliente: "David", comentario: "Parabéns, eu gostei" },
    { nome: "NPS EMAIL", opinioes: 50, detratores: 10, neutros: 10, promotores: 30, nps: 49, nota: 2, cliente: "Thiago", comentario: "Muito ruim esse site" },
    { nome: "NPS MISTO", opinioes: 30, detratores: 5, neutros: 5, promotores: 20, nps: 57, nota: 5, cliente: "Thanos", comentario: "Mais ou menos ein" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bem vindo, David!</h1>
          <p className="text-muted-foreground">Overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
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
            <PopoverContent className="w-auto p-0" align="start">
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
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Avaliações"
          value="100"
          icon={Heart}
          colorClass="bg-slate-600"
        />
        <MetricCard
          title="Disparos"
          value="131"
          icon={Send}
          colorClass="bg-slate-600"
        />
        <MetricCard
          title="Tx. de Resposta"
          value="77%"
          icon={Clock}
          colorClass="bg-slate-600"
        />
        <MetricCard
          title="Tx. de Comentários"
          value="68%"
          icon={MessageSquare}
          colorClass="bg-slate-600"
        />
      </div>

      {/* NPS Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Detratores"
          value="20"
          percentage="12%"
          icon={Frown}
          colorClass="bg-destructive"
        />
        <MetricCard
          title="Neutros"
          value="36"
          percentage="21%"
          icon={Meh}
          colorClass="bg-warning"
        />
        <MetricCard
          title="Promotores"
          value="73"
          percentage="51%"
          icon={Smile}
          colorClass="bg-success"
        />
        <MetricCard
          title="NPS"
          value="52"
          icon={BarChart3}
          colorClass="bg-slate-600"
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

              {npsData.map((campaign, index) => (
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
              <div className="grid grid-cols-5 gap-2 text-sm font-medium text-muted-foreground border-b pb-2">
                <span>Nota</span>
                <span>Cliente</span>
                <span>Comentário</span>
              </div>

              {npsData.map((opinion, index) => (
                <div key={index} className="grid grid-cols-5 gap-2 text-sm py-2 border-b last:border-b-0">
                  <div className="flex items-center">
                    <Badge variant={opinion.nota >= 9 ? "default" : opinion.nota >= 7 ? "secondary" : "destructive"}>
                      {opinion.nota}
                    </Badge>
                  </div>
                  <span className="font-medium">{opinion.cliente}</span>
                  <span className="text-muted-foreground col-span-2">{opinion.comentario}</span>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Responder
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}