import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Trash2, Image as ImageIcon } from "lucide-react";
import ImageUpload from "@/components/ui/image-upload";

interface ProjectImageUploaderProps {
  images: string[];
  coverImage: string;
  onImagesChange: (images: string[]) => void;
  onCoverImageChange: (coverImage: string) => void;
}

const ProjectImageUploader = ({
  images,
  coverImage,
  onImagesChange,
  onCoverImageChange,
}: ProjectImageUploaderProps) => {
  const [newImage, setNewImage] = useState<string | null>(null);

  const handleAddImage = () => {
    if (newImage) {
      const updatedImages = [...images, newImage];
      onImagesChange(updatedImages);
      
      // Se não houver imagem de capa, definir esta como capa
      if (!coverImage) {
        onCoverImageChange(newImage);
      }
      
      setNewImage(null);
    }
  };

  const handleRemoveImage = (index: number) => {
    const removedImage = images[index];
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
    
    // Se a imagem removida era a capa, definir outra imagem como capa
    if (removedImage === coverImage && updatedImages.length > 0) {
      onCoverImageChange(updatedImages[0]);
    } else if (removedImage === coverImage && updatedImages.length === 0) {
      onCoverImageChange("");
    }
  };

  const handleSetCoverImage = (image: string) => {
    onCoverImageChange(image);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Adicionar Nova Imagem</h3>
        <ImageUpload
          onImageSelected={(imageData) => setNewImage(imageData)}
          currentImage={null}
        />
        
        {newImage && (
          <Button onClick={handleAddImage} className="w-full mt-2">
            Adicionar Imagem ao Projeto
          </Button>
        )}
      </div>

      {images.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Imagens do Projeto</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Clique em uma imagem para defini-la como capa do projeto
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <Card key={index} className="relative group overflow-hidden">
                <div 
                  className="aspect-square relative cursor-pointer"
                  onClick={() => handleSetCoverImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`Imagem do projeto ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {image === coverImage && (
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      Capa
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {image === coverImage ? (
                      <Button size="sm" variant="secondary" disabled>
                        <Check className="mr-1 h-4 w-4" />
                        Capa
                      </Button>
                    ) : (
                      <Button size="sm" variant="secondary" onClick={() => handleSetCoverImage(image)}>
                        <ImageIcon className="mr-1 h-4 w-4" />
                        Definir Capa
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectImageUploader;