import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter, Calendar, MessageSquare } from "lucide-react";
import Layout from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { BarChart3, TrendingUp, Users, Star } from "lucide-react";

export default function OpinionReports() {
  const reportData = [
    { 
      campaign: "Satisfação Q1 2025", 
      opinions: 234, 
      sentiment: "Positivo", 
      avgScore: 8.2, 
      categories: ["Atendimento", "Produto", "Entrega"],
      channel: "Email",
      period: "Janeiro 2025"
    },
    { 
      campaign: "Pós-Entrega Dezembro", 
      opinions: 198, 
      sentiment: "Neutro", 
      avgScore: 6.8, 
      categories: ["Entrega", "Embalagem"],
      channel: "WhatsApp",
      period: "Dezembro 2024"
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relatório de Opiniões</h1>
            <p className="text-muted-foreground">Análise detalhada das opiniões e sentimentos</p>
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
            title="Total de Opiniões"
            value="1.432"
            icon={MessageSquare}
            colorClass="bg-primary"
          />
          <MetricCard
            title="Sentimento Positivo"
            value="68.2%"
            icon={TrendingUp}
            colorClass="bg-success"
          />
          <MetricCard
            title="Score Médio"
            value="7.8"
            icon={Star}
            colorClass="bg-warning"
          />
          <MetricCard
            title="Taxa de Resposta"
            value="43.1%"
            icon={Users}
            colorClass="bg-slate-600"
          />
        </div>

        {/* Sentiment Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Análise de Sentimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-white">68%</span>
                </div>
                <p className="font-medium">Positivo</p>
                <p className="text-sm text-muted-foreground">977 opiniões</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-warning rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-white">22%</span>
                </div>
                <p className="font-medium">Neutro</p>
                <p className="text-sm text-muted-foreground">315 opiniões</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-white">10%</span>
                </div>
                <p className="font-medium">Negativo</p>
                <p className="text-sm text-muted-foreground">140 opiniões</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Relatório Detalhado por Campanha</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                <span>Campanha</span>
                <span>Opiniões</span>
                <span>Sentimento</span>
                <span>Score Médio</span>
                <span>Categorias</span>
                <span>Canal</span>
                <span>Período</span>
              </div>
              {reportData.map((data, index) => (
                <div key={index} className="grid grid-cols-7 gap-4 text-sm py-3 border-b last:border-b-0">
                  <span className="font-medium">{data.campaign}</span>
                  <span>{data.opinions}</span>
                  <Badge variant={
                    data.sentiment === "Positivo" ? "default" : 
                    data.sentiment === "Neutro" ? "secondary" : "destructive"
                  }>
                    {data.sentiment}
                  </Badge>
                  <span className="font-medium">{data.avgScore}</span>
                  <div className="flex flex-wrap gap-1">
                    {data.categories.map((cat, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{cat}</Badge>
                    ))}
                  </div>
                  <Badge variant="outline">{data.channel}</Badge>
                  <span className="text-xs">{data.period}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories and Recent Comments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Categorias Mais Mencionadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Atendimento", mentions: 456, sentiment: "Positivo" },
                  { category: "Produto", mentions: 387, sentiment: "Positivo" },
                  { category: "Entrega", mentions: 234, sentiment: "Neutro" },
                  { category: "Preço", mentions: 156, sentiment: "Negativo" },
                ].map((cat, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">{cat.category}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{cat.mentions} menções</span>
                      <Badge variant={
                        cat.sentiment === "Positivo" ? "default" : 
                        cat.sentiment === "Neutro" ? "secondary" : "destructive"
                      }>
                        {cat.sentiment}
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
                  { 
                    comment: "Excelente atendimento, muito satisfeito!", 
                    sentiment: "Positivo", 
                    score: 9,
                    campaign: "Satisfação Q1",
                    date: "Há 2 horas"
                  },
                  { 
                    comment: "Produto bom, mas entrega demorou", 
                    sentiment: "Neutro", 
                    score: 7,
                    campaign: "Pós-Entrega",
                    date: "Há 4 horas"
                  },
                  { 
                    comment: "Muito insatisfeito com o suporte", 
                    sentiment: "Negativo", 
                    score: 3,
                    campaign: "Satisfação Q1",
                    date: "Há 6 horas"
                  },
                ].map((comment, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={
                        comment.sentiment === "Positivo" ? "default" : 
                        comment.sentiment === "Neutro" ? "secondary" : "destructive"
                      }>
                        Score: {comment.score}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="text-sm mb-1">{comment.comment}</p>
                    <p className="text-xs text-muted-foreground">Campanha: {comment.campaign}</p>
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