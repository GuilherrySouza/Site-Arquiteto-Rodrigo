import { useEffect, useState } from "react";
import SectionTitle from "@/components/sections/SectionTitle";
import LazyImage from "@/components/ui/lazy-image";
import { ProfileData, loadProfile } from "@/data/profile";
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from "lucide-react";

const About = () => {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: loadProfile,
  });

  // Check if photo is a base64 image
  const isBase64Photo = profile?.photo?.startsWith('data:image/');

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Carregando informações...</span>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Erro ao carregar dados</h2>
          <p className="text-muted-foreground">Não foi possível carregar as informações do perfil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle
              subtitle="Sobre mim"
              title={profile.name}
              description={profile.shortBio}
            />
            
            <div className="space-y-6 text-muted-foreground">
              {profile.longBio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden">
              <LazyImage
                src={profile.photo}
                alt={profile.name}
                className="w-full h-full object-cover"
                isBase64={isBase64Photo}
              />
            </div>
          </div>
        </div>
        
        {/* Education & Experience */}
        <div className="mt-32">
          <SectionTitle
            subtitle="Trajetória"
            title="Educação & Experiência"
            description="Confira minha formação acadêmica e experiência profissional."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-xl font-medium mb-6">Educação</h3>
              
              <div className="space-y-8">
                {profile.education.map((item) => (
                  <div key={item.id} className="border-l-2 border-primary pl-6 py-2">
                    <span className="inline-block text-sm text-muted-foreground mb-2">{item.period}</span>
                    <h4 className="text-lg font-medium">{item.title}</h4>
                    <p className="text-muted-foreground">{item.institution}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-6">Experiência</h3>
              
              <div className="space-y-8">
                {profile.experience.map((item) => (
                  <div key={item.id} className="border-l-2 border-primary pl-6 py-2">
                    <span className="inline-block text-sm text-muted-foreground mb-2">{item.period}</span>
                    <h4 className="text-lg font-medium">{item.title}</h4>
                    <p className="text-muted-foreground">{item.company}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

