import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Play, Pause, BarChart3 } from "lucide-react";
import Layout from "@/components/Layout";
import { CampaignForm } from "@/components/CampaignForm";

export default function Campaigns() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const campaigns = [
    {
      id: 1,
      name: "NPS SMS",
      type: "SMS",
      status: "Ativa",
      responses: 45,
      nps: 54,
      created: "15/01/2025",
      lastSent: "21/01/2025"
    },
    {
      id: 2,
      name: "NPS EMAIL",
      type: "Email",
      status: "Pausada",
      responses: 128,
      nps: 49,
      created: "10/01/2025",
      lastSent: "20/01/2025"
    },
    {
      id: 3,
      name: "NPS MISTO",
      type: "Misto",
      status: "Ativa",
      responses: 76,
      nps: 57,
      created: "12/01/2025",
      lastSent: "22/01/2025"
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewCampaign = () => {
    setSelectedCampaign(null);
    setFormMode('create');
    setShowCampaignForm(true);
  };

  const handleEditCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setFormMode('edit');
    setShowCampaignForm(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Campanhas NPS</h1>
            <p className="text-muted-foreground">Gerencie suas campanhas de pesquisa de satisfação</p>
          </div>
          <Button onClick={handleNewCampaign}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Campanha
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Suas Campanhas</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar campanhas..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCampaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{campaign.type}</Badge>
                        <Badge variant={campaign.status === "Ativa" ? "default" : "secondary"}>
                          {campaign.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{campaign.responses}</div>
                      <div className="text-xs text-muted-foreground">Respostas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{campaign.nps}</div>
                      <div className="text-xs text-muted-foreground">Score NPS</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Criada: {campaign.created}</div>
                      <div className="text-sm text-muted-foreground">Último envio: {campaign.lastSent}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEditCampaign(campaign)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        {campaign.status === "Ativa" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button size="sm" variant="outline">
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

      <CampaignForm
        open={showCampaignForm}
        onOpenChange={setShowCampaignForm}
        campaign={selectedCampaign}
        mode={formMode}
      />
    </Layout>
  );
}