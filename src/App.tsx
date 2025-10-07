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
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

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
          <Route path="/scan/:clientSlug/:tag_uid" element={<ScanGateway />} />
          <Route path="/scan/:tag_uid" element={<ScanGateway />} />
          
          {/* Client Portal Routes */}
          <Route path="/client/login" element={<ClientLogin />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/campaigns/create" element={<CreateCampaign />} />
          <Route path="/client/campaigns" element={<div>Client Campaigns List - TODO</div>} />
          <Route path="/client/campaigns/:campaignId" element={<CampaignDashboard />} />
          <Route path="/client/users" element={<div>Client Users List - TODO</div>} />
          
          {/* Admin Portal Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/clients" element={<div>Admin Clients List - TODO</div>} />
          <Route path="/admin/clients/:clientId" element={<div>Admin Client Detail - TODO</div>} />
          <Route path="/admin/campaigns" element={<div>Admin Campaigns List - TODO</div>} />
          <Route path="/admin/campaigns/:campaignId" element={<CampaignDashboard />} />
          <Route path="/admin/tags" element={<div>Admin Tags Registry - TODO</div>} />
          <Route path="/admin/revenue" element={<div>Admin Revenue Dashboard - TODO</div>} />
          
          {/* Legacy/Compatibility Routes */}
          <Route path="/dashboard/:campaignId" element={<CampaignDashboard />} />
          <Route path="/campaigns/create" element={<CreateCampaign />} />
          
          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
