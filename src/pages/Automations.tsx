import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Workflow, Plus, Play, Pause, Edit, Trash2, Database, MessageSquare, Settings } from "lucide-react";
import Layout from "@/components/Layout";
import { HSMTemplateEditor } from "@/components/HSMTemplateEditor";

export default function Automations() {
  const [showHSMEditor, setShowHSMEditor] = useState(false);
  const [selectedVisualization, setSelectedVisualization] = useState('');

  // Mock data for visualizations from Database module
  const visualizations = [
    { id: 'view_1', name: 'Clientes Ativos', records: 8300 },
    { id: 'view_2', name: 'Pedidos Entregues', records: 7200 },
    { id: 'view_3', name: 'Tickets Resolvidos', records: 450 },
    { id: 'view_4', name: 'Clientes Premium', records: 1250 },
    { id: 'view_5', name: 'Primeira Compra', records: 3400 }
  ];

  // Mock available fields for HSM mapping
  const availableFields = [
    { name: 'nome_cliente', label: 'Nome do Cliente', type: 'text' as const },
    { name: 'email', label: 'Email', type: 'text' as const },
    { name: 'numero_pedido', label: 'Número do Pedido', type: 'text' as const },
    { name: 'valor_pedido', label: 'Valor do Pedido', type: 'currency' as const },
    { name: 'data_entrega', label: 'Data de Entrega', type: 'date' as const },
    { name: 'categoria', label: 'Categoria do Cliente', type: 'text' as const },
    { name: 'desconto', label: 'Percentual de Desconto', type: 'number' as const },
  ];

  const automations = [
    {
      id: 1,
      name: "NPS Baixo - Recuperação",
      trigger: "NPS < 7",
      action: "Enviar HSM Template: Recuperação",
      status: "Ativo",
      executions: 127,
      lastRun: "Há 2 horas",
    },
    {
      id: 2,
      name: "Pedido Entregue - Pesquisa",
      trigger: "Status = 'entregue'",
      action: "Enviar Pesquisa NPS",
      status: "Ativo",
      executions: 1543,
      lastRun: "Há 15 min",
    },
    {
      id: 3,
      name: "Cliente Premium - Boas Vindas",
      trigger: "Categoria = 'premium'",
      action: "Enviar HSM Template: Welcome Premium",
      status: "Pausado",
      executions: 45,
      lastRun: "Há 1 dia",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Automações</h1>
            <p className="text-muted-foreground">Configure automações baseadas nos dados da base</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Automação
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Nova Automação</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Informações Básicas */}
                <div className="space-y-4">
                  <h3 className="font-medium">Informações Básicas</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="automation-name">Nome da Automação</Label>
                      <Input id="automation-name" placeholder="Ex: NPS Baixo - Recuperação" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="automation-description">Descrição</Label>
                      <Input id="automation-description" placeholder="Descrição opcional" />
                    </div>
                  </div>
                </div>

                {/* Visualização Base */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Visualização Base
                  </h3>
                  <div className="space-y-2">
                    <Label>Selecione a visualização que será monitorada</Label>
                    <Select value={selectedVisualization} onValueChange={setSelectedVisualization}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha uma visualização da base de dados" />
                      </SelectTrigger>
                      <SelectContent>
                        {visualizations.map(view => (
                          <SelectItem key={view.id} value={view.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{view.name}</span>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {view.records.toLocaleString()} registros
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      A automação será aplicada aos dados desta visualização
                    </p>
                  </div>
                </div>

                {/* Gatilhos */}
                {selectedVisualization && (
                  <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Gatilhos (Condições)
                    </h3>
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="grid grid-cols-3 gap-2">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Campo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nps_score">Score NPS</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                            <SelectItem value="categoria">Categoria</SelectItem>
                            <SelectItem value="valor_pedido">Valor do Pedido</SelectItem>
                            <SelectItem value="data_entrega">Data de Entrega</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Operador" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="eq">=</SelectItem>
                            <SelectItem value="ne">≠</SelectItem>
                            <SelectItem value="gt">&gt;</SelectItem>
                            <SelectItem value="lt">&lt;</SelectItem>
                            <SelectItem value="gte">≥</SelectItem>
                            <SelectItem value="lte">≤</SelectItem>
                            <SelectItem value="contains">Contém</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input placeholder="Valor" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">E (AND)</Button>
                        <Button variant="outline" size="sm">OU (OR)</Button>
                        <Button variant="outline" size="sm">+ Condição</Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ações */}
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Ações
                  </h3>
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tipo de Ação</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a ação" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="send_hsm">Enviar HSM Template</SelectItem>
                            <SelectItem value="send_survey">Enviar Pesquisa NPS</SelectItem>
                            <SelectItem value="send_email">Enviar Email</SelectItem>
                            <SelectItem value="send_sms">Enviar SMS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                        <div className="space-y-2">
                          <Label>Template HSM</Label>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o template" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="recovery">Recuperação NPS</SelectItem>
                                <SelectItem value="welcome_premium">Welcome Premium</SelectItem>
                                <SelectItem value="delivery_confirmation">Confirmação de Entrega</SelectItem>
                                <SelectItem value="birthday">Aniversário</SelectItem>
                               </SelectContent>
                               </Select>
                             </div>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setShowHSMEditor(true)}
                              disabled={!selectedVisualization}
                            >
                              <Settings className="h-4 w-4 mr-2" />
                              Configurar Variáveis
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Configure as variáveis dinâmicas do template HSM
                          </p>
                        </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Variáveis Dinâmicas</Label>
                       <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">{"{{nome_cliente}}"}</Button>
                        <Button variant="outline" size="sm">{"{{numero_pedido}}"}</Button>
                        <Button variant="outline" size="sm">{"{{valor_pedido}}"}</Button>
                        <Button variant="outline" size="sm">{"{{data_entrega}}"}</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full"
                  disabled={!selectedVisualization}
                >
                  Criar Automação
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* HSM Template Editor */}
        <HSMTemplateEditor
          open={showHSMEditor}
          onOpenChange={setShowHSMEditor}
          availableFields={availableFields}
          onSave={(templateId, mappings) => {
            console.log('HSM Template configurado:', { templateId, mappings });
            setShowHSMEditor(false);
          }}
        />

        {/* Lista de Automações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Workflow className="h-5 w-5" />
              Automações Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automations.map((automation) => (
                <div key={automation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Workflow className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{automation.name}</p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Gatilho:</strong> {automation.trigger}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Ação:</strong> {automation.action}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant={automation.status === "Ativo" ? "default" : "secondary"}>
                        {automation.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {automation.executions} execuções
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {automation.lastRun}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        {automation.status === "Ativo" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => {
                        console.log('Editando automação:', automation.id);
                      }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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