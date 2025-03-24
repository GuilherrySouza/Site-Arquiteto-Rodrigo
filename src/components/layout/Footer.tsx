
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary py-16">
      <div className="container-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-heading font-semibold tracking-tight">
                Rodrigo Horácio
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Criando espaços que inspiram, projetando o futuro da arquitetura com inovação e elegância.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/arq.rodrigohoracio/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-normal hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram strokeWidth={1.5} className="w-5 h-5" />
              </a>
              <a
                href="mailto:contato@rodrigohoracio.com"
                className="transition-normal hover:text-primary"
                aria-label="Email"
              >
                <Mail strokeWidth={1.5} className="w-5 h-5" />
              </a>
              <a
                href="tel:+5583981428354"
                className="transition-normal hover:text-primary"
                aria-label="Telefone"
              >
                <Phone strokeWidth={1.5} className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-medium text-base mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-normal"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/projetos"
                  className="text-muted-foreground hover:text-primary transition-normal"
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-muted-foreground hover:text-primary transition-normal"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-muted-foreground hover:text-primary transition-normal"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-medium text-base mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Projetos Residenciais</li>
              <li className="text-muted-foreground">Design de Interiores</li>
              <li className="text-muted-foreground">Projetos Comerciais</li>
              <li className="text-muted-foreground">Consultoria Técnica</li>
              <li className="text-muted-foreground">Reformas</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-medium text-base mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">arqrodrigohoracio@gmail.com</li>
              <li className="text-muted-foreground">+55 83 98142-8354</li>
              <li className="text-muted-foreground">
              Rua Severino Fonseca dos
Santos, 232, Cidade Alta,
Caruaru - PE.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 mt-12 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Arquiteto Rodrigo Horácio. Todos os direitos reservados.
            </p>
            <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
              Política de Privacidade • Termos de Uso
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
