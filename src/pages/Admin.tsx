import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Project, loadProjects, addProject, updateProject, removeProject, categories } from '@/data/projects';
import { 
  ProfileData, 
  Education, 
  Experience, 
  loadProfile, 
  saveProfileBasic,
  saveEducation,
  deleteEducation,
  saveExperience,
  deleteExperience
} from '@/data/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Check, Pencil, Trash2, Image, Plus, Eye, Save, Key, User, Building, Loader2 } from 'lucide-react';
import LazyImage from '@/components/ui/lazy-image';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const generateId = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .substring(0, 30);
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState("projects");
  const [tempLongBio, setTempLongBio] = useState('');
  const [editingEducation, setEditingEducation] = useState<Partial<Education> | null>(null);
  const [editingExperience, setEditingExperience] = useState<Partial<Experience> | null>(null);
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false);
  const [isExperienceDialogOpen, setIsExperienceDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { 
    data: projects, 
    isLoading: isLoadingProjects,
    refetch: refetchProjects 
  } = useQuery({
    queryKey: ['projects'],
    queryFn: loadProjects,
    enabled: isAuthenticated,
  });

  const { 
    data: profile, 
    isLoading: isLoadingProfile, 
    error: profileError 
  } = useQuery({
    queryKey: ['profile'],
    queryFn: loadProfile,
    enabled: isAuthenticated,
  });

  const updateProfileMutation = useMutation({
    mutationFn: saveProfileBasic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Perfil atualizado com sucesso');
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar perfil: ${error.message}`);
    }
  });

  const saveEducationMutation = useMutation({
    mutationFn: saveEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Formação acadêmica salva com sucesso');
      setIsEducationDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Erro ao salvar formação: ${error.message}`);
    }
  });

  const deleteEducationMutation = useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Formação acadêmica removida com sucesso');
    },
    onError: (error) => {
      toast.error(`Erro ao remover formação: ${error.message}`);
    }
  });

  const saveExperienceMutation = useMutation({
    mutationFn: saveExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Experiência profissional salva com sucesso');
      setIsExperienceDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Erro ao salvar experiência: ${error.message}`);
    }
  });

  const deleteExperienceMutation = useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Experiência profissional removida com sucesso');
    },
    onError: (error) => {
      toast.error(`Erro ao remover experiência: ${error.message}`);
    }
  });

  const addProjectMutation = useMutation({
    mutationFn: (newProject: Omit<Project, 'id'>) => Promise.resolve(addProject({ ...newProject, id: generateId(newProject.title) })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projeto adicionado com sucesso');
      setIsEditDialogOpen(false);
      setSelectedProject(null);
    },
    onError: (error) => {
      toast.error(`Erro ao adicionar projeto: ${error.message}`);
    }
  });

  const updateProjectMutation = useMutation({
    mutationFn: (updatedProject: Project) => Promise.resolve(updateProject(updatedProject)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projeto atualizado com sucesso');
      setIsEditDialogOpen(false);
      setSelectedProject(null);
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar projeto: ${error.message}`);
    }
  });

  const removeProjectMutation = useMutation({
    mutationFn: (projectId: string) => Promise.resolve(removeProject(projectId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Projeto removido com sucesso');
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
    },
    onError: (error) => {
      toast.error(`Erro ao remover projeto: ${error.message}`);
    }
  });

  useEffect(() => {
    if (profile) {
      setTempLongBio(profile.longBio.join('\n\n'));
    }
  }, [profile]);

  const handleLogin = () => {
    if (password === 'rodrigo22') {
      setIsAuthenticated(true);
      toast.success('Login bem-sucedido');
    } else {
      toast.error('Senha incorreta');
    }
  };

  const handleSaveProfile = async (updatedProfile?: ProfileData) => {
    if (!profile) return;
    
    setIsSaving(true);
    
    const longBio = tempLongBio.split('\n\n').filter(p => p.trim() !== '');
    
    const profileToSave = updatedProfile || {
      ...profile,
      longBio
    };
    
    await updateProfileMutation.mutateAsync(profileToSave);
    setIsSaving(false);
  };

  const handleAddEducation = () => {
    setEditingEducation({
      period: '',
      title: '',
      institution: ''
    });
    setIsEducationDialogOpen(true);
  };

  const handleEditEducation = (education: Education) => {
    setEditingEducation({...education});
    setIsEducationDialogOpen(true);
  };

  const handleSaveEducation = async () => {
    if (!editingEducation) return;
    
    if (!editingEducation.title || !editingEducation.institution) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    
    await saveEducationMutation.mutateAsync(editingEducation);
  };

  const handleDeleteEducation = async (id: string) => {
    await deleteEducationMutation.mutateAsync(id);
  };

  const handleAddExperience = () => {
    setEditingExperience({
      period: '',
      title: '',
      company: ''
    });
    setIsExperienceDialogOpen(true);
  };

  const handleEditExperience = (experience: Experience) => {
    setEditingExperience({...experience});
    setIsExperienceDialogOpen(true);
  };

  const handleSaveExperience = async () => {
    if (!editingExperience) return;
    
    if (!editingExperience.title || !editingExperience.company) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    
    await saveExperienceMutation.mutateAsync(editingExperience);
  };

  const handleDeleteExperience = async (id: string) => {
    await deleteExperienceMutation.mutateAsync(id);
  };

  // Funções para gerenciar projetos
  const handleAddProject = () => {
    const emptyProject: Omit<Project, 'id'> & { id?: string } = {
      title: '',
      category: 'Residencial',
      year: new Date().getFullYear().toString(),
      client: '',
      location: '',
      description: '',
      detailedDescription: '',
      coverImage: '',
      images: [],
      tags: [],
      featured: false
    };
    setSelectedProject(emptyProject as Project);
    setIsEditDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject({...project});
    setIsEditDialogOpen(true);
  };

  const confirmDeleteProject = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteProject = async () => {
    if (!selectedProject) return;
    await removeProjectMutation.mutateAsync(selectedProject.id);
  };

  const handleSaveProject = async () => {
    if (!selectedProject) return;
    
    if (!selectedProject.title || !selectedProject.category || !selectedProject.description) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    
    if (selectedProject.images.length === 0 || !selectedProject.coverImage) {
      toast.error('Adicione pelo menos uma imagem e defina uma imagem de capa');
      return;
    }
    
    if (selectedProject.id) {
      // Atualizar projeto existente
      await updateProjectMutation.mutateAsync(selectedProject);
    } else {
      // Criar novo projeto
      const { id, ...newProject } = selectedProject;
      await addProjectMutation.mutateAsync(newProject);
    }
  };

  const handleAddImage = () => {
    if (!selectedProject || !newImageUrl) return;
    
    setSelectedProject({
      ...selectedProject,
      images: [...selectedProject.images, newImageUrl],
      coverImage: selectedProject.coverImage || newImageUrl
    });
    
    setNewImageUrl('');
  };

  const handleSetCoverImage = (imageUrl: string) => {
    if (!selectedProject) return;
    setSelectedProject({
      ...selectedProject,
      coverImage: imageUrl
    });
  };

  const handleRemoveImage = (index: number) => {
    if (!selectedProject || !selectedProject.images) return; // Evita erro de undefined
  
    const newImages = [...selectedProject.images]; // Copia segura do array
    const removedImage = newImages.splice(index, 1)[0]; // Remove a imagem
  
    // Criar um novo objeto para evitar mutação direta
    const updatedProject = {
        ...selectedProject,
        images: newImages,
        coverImage: selectedProject.coverImage || "", // Garante que coverImage tenha um valor
      };
  
    // Se a imagem removida era a capa, definir uma nova imagem de capa
    if (removedImage === selectedProject.coverImage) {
      updatedProject.coverImage = newImages.length > 0 ? newImages[0] : ''; 
    }
  
    // Atualiza o estado de selectedProject
    setSelectedProject(updatedProject);
  };

  const handleTagToggle = (tag: string) => {
    if (!selectedProject) return;
    
    const newTags = selectedProject.tags.includes(tag)
      ? selectedProject.tags.filter(t => t !== tag)
      : [...selectedProject.tags, tag];
    
    setSelectedProject({
      ...selectedProject,
      tags: newTags
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-20">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Área Administrativa</CardTitle>
            <CardDescription>
              Entre com a senha para gerenciar projetos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin} className="w-full">
              <Key className="mr-2 h-4 w-4" />
              Acessar
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  function handleUpload(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
        <h1 className="text-3xl font-bold mt-8">Painel Administrativo</h1>
<p className="text-muted-foreground mt-4">
  Gerencie projetos e informações pessoais do site
</p>
        </div>
        <div className="flex space-x-4">
          <Button onClick={() => navigate('/')} variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Ver Site
          </Button>
        </div>
      </div>

      <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
          <TabsTrigger value="projects">Projetos</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button onClick={handleAddProject} variant="default">
              <Plus className="mr-2 h-4 w-4" />
              Novo Projeto
            </Button>
          </div>
          
          {isLoadingProjects ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <LazyImage
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full"
                      objectFit="cover"
                    />
                    {project.featured && (
                      <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs">
                        Destaque
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.category} | {project.year}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => confirmDeleteProject(project)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="default" size="sm" onClick={() => handleEditProject(project)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border border-dashed rounded-lg">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Image className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Nenhum projeto encontrado</h3>
              <p className="text-muted-foreground mb-4">Comece adicionando seu primeiro projeto.</p>
              <Button onClick={handleAddProject}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Projeto
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-6">
          {isLoadingProfile ? (
            <Card>
              <CardContent className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </CardContent>
            </Card>
          ) : profileError ? (
            <Card>
              <CardContent className="flex items-center justify-center py-20 text-center">
                <div>
                  <h3 className="text-lg font-medium mb-2">Erro ao carregar dados do perfil</h3>
                  <p className="text-muted-foreground">
                    Verifique se o servidor backend está rodando em http://localhost:4000
                  </p>
                  <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['profile'] })} className="mt-4">
                    Tentar novamente
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : profile ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                  <CardDescription>
                    Edite suas informações pessoais que aparecem na página Sobre
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => {
                          queryClient.setQueryData(['profile'], {...profile, name: e.target.value});
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Título Profissional</Label>
                      <Input
                        id="title"
                        value={profile.title}
                        onChange={(e) => {
                          queryClient.setQueryData(['profile'], {...profile, title: e.target.value});
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shortBio">Biografia Curta</Label>
                    <Textarea
                      id="shortBio"
                      value={profile.shortBio}
                      onChange={(e) => {
                          queryClient.setQueryData(['profile'], {...profile, shortBio: e.target.value});
                        }}
                      rows={2}
                    />
                    <p className="text-xs text-muted-foreground">
                      Utilizada como subtítulo na página Sobre
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="longBio">Biografia Detalhada</Label>
                    <Textarea
                      id="longBio"
                      value={tempLongBio}
                      onChange={(e) => setTempLongBio(e.target.value)}
                      rows={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      Separe parágrafos com uma linha em branco (dois enters)
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="photo">URL da Foto</Label>
                    <div className="flex gap-4">
                      <div className="flex-grow">
                        <Input
                          id="photo"
                          value={profile.photo}
                          onChange={(e) => {
                          queryClient.setQueryData(['profile'], {...profile, photo: e.target.value});
                        }}
                        />
                      </div>
                      <div className="w-16 h-16 rounded-full overflow-hidden border">
                        <LazyImage
                          src={profile.photo}
                          alt="Foto de perfil"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSaveProfile()} disabled={isSaving || updateProfileMutation.isPending}>
                    {(isSaving || updateProfileMutation.isPending) ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    Salvar Alterações
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Formação Acadêmica</CardTitle>
                    <CardDescription>
                      Gerencie sua formação acadêmica
                    </CardDescription>
                  </div>
                  <Button size="sm" onClick={handleAddEducation}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.education.map((edu) => (
                      <div key={edu.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">{edu.title}</h4>
                          <p className="text-sm text-muted-foreground">{edu.institution} • {edu.period}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditEducation(edu)}
                            disabled={saveEducationMutation.isPending}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteEducation(edu.id)}
                            disabled={deleteEducationMutation.isPending}
                          >
                            {deleteEducationMutation.isPending && deleteEducationMutation.variables === edu.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {profile.education.length === 0 && (
                      <div className="text-center p-6 border border-dashed rounded-md">
                        <User className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">Nenhuma formação acadêmica cadastrada</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Experiência Profissional</CardTitle>
                    <CardDescription>
                      Gerencie sua experiência profissional
                    </CardDescription>
                  </div>
                  <Button size="sm" onClick={handleAddExperience}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {profile.experience.map((exp) => (
                      <div key={exp.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <h4 className="font-medium">{exp.title}</h4>
                          <p className="text-sm text-muted-foreground">{exp.company} • {exp.period}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEditExperience(exp)}
                            disabled={saveExperienceMutation.isPending}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteExperience(exp.id)}
                            disabled={deleteExperienceMutation.isPending}
                          >
                            {deleteExperienceMutation.isPending && deleteExperienceMutation.variables === exp.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {profile.experience.length === 0 && (
                      <div className="text-center p-6 border border-dashed rounded-md">
                        <Building className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">Nenhuma experiência profissional cadastrada</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : null}
        </TabsContent>
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProject?.id ? 'Editar Projeto' : 'Novo Projeto'}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do projeto nos campos abaixo.
            </DialogDescription>
          </DialogHeader>

          {selectedProject && (
            <Tabs defaultValue="info" className="mt-4">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="images">Imagens</TabsTrigger>
                <TabsTrigger value="details">Detalhes</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título *</Label>
                    <Input 
                      id="title" 
                      value={selectedProject.title} 
                      onChange={(e) => setSelectedProject({...selectedProject, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select 
                      value={selectedProject.category}
                      onValueChange={(value) => setSelectedProject({...selectedProject, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(cat => cat !== "Todos").map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Ano</Label>
                    <Input 
                      id="year" 
                      value={selectedProject.year} 
                      onChange={(e) => setSelectedProject({...selectedProject, year: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente</Label>
                    <Input 
                      id="client" 
                      value={selectedProject.client} 
                      onChange={(e) => setSelectedProject({...selectedProject, client: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input 
                    id="location" 
                    value={selectedProject.location} 
                    onChange={(e) => setSelectedProject({...selectedProject, location: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição Resumida *</Label>
                  <Textarea 
                    id="description" 
                    value={selectedProject.description} 
                    onChange={(e) => setSelectedProject({...selectedProject, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="featured" 
                    checked={selectedProject.featured || false}
                    onCheckedChange={(checked) => 
                      setSelectedProject({...selectedProject, featured: checked as boolean})
                    }
                  />
                  <Label htmlFor="featured">Destacar este projeto na página inicial</Label>
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-4">
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Cole a URL da imagem aqui"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                  <Button onClick={handleAddImage} disabled={!newImageUrl}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar
                  </Button>
                </div>


                <div className="grid grid-cols-2 gap-4 mt-4">
                  {selectedProject.images.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <LazyImage
                        src={imageUrl}
                        alt={`Imagem ${index + 1}`}
                        className="w-full h-48 rounded-md"
                        objectFit="cover"
                      />
                      
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {selectedProject.coverImage === imageUrl ? (
                          <Button size="sm" variant="secondary" disabled>
                            <Check className="mr-1 h-4 w-4" />
                            Capa
                          </Button>
                        ) : (
                          <Button size="sm" variant="secondary" onClick={() => handleSetCoverImage(imageUrl)}>
                            <Image className="mr-1 h-4 w-4" />
                            Definir Capa
                          </Button>
                        )}
                        
                        <Button size="sm" variant="destructive" onClick={() => handleRemoveImage(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedProject.images.length === 0 && (
                  <div className="text-center p-8 border border-dashed rounded-md">
                    <p className="text-muted-foreground">Nenhuma imagem adicionada</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="detailedDescription">Descrição Detalhada</Label>
                  <Textarea 
                    id="detailedDescription" 
                    value={selectedProject.detailedDescription || ''} 
                    onChange={(e) => setSelectedProject({...selectedProject, detailedDescription: e.target.value})}
                    rows={8}
                  />
                  <p className="text-xs text-muted-foreground">
                    Dica: Use "\n\n" para criar parágrafos na descrição detalhada
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Residencial", "Comercial", "Corporativo", "Design de Interiores",
                      "Sustentável", "Contemporâneo", "Clássico", "Reforma", "Mobiliário",
                      "Paisagismo", "Interiores", "Retrofit", "Vernacular", "Modernista"
                    ].map((tag) => (
                      <div 
                        key={tag}
                        className={`px-3 py-1 rounded-full text-sm cursor-pointer border ${
                          selectedProject.tags.includes(tag) 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveProject}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Projeto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o projeto "{selectedProject?.title}"?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteProject}>
              Excluir Projeto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEducationDialogOpen} onOpenChange={setIsEducationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEducation?.id ? 'Editar Formação' : 'Adicionar Formação'}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados da sua formação acadêmica.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edu-title">Título *</Label>
              <Input
                id="edu-title"
                value={editingEducation?.title || ''}
                onChange={(e) => setEditingEducation(prev => prev ? {...prev, title: e.target.value} : null)}
                placeholder="Ex: Bacharel em Arquitetura e Urbanismo"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edu-institution">Instituição *</Label>
              <Input
                id="edu-institution"
                value={editingEducation?.institution || ''}
                onChange={(e) => setEditingEducation(prev => prev ? {...prev, institution: e.target.value} : null)}
                placeholder="Ex: Universidade de São Paulo"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edu-period">Período</Label>
              <Input
                id="edu-period"
                value={editingEducation?.period || ''}
                onChange={(e) => setEditingEducation(prev => prev ? {...prev, period: e.target.value} : null)}
                placeholder="Ex: 2010 - 2015"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edu-description">Descrição (opcional)</Label>
              <Textarea
                id="edu-description"
                value={editingEducation?.description || ''}
                onChange={(e) => setEditingEducation(prev => prev ? {...prev, description: e.target.value} : null)}
                placeholder="Descreva detalhes sobre esta formação"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEducationDialogOpen(false)} disabled={saveEducationMutation.isPending}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEducation} disabled={saveEducationMutation.isPending}>
              {saveEducationMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Salvar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isExperienceDialogOpen} onOpenChange={setIsExperienceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingExperience?.id ? 'Editar Experiência' : 'Adicionar Experiência'}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados da sua experiência profissional.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="exp-title">Cargo *</Label>
              <Input
                id="exp-title"
                value={editingExperience?.title || ''}
                onChange={(e) => setEditingExperience(prev => prev ? {...prev, title: e.target.value} : null)}
                placeholder="Ex: Arquiteto Sênior"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exp-company">Empresa *</Label>
              <Input
                id="exp-company"
                value={editingExperience?.company || ''}
                onChange={(e) => setEditingExperience(prev => prev ? {...prev, company: e.target.value} : null)}
                placeholder="Ex: Estúdio de Arquitetura XYZ"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exp-period">Período</Label>
              <Input
                id="exp-period"
                value={editingExperience?.period || ''}
                onChange={(e) => setEditingExperience(prev => prev ? {...prev, period: e.target.value} : null)}
                placeholder="Ex: 2018 - Presente"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exp-description">Descrição (opcional)</Label>
              <Textarea
                id="exp-description"
                value={editingExperience?.description || ''}
                onChange={(e) => setEditingExperience(prev => prev ? {...prev, description: e.target.value} : null)}
                placeholder="Descreva detalhes sobre esta experiência"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExperienceDialogOpen(false)} disabled={saveExperienceMutation.isPending}>
              Cancelar
            </Button>
            <Button onClick={handleSaveExperience} disabled={saveExperienceMutation.isPending}>
              {saveExperienceMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Salvar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;