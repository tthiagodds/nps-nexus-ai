import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, MessageSquare, Tag, Send, Filter } from "lucide-react";
import Layout from "@/components/Layout";

export default function Opinions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOpinion, setSelectedOpinion] = useState<any>(null);
  const [response, setResponse] = useState("");

  const opinions = [
    {
      id: 1,
      score: 9,
      customer: "Maria Silva",
      email: "maria@email.com",
      comment: "Excelente atendimento! Equipe muito prestativa e produto de alta qualidade.",
      campaign: "NPS Email",
      date: "22/01/2025",
      status: "Não respondida",
      category: "Elogio",
      sentiment: "Positivo"
    },
    {
      id: 2,
      score: 3,
      customer: "João Santos",
      email: "joao@email.com",
      comment: "Demora excessiva no suporte. Já é a terceira vez que entro em contato.",
      campaign: "NPS SMS",
      date: "21/01/2025",
      status: "Respondida",
      category: "Reclamação",
      sentiment: "Negativo"
    },
    {
      id: 3,
      score: 7,
      customer: "Ana Costa",
      email: "ana@email.com",
      comment: "Produto bom, mas poderia melhorar o processo de entrega.",
      campaign: "NPS Misto",
      date: "20/01/2025",
      status: "Não respondida",
      category: "Sugestão",
      sentiment: "Neutro"
    },
    {
      id: 4,
      score: 10,
      customer: "Pedro Oliveira",
      email: "pedro@email.com",
      comment: "Simplesmente perfeito! Recomendo para todos.",
      campaign: "NPS Email",
      date: "19/01/2025",
      status: "Respondida",
      category: "Elogio",
      sentiment: "Positivo"
    }
  ];

  const filteredOpinions = opinions.filter(opinion =>
    opinion.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opinion.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRespond = (opinion: any) => {
    setSelectedOpinion(opinion);
    setResponse("");
  };

  const sendResponse = () => {
    // Simulate sending response
    console.log("Sending response:", response);
    setSelectedOpinion(null);
    setResponse("");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Opiniões dos Clientes</h1>
            <p className="text-muted-foreground">Gerencie e responda aos feedbacks recebidos</p>
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">156</div>
              <div className="text-sm text-muted-foreground">Total de Opiniões</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">89</div>
              <div className="text-sm text-muted-foreground">Positivas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-destructive">23</div>
              <div className="text-sm text-muted-foreground">Negativas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">44</div>
              <div className="text-sm text-muted-foreground">Neutras</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Todas as Opiniões</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar opiniões..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOpinions.map((opinion) => (
                <div key={opinion.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant={opinion.score >= 9 ? "default" : opinion.score >= 7 ? "secondary" : "destructive"}>
                        {opinion.score}
                      </Badge>
                      <div>
                        <h4 className="font-semibold">{opinion.customer}</h4>
                        <p className="text-sm text-muted-foreground">{opinion.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{opinion.date}</div>
                      <Badge variant="outline" className="mt-1">{opinion.campaign}</Badge>
                    </div>
                  </div>
                  
                  <p className="text-foreground mb-3">{opinion.comment}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Badge variant="outline">
                        <Tag className="h-3 w-3 mr-1" />
                        {opinion.category}
                      </Badge>
                      <Badge variant={
                        opinion.sentiment === "Positivo" ? "default" :
                        opinion.sentiment === "Negativo" ? "destructive" : "secondary"
                      }>
                        {opinion.sentiment}
                      </Badge>
                      <Badge variant={opinion.status === "Respondida" ? "default" : "outline"}>
                        {opinion.status}
                      </Badge>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant={opinion.status === "Respondida" ? "outline" : "default"}
                          onClick={() => handleRespond(opinion)}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {opinion.status === "Respondida" ? "Ver Resposta" : "Responder"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Responder para {opinion.customer}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-sm font-medium">Comentário original:</p>
                            <p className="text-sm mt-1">{opinion.comment}</p>
                          </div>
                          <div>
                            <Textarea
                              placeholder="Digite sua resposta..."
                              value={response}
                              onChange={(e) => setResponse(e.target.value)}
                              rows={4}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Select>
                              <SelectTrigger className="w-48">
                                <SelectValue placeholder="Template de resposta" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="thanks">Agradecimento</SelectItem>
                                <SelectItem value="apology">Pedido de desculpas</SelectItem>
                                <SelectItem value="follow-up">Acompanhamento</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button onClick={sendResponse} className="ml-auto">
                              <Send className="h-4 w-4 mr-2" />
                              Enviar Resposta
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}