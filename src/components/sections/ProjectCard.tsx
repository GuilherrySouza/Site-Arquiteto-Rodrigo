
import { useState } from "react";
import { Link } from "react-router-dom";
import LazyImage from "../ui/lazy-image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  id?: string;
  title?: string;
  category?: string;
  image?: string;
  className?: string;
  project?: Project; // Add the project prop
}

const ProjectCard = ({ id, title, category, image, className, project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // If project prop is provided, use its properties
  const projectId = project?.id || id;
  const projectTitle = project?.title || title;
  const projectCategory = project?.category || category;
  const projectImage = project?.coverImage || image;
  
  // Check if the image is a data URL (uploaded from computer)
  const isBase64Image = projectImage?.startsWith('data:image/');

  return (
    <Link
      to={`/projetos/${projectId}`}
      className={cn(
        "group block relative overflow-hidden rounded-lg transition-all duration-500",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <LazyImage
        src={projectImage || ""}
        alt={projectTitle || "Projeto"}
        className={cn(
          "w-full transition-all duration-700 ease-in-out",
          isHovered ? "scale-105 blur-[2px]" : ""
        )}
        aspectRatio="3/4"
        isBase64={isBase64Image}
      />
      
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 flex flex-col justify-between",
          "transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-80"
        )}
      >
        <div 
          className={cn(
            "bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full self-start",
            "transform transition-all duration-500",
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
        >
          <span className="text-xs font-medium text-primary">{projectCategory}</span>
        </div>
        
        <div className="transform transition-all duration-500">
          <h3 className="text-white text-xl md:text-2xl font-medium mb-2">
            {projectTitle}
          </h3>
          
          <div 
            className={cn(
              "flex items-center text-white/80 text-sm",
              "transform transition-all duration-500 ease-in-out",
              isHovered ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
            )}
          >
            <span className="mr-2">Ver projeto</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;