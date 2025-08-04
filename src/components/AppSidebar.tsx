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
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
      { title: "Relatórios", url: "/reports", icon: FileText },
      { title: "Opiniões", url: "/opinions", icon: MessageSquare },
    ]
  },
  {
    title: "IA",
    icon: Brain,
    items: [
      { title: "Categorização IA", url: "/ai-categorization", icon: Brain },
      { title: "Respostas Automáticas", url: "/auto-responses", icon: Bot },
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
      { title: "Configurações", url: "/settings", icon: Settings },
    ]
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (items: any[]) => items.some(item => isActive(item.url));
  
  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  return (
    <Sidebar className="w-16" collapsible="icon">
      <SidebarContent className="bg-card">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((group) => {
                const isGroupExpanded = expandedItems.includes(group.title);
                const groupHasActive = isGroupActive(group.items);
                
                return (
                  <Collapsible key={group.title} open={isGroupExpanded} onOpenChange={() => toggleExpanded(group.title)}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          className={`w-full justify-between ${groupHasActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent'}`}
                        >
                          <div className="flex items-center gap-2">
                            <group.icon className="h-4 w-4 flex-shrink-0" />
                            <span className="text-xs font-medium">{group.title}</span>
                          </div>
                          {isGroupExpanded ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {group.items.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton asChild>
                                <NavLink 
                                  to={item.url} 
                                  end 
                                  className={({ isActive }) =>
                                    isActive 
                                      ? "bg-primary text-primary-foreground font-medium" 
                                      : "hover:bg-accent"
                                  }
                                >
                                  <item.icon className="h-3 w-3 flex-shrink-0" />
                                  <span className="text-xs">{item.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}