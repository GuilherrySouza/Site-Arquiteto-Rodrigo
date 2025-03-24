import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { saveProfileBasic } from "@/data/profile";
import { useQueryClient } from "@tanstack/react-query";
import ImageUpload from "@/components/ui/image-upload";
import { Education, Experience } from "@/data/profile";

interface ProfileData {
  name: string;
  title: string;
  shortBio: string;
  photo: string;
  longBio: string[];
  education: Education[];
  experience: Experience[]
}

const AdminProfile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "Rodrigo Horacio",
    title: "Arquiteto e Urbanista",
    shortBio: "Arquiteto e Urbanista apaixonado pela transformação de espaços.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    longBio: [],
    education: [],
    experience: []
  });

  // Carregar dados do cache caso esteja disponível
  useEffect(() => {
    const cachedProfile = queryClient.getQueryData(['profile']) as ProfileData | undefined;
    if (cachedProfile) {
      setProfile({
        name: cachedProfile.name,
        title: cachedProfile.title,
        shortBio: cachedProfile.shortBio,
        photo: cachedProfile.photo,
        longBio: cachedProfile.longBio || [],
        education: cachedProfile.education || [],
        experience: cachedProfile.experience || []
      });
    }
  }, [queryClient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (imageData: string) => {
    setProfile((prev) => ({ ...prev, photo: imageData }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setConnectionError(false);

    try {
      // Obtém o perfil completo do cache
      const cachedProfile = queryClient.getQueryData(['profile']) as ProfileData | undefined;
      
      if (cachedProfile) {
        // Atualiza o perfil no servidor
        const success = await saveProfileBasic({
          ...cachedProfile,
          name: profile.name,
          title: profile.title,
          shortBio: profile.shortBio,
          photo: profile.photo
        });
        
        if (success) {
          // Atualiza o cache com os novos dados
          queryClient.setQueryData(['profile'], (oldData: ProfileData | undefined) => ({
            ...oldData,
            name: profile.name,
            title: profile.title,
            shortBio: profile.shortBio,
            photo: profile.photo
          }));
          
          toast({
            description: "Perfil atualizado com sucesso!",
          });
        }
      } else {
        // Caso base de fallback (sem cache)
        // Simulação de atualização local quando o servidor está inacessível
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        localStorage.setItem('profile-basic', JSON.stringify(profile));
        
        toast({
          description: "Perfil salvo localmente (modo offline).",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setConnectionError(true);
      toast({
        variant: "destructive",
        title: "Erro de conexão",
        description: "Não foi possível conectar ao servidor. Verifique se o servidor está em execução.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {connectionError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro de conexão</AlertTitle>
            <AlertDescription>
              Não foi possível conectar ao servidor backend (http://localhost:4000). 
              Verifique se o servidor está em execução.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Nome
              </label>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Título/Profissão
              </label>
              <Input
                id="title"
                name="title"
                value={profile.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="shortBio" className="block text-sm font-medium mb-1">
                Biografia Curta
              </label>
              <Textarea
                id="shortBio"
                name="shortBio"
                value={profile.shortBio}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>

            <div>
              <label htmlFor="photo" className="block text-sm font-medium mb-1">
                Foto do Perfil
              </label>
              <ImageUpload 
                currentImage={profile.photo}
                onImageSelected={handlePhotoChange}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Faça upload de uma foto ou cole a URL de uma imagem online
              </p>
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Perfil"
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminProfile;