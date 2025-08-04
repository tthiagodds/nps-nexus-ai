import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, FolderPlus } from "lucide-react";
import Layout from "@/components/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function OpinionSettings() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showSubcategoryForm, setShowSubcategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const categories = [
    {
      id: 1,
      name: "Elogio",
      color: "bg-success",
      subcategories: [
        { id: 1, name: "Atendimento", count: 45 },
        { id: 2, name: "Produto", count: 32 },
        { id: 3, name: "Rapidez", count: 18 }
      ]
    },
    {
      id: 2,
      name: "Reclamação",
      color: "bg-destructive",
      subcategories: [
        { id: 4, name: "Demora", count: 23 },
        { id: 5, name: "Atendimento Ruim", count: 15 },
        { id: 6, name: "Produto Defeituoso", count: 8 }
      ]
    },
    {
      id: 3,
      name: "Sugestão",
      color: "bg-warning",
      subcategories: [
        { id: 7, name: "Melhorias", count: 12 },
        { id: 8, name: "Novos Produtos", count: 9 }
      ]
    }
  ];

  const addSubcategory = (categoryId: number) => {
    setSelectedCategory(categories.find(c => c.id === categoryId));
    setShowSubcategoryForm(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Configurações de Opiniões</h1>
            <p className="text-muted-foreground">Gerencie categorias e subcategorias para classificação de feedbacks</p>
          </div>
          <Dialog open={showCategoryForm} onOpenChange={setShowCategoryForm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Categoria
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Categoria</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category-name">Nome da Categoria</Label>
                  <Input id="category-name" placeholder="Ex: Elogio, Reclamação, Sugestão" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category-color">Cor</Label>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-success rounded cursor-pointer border-2 border-transparent hover:border-foreground"></div>
                    <div className="w-8 h-8 bg-destructive rounded cursor-pointer border-2 border-transparent hover:border-foreground"></div>
                    <div className="w-8 h-8 bg-warning rounded cursor-pointer border-2 border-transparent hover:border-foreground"></div>
                    <div className="w-8 h-8 bg-primary rounded cursor-pointer border-2 border-transparent hover:border-foreground"></div>
                    <div className="w-8 h-8 bg-secondary rounded cursor-pointer border-2 border-transparent hover:border-foreground"></div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowCategoryForm(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setShowCategoryForm(false)}>
                    Criar Categoria
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${category.color} rounded-full`}></div>
                    <CardTitle>{category.name}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => addSubcategory(category.id)}
                    >
                      <FolderPlus className="h-4 w-4 mr-2" />
                      Subcategoria
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Subcategorias:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.map((sub) => (
                      <div key={sub.id} className="flex items-center gap-2 bg-muted rounded-lg p-2">
                        <span className="text-sm">{sub.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {sub.count}
                        </Badge>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subcategory Form Dialog */}
        <Dialog open={showSubcategoryForm} onOpenChange={setShowSubcategoryForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Nova Subcategoria - {selectedCategory?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subcategory-name">Nome da Subcategoria</Label>
                <Input id="subcategory-name" placeholder="Ex: Atendimento, Produto, Rapidez" />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowSubcategoryForm(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setShowSubcategoryForm(false)}>
                  Criar Subcategoria
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}