import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Brain, Key, Settings, Zap } from "lucide-react";
import Layout from "@/components/Layout";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function AISettings() {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [autoResponseEnabled, setAutoResponseEnabled] = useState(false);

  const recentCategorizations = [
    {
      id: 1,
      comment: "Excelente atendimento! Equipe muito prestativa.",
      predictedCategory: "Elogio",
      subcategory: "Atendimento",
      confidence: 95,
      sentiment: "Positivo"
    },
    {
      id: 2,
      comment: "Demora excessiva no suporte. Terceira vez que entro em contato.",
      predictedCategory: "Reclamação",
      subcategory: "Demora",
      confidence: 88,
      sentiment: "Negativo"
    },
    {
      id: 3,
      comment: "Poderia ter mais opções de pagamento.",
      predictedCategory: "Sugestão",
      subcategory: "Melhorias",
      confidence: 92,
      sentiment: "Neutro"
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configurações de IA</h1>
            <p className="text-muted-foreground">Configure integrações e automações de inteligência artificial</p>
          </div>
        </div>

        {/* API Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Configuração de APIs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-provider">Provedor de IA</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o provedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                    <SelectItem value="gemini">Google Gemini</SelectItem>
                    <SelectItem value="claude">Anthropic Claude</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key">Chave da API</Label>
                <Input 
                  id="api-key" 
                  type="password" 
                  placeholder="Insira sua chave da API" 
                />
              </div>
              
              <Button className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Salvar Configuração
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Status da IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Categorização Automática</h4>
                  <p className="text-sm text-muted-foreground">Ativa para todas as campanhas</p>
                </div>
                <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Respostas Automáticas</h4>
                  <p className="text-sm text-muted-foreground">Para detratores e reclamações</p>
                </div>
                <Switch checked={autoResponseEnabled} onCheckedChange={setAutoResponseEnabled} />
              </div>
              
              <div className="pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">91%</div>
                  <div className="text-sm text-muted-foreground">Precisão Média</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Auto Response Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Configuração de Respostas Automáticas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="response-trigger">Disparar para</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="detractors">Apenas Detratores (0-6)</SelectItem>
                    <SelectItem value="complaints">Reclamações</SelectItem>
                    <SelectItem value="both">Detratores e Reclamações</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="response-delay">Delay de Resposta (minutos)</Label>
                <Input id="response-delay" type="number" placeholder="Ex: 5" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="response-template">Template Base da Resposta</Label>
              <Textarea 
                id="response-template"
                placeholder="Olá [NOME], agradecemos seu feedback. Identificamos que você mencionou [CATEGORIA]..."
                className="h-20"
              />
            </div>
            
            <Button>
              Salvar Configurações de Resposta
            </Button>
          </CardContent>
        </Card>

        {/* AI Prompts Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Configuração de Prompts de IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="categorization-prompt">Prompt de Categorização</Label>
              <Textarea 
                id="categorization-prompt" 
                placeholder="Prompt para categorização automática..."
                rows={6}
                defaultValue="Analise a seguinte resposta do cliente: {resposta_cliente}. 
A nota atribuída foi: {nota}.
A campanha é: {campanha}.
Com base no contexto e nas categorias disponíveis: {categorias_existentes}, 
classifique esta resposta na categoria mais apropriada e explique o motivo."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="response-prompt">Prompt de Resposta Automática</Label>
              <Textarea 
                id="response-prompt" 
                placeholder="Prompt para geração de respostas automáticas..."
                rows={6}
                defaultValue="Com base na resposta do cliente: {resposta_cliente}
Nota: {nota}
Campanha: {campanha}
Categoria identificada: {categoria}
Gere uma resposta personalizada e empática que aborde os pontos específicos mencionados pelo cliente."
              />
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Variáveis Disponíveis:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div>• {'{resposta_cliente}'} - Resposta do cliente</div>
                <div>• {'{nota}'} - Nota atribuída</div>
                <div>• {'{campanha}'} - Nome da campanha</div>
                <div>• {'{categoria}'} - Categoria identificada</div>
                <div>• {'{categorias_existentes}'} - Lista de categorias</div>
                <div>• {'{nome_cliente}'} - Nome do cliente</div>
              </div>
            </div>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Salvar Prompts
            </Button>
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
                      <Badge variant="outline">{item.subcategory}</Badge>
                      <Badge variant={
                        item.sentiment === "Positivo" ? "default" :
                        item.sentiment === "Negativo" ? "destructive" : "secondary"
                      }>
                        {item.sentiment}
                      </Badge>
                    </div>
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