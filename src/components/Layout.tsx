import { AppSidebar } from "@/components/AppSidebar";
import { User, Bell, Settings, LogOut, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useLogout } from "@/hooks/useLogout";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();
  const { performLogout } = useLogout();
  
  const handleLogout = async () => {
    try {
      await performLogout();
    } catch (error) {
      console.error('Erro durante logout:', error);
    }
  };

  const notifications = [
    { id: 1, title: "Nova resposta NPS", message: "Cliente João Silva respondeu a pesquisa", time: "2 min", unread: true },
    { id: 2, title: "Campanha finalizada", message: "Campanha Q4 2024 foi finalizada", time: "1h", unread: true },
    { id: 3, title: "Meta atingida", message: "85% de taxa de resposta alcançada", time: "3h", unread: false },
  ];

  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col ml-16">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-foreground">SENTai</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  {notifications.some(n => n.unread) && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {notifications.filter(n => n.unread).length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b">
                  <h4 className="font-semibold">Notificações</h4>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b last:border-0 hover:bg-muted/50 cursor-pointer ${
                        notification.unread ? 'bg-muted/30' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">
                          {notification.time}
                        </span>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar>
                    {user?.foto_perfil ? (
                      <img 
                        src={user.foto_perfil} 
                        alt={user.name || 'Usuário'} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <UserCircle className="h-5 w-5" />
                    Perfil do Usuário
                  </DialogTitle>
                  <DialogDescription>
                    Gerencie sua conta e configurações pessoais
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <Avatar className="h-12 w-12">
                      {user?.foto_perfil ? (
                        <img 
                          src={user.foto_perfil} 
                          alt={user.name || 'Usuário'} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <AvatarFallback>
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.name || 'Usuário'}</p>
                      <p className="text-sm text-muted-foreground">{user?.email || 'email@empresa.com'}</p>
                      <p className="text-xs text-muted-foreground">Empresa: {user?.id_empresa || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <UserCircle className="h-4 w-4" />
                      Editar Perfil
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <Settings className="h-4 w-4" />
                      Configurações da Conta
                    </Button>
                    <Separator />
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Sair da Conta
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}