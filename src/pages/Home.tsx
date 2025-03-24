
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { projects } from "@/data/projects";
import LazyImage from "@/components/ui/lazy-image";
import ProjectCard from "@/components/sections/ProjectCard";
import SectionTitle from "@/components/sections/SectionTitle";
import { cn } from "@/lib/utils";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const projectsRef = useRef<HTMLDivElement>(null);
  const featuredProjects = projects.filter(project => project.featured);

  // Scroll to projects section
  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="w-24 h-24 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <LazyImage
            src="/Imagem-central.jpg"
            alt="Arquitetura moderna"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 "></div>
        </div>

        <div className="container-section relative z-10 mt-20">
          <div className="max-w-3xl">
{/* <div className="mb-4 bg-white/10 backdrop-blur-md rounded-full px-4 py-1 w-fit border border-white/20 opacity-0 animate-fade-in">
  <span className="text-white text-sm font-medium">Arquiteto & Urbanista</span>
</div> */}
            
            <h1 className="text-5xl md:text-5x1 font-heading font-semibold text-white mb-6 opacity-0 animate-slide-up">
            Arquiteto Rodrigo Horácio
            </h1>
            
            <p className="text-1xl md:text-2xl text-white/80 mb-8 max-w-lg opacity-0 animate-slide-up">
            Projetando espaços funcionais, sustentáveis e visualmente marcantes para redefinir a forma como você vive e trabalha.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-slide-up">
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-slide-up">
  <Link
    to="/projetos"
    className="inline-flex items-center justify-center rounded-md px-10 py-4 text-sm font-medium text-gray-900 bg-white hover:bg-white/90 border border-gray-300 transition-normal"
  >
    Ver projetos
    <ArrowRight className="ml-2 h-5 w-5" />
  </Link>
</div>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToProjects}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center justify-center opacity-0 animate-fade-in"
          aria-label="Rolar para baixo"
        >
          <span className="text-sm mb-2">Explore</span>
          <ChevronDown className="w-6 h-6 animate-float" />
        </button>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="subtitle opacity-0 animate-slide-up">Sobre mim</div>
              <h2 className="h2 mb-6 opacity-0 animate-slide-up">
              Projetando espaços que contam histórias, despertam emoções e refletem a essência de quem os habita.
              </h2>
              <div className="space-y-4 opacity-0 animate-slide-up">
                <p className="text-muted-foreground">
                Com mais de cinco anos de experiência, baseio meu trabalho na ideia de que a arquitetura vai além da estética trata-se de criar espaços que proporcionam experiências sensoriais e funcionais, adaptando-se à vida e às necessidades das pessoas.
                </p>
                <p className="text-muted-foreground">
                Acredito na harmonia entre estética, funcionalidade e sustentabilidade, criando soluções inovadoras que se integram ao contexto e valorizam a cultura local.
                </p>
              </div>
              <div className="mt-8 opacity-0 animate-slide-up">
                <Link
                  to="/sobre"
                  className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-normal"
                >
                  Conheça mais
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="order-1 md:order-2 relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden opacity-100 animate-fade-in">
                <LazyImage
                  src="/imagem-destaque.jpg"
                  alt="Rodrigo Horácio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 -mb-4 -mr-4 bg-secondary p-6 rounded-lg max-w-xs opacity-0 animate-slide-up">
                <p className="text-sm font-medium mb-2">
                  "A arquitetura deve falar de seu tempo e lugar, mas anseia pela atemporalidade."
                </p>
                <p className="text-xs text-muted-foreground">— Frank Gehry</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section ref={projectsRef} className="py-20 md:py-32 bg-secondary relative">
        <div className="container-section">
          <SectionTitle
            subtitle="Projetos em destaque"
            title="Trabalhos recentes"
            description="Uma seleção dos meus projetos mais recentes, explorando diversas tipologias e escalas, de residências a espaços comerciais."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                category={project.category}
                image={project.coverImage}
                className={cn(
                  "opacity-0",
                  index === 0 ? "animate-slide-in-left" : 
                  index === 1 ? "animate-fade-in" : 
                  "animate-slide-in-right"
                )}
              />
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link
              to="/projetos"
              className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-normal opacity-0 animate-fade-in"
            >
              Ver todos os projetos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32">
        <div className="container-section">
          <SectionTitle
            subtitle="Serviços"
            title="Sobre meus serviços"
            description="Ofereço serviços completos de arquitetura e design, cuidando de cada etapa do projeto da concepção inicial à execução final para transformar ideias em espaços funcionais e sofisticados."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg border border-border transition-normal hover:border-primary hover:shadow-md opacity-0 animate-slide-up">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path><path d="M12 3v6"></path></svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Projetos Residenciais</h3>
              <p className="text-muted-foreground">
                Desenvolvimento de projetos para casas e apartamentos, desde a concepção até o detalhamento, com foco no bem-estar e na funcionalidade.
              </p>
            </div>

            <div className="p-8 rounded-lg border border-border transition-normal hover:border-primary hover:shadow-md opacity-0 animate-slide-up">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="8" height="8" x="3" y="3" rx="2"></rect><path d="M7 11v4a2 2 0 0 0 2 2h4"></path><rect width="8" height="8" x="13" y="13" rx="2"></rect></svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Design de Interiores</h3>
              <p className="text-muted-foreground">
                Criação de ambientes personalizados que refletem a identidade e o estilo de vida dos clientes, com atenção aos detalhes e à funcionalidade.
              </p>
            </div>

            <div className="p-8 rounded-lg border border-border transition-normal hover:border-primary hover:shadow-md opacity-0 animate-slide-up">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Projetos Comerciais</h3>
              <p className="text-muted-foreground">
                Desenvolvimento de espaços comerciais que aliam estética, funcionalidade e estratégia de marca, criando experiências memoráveis.
              </p>
            </div>

            <div className="p-8 rounded-lg border border-border transition-normal hover:border-primary hover:shadow-md opacity-0 animate-slide-up">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M2 20h.01"></path><path d="M7 20v-4"></path><path d="M12 20v-8"></path><path d="M17 20V8"></path><path d="M22 4v16"></path></svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Consultoria Técnica</h3>
              <p className="text-muted-foreground">
                Assessoria técnica para projetos em desenvolvimento, com foco em soluções práticas e inovadoras para desafios específicos.
              </p>
            </div>

            <div className="p-8 rounded-lg border border-border transition-normal hover:border-primary hover:shadow-md opacity-0 animate-slide-up">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path><path d="M12 2v2"></path><path d="M12 22v-2"></path><path d="m17 20.66-1-1.73"></path><path d="M11 10.27 7 3.34"></path><path d="m20.66 17-1.73-1"></path><path d="m3.34 7 1.73 1"></path><path d="M14 12h8"></path><path d="M2 12h2"></path><path d="m20.66 7-1.73 1"></path><path d="m3.34 17 1.73-1"></path><path d="m17 3.34-1 1.73"></path><path d="m7 20.66-1-1.73"></path></svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Projetos Sustentáveis</h3>
              <p className="text-muted-foreground">
                Desenvolvimento de projetos com foco em sustentabilidade, utilizando técnicas e materiais de baixo impacto ambiental.
              </p>
            </div>

            <div className="p-8 rounded-lg border border-border transition-normal hover:border-primary hover:shadow-md opacity-0 animate-slide-up">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 5v14"></path><path d="M18 13V5"></path><path d="M6 13V5"></path><path d="M18 9h-6"></path><path d="M12 13H6"></path></svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Reformas</h3>
              <p className="text-muted-foreground">
                Transformação de espaços existentes, respeitando a história e as características originais enquanto os adapta para novas necessidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0">
          <LazyImage
            src="/imagem-baixo3.jpg"
            alt="Interior design"
            className="w-full h-full opacity-40 dark:opacity-75"
          />
        </div>
        
        <div className="container-section relative z-10 pt-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-6 opacity-0 animate-slide-up">
              Vamos trabalhar juntos no seu próximo projeto?
            </h2>
            
            <p className="text-xl text-white drop-shadow-lg mb-10 opacity-0 animate-slide-up">
              Entre em contato para discutirmos como posso ajudar a transformar suas ideias em realidade.
            </p>
            
            <Link
              to="/contato"
              className="inline-flex items-center justify-center rounded-md px-8 py-4 text-base font-medium text-primary bg-white hover:bg-white/90 transition-normal opacity-0 animate-slide-up"
            >
              Entre em contato
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
