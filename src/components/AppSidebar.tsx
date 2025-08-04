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
  Zap
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    items: [
      { title: "Overview", url: "/", icon: Home },
      { title: "Analytics", url: "/analytics", icon: TrendingUp },
    ]
  },
  {
    title: "NPS",
    icon: Target,
    items: [
      { title: "Campanhas", url: "/campaigns", icon: Target },
      { title: "Disparos", url: "/dispatches", icon: Zap },
      { title: "Relatórios", url: "/reports", icon: FileText },
      { title: "Opiniões", url: "/opinions", icon: MessageSquare },
    ]
  },
  {
    title: "IA",
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
      { title: "Templates Email", url: "/email-templates", icon: FileType },
      { title: "Envio de Emails", url: "/email-sending", icon: Mail },
      { title: "SMS & Meta", url: "/messaging", icon: Smartphone },
      { title: "HSM Templates", url: "/hsm-templates", icon: Send },
    ]
  },
  {
    title: "Admin",
    icon: Settings,
    items: [
      { title: "Usuários", url: "/users", icon: Users },
      { title: "Config. Opiniões", url: "/opinion-settings", icon: MessageSquare },
      { title: "Configurações", url: "/settings", icon: Settings },
    ]
  }
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (items: any[]) => items.some(item => isActive(item.url));

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-card border-r border-border z-50">
      <div className="flex flex-col h-full py-4">
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
  );
}