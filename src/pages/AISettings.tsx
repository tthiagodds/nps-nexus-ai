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

        {/* AI Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Configuração de IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Categorization Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Categorização Automática</h4>
                  <p className="text-sm text-muted-foreground">Categoriza automaticamente todas as respostas</p>
                </div>
                <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
              </div>

              {aiEnabled && (
                <div className="space-y-4 ml-4 border-l-2 border-primary pl-4">
                  <div className="space-y-2">
                    <Label htmlFor="categorization-prompt">Prompt de Categorização</Label>
                    <Textarea 
                      id="categorization-prompt" 
                      placeholder="Configure como a IA deve categorizar as respostas..."
                      rows={4}
                      defaultValue="Analise a resposta: '{resposta_cliente}' com nota {nota} da campanha '{campanha}'. Classifique nas categorias: {categorias_existentes}. Retorne: categoria, subcategoria, sentimento e justificativa."
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="confidence-threshold">Limite de Confiança (%)</Label>
                      <Input id="confidence-threshold" type="number" placeholder="85" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="review-threshold">Revisar Manualmente Abaixo de (%)</Label>
                      <Input id="review-threshold" type="number" placeholder="70" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Auto Response Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold">Respostas Automáticas</h4>
                  <p className="text-sm text-muted-foreground">Gera e envia respostas automáticas personalizadas</p>
                </div>
                <Switch checked={autoResponseEnabled} onCheckedChange={setAutoResponseEnabled} />
              </div>

              {autoResponseEnabled && (
                <div className="space-y-4 ml-4 border-l-2 border-secondary pl-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="response-trigger">Disparar Para</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="detractors">Apenas Detratores (0-6)</SelectItem>
                          <SelectItem value="complaints">Reclamações Identificadas</SelectItem>
                          <SelectItem value="negative">Sentimento Negativo</SelectItem>
                          <SelectItem value="all">Todas as Respostas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="response-delay">Delay (minutos)</Label>
                      <Input id="response-delay" type="number" placeholder="5" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="response-channel">Canal de Resposta</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Mesmo canal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="same">Mesmo Canal da Pesquisa</SelectItem>
                          <SelectItem value="email">Sempre Email</SelectItem>
                          <SelectItem value="whatsapp">Sempre WhatsApp</SelectItem>
                          <SelectItem value="sms">Sempre SMS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="response-prompt">Prompt para Geração de Resposta</Label>
                    <Textarea 
                      id="response-prompt" 
                      placeholder="Configure como a IA deve gerar as respostas..."
                      rows={4}
                      defaultValue="Baseado na resposta '{resposta_cliente}' (nota: {nota}, categoria: {categoria}) da campanha '{campanha}', gere uma resposta empática e personalizada que: 1) Agradeça o feedback, 2) Aborde os pontos específicos mencionados, 3) Ofereça uma solução ou próximos passos quando apropriado."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tone">Tom da Resposta</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Profissional" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Profissional</SelectItem>
                          <SelectItem value="friendly">Amigável</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="max-length">Tamanho Máximo (caracteres)</Label>
                      <Input id="max-length" type="number" placeholder="500" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Advanced Settings */}
            <div className="space-y-4">
              <h4 className="font-semibold border-b pb-2">Configurações Avançadas</h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="model-temperature">Criatividade da IA (0-1)</Label>
                  <Input id="model-temperature" type="number" step="0.1" placeholder="0.7" />
                  <p className="text-xs text-muted-foreground">0 = mais conservador, 1 = mais criativo</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="batch-processing">Processamento em Lote</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Ativado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Ativado</SelectItem>
                      <SelectItem value="disabled">Desativado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h5 className="font-medium mb-2">Variáveis Disponíveis:</h5>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div>• {'{resposta_cliente}'}</div>
                  <div>• {'{nota}'}</div>
                  <div>• {'{campanha}'}</div>
                  <div>• {'{categoria}'}</div>
                  <div>• {'{categorias_existentes}'}</div>
                  <div>• {'{nome_cliente}'}</div>
                  <div>• {'{canal_origem}'}</div>
                  <div>• {'{data_resposta}'}</div>
                  <div>• {'{empresa}'}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
              <Button variant="outline">
                Testar Configuração
              </Button>
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