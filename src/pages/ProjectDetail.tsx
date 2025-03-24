
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, User, Tag } from "lucide-react";
import { loadProjects, Project } from "@/data/projects";
import LazyImage from "@/components/ui/lazy-image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState("");

  // Atualizar o projeto quando a página for carregada e quando o ID mudar
  useEffect(() => {
    const fetchProject = async () => {
      const loadedProjects = await loadProjects(); // Aguarda os projetos carregarem
      const loadedProject = loadedProjects.find(p => p.id === id); // Agora funciona
  
      if (loadedProject) {
        setProject(loadedProject);
        setActiveImage(loadedProject.coverImage);
        // Rolar para o topo ao carregar novo projeto
        window.scrollTo(0, 0);
      } else {
        // Redirecionar para página 404 se projeto não for encontrado
        navigate("/404");
      }
    };
  
    fetchProject(); // Chama a função assíncrona
  
  }, [id, navigate]); // Dependências do useEffect

  // Se projeto não for encontrado, mostrar mensagem de carregamento
  if (!project) {
    return (
      <div className="container-section py-10 md:py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-2 border-b-2 border-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p>Carregando projeto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-section py-10 md:py-20">
      {/* Navegação de Volta */}
      <Link 
        to="/projetos" 
        className="inline-flex items-center text-sm mb-6 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para projetos
      </Link>

      {/* Cabeçalho do Projeto */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
        <div className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold mb-4">{project.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm">{project.year}</span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm">{project.client}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm">{project.location}</span>
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm">{project.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Galeria de Imagens */}
      <div className="mb-12">
        <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-4">
          <LazyImage 
            src={activeImage || project.coverImage}
            alt={project.title}
            className="w-full h-full"
            objectFit="cover"
          />
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {project.images.map((image, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`p-0 h-auto rounded-lg overflow-hidden border-2 ${
                activeImage === image ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setActiveImage(image)}
            >
              <LazyImage 
                src={image}
                alt={`${project.title} - Imagem ${index + 1}`}
                aspectRatio="1/1"
              />
            </Button>
          ))}
        </div>
      </div>

      {/* Detalhes do Projeto */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-medium mb-4">Sobre o Projeto</h2>
          {project.detailedDescription?.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
        
        <div>
          <div className="bg-secondary p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Características</h3>
            <Separator className="mb-4" />
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-primary mb-1">Categoria</p>
                <p>{project.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-primary mb-1">Ano</p>
                <p>{project.year}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-primary mb-1">Cliente</p>
                <p>{project.client}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-primary mb-1">Localização</p>
                <p>{project.location}</p>
              </div>
              {project.tags.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-primary mb-1">Tags</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs bg-background px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;