import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ScanGateway from "./pages/ScanGateway";
import CampaignDashboard from "./pages/CampaignDashboard";
import CreateCampaign from "./pages/CreateCampaign";
import ClientLogin from "./pages/ClientLogin";
import ClientDashboard from "./pages/ClientDashboard";
import ClientCampaignsList from "./pages/ClientCampaignsList";
import ClientUsers from "./pages/ClientUsers";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCampaignDetail from "./pages/AdminCampaignDetail";
import AdminClientsList from "./pages/AdminClientsList";
import AdminClientDetail from "./pages/AdminClientDetail";
import AdminCampaignsList from "./pages/AdminCampaignsList";
import AdminTagsRegistry from "./pages/AdminTagsRegistry";
import AdminRevenue from "./pages/AdminRevenue";
import NotFound from "./pages/NotFound";
import ComponentShowcase from "./pages/ComponentShowcase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/showcase" element={<ComponentShowcase />} />
          <Route path="/scan" element={<ScanGateway />} />
          <Route path="/scan/:tag_uid" element={<ScanGateway />} />
          <Route path="/scan/:clientSlug/:tag_uid" element={<ScanGateway />} />

          {/* Client Portal Routes */}
          <Route path="/client/login" element={<ClientLogin />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/campaigns/create" element={<CreateCampaign />} />
          <Route path="/client/campaigns" element={<ClientCampaignsList />} />
          <Route path="/client/campaigns/:campaignId" element={<CampaignDashboard />} />
          <Route path="/client/users" element={<ClientUsers />} />

          {/* Admin Portal Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/clients" element={<AdminClientsList />} />
          <Route path="/admin/clients/:clientId" element={<AdminClientDetail />} />
          <Route path="/admin/campaigns" element={<AdminCampaignsList />} />
          <Route path="/admin/campaigns/:campaignId" element={<AdminCampaignDetail />} />
          <Route path="/admin/tags" element={<AdminTagsRegistry />} />
          <Route path="/admin/revenue" element={<AdminRevenue />} />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
