// Import Switch and Route components from wouter library for client-side routing
import { Switch, Route } from "wouter";
// Import queryClient instance for managing React Query cache
import { queryClient } from "./lib/queryClient";
// Import QueryClientProvider to provide React Query context to all child components
import { QueryClientProvider } from "@tanstack/react-query";
// Import Toaster component to display toast notifications
import { Toaster } from "@/components/ui/toaster";
// Import TooltipProvider to enable tooltips throughout the application
import { TooltipProvider } from "@/components/ui/tooltip";
// Import Navigation component for the top navigation bar
import Navigation from "@/components/Navigation";
// Import Dashboard page component
import Dashboard from "@/pages/Dashboard";
// Import Prioritization page component
import Prioritization from "@/pages/Prioritization";
// Import ImpactTracker page component
import ImpactTracker from "@/pages/ImpactTracker";
// Import Manage page component
import Manage from "@/pages/Manage";

// Define the Router function component
// Handles client-side routing using wouter Switch and Route components
function Router() {
  // Return the JSX for routing configuration
  return (
    // Switch component - renders the first matching route
    <Switch>
      {/* Root route "/" - renders Dashboard component */}
      <Route path="/" component={Dashboard} />
      {/* Prioritization route "/prioritization" - renders Prioritization component */}
      <Route path="/prioritization" component={Prioritization} />
      {/* Impact Tracker route "/impact" - renders ImpactTracker component */}
      <Route path="/impact" component={ImpactTracker} />
      {/* Manage route "/manage" - renders Manage component */}
      <Route path="/manage" component={Manage} />
    </Switch> // Close Switch component
  ); // Close return statement
} // Close Router function

// Define the main App function component
// Root component that provides context providers and renders the application structure
function App() {
  // Return the JSX for the application
  return (
    // QueryClientProvider - provides React Query functionality to all child components
    // Enables data fetching, caching, and state management throughout the app
    <QueryClientProvider client={queryClient}>
      {/* TooltipProvider - enables tooltip functionality for all child components */}
      <TooltipProvider>
        {/* Main application container div */}
        {/* min-h-screen: ensures container is at least full viewport height */}
        {/* bg-background: applies the theme background color */}
        <div className="min-h-screen bg-background">
          {/* Navigation component - renders the top navigation bar */}
          <Navigation />
          {/* Router component - renders the appropriate page based on current route */}
          <Router />
        </div> {/* Close main container div */}
        {/* Toaster component - portal for rendering toast notifications */}
        {/* Positioned at bottom-right of screen by default */}
        <Toaster />
      </TooltipProvider> {/* Close TooltipProvider */}
    </QueryClientProvider> // Close QueryClientProvider
  ); // Close return statement
} // Close App function

// Export App component as the default export
// This makes it available for import in other files (e.g., main.tsx)
export default App;
