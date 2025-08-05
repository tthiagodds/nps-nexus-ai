import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, Calendar, Zap } from "lucide-react";
import Layout from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { BarChart3, TrendingUp, Users, Star } from "lucide-react";

export default function AutomationReports() {
  const reportData = [
    { 
      automation: "NPS Baixo - Recuperação", 
      triggered: 127, 
      sent: 125, 
      delivered: 123, 
      read: 98, 
      responded: 34,
      channel: "WhatsApp",
      campaign: "Recuperação Q1",
      period: "Janeiro 2025"
    },
    { 
      automation: "Pedido Entregue - Pesquisa", 
      triggered: 1543, 
      sent: 1540, 
      delivered: 1535, 
      read: 1287, 
      responded: 678,
      channel: "Email",
      campaign: "Satisfação Pós-Entrega",
      period: "Janeiro 2025"
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relatório de Mensagens Automáticas</h1>
            <p className="text-muted-foreground">Análise detalhada das automações e disparos</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Período
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Automações Disparadas"
            value="1.670"
            icon={Zap}
            variant="default"
          />
          <MetricCard
            title="Taxa de Entrega"
            value="98.8%"
            icon={TrendingUp}
            variant="success"
          />
          <MetricCard
            title="Taxa de Leitura"
            value="82.3%"
            icon={Users}
            variant="secondary"
          />
          <MetricCard
            title="Taxa de Resposta"
            value="42.6%"
            icon={Star}
            variant="warning"
          />
        </div>

        {/* Detailed Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Relatório Detalhado por Automação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-9 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                <span>Automação</span>
                <span>Disparados</span>
                <span>Enviados</span>
                <span>Entregues</span>
                <span>Lidos</span>
                <span>Respostas</span>
                <span>Canal</span>
                <span>Campanha</span>
                <span>Período</span>
              </div>
              {reportData.map((data, index) => (
                <div key={index} className="grid grid-cols-9 gap-4 text-sm py-3 border-b last:border-b-0">
                  <span className="font-medium">{data.automation}</span>
                  <span>{data.triggered}</span>
                  <span className="text-primary">{data.sent}</span>
                  <span className="text-success">{data.delivered}</span>
                  <span className="text-blue-600">{data.read}</span>
                  <span className="text-orange-600">{data.responded}</span>
                  <Badge variant="outline">{data.channel}</Badge>
                  <span className="text-xs">{data.campaign}</span>
                  <span className="text-xs">{data.period}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance by Channel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance por Canal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { channel: "WhatsApp", triggered: 127, delivered: 123, read: 98, rate: "96.9%" },
                  { channel: "Email", triggered: 1543, delivered: 1535, read: 1287, rate: "99.5%" },
                  { channel: "SMS", triggered: 89, delivered: 87, read: 65, rate: "97.8%" },
                ].map((channel, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">{channel.channel}</span>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm">{channel.triggered} disparos</p>
                        <p className="text-xs text-muted-foreground">{channel.read} lidos</p>
                      </div>
                      <Badge variant="default">
                        {channel.rate} entrega
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Automações Mais Eficazes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Pesquisa Pós-Entrega", responses: 678, rate: "44.0%" },
                  { name: "Recuperação NPS", responses: 34, rate: "26.8%" },
                  { name: "Welcome Premium", responses: 12, rate: "26.7%" },
                ].map((automation, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="default">
                        {automation.rate} resposta
                      </Badge>
                      <span className="text-sm text-muted-foreground">{automation.responses} respostas</span>
                    </div>
                    <p className="text-sm font-medium">{automation.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}