import { useState } from "react";
import { 
  BarChart3, 
  FileText, 
  Brain, 
  Mail, 
  MessageSquare, 
  Users, 
  Settings,
  Home,
  Send,
  Target,
  TrendingUp,
  Bot,
  FileType,
  Star,
  Smartphone,
  Zap,
  Database,
  Phone,
  Workflow,
  PieChart,
  LogOut,
  User
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLogout } from "@/hooks/useLogout";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    items: [
      { title: "Overview", url: "/", icon: Home },
    ]
  },
  {
    title: "Configurações Gerais",
    icon: Settings,
    items: [
      { title: "Campanhas", url: "/campaigns", icon: Target },
      { title: "Configuração de Canais", url: "/channel-config", icon: Send },
      { title: "Templates de Comunicação", url: "/communication-templates", icon: FileType },
      { title: "Configuração de Opiniões", url: "/opinion-settings", icon: MessageSquare },
      { title: "Base de Dados", url: "/database", icon: Database },
      { title: "Blacklist", url: "/blacklist", icon: Users },
    ]
  },
  {
    title: "Relatórios",
    icon: PieChart,
    items: [
      { title: "Relatório Geral", url: "/reports", icon: FileText },
      { title: "Mensagens Automáticas", url: "/reports/automation", icon: Zap },
      { title: "Relatório de Opiniões", url: "/reports/opinion", icon: MessageSquare },
      { title: "Relatório de Disparos", url: "/reports/dispatch", icon: Send },
    ]
  },
  {
    title: "Inteligência Artificial",
    icon: Brain,
    items: [
      { title: "Configurações IA", url: "/ai-settings", icon: Brain },
      { title: "Categorizações", url: "/ai-categorization", icon: Bot },
    ]
  },
  {
    title: "Comunicação",
    icon: Mail,
    items: [
      { title: "Automações", url: "/automations", icon: Workflow },
      { title: "Disparos", url: "/dispatches", icon: Zap },
      { title: "HSM Templates", url: "/hsm-templates", icon: Send },
    ]
  },
  {
    title: "Sistema",
    icon: Settings,
    items: [
      { title: "Configurações", url: "/system-settings", icon: Settings },
    ]
  }
];

export function AppSidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const { performLogout } = useLogout();
  const currentPath = location.pathname;
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (items: any[]) => items.some(item => isActive(item.url));

  const handleLogout = async () => {
    try {
      // Fechar o menu antes do logout
      setShowUserMenu(false);
      
      // Realizar o logout usando o hook personalizado
      await performLogout();
    } catch (error) {
      console.error('Erro durante logout:', error);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-card border-r border-border z-50">
      <div className="flex flex-col h-full py-4">
        {/* Área do usuário */}
        <div 
          className="relative mb-4"
          onMouseEnter={() => setShowUserMenu(true)}
          onMouseLeave={() => setShowUserMenu(false)}
        >
          <div className="flex items-center justify-center w-12 h-12 mx-2 rounded-lg cursor-pointer transition-colors bg-accent hover:bg-primary hover:text-primary-foreground">
            {user?.foto_perfil ? (
              <img 
                src={user.foto_perfil} 
                alt={user.name || 'Usuário'} 
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <User className="h-5 w-5" />
            )}
          </div>

          {/* Menu do usuário */}
          {showUserMenu && (
            <div 
              className="absolute left-16 top-0 bg-popover border border-border rounded-lg shadow-lg min-w-48 z-50"
              onMouseEnter={() => setShowUserMenu(true)}
              onMouseLeave={() => setShowUserMenu(false)}
            >
              <div className="p-2">
                <div className="px-2 py-2 border-b border-border mb-2">
                  <div className="text-sm font-medium">{user?.name || 'Usuário'}</div>
                  <div className="text-xs text-muted-foreground">{user?.email || ''}</div>
                  <div className="text-xs text-muted-foreground">{user?.username || ''}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Menu principal */}
        <div className="flex-1">
          {menuItems.map((group) => {
            const groupHasActive = isGroupActive(group.items);
            
            return (
              <div
                key={group.title}
                className="relative"
                onMouseEnter={() => setHoveredGroup(group.title)}
                onMouseLeave={() => setHoveredGroup(null)}
              >
                <div
                  className={`
                    flex items-center justify-center w-12 h-12 mx-2 rounded-lg mb-2 cursor-pointer transition-colors
                    ${groupHasActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent text-muted-foreground hover:text-foreground'}
                  `}
                >
                  <group.icon className="h-5 w-5" />
                </div>

                {/* Dropdown Menu */}
                {hoveredGroup === group.title && (
                  <div className="absolute left-16 top-0 bg-popover border border-border rounded-lg shadow-lg min-w-48 z-50">
                    <div className="p-2">
                      <div className="text-xs font-semibold text-muted-foreground px-2 py-1 mb-1">
                        {group.title}
                      </div>
                      {group.items.map((item) => (
                        <NavLink
                          key={item.title}
                          to={item.url}
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-2 py-2 rounded-md text-sm transition-colors ${
                              isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-accent text-foreground'
                            }`
                          }
                        >
                          <item.icon className="h-4 w-4" />
                          {item.title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}