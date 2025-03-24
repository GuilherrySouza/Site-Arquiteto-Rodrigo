
import { useState } from "react";
import SectionTitle from "@/components/sections/SectionTitle";
import ContactForm from "@/components/sections/ContactForm";
import LazyImage from "@/components/ui/lazy-image";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-section">
        <SectionTitle
          subtitle="Entre em contato"
          title="Vamos conversar sobre o seu projeto"
          description="Preencha o formulário abaixo para iniciarmos uma conversa sobre como posso ajudar a transformar sua visão em realidade."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          <div className="bg-secondary p-8 md:p-12 rounded-lg">
            <h3 className="text-xl font-medium mb-6">Informações de Contato</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Telefone</h4>
                  <p className="text-muted-foreground">(83) 9 8142-8354</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Email</h4>
                  <p className="text-muted-foreground">arqrodrigohoracio@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Endereço</h4>
                  <p className="text-muted-foreground">Rua Severino Fonseca dos
Santos, 232, Cidade Alta,
Caruaru - PE.</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-medium mb-6">Redes Sociais</h3>
              
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-normal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </a>
                
                <a
                  href="https://x.com/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-normal"
                >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                <path d="M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z"></path></svg>
                </a>
                
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-normal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <ContactForm />
          </div>
        </div>
        
        {/* Map or Office Image */}
        <div className="mt-20">
          <div className="aspect-[21/9] rounded-lg overflow-hidden">
            <LazyImage
              src="/imagem-baixo1.jpg"
              alt="Mapa do escritório"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
