import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Loader2, Trash2, MessageSquare, PencilIcon, Plus } from "lucide-react";
import MessagesDialog from "@/components/sections/MenssagesDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ProjectImageUploader from "./ProjectImageUploader";

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  coverImage: string;
  featured: boolean;
  description?: string;
  client?: string;
  location?: string;
  detailedDescription?: string;
  images: string[];
  tags: string[];
}

const CATEGORIES = [
  "Residencial",
  "Comercial",
  "Institucional",
  "Corporativo",
  "Interior",
  "Restauro",
  "Urbanismo"
];

const AdminProjects = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:4000/projects');
        if (!response.ok) {
          throw new Error('Erro ao buscar projetos');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os projetos. Tente novamente mais tarde.",
          variant: "destructive",
        });
        
        // Fallback para dados locais se o servidor não estiver disponível
        const localProjects = localStorage.getItem('projects');
        if (localProjects) {
          setProjects(JSON.parse(localProjects));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [toast]);

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "",
      category: "Residencial",
      year: new Date().getFullYear().toString(),
      coverImage: "",
      featured: false,
      description: "",
      client: "",
      location: "",
      detailedDescription: "",
      images: [],
      tags: []
    };
    
    setEditingProject(newProject);
    setIsEditDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject({...project});
    setIsEditDialogOpen(true);
  };

  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;
    
    try {
      const response = await fetch(`http://localhost:4000/projects/${projectToDelete.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Erro ao excluir projeto');
      }
      
      setProjects(projects.filter(project => project.id !== projectToDelete.id));
      
      // Atualizar cache local
      localStorage.setItem('projects', JSON.stringify(
        projects.filter(project => project.id !== projectToDelete.id)
      ));
      
      toast({
        description: "Projeto excluído com sucesso",
      });
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
      
      // Excluir localmente em caso de erro com o servidor
      setProjects(projects.filter(project => project.id !== projectToDelete.id));
      
      // Atualizar cache local
      localStorage.setItem('projects', JSON.stringify(
        projects.filter(project => project.id !== projectToDelete.id)
      ));
      
      toast({
        description: "Projeto excluído localmente (modo offline)",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleSaveProject = async () => {
    if (!editingProject) return;
    
    // Validação básica
    if (!editingProject.title.trim()) {
      toast({
        title: "Erro",
        description: "O título do projeto é obrigatório",
        variant: "destructive",
      });
      return;
    }
    
    // Se for um novo projeto
    const isNewProject = !projects.some(p => p.id === editingProject.id);
    
    try {
      if (isNewProject) {
        // Adicionar projeto
        const response = await fetch('http://localhost:4000/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingProject),
        });
        
        if (!response.ok) {
          throw new Error('Erro ao adicionar projeto');
        }
        
        const savedProject = await response.json();
        setProjects([...projects, savedProject]);
        
        toast({
          description: "Projeto adicionado com sucesso",
        });
      } else {
        // Atualizar projeto
        const response = await fetch(`http://localhost:4000/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingProject),
        });
        
        if (!response.ok) {
          throw new Error('Erro ao atualizar projeto');
        }
        
        const updatedProject = await response.json();
        setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
        
        toast({
          description: "Projeto atualizado com sucesso",
        });
      }
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
      
      // Fallback para armazenamento local
      if (isNewProject) {
        const updatedProjects = [...projects, editingProject];
        setProjects(updatedProjects);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
      } else {
        const updatedProjects = projects.map(p => p.id === editingProject.id ? editingProject : p);
        setProjects(updatedProjects);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
      }
      
      toast({
        description: "Projeto salvo localmente (modo offline)",
      });
    } finally {
      setIsEditDialogOpen(false);
      setEditingProject(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingProject) return;
    
    const { name, value } = e.target;
    setEditingProject(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSelectChange = (name: string, value: string) => {
    if (!editingProject) return;
    setEditingProject(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (!editingProject) return;
    setEditingProject(prev => prev ? { ...prev, [name]: checked } : null);
  };
  
  const handleImagesChange = (images: string[]) => {
    if (!editingProject) return;
    setEditingProject(prev => prev ? { ...prev, images } : null);
  };
  
  const handleCoverImageChange = (coverImage: string) => {
    if (!editingProject) return;
    setEditingProject(prev => prev ? { ...prev, coverImage } : null);
  };

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Gerenciar Projetos</h3>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsMessagesOpen(true)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Mensagens
              </Button>
              <Button onClick={handleAddProject}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Projeto
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <p>Nenhum projeto adicionado ainda.</p>
              <p className="text-sm">Clique em "Adicionar Projeto" para começar.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Ano</TableHead>
                  <TableHead>Destaque</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell>{project.year}</TableCell>
                    <TableCell>{project.featured ? "Sim" : "Não"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProject(project)}
                          title="Editar projeto"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProject(project)}
                          title="Excluir projeto"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Diálogo de Edição de Projeto */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject && projects.some(p => p.id === editingProject.id)
                ? "Editar Projeto"
                : "Adicionar Projeto"}
            </DialogTitle>
            <DialogDescription>
              Preencha os detalhes do projeto abaixo.
            </DialogDescription>
          </DialogHeader>
          
          {editingProject && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={editingProject.title}
                    onChange={handleInputChange}
                    placeholder="Nome do projeto"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select
                    value={editingProject.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="year">Ano</Label>
                  <Input
                    id="year"
                    name="year"
                    value={editingProject.year}
                    onChange={handleInputChange}
                    placeholder="2023"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="client">Cliente</Label>
                  <Input
                    id="client"
                    name="client"
                    value={editingProject.client || ""}
                    onChange={handleInputChange}
                    placeholder="Nome do cliente"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    name="location"
                    value={editingProject.location || ""}
                    onChange={handleInputChange}
                    placeholder="Cidade, Estado"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição Resumida *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={editingProject.description || ""}
                    onChange={handleInputChange}
                    placeholder="Breve descrição do projeto"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="detailedDescription">Descrição Detalhada</Label>
                  <Textarea
                    id="detailedDescription"
                    name="detailedDescription"
                    value={editingProject.detailedDescription || ""}
                    onChange={handleInputChange}
                    placeholder="Descrição completa do projeto"
                    rows={5}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={editingProject.featured}
                    onCheckedChange={(checked) => handleCheckboxChange("featured", checked === true)}
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Destacar este projeto na página inicial
                  </Label>
                </div>
              </div>
              
              <div className="space-y-4">
                <ProjectImageUploader
                  images={editingProject.images || []}
                  coverImage={editingProject.coverImage || ""}
                  onImagesChange={handleImagesChange}
                  onCoverImageChange={handleCoverImageChange}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveProject}>
              Salvar Projeto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo de confirmação de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o projeto "{projectToDelete?.title}"?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDeleteProject}>
              Excluir Projeto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <MessagesDialog 
        open={isMessagesOpen} 
        onOpenChange={setIsMessagesOpen} 
      />
    </>
  );
};

export default AdminProjects;