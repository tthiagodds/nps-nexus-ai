import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Campaigns from "./pages/Campaigns";
import Reports from "./pages/Reports";
import AICategorization from "./pages/AICategorization";
import Dispatches from "./pages/Dispatches";
import OpinionSettings from "./pages/OpinionSettings";
import AISettings from "./pages/AISettings";
import HSMTemplates from "./pages/HSMTemplates";
import ChannelConfig from "./pages/ChannelConfig";
import CommunicationTemplates from "./pages/CommunicationTemplates";
import DatabasePage from "./pages/Database";
import Blacklist from "./pages/Blacklist";
import Automations from "./pages/Automations";
import AutomationReports from "./pages/reports/AutomationReports";
import OpinionReports from "./pages/reports/OpinionReports";
import DispatchReports from "./pages/reports/DispatchReports";
import SystemSettings from "./pages/SystemSettings";
import UserManagement from "./pages/UserManagement";
import SurveyResponse from "./pages/SurveyResponse";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rota pública para resposta de pesquisa */}
            <Route path="/survey/:campaignId" element={<SurveyResponse />} />
            
            {/* Rotas protegidas */}
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            
            {/* Configurações Gerais */}
            <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
            <Route path="/channel-config" element={<ProtectedRoute><ChannelConfig /></ProtectedRoute>} />
            <Route path="/communication-templates" element={<ProtectedRoute><CommunicationTemplates /></ProtectedRoute>} />
            <Route path="/opinion-settings" element={<ProtectedRoute><OpinionSettings /></ProtectedRoute>} />
            <Route path="/database" element={<ProtectedRoute><DatabasePage /></ProtectedRoute>} />
            
            {/* Relatórios */}
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/reports/automation" element={<ProtectedRoute><AutomationReports /></ProtectedRoute>} />
            <Route path="/reports/opinion" element={<ProtectedRoute><OpinionReports /></ProtectedRoute>} />
            <Route path="/reports/dispatch" element={<ProtectedRoute><DispatchReports /></ProtectedRoute>} />
            
            {/* Inteligência Artificial */}
            <Route path="/ai-settings" element={<ProtectedRoute><AISettings /></ProtectedRoute>} />
            <Route path="/ai-categorization" element={<ProtectedRoute><AICategorization /></ProtectedRoute>} />
            
            {/* Comunicação */}
            <Route path="/blacklist" element={<ProtectedRoute><Blacklist /></ProtectedRoute>} />
            <Route path="/automations" element={<ProtectedRoute><Automations /></ProtectedRoute>} />
            <Route path="/dispatches" element={<ProtectedRoute><Dispatches /></ProtectedRoute>} />
            <Route path="/hsm-templates" element={<ProtectedRoute><HSMTemplates /></ProtectedRoute>} />
            <Route path="/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
            <Route path="/system-settings" element={<ProtectedRoute><SystemSettings /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
