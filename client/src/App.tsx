/**
 * ROOT APPLICATION COMPONENT
 * 
 * Sets up the application structure with:
 * - QueryClientProvider: Enables React Query for data fetching/caching
 * - TooltipProvider: Enables tooltips throughout the app
 * - Navigation: Top navigation bar
 * - Router: Client-side routing to different pages
 * - Toaster: Toast notification system
 */

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Dashboard from "@/pages/Dashboard";
import Prioritization from "@/pages/Prioritization";
import ImpactTracker from "@/pages/ImpactTracker";
import Manage from "@/pages/Manage";

/**
 * ROUTER CONFIGURATION
 * Maps URL paths to page components using wouter
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/prioritization" component={Prioritization} />
      <Route path="/impact" component={ImpactTracker} />
      <Route path="/manage" component={Manage} />
    </Switch>
  );
}

/**
 * MAIN APP COMPONENT
 * Wraps the entire application with necessary providers
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
