import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Upload, Users, Calendar, MessageSquare } from "lucide-react";
import Layout from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HSMDispatchModal } from "@/components/HSMDispatchModal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Dispatches() {
  const [showDispatchForm, setShowDispatchForm] = useState(false);
  const [showHSMDispatch, setShowHSMDispatch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatches = [
    {
      id: 1,
      name: "Disparo Manual - Janeiro",
      campaign: "NPS SMS",
      contacts: 150,
      sent: 150,
      responses: 45,
      status: "Finalizado",
      date: "15/01/2025"
    },
    {
      id: 2,
      name: "Disparo Urgente - Feedback",
      campaign: "NPS EMAIL",
      contacts: 80,
      sent: 80,
      responses: 12,
      status: "Em andamento",
      date: "22/01/2025"
    }
  ];

  const campaigns = [
    { id: 1, name: "NPS SMS" },
    { id: 2, name: "NPS EMAIL" },
    { id: 3, name: "NPS MISTO" }
  ];

  const templates = [
    { id: 1, name: "Confirmação de Pedido" },
    { id: 2, name: "Atualização de Rastreio" },
    { id: 3, name: "Pesquisa de Satisfação" }
  ];

  const availableFields = [
    { name: 'nome_cliente', label: 'Nome do Cliente', type: 'text' as const },
    { name: 'numero_pedido', label: 'Número do Pedido', type: 'text' as const },
    { name: 'valor_pedido', label: 'Valor do Pedido', type: 'currency' as const }
  ];

  const filteredDispatches = dispatches.filter(dispatch =>
    dispatch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Disparos</h1>
            <p className="text-muted-foreground">Gerencie disparos avulsos de pesquisas NPS</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showDispatchForm} onOpenChange={setShowDispatchForm}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Disparo Manual
                </Button>
              </DialogTrigger>
            </Dialog>
            
            <Button variant="outline" onClick={() => setShowHSMDispatch(true)}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Disparo HSM
            </Button>
          </div>
          
          <Dialog open={showDispatchForm} onOpenChange={setShowDispatchForm}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Novo Disparo Manual</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dispatch-name">Nome do Disparo</Label>
                    <Input id="dispatch-name" placeholder="Ex: Disparo Janeiro 2025" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="campaign-select">Campanha</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma campanha" />
                      </SelectTrigger>
                      <SelectContent>
                        {campaigns.map(campaign => (
                          <SelectItem key={campaign.id} value={campaign.id.toString()}>
                            {campaign.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Campos obrigatórios para disparo manual */}
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Campos Obrigatórios</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome-cliente">Nome do Cliente *</Label>
                      <Input id="nome-cliente" placeholder="Nome completo do cliente" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="identificador-cliente">Identificador do Cliente *</Label>
                      <Input id="identificador-cliente" placeholder="CPF, ID ou código único" required />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Contatos</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col">
                      <Upload className="h-6 w-6 mb-2" />
                      Upload de Planilha
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col">
                      <Users className="h-6 w-6 mb-2" />
                      Inclusão Manual
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quarantine">Quarentena (dias)</Label>
                    <Input id="quarantine" type="number" placeholder="Ex: 30" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reminder">Reminder (dias)</Label>
                    <Input id="reminder" type="number" placeholder="Ex: 7" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea id="notes" placeholder="Observações sobre o disparo..." />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowDispatchForm(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setShowDispatchForm(false)}>
                    Criar Disparo
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* HSM Dispatch Modal */}
        <HSMDispatchModal
          open={showHSMDispatch}
          onOpenChange={setShowHSMDispatch}
          templates={templates}
          availableFields={availableFields}
        />

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Histórico de Disparos</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar disparos..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDispatches.map((dispatch) => (
                <div key={dispatch.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold">{dispatch.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{dispatch.campaign}</Badge>
                        <Badge variant={dispatch.status === "Finalizado" ? "default" : "secondary"}>
                          {dispatch.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{dispatch.contacts}</div>
                      <div className="text-xs text-muted-foreground">Contatos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{dispatch.sent}</div>
                      <div className="text-xs text-muted-foreground">Enviados</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{dispatch.responses}</div>
                      <div className="text-xs text-muted-foreground">Respostas</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Data: {dispatch.date}</div>
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