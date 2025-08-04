import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Brain, Zap, Settings, TrendingUp, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";

export default function AICategorization() {
  const [autoCategorizationEnabled, setAutoCategorizationEnabled] = useState(true);

  const categories = [
    { name: "Elogio", count: 89, color: "bg-success", accuracy: 94 },
    { name: "Reclamação", count: 23, color: "bg-destructive", accuracy: 92 },
    { name: "Sugestão", count: 44, color: "bg-warning", accuracy: 88 },
    { name: "Dúvida", count: 12, color: "bg-neutral", accuracy: 91 },
    { name: "Solicitação", count: 8, color: "bg-primary", accuracy: 87 }
  ];

  const recentCategorizations = [
    {
      id: 1,
      comment: "Excelente atendimento! Equipe muito prestativa.",
      predictedCategory: "Elogio",
      confidence: 95,
      sentiment: "Positivo",
      keywords: ["excelente", "prestativa", "atendimento"]
    },
    {
      id: 2,
      comment: "Demora excessiva no suporte. Terceira vez que entro em contato.",
      predictedCategory: "Reclamação",
      confidence: 88,
      sentiment: "Negativo",
      keywords: ["demora", "suporte", "terceira vez"]
    },
    {
      id: 3,
      comment: "Poderia ter mais opções de pagamento.",
      predictedCategory: "Sugestão",
      confidence: 92,
      sentiment: "Neutro",
      keywords: ["poderia", "opções", "pagamento"]
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Categorização com IA</h1>
            <p className="text-muted-foreground">Sistema inteligente para classificação automática de feedbacks</p>
          </div>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Configurar IA
          </Button>
        </div>

        {/* AI Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Categorização Automática</h3>
                  <p className="text-sm text-muted-foreground">Sistema ativo</p>
                </div>
                <Switch 
                  checked={autoCategorizationEnabled}
                  onCheckedChange={setAutoCategorizationEnabled}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Brain className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">91%</div>
                  <div className="text-sm text-muted-foreground">Precisão Média</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-warning" />
                <div>
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-muted-foreground">Processados hoje</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 ${category.color} rounded-full`}></div>
                    <div>
                      <h4 className="font-semibold">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">{category.count} feedbacks</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{category.accuracy}% precisão</div>
                      <Progress value={category.accuracy} className="w-24 h-2" />
                    </div>
                    {category.accuracy < 90 && (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Categorizations */}
        <Card>
          <CardHeader>
            <CardTitle>Categorizações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCategorizations.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-foreground flex-1 mr-4">{item.comment}</p>
                    <Badge variant={item.confidence >= 90 ? "default" : "secondary"}>
                      {item.confidence}% confiança
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Badge variant="outline">{item.predictedCategory}</Badge>
                      <Badge variant={
                        item.sentiment === "Positivo" ? "default" :
                        item.sentiment === "Negativo" ? "destructive" : "secondary"
                      }>
                        {item.sentiment}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-1">
                      {item.keywords.map((keyword, idx) => (
                        <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Training Section */}
        <Card>
          <CardHeader>
            <CardTitle>Treinamento do Modelo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Status do Treinamento</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Dados de treinamento</span>
                    <span>2.847 feedbacks</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Última atualização</span>
                    <span>15/01/2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Próximo treinamento</span>
                    <span>01/02/2025</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Retreinar Modelo
                </Button>
                <Button variant="outline" className="w-full">
                  Validar Categorizações
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}