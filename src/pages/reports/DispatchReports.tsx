import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, Filter, Search, Eye, Mail, MessageSquare, Smartphone } from "lucide-react";
import { DateRangePicker } from "@/components/DateRangePicker";
import Layout from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";

export default function DispatchReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock data para demonstração
  const dispatchMetrics = [
    { title: "Total de Disparos", value: "2,547", change: "+12%", icon: Mail },
    { title: "Taxa de Entrega", value: "94.2%", change: "+2.1%", icon: MessageSquare },
    { title: "Taxa de Abertura", value: "68.5%", change: "+5.3%", icon: Eye },
    { title: "Taxa de Resposta", value: "23.7%", change: "+3.2%", icon: Smartphone }
  ];

  const dispatches = [
    {
      id: 1,
      campaign: "NPS SMS",
      channel: "SMS",
      recipient: "cliente@email.com",
      sentAt: "2025-01-22 14:30",
      deliveredAt: "2025-01-22 14:30:15",
      status: "Entregue",
      opened: true,
      openedAt: "2025-01-22 14:35:20",
      responded: false,
      templateUsed: "Template SMS NPS - Direto",
      messageId: "MSG_001",
      cost: "R$ 0,08",
      channelProvider: "Infobip SMS",
      userId: "user_123",
      userAgent: "Mobile WhatsApp",
      ipAddress: "192.168.1.100",
      country: "Brasil",
      region: "São Paulo",
      sentiment: "Neutro",
      responseTime: null,
      retryCount: 0,
      errorCode: null,
      errorMessage: null
    },
    {
      id: 2,
      campaign: "NPS EMAIL",
      channel: "Email",
      recipient: "joao@empresa.com",
      sentAt: "2025-01-22 14:25",
      deliveredAt: "2025-01-22 14:25:10",
      status: "Entregue",
      opened: true,
      openedAt: "2025-01-22 14:30:45",
      responded: true,
      respondedAt: "2025-01-22 15:10:30",
      templateUsed: "Template Email NPS - Corporativo",
      messageId: "MSG_002",
      cost: "R$ 0,05",
      channelProvider: "Email SMTP",
      userId: "user_456",
      userAgent: "Desktop Outlook",
      ipAddress: "192.168.1.101",
      country: "Brasil",
      region: "Rio de Janeiro",
      sentiment: "Positivo",
      responseTime: "40 min",
      retryCount: 0,
      errorCode: null,
      errorMessage: null
    },
    {
      id: 3,
      campaign: "NPS MISTO",
      channel: "WhatsApp",
      recipient: "+5511999999999",
      sentAt: "2025-01-22 14:20",
      deliveredAt: null,
      status: "Pendente",
      opened: false,
      openedAt: null,
      responded: false,
      templateUsed: "HSM NPS Satisfação",
      messageId: "MSG_003",
      cost: "R$ 0,12",
      channelProvider: "WAHA WhatsApp",
      userId: "user_789",
      userAgent: "Mobile WhatsApp",
      ipAddress: "192.168.1.102",
      country: "Brasil",
      region: "Minas Gerais",
      sentiment: null,
      responseTime: null,
      retryCount: 1,
      errorCode: "RATE_LIMIT",
      errorMessage: "Taxa de envio excedida"
    },
    {
      id: 4,
      campaign: "NPS EMAIL",
      channel: "Email",
      recipient: "maria@loja.com",
      sentAt: "2025-01-22 14:15",
      deliveredAt: null,
      status: "Falhou",
      opened: false,
      openedAt: null,
      responded: false,
      templateUsed: "Template Email NPS - Simples",
      messageId: "MSG_004",
      cost: "R$ 0,00",
      channelProvider: "Email SMTP",
      userId: "user_101",
      userAgent: null,
      ipAddress: "192.168.1.103",
      country: "Brasil",
      region: "Bahia",
      sentiment: null,
      responseTime: null,
      retryCount: 3,
      errorCode: "INVALID_EMAIL",
      errorMessage: "Endereço de email inválido"
    },
    {
      id: 5,
      campaign: "NPS SMS",
      channel: "SMS",
      recipient: "+5511888888888",
      sentAt: "2025-01-22 14:10",
      deliveredAt: "2025-01-22 14:10:05",
      status: "Entregue",
      opened: false,
      openedAt: null,
      responded: true,
      respondedAt: "2025-01-22 14:45:20",
      templateUsed: "Template SMS NPS - Direto",
      messageId: "MSG_005",
      cost: "R$ 0,08",
      channelProvider: "Infobip SMS",
      userId: "user_202",
      userAgent: "Mobile",
      ipAddress: "192.168.1.104",
      country: "Brasil",
      region: "Paraná",
      sentiment: "Negativo",
      responseTime: "35 min",
      retryCount: 0,
      errorCode: null,
      errorMessage: null
    },
    {
      id: 6,
      campaign: "NPS WhatsApp Enterprise",
      channel: "WhatsApp Enterprise",
      recipient: "+5511777777777",
      sentAt: "2025-01-22 14:05",
      deliveredAt: "2025-01-22 14:05:02",
      status: "Entregue",
      opened: true,
      openedAt: "2025-01-22 14:15:30",
      responded: true,
      respondedAt: "2025-01-22 14:20:15",
      templateUsed: "HSM Enterprise Premium",
      messageId: "MSG_006",
      cost: "R$ 0,25",
      channelProvider: "WhatsApp Enterprise API",
      userId: "user_303",
      userAgent: "Mobile WhatsApp Business",
      ipAddress: "192.168.1.105",
      country: "Brasil",
      region: "Santa Catarina",
      sentiment: "Muito Positivo",
      responseTime: "5 min",
      retryCount: 0,
      errorCode: null,
      errorMessage: null
    }
  ];

  const filteredDispatches = dispatches.filter(dispatch => {
    const matchesSearch = dispatch.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dispatch.campaign.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCampaign = selectedCampaign === "all" || dispatch.campaign === selectedCampaign;
    const matchesChannel = selectedChannel === "all" || dispatch.channel === selectedChannel;
    const matchesStatus = selectedStatus === "all" || dispatch.status === selectedStatus;
    
    return matchesSearch && matchesCampaign && matchesChannel && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Entregue":
        return <Badge variant="default" className="bg-success">Entregue</Badge>;
      case "Pendente":
        return <Badge variant="secondary">Pendente</Badge>;
      case "Falhou":
        return <Badge variant="destructive">Falhou</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Email":
        return <Mail className="h-4 w-4" />;
      case "SMS":
        return <MessageSquare className="h-4 w-4" />;
      case "WhatsApp":
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relatório de Disparos</h1>
            <p className="text-muted-foreground">Acompanhe todos os disparos de campanhas e suas métricas</p>
          </div>
          <div className="flex gap-2">
            <DateRangePicker />
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dispatchMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              subtitle={metric.change}
              icon={metric.icon}
            />
          ))}
        </div>

        {/* Filtros e Tabela */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <CardTitle>Histórico de Disparos</CardTitle>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por destinatário ou campanha..."
                    className="pl-10 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Todas as campanhas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as campanhas</SelectItem>
                    <SelectItem value="NPS SMS">NPS SMS</SelectItem>
                    <SelectItem value="NPS EMAIL">NPS EMAIL</SelectItem>
                    <SelectItem value="NPS MISTO">NPS MISTO</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Todos os canais" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os canais</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="Entregue">Entregue</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Falhou">Falhou</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Mensagem</TableHead>
                  <TableHead>Campanha</TableHead>
                  <TableHead>Canal/Provedor</TableHead>
                  <TableHead>Destinatário</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Enviado</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Custo</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Sentimento</TableHead>
                  <TableHead>Temp. Resposta</TableHead>
                  <TableHead>Tentativas</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDispatches.map((dispatch) => (
                  <TableRow key={dispatch.id}>
                    <TableCell className="font-mono text-xs">{dispatch.messageId}</TableCell>
                    <TableCell className="font-medium">{dispatch.campaign}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          {getChannelIcon(dispatch.channel)}
                          <span className="text-sm">{dispatch.channel}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{dispatch.channelProvider}</span>
                      </div>
                    </TableCell>
                    <TableCell>{dispatch.recipient}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-32 truncate">{dispatch.templateUsed}</TableCell>
                    <TableCell className="text-sm">{dispatch.sentAt}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {getStatusBadge(dispatch.status)}
                        {dispatch.errorCode && (
                          <Badge variant="destructive" className="text-xs">{dispatch.errorCode}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{dispatch.cost}</TableCell>
                    <TableCell className="text-sm">
                      <div className="flex flex-col">
                        <span>{dispatch.region}</span>
                        <span className="text-xs text-muted-foreground">{dispatch.country}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {dispatch.sentiment && (
                        <Badge 
                          variant={
                            dispatch.sentiment === "Muito Positivo" || dispatch.sentiment === "Positivo" 
                              ? "default" 
                              : dispatch.sentiment === "Negativo" 
                                ? "destructive" 
                                : "secondary"
                          }
                          className={
                            dispatch.sentiment === "Muito Positivo" 
                              ? "bg-success" 
                              : dispatch.sentiment === "Positivo"
                                ? "bg-success"
                                : ""
                          }
                        >
                          {dispatch.sentiment}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">{dispatch.responseTime || "-"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{dispatch.retryCount}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredDispatches.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum disparo encontrado com os filtros aplicados.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}