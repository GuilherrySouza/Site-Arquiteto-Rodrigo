
import { useState, useEffect } from "react";
import { categories, loadProjects, Project } from "@/data/projects";
import ProjectCard from "@/components/sections/ProjectCard";
import SectionTitle from "@/components/sections/SectionTitle";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [projects, setProjects] = useState(loadProjects());

  // Recarregar projetos quando a página é montada
  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true); // Estado opcional para feedback de carregamento
  
  useEffect(() => {
    let isMounted = true; // Variável para evitar atualizações após desmontagem
  
    const filterProjects = async () => {
      setLoading(true);
      try {
        const loadedProjects = await loadProjects();
        const filtered = activeCategory === "Todos" 
          ? loadedProjects 
          : loadedProjects.filter(project => project.category === activeCategory);
        
        if (isMounted) { // Só atualiza o estado se o componente ainda estiver montado
          setFilteredProjects(filtered);
        }
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    filterProjects();
  
    return () => { isMounted = false; }; // Cleanup para evitar atualização após desmontagem
  
  }, [activeCategory]);

  return (
    <div className="container-section py-10 md:py-20">
      <SectionTitle
        subtitle="Nossos Projetos"
        title="Trabalhos Realizados"
        description="Explore nossa coleção de projetos que abrangem diferentes escalas e tipologias, desde residências contemporâneas até espaços comerciais inovadores."
        align="left"
      />

      {/* Categorias */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid de Projetos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            category={project.category}
            image={project.coverImage}
          />
        ))}
      </div>

      {/* Mensagem para quando não houver projetos */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium mb-2">Nenhum projeto encontrado</h3>
          <p className="text-muted-foreground">
            Não há projetos disponíveis para esta categoria no momento.
          </p>
        </div>
      )}
    </div>
  );
};

export default Projects;