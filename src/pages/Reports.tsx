import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { BarChart3, TrendingUp, Users, Star } from "lucide-react";

export default function Reports() {
  const reportData = [
    { period: "Janeiro 2025", nps: 54, responses: 234, promoters: 45, detractors: 12 },
    { period: "Dezembro 2024", nps: 49, responses: 198, promoters: 38, detractors: 18 },
    { period: "Novembro 2024", nps: 57, responses: 276, promoters: 52, detractors: 15 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
            <p className="text-muted-foreground">Análise detalhada dos seus dados de NPS</p>
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
            title="NPS Médio"
            value="53.3"
            icon={BarChart3}
            colorClass="bg-primary"
          />
          <MetricCard
            title="Total Respostas"
            value="708"
            icon={Users}
            colorClass="bg-slate-600"
          />
          <MetricCard
            title="Taxa Resposta"
            value="68%"
            icon={TrendingUp}
            colorClass="bg-success"
          />
          <MetricCard
            title="Satisfação Média"
            value="8.2"
            icon={Star}
            colorClass="bg-warning"
          />
        </div>

        {/* Trend Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução do NPS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                <span>Período</span>
                <span>Score NPS</span>
                <span>Respostas</span>
                <span>Promotores</span>
                <span>Detratores</span>
                <span>Tendência</span>
              </div>
              {reportData.map((data, index) => (
                <div key={index} className="grid grid-cols-6 gap-4 text-sm py-3 border-b last:border-b-0">
                  <span className="font-medium">{data.period}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={data.nps >= 50 ? "default" : data.nps >= 30 ? "secondary" : "destructive"}>
                      {data.nps}
                    </Badge>
                  </div>
                  <span>{data.responses}</span>
                  <span className="text-success">{data.promoters}%</span>
                  <span className="text-destructive">{data.detractors}%</span>
                  <Badge variant="outline" className="w-fit">
                    {index === 0 ? "↗ +5" : index === 1 ? "↘ -8" : "↗ +8"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Canal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { channel: "Email", nps: 52, responses: 345 },
                  { channel: "SMS", nps: 58, responses: 234 },
                  { channel: "WhatsApp", nps: 61, responses: 129 },
                ].map((channel, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">{channel.channel}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{channel.responses} respostas</span>
                      <Badge variant={channel.nps >= 50 ? "default" : "secondary"}>
                        NPS: {channel.nps}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Comentários Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { score: 9, comment: "Excelente atendimento!", customer: "Maria Silva" },
                  { score: 3, comment: "Demora no suporte", customer: "João Santos" },
                  { score: 8, comment: "Produto de qualidade", customer: "Ana Costa" },
                ].map((comment, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={comment.score >= 9 ? "default" : comment.score >= 7 ? "secondary" : "destructive"}>
                        {comment.score}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{comment.customer}</span>
                    </div>
                    <p className="text-sm">{comment.comment}</p>
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