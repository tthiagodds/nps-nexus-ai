import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, Calendar, Send } from "lucide-react";
import Layout from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";

export default function DispatchReports() {
  const dispatchData = [
    { 
      campaign: "Satisfação Q1 2025", 
      dispatches: 1250, 
      delivered: 1180, 
      failed: 70,
      channel: "Email",
      dispatchDate: "22/01/2025",
      deliveryRate: 94.4,
      clientName: "João Silva",
      clientEmail: "joao@exemplo.com",
      clientId: "CLI001"
    },
    { 
      campaign: "Pós-Entrega Dezembro", 
      dispatches: 890, 
      delivered: 856, 
      failed: 34,
      channel: "WhatsApp",
      dispatchDate: "21/01/2025",
      deliveryRate: 96.2,
      clientName: "Maria Santos",
      clientEmail: "maria@exemplo.com",
      clientId: "CLI002"
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relatório de Disparos</h1>
            <p className="text-muted-foreground">Análise detalhada dos disparos e entregas</p>
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecionar Campanha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Campanhas</SelectItem>
                <SelectItem value="satisfaction-q1">Satisfação Q1 2025</SelectItem>
                <SelectItem value="post-delivery">Pós-Entrega Dezembro</SelectItem>
                <SelectItem value="support-survey">Pesquisa de Suporte</SelectItem>
              </SelectContent>
            </Select>
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
            title="Total de Disparos"
            value="2.140"
            icon={Send}
            colorClass="bg-primary"
          />
          <MetricCard
            title="Taxa de Entrega"
            value="95.1%"
            icon={TrendingUp}
            colorClass="bg-success"
          />
          <MetricCard
            title="Disparos Entregues"
            value="2.036"
            icon={Users}
            colorClass="bg-blue-600"
          />
          <MetricCard
            title="Falhas"
            value="104"
            icon={Clock}
            colorClass="bg-destructive"
          />
        </div>

        {/* Detailed Report */}
        <Card>
          <CardHeader>
            <CardTitle>Relatório Detalhado por Campanha</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-10 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                <span>Campanha</span>
                <span>Disparos</span>
                <span>Entregues</span>
                <span>Falhas</span>
                <span>Taxa Entrega</span>
                <span>Canal</span>
                <span>Data Disparo</span>
                <span>Nome Cliente</span>
                <span>Email</span>
                <span>ID Cliente</span>
              </div>
              {dispatchData.map((data, index) => (
                <div key={index} className="grid grid-cols-10 gap-4 text-sm py-3 border-b last:border-b-0">
                  <span className="font-medium">{data.campaign}</span>
                  <span>{data.dispatches}</span>
                  <span className="text-green-600">{data.delivered}</span>
                  <span className="text-red-600">{data.failed}</span>
                  <Badge variant={data.deliveryRate > 95 ? "default" : data.deliveryRate > 90 ? "secondary" : "destructive"}>
                    {data.deliveryRate}%
                  </Badge>
                  <Badge variant="outline">{data.channel}</Badge>
                  <span className="text-xs">{data.dispatchDate}</span>
                  <span className="text-xs">{data.clientName}</span>
                  <span className="text-xs">{data.clientEmail}</span>
                  <span className="text-xs">{data.clientId}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Channel Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Canal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { channel: "Email", dispatches: 1250, delivered: 1180, rate: 94.4 },
                  { channel: "WhatsApp", dispatches: 890, delivered: 856, rate: 96.2 },
                  { channel: "SMS", dispatches: 456, delivered: 432, rate: 94.7 },
                ].map((channel, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <span className="font-medium">{channel.channel}</span>
                      <p className="text-sm text-muted-foreground">
                        {channel.delivered}/{channel.dispatches} entregues
                      </p>
                    </div>
                    <Badge variant={channel.rate > 95 ? "default" : "secondary"}>
                      {channel.rate}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimos Disparos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    campaign: "Satisfação Q1",
                    client: "João Silva", 
                    channel: "Email", 
                    status: "Entregue",
                    time: "Há 2 minutos"
                  },
                  { 
                    campaign: "Pós-Entrega",
                    client: "Maria Santos", 
                    channel: "WhatsApp", 
                    status: "Entregue",
                    time: "Há 5 minutos"
                  },
                  { 
                    campaign: "Suporte",
                    client: "Pedro Costa", 
                    channel: "SMS", 
                    status: "Falha",
                    time: "Há 8 minutos"
                  },
                ].map((dispatch, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-sm">{dispatch.client}</p>
                        <p className="text-xs text-muted-foreground">Campanha: {dispatch.campaign}</p>
                      </div>
                      <Badge variant={dispatch.status === "Entregue" ? "default" : "destructive"}>
                        {dispatch.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{dispatch.channel}</span>
                      <span>{dispatch.time}</span>
                    </div>
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