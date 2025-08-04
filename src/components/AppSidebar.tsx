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
  Smartphone
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    items: [
      { title: "Overview", url: "/", icon: Home },
      { title: "Analytics", url: "/analytics", icon: TrendingUp },
    ]
  },
  {
    title: "NPS",
    items: [
      { title: "Campanhas", url: "/campaigns", icon: Target },
      { title: "Relatórios", url: "/reports", icon: FileText },
      { title: "Opiniões", url: "/opinions", icon: MessageSquare },
    ]
  },
  {
    title: "IA & Automação",
    items: [
      { title: "Categorização IA", url: "/ai-categorization", icon: Brain },
      { title: "Respostas Automáticas", url: "/auto-responses", icon: Bot },
    ]
  },
  {
    title: "Comunicação",
    items: [
      { title: "Templates Email", url: "/email-templates", icon: FileType },
      { title: "Envio de Emails", url: "/email-sending", icon: Mail },
      { title: "SMS & WhatsApp", url: "/messaging", icon: Smartphone },
      { title: "HSM Templates", url: "/hsm-templates", icon: Send },
    ]
  },
  {
    title: "Administração",
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

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent";

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-card">
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            {!collapsed && (
              <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider">
                {group.title}
              </SidebarGroupLabel>
            )}
            
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} end className={getNavCls}>
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && <span className="ml-3">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}