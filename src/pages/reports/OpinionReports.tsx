import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Filter, Calendar, MessageSquare, Search, Eye, ThumbsUp, ThumbsDown, Meh } from "lucide-react";
import Layout from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { BarChart3, TrendingUp, Users, Star } from "lucide-react";
import { DateRangePicker } from "@/components/DateRangePicker";

export default function OpinionReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");

  const opinionDetails = [
    {
      id: 1,
      campaign: "Satisfação Q1 2025",
      respondent: "joao@email.com",
      submittedAt: "2025-01-22 14:30",
      score: 9,
      sentiment: "Positivo",
      comment: "Excelente atendimento, muito satisfeito com o produto e a entrega foi rápida!",
      categories: ["Atendimento", "Produto", "Entrega"],
      channel: "Email",
      location: "São Paulo, SP",
      responseTime: "2.5 min",
      deviceType: "Desktop",
      npsCategory: "Promotor",
      followUpSent: true,
      aiConfidence: 98.5,
      keywords: ["excelente", "satisfeito", "rápida"],
      viewSource: "Email Survey Link",
      userAgent: "Chrome 120.0.0.0",
      ipAddress: "192.168.1.100",
      referrer: "Direct",
      sessionDuration: "3m 45s"
    },
    {
      id: 2,
      campaign: "Pós-Entrega Dezembro",
      respondent: "maria@empresa.com",
      submittedAt: "2025-01-22 10:15",
      score: 7,
      sentiment: "Neutro",
      comment: "Produto bom, mas a entrega demorou mais que o esperado. Atendimento foi ok.",
      categories: ["Produto", "Entrega", "Atendimento"],
      channel: "WhatsApp",
      location: "Rio de Janeiro, RJ",
      responseTime: "4.2 min",
      deviceType: "Mobile",
      npsCategory: "Neutro",
      followUpSent: false,
      aiConfidence: 92.1,
      keywords: ["bom", "demorou", "esperado"],
      viewSource: "WhatsApp HSM",
      userAgent: "WhatsApp 2.24.1.77",
      ipAddress: "192.168.1.101",
      referrer: "WhatsApp",
      sessionDuration: "4m 12s"
    },
    {
      id: 3,
      campaign: "Satisfação Q1 2025",
      respondent: "pedro@loja.com",
      submittedAt: "2025-01-21 16:45",
      score: 3,
      sentiment: "Negativo",
      comment: "Muito insatisfeito com o suporte técnico. Demorou muito para resolver meu problema.",
      categories: ["Suporte", "Tempo de Resposta"],
      channel: "SMS",
      location: "Belo Horizonte, MG",
      responseTime: "8.7 min",
      deviceType: "Mobile",
      npsCategory: "Detrator",
      followUpSent: true,
      aiConfidence: 95.8,
      keywords: ["insatisfeito", "demorou", "problema"],
      viewSource: "SMS Link",
      userAgent: "Safari 17.0",
      ipAddress: "192.168.1.102",
      referrer: "SMS",
      sessionDuration: "8m 33s"
    },
    {
      id: 4,
      campaign: "NPS Enterprise",
      respondent: "ana@corporativo.com",
      submittedAt: "2025-01-21 14:20",
      score: 10,
      sentiment: "Muito Positivo",
      comment: "Superou todas as expectativas! Equipe excepcional e produto de alta qualidade.",
      categories: ["Equipe", "Produto", "Qualidade"],
      channel: "WhatsApp Enterprise",
      location: "Porto Alegre, RS",
      responseTime: "1.8 min",
      deviceType: "Desktop",
      npsCategory: "Promotor",
      followUpSent: true,
      aiConfidence: 99.2,
      keywords: ["superou", "excepcional", "qualidade"],
      viewSource: "WhatsApp Enterprise Link",
      userAgent: "Chrome 120.0.0.0",
      ipAddress: "192.168.1.103",
      referrer: "WhatsApp Business",
      sessionDuration: "2m 15s"
    },
    {
      id: 5,
      campaign: "Pós-Compra Janeiro",
      respondent: "carlos@cliente.com",
      submittedAt: "2025-01-21 11:30",
      score: 8,
      sentiment: "Positivo",
      comment: "Boa experiência geral, apenas alguns detalhes podem melhorar.",
      categories: ["Experiência", "Melhorias"],
      channel: "Email",
      location: "Brasília, DF",
      responseTime: "3.1 min",
      deviceType: "Tablet",
      npsCategory: "Promotor",
      followUpSent: false,
      aiConfidence: 87.3,
      keywords: ["boa", "experiência", "melhorar"],
      viewSource: "Email Template Link",
      userAgent: "Safari 17.0 iPad",
      ipAddress: "192.168.1.104",
      referrer: "Email",
      sessionDuration: "3m 28s"
    }
  ];

  const filteredOpinions = opinionDetails.filter(opinion => {
    const matchesSearch = opinion.respondent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opinion.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opinion.campaign.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCampaign = selectedCampaign === "all" || opinion.campaign === selectedCampaign;
    const matchesSentiment = selectedSentiment === "all" || opinion.sentiment === selectedSentiment;
    const matchesChannel = selectedChannel === "all" || opinion.channel === selectedChannel;
    
    return matchesSearch && matchesCampaign && matchesSentiment && matchesChannel;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relatório de Opiniões</h1>
            <p className="text-muted-foreground">Análise detalhada das opiniões e sentimentos</p>
          </div>
          <div className="flex gap-2">
            <DateRangePicker />
            <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todas as Campanhas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Campanhas</SelectItem>
                <SelectItem value="Satisfação Q1 2025">Satisfação Q1 2025</SelectItem>
                <SelectItem value="Pós-Entrega Dezembro">Pós-Entrega Dezembro</SelectItem>
                <SelectItem value="NPS Enterprise">NPS Enterprise</SelectItem>
                <SelectItem value="Pós-Compra Janeiro">Pós-Compra Janeiro</SelectItem>
              </SelectContent>
            </Select>
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
            subtitle="+12.5%"
            icon={MessageSquare}
          />
          <MetricCard
            title="Sentimento Positivo"
            value="68.2%"
            subtitle="+5.3%"
            icon={TrendingUp}
          />
          <MetricCard
            title="Score Médio"
            value="7.8"
            subtitle="+0.4"
            icon={Star}
          />
          <MetricCard
            title="Taxa de Resposta"
            value="43.1%"
            subtitle="+2.1%"
            icon={Users}
          />
        </div>

        {/* Detailed Opinions Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <CardTitle>Opiniões Detalhadas</CardTitle>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar opiniões..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Sentimento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Muito Positivo">Muito Positivo</SelectItem>
                    <SelectItem value="Positivo">Positivo</SelectItem>
                    <SelectItem value="Neutro">Neutro</SelectItem>
                    <SelectItem value="Negativo">Negativo</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Canal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os canais</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="WhatsApp Enterprise">WhatsApp Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Respondente</TableHead>
                  <TableHead>Campanha</TableHead>
                  <TableHead>Score/NPS</TableHead>
                  <TableHead>Sentimento</TableHead>
                  <TableHead>Comentário</TableHead>
                  <TableHead>Canal/Fonte</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Tempo Resposta</TableHead>
                  <TableHead>Confiança IA</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOpinions.map((opinion) => (
                  <TableRow key={opinion.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{opinion.respondent}</span>
                        <span className="text-xs text-muted-foreground">{opinion.deviceType}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{opinion.campaign}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className="text-center">
                          Score: {opinion.score}/10
                        </Badge>
                        <Badge 
                          variant={
                            opinion.npsCategory === "Promotor" 
                              ? "default" 
                              : opinion.npsCategory === "Neutro"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {opinion.npsCategory}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {opinion.sentiment === "Muito Positivo" || opinion.sentiment === "Positivo" ? (
                          <ThumbsUp className="h-3 w-3" />
                        ) : opinion.sentiment === "Negativo" ? (
                          <ThumbsDown className="h-3 w-3" />
                        ) : (
                          <Meh className="h-3 w-3" />
                        )}
                        <Badge 
                          variant={
                            opinion.sentiment === "Muito Positivo" || opinion.sentiment === "Positivo"
                              ? "default" 
                              : opinion.sentiment === "Negativo"
                                ? "destructive"
                                : "secondary"
                          }
                          className={
                            opinion.sentiment === "Muito Positivo" 
                              ? "bg-success" 
                              : ""
                          }
                        >
                          {opinion.sentiment}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="text-sm">
                        <p className="truncate">{opinion.comment}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {opinion.categories.slice(0, 2).map((cat) => (
                            <Badge key={cat} variant="outline" className="text-xs">
                              {cat}
                            </Badge>
                          ))}
                          {opinion.categories.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{opinion.categories.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline">{opinion.channel}</Badge>
                        <span className="text-xs text-muted-foreground">{opinion.viewSource}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{opinion.location}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm">{opinion.responseTime}</span>
                        <span className="text-xs text-muted-foreground">Sessão: {opinion.sessionDuration}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium">{opinion.aiConfidence}%</span>
                        <div className="flex flex-wrap gap-1">
                          {opinion.keywords.slice(0, 2).map((keyword) => (
                            <span key={keyword} className="text-xs bg-muted px-1 rounded">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{opinion.submittedAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {opinion.followUpSent && (
                          <Badge variant="secondary" className="text-xs">
                            Follow-up
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredOpinions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma opinião encontrada com os filtros aplicados.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Análise de Sentimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-white">15%</span>
                </div>
                <p className="font-medium">Muito Positivo</p>
                <p className="text-sm text-muted-foreground">215 opiniões</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-white">53%</span>
                </div>
                <p className="font-medium">Positivo</p>
                <p className="text-sm text-muted-foreground">762 opiniões</p>
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

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Palavras-chave Mais Mencionadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { keyword: "excelente", mentions: 156, sentiment: "Positivo" },
                  { keyword: "rápida", mentions: 134, sentiment: "Positivo" },
                  { keyword: "demorou", mentions: 89, sentiment: "Negativo" },
                  { keyword: "satisfeito", mentions: 67, sentiment: "Positivo" },
                  { keyword: "problema", mentions: 45, sentiment: "Negativo" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">{item.keyword}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{item.mentions} menções</span>
                      <Badge variant={item.sentiment === "Positivo" ? "default" : "destructive"}>
                        {item.sentiment}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas de Engajamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm font-medium">Tempo Médio de Resposta</span>
                  <span className="font-bold">3.8 min</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm font-medium">Duração Média da Sessão</span>
                  <span className="font-bold">4m 22s</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm font-medium">Taxa de Abandono</span>
                  <span className="font-bold">12.3%</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm font-medium">Dispositivo Mais Usado</span>
                  <span className="font-bold">Mobile (67%)</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-sm font-medium">Follow-ups Enviados</span>
                  <span className="font-bold">234 (43.1%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}