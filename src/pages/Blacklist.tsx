import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserX, Plus, Trash2, Search, Upload, Download } from "lucide-react";
import Layout from "@/components/Layout";
import { ConfirmModal } from "@/components/ConfirmModal";

export default function Blacklist() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  const blacklistEntries = [
    { id: 1, type: "CPF", value: "123.456.789-00", reason: "Solicitação do cliente", addedAt: "2024-01-15", addedBy: "Admin" },
    { id: 2, type: "Email", value: "cliente@email.com", reason: "Reclamação", addedAt: "2024-01-14", addedBy: "João Silva" },
    { id: 3, type: "Telefone", value: "+55 11 99999-9999", reason: "Número inválido", addedAt: "2024-01-13", addedBy: "Admin" },
  ];

  const handleDelete = (entry: any) => {
    setSelectedEntry(entry);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deletando entrada:', selectedEntry);
    setShowDeleteModal(false);
    setSelectedEntry(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blacklist</h1>
          <p className="text-muted-foreground">Gerencie clientes que não devem receber disparos</p>
        </div>

        <Tabs defaultValue="manage" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Gerenciar Blacklist</TabsTrigger>
            <TabsTrigger value="add">Adicionar Entrada</TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Adicionar à Blacklist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="blacklist-type">Tipo de Identificador</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cpf">CPF</SelectItem>
                        <SelectItem value="email">E-mail</SelectItem>
                        <SelectItem value="phone">Telefone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blacklist-value">Valor</Label>
                    <Input id="blacklist-value" placeholder="Digite o CPF, e-mail ou telefone" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blacklist-reason">Motivo</Label>
                  <Input id="blacklist-reason" placeholder="Motivo da inclusão na blacklist" />
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar à Blacklist
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Importar Lista
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <UserX className="h-5 w-5" />
                    Entradas na Blacklist
                  </CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Buscar..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Motivo</TableHead>
                      <TableHead>Adicionado em</TableHead>
                      <TableHead>Adicionado por</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blacklistEntries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <Badge variant="outline">{entry.type}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{entry.value}</TableCell>
                        <TableCell>{entry.reason}</TableCell>
                        <TableCell>{entry.addedAt}</TableCell>
                        <TableCell>{entry.addedBy}</TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(entry)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ConfirmModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        onConfirm={confirmDelete}
        title="Remover da Blacklist"
        description={`Tem certeza que deseja remover "${selectedEntry?.value}" da blacklist?`}
        confirmText="Remover"
        variant="destructive"
      />
    </Layout>
  );
}