import { useEffect, useState } from "react";
import { ContactMessage, deleteMessage, getMessages } from "@/utils/messageStorage";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Inbox, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MessagesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMessagesChanged?: () => void;
}

const MessagesDialog = ({ open, onOpenChange, onMessagesChanged }: MessagesDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const messages = await getMessages();
        setMessages(messages);
        setError(null);
      } catch (error) {
        setError("Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchMessages();
    }
  }, [open]);

  const handleDelete = async (id: string) => {
    // ... keep existing code (delete message logic)
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Mensagens Recebidas</DialogTitle>
          <DialogDescription>
            Lista de todas as mensagens enviadas através do formulário de contato.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-destructive">
            <AlertCircle className="h-12 w-12 mx-auto mb-4" />
            <p>{error}</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Inbox className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>Nenhuma mensagem recebida ainda.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{message.name}</h3>
                    <p className="text-sm text-muted-foreground">{message.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(message.date), { addSuffix: true, locale: ptBR })}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => handleDelete(message.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <span className="text-xs font-medium">Telefone</span>
                    <p className="text-sm">{message.phone || "Não informado"}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium">Assunto</span>
                    <p className="text-sm">{message.subject}</p>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium">Mensagem</span>
                  <p className="text-sm mt-1 whitespace-pre-wrap">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MessagesDialog;