import { Link, useLocation } from "wouter";
import { BarChart3, Target, TrendingUp } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  const tabs = [
    { path: "/", label: "Dashboard", icon: BarChart3 },
    { path: "/prioritization", label: "Prioritization", icon: Target },
    { path: "/impact", label: "Impact Tracker", icon: TrendingUp },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold">Sentiment360</span>
          </div>
          
          <div className="flex gap-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location === tab.path;
              return (
                <Link key={tab.path} href={tab.path}>
                  <button
                    data-testid={`nav-${tab.label.toLowerCase()}`}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors border-b-2 ${
                      isActive
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline">{tab.label}</span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
