import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? "py-3 blur-backdrop shadow-sm" : "py-5"
      }`}
    >
      <div className="container-section flex items-center justify-between">
        <Link 
          to="/" 
          className="z-50 flex items-center"
          onClick={closeMenu}
        >
          <span className="text-xl md:text-2xl font-heading font-semibold tracking-tight">
            Rodrigo Horacio
          </span>
          <span className="hidden md:block ml-2 text-sm text-muted-foreground">
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative text-sm hover:text-foreground transition-normal ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/projetos"
            className={({ isActive }) =>
              `relative text-sm hover:text-foreground transition-normal ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`
            }
          >
            Projetos
          </NavLink>
          <NavLink
            to="/sobre"
            className={({ isActive }) =>
              `relative text-sm hover:text-foreground transition-normal ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`
            }
          >
            Sobre
          </NavLink>
          <NavLink
            to="/contato"
            className={({ isActive }) =>
              `relative text-sm hover:text-foreground transition-normal ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`
            }
          >
            Contato
          </NavLink>
          
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button
            className="z-50 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? (
              <X
                className="w-6 h-6 text-primary transition-normal"
                strokeWidth={1.5}
              />
            ) : (
              <Menu
                className="w-6 h-6 text-primary transition-normal"
                strokeWidth={1.5}
              />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 bg-background flex flex-col items-center justify-center z-40 transition-all duration-500 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center space-y-8 staggered-animation">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-3xl font-heading ${
                  isActive ? "text-primary" : "text-muted-foreground"
                } hover:text-primary transition-normal opacity-0 animate-slide-up`
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/projetos"
              className={({ isActive }) =>
                `text-3xl font-heading ${
                  isActive ? "text-primary" : "text-muted-foreground"
                } hover:text-primary transition-normal opacity-0 animate-slide-up`
              }
              onClick={closeMenu}
            >
              Projetos
            </NavLink>
            <NavLink
              to="/sobre"
              className={({ isActive }) =>
                `text-3xl font-heading ${
                  isActive ? "text-primary" : "text-muted-foreground"
                } hover:text-primary transition-normal opacity-0 animate-slide-up`
              }
              onClick={closeMenu}
            >
              Sobre
            </NavLink>
            <NavLink
              to="/contato"
              className={({ isActive }) =>
                `text-3xl font-heading ${
                  isActive ? "text-primary" : "text-muted-foreground"
                } hover:text-primary transition-normal opacity-0 animate-slide-up`
              }
              onClick={closeMenu}
            >
              Contato
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;