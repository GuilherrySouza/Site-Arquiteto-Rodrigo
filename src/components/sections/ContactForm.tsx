
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Send } from "lucide-react";
import { saveMessage } from "@/utils/messageStorage";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        toast({
          title: "Mensagem enviada",
          description: "Obrigado por entrar em contato. Retornaremos em breve!",
        });
  
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Nome completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="block w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm ring-offset-background transition-normal focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Seu nome"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="block w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm ring-offset-background transition-normal focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="seu@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium">
            Telefone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="block w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm ring-offset-background transition-normal focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="(00) 00000-0000"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-medium">
            Assunto
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="block w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm ring-offset-background transition-normal focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="" disabled>
              Selecione um assunto
            </option>
            <option value="Projeto Residencial">Projeto Residencial</option>
            <option value="Projeto Comercial">Projeto Comercial</option>
            <option value="Design de Interiores">Design de Interiores</option>
            <option value="Consultoria">Consultoria</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="block w-full rounded-md border border-input bg-transparent px-4 py-3 text-sm ring-offset-background transition-normal focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          placeholder="Descreva seu projeto ou dúvida..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium text-primary-foreground transition-normal bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </>
        ) : (
          <>
            Enviar mensagem
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
