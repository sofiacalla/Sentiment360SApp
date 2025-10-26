// Import Link component for client-side navigation and useLocation hook to get current route
import { Link, useLocation } from "wouter";
// Import icons from lucide-react for navigation tabs
import { BarChart3, Target, TrendingUp, Settings } from "lucide-react";

// Export the Navigation component as default export
export default function Navigation() {
  // Get current location (route) from wouter
  // Returns array where first element is current path string
  const [location] = useLocation();

  // Define navigation tabs configuration
  // Each tab has a path, label, and icon component
  const tabs = [
    // Dashboard tab - home page showing sentiment overview
    { path: "/", label: "Dashboard", icon: BarChart3 },
    // Prioritization tab - shows impact vs effort matrix
    { path: "/prioritization", label: "Prioritization", icon: Target },
    // Impact Tracker tab - shows success metrics
    { path: "/impact", label: "Impact Tracker", icon: TrendingUp },
    // Manage tab - data entry forms
    { path: "/manage", label: "Manage", icon: Settings },
  ]; // Close tabs array

  // Return the JSX for the navigation bar
  return (
    // Navigation element - fixed position at top of page with high z-index
    // fixed: stays in place when scrolling
    // top-0 left-0 right-0: spans full width at top
    // z-50: appears above other content
    // bg-background: uses theme background color
    // border-b: adds bottom border
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      {/* Max-width container centered on page with responsive padding */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Flex container for logo and tabs with fixed height */}
        <div className="flex items-center justify-between h-16">
          {/* Logo section - left side of navbar */}
          <div className="flex items-center gap-2">
            {/* Bar chart icon in primary color */}
            <BarChart3 className="w-6 h-6 text-primary" />
            {/* Application name/brand text */}
            <span className="text-xl font-semibold">Sentiment360</span>
          </div>
          
          {/* Navigation tabs section - right side of navbar */}
          <div className="flex gap-6">
            {/* Map over tabs array to create navigation links */}
            {tabs.map((tab) => {
              // Extract Icon component from tab object
              const Icon = tab.icon;
              // Check if current route matches this tab's path
              const isActive = location === tab.path;
              // Return JSX for each tab
              return (
                // Link component from wouter for client-side navigation
                // key: unique identifier for React list rendering
                // href: destination path when clicked
                <Link key={tab.path} href={tab.path}>
                  {/* Button element for the tab */}
                  <button
                    // Test ID for automated testing - converts label to lowercase
                    data-testid={`nav-${tab.label.toLowerCase()}`}
                    // Dynamic className based on active state
                    // Template literal with conditional styling
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors border-b-2 ${
                      // If tab is active (current route)
                      isActive
                        // Active styles: primary border color and foreground text
                        ? "border-primary text-foreground"
                        // Inactive styles: transparent border, muted text, hover effect
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`} // Close className template literal
                  > {/* Close button opening tag */}
                    {/* Render the icon component with small size */}
                    <Icon className="w-4 h-4" />
                    {/* Tab label text - hidden on small screens, visible on medium+ */}
                    <span className="hidden md:inline">{tab.label}</span>
                  </button> {/* Close button element */}
                </Link> // Close Link component
              ); // Close return statement
            })} {/* Close map function */}
          </div> {/* Close navigation tabs container */}
        </div> {/* Close flex container */}
      </div> {/* Close max-width container */}
    </nav> // Close navigation element
  ); // Close return statement
} // Close Navigation function component
