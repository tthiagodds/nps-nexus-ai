import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Campaigns from "./pages/Campaigns";
import Reports from "./pages/Reports";
import Opinions from "./pages/Opinions";
import AICategorization from "./pages/AICategorization";
import Messaging from "./pages/Messaging";
import Dispatches from "./pages/Dispatches";
import OpinionSettings from "./pages/OpinionSettings";
import AISettings from "./pages/AISettings";
import HSMTemplates from "./pages/HSMTemplates";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Index />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/dispatches" element={<Dispatches />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/opinions" element={<Opinions />} />
          <Route path="/ai-categorization" element={<AICategorization />} />
          <Route path="/ai-settings" element={<AISettings />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/hsm-templates" element={<HSMTemplates />} />
          <Route path="/opinion-settings" element={<OpinionSettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
