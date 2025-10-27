/**
 * Information Page Component
 * 
 * This page provides comprehensive information about Sentiment360:
 * - Overview of the platform and its purpose
 * - Key features and capabilities
 * - How each feature works
 * - Compelling use cases demonstrating real-world applications
 * - Getting started guide
 * 
 * This page helps end users understand the value proposition and
 * how to effectively use the analytics platform.
 */

import { Card } from "@/components/ui/card";
import { 
  Info, 
  BarChart3, 
  Target, 
  TrendingUp, 
  Settings,
  Lightbulb,
  Users,
  MessageSquare,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function Information() {
  return (
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      <div className="max-w-5xl mx-auto">
        
        {/* ============================================================================
            PAGE HEADER
            Introduction to the platform with key value proposition
            ============================================================================ */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Info className="w-8 h-8 text-primary" />
            <h1 className="text-3xl lg:text-4xl font-semibold">About Sentiment360</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Transform customer feedback into actionable insights with AI-powered analytics
          </p>
        </div>

        {/* ============================================================================
            PLATFORM OVERVIEW
            What Sentiment360 is and why it exists
            ============================================================================ */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">What is Sentiment360?</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Sentiment360 is a comprehensive customer sentiment analytics platform designed to help businesses 
            understand, prioritize, and act on customer feedback across multiple channels. By consolidating 
            feedback from social media, email, live chat, and other sources, Sentiment360 provides a unified 
            view of customer sentiment and identifies the most impactful improvement opportunities.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The platform uses data-driven prioritization to recommend which initiatives will have the greatest 
            positive impact on customer experience, helping teams focus their efforts where they matter most.
          </p>
        </Card>

        {/* ============================================================================
            KEY FEATURES SECTION
            Overview of the four main features with icons
            ============================================================================ */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* FEATURE 1: Dashboard */}
            <Card className="p-5 hover-elevate">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Customer Sentiment Dashboard</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time sentiment metrics, regional analysis, and feedback highlights. 
                    Track sentiment trends over time with interactive charts showing 30-day, 
                    90-day, and historical views.
                  </p>
                </div>
              </div>
            </Card>

            {/* FEATURE 2: Prioritization Engine */}
            <Card className="p-5 hover-elevate">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Prioritization Engine</h3>
                  <p className="text-sm text-muted-foreground">
                    Data-driven recommendations based on impact vs. effort analysis. 
                    Visualize priorities on an interactive matrix and get AI-generated insights 
                    with actionable recommendations.
                  </p>
                </div>
              </div>
            </Card>

            {/* FEATURE 3: Impact Tracker */}
            <Card className="p-5 hover-elevate">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Impact Tracker</h3>
                  <p className="text-sm text-muted-foreground">
                    Measure the success of your initiatives with before/after comparisons. 
                    Track key metrics like satisfaction scores, response times, and user 
                    engagement over time.
                  </p>
                </div>
              </div>
            </Card>

            {/* FEATURE 4: Data Management */}
            <Card className="p-5 hover-elevate">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Data Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Easily add feedback, priority items, and communication channels. 
                    Centralized interface for managing all customer interaction data with 
                    validation and error handling.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ============================================================================
            HOW IT WORKS SECTION
            Step-by-step workflow explanation
            ============================================================================ */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          
          <div className="space-y-4">
            {/* STEP 1: Data Collection */}
            <div className="flex gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Collect Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  Customer feedback flows in from multiple channels including social media 
                  (Twitter, Facebook, Instagram), email, and live chat. Each piece of feedback 
                  is automatically tagged with sentiment (positive, negative, neutral), source, 
                  and geographic region.
                </p>
              </div>
            </div>

            {/* STEP 2: Analysis */}
            <div className="flex gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Analyze Sentiment</h3>
                <p className="text-sm text-muted-foreground">
                  The Dashboard displays real-time sentiment scores aggregated by region and time period. 
                  Interactive charts show trends over 30 days, 90 days, or all historical data, helping you 
                  identify patterns and anomalies in customer sentiment.
                </p>
              </div>
            </div>

            {/* STEP 3: Prioritization */}
            <div className="flex gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Prioritize Actions</h3>
                <p className="text-sm text-muted-foreground">
                  The Prioritization Engine evaluates improvement opportunities using an impact vs. effort 
                  matrix. AI-generated insights provide specific recommendations with expected impact, 
                  implementation timelines, and key metrics to track. This helps teams focus on high-impact, 
                  low-effort wins first.
                </p>
              </div>
            </div>

            {/* STEP 4: Implementation & Tracking */}
            <div className="flex gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Implement & Track Impact</h3>
                <p className="text-sm text-muted-foreground">
                  As you implement improvements, the Impact Tracker measures their effectiveness with 
                  before/after comparisons. Track metrics like customer satisfaction, response times, 
                  and recurrence rates to quantify the success of your initiatives and demonstrate ROI.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* ============================================================================
            USE CASES SECTION
            Real-world examples demonstrating platform value
            ============================================================================ */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-primary" />
            Compelling Use Cases
          </h2>
          
          <div className="space-y-4">
            
            {/* USE CASE 1: E-commerce Company */}
            <Card className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <Users className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">E-commerce Company: Reducing Cart Abandonment</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Challenge:</strong> An online retailer noticed declining conversion rates but 
                    struggled to identify the root cause among hundreds of customer feedback messages.
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Solution:</strong> Using Sentiment360, they discovered that 60% of negative 
                    feedback from the West region mentioned "checkout complexity." The platform's AI insights 
                    recommended simplifying the checkout flow and estimated a potential 15% increase in 
                    conversions.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      <strong>Result:</strong> After implementing the recommended changes, the Impact Tracker 
                      showed cart abandonment decreased by 22% and customer satisfaction increased from 7.2 to 8.4.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* USE CASE 2: SaaS Platform */}
            <Card className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <MessageSquare className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">SaaS Platform: Improving Customer Support</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Challenge:</strong> A software company's support team was overwhelmed with tickets, 
                    but management couldn't justify hiring more staff without clear data.
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Solution:</strong> Sentiment360 aggregated support channel data and identified that 
                    40% of tickets were about the same three features. The Prioritization Engine recommended 
                    creating comprehensive documentation for these features as a high-impact, low-effort solution.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      <strong>Result:</strong> Support ticket volume decreased by 35% within 2 months, average 
                      resolution time improved from 4.2 hours to 2.1 hours, and customer satisfaction scores 
                      increased by 18%.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* USE CASE 3: Restaurant Chain */}
            <Card className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Restaurant Chain: Regional Menu Optimization</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Challenge:</strong> A national restaurant chain received mixed feedback about menu 
                    items but couldn't identify which items to keep, modify, or remove.
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Solution:</strong> The Regional Sentiment analysis in Sentiment360 revealed that 
                    Southern customers loved spicy menu items (8.9 sentiment score) while Northeast customers 
                    rated them poorly (5.2 score). The platform recommended regionalizing the menu.
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      <strong>Result:</strong> After implementing regional menu variations, overall customer 
                      satisfaction increased from 7.6 to 8.7, and social media mentions increased by 45% with 
                      predominantly positive sentiment.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ============================================================================
            GETTING STARTED SECTION
            Quick guide to begin using the platform
            ============================================================================ */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm">
                  <strong>Step 1:</strong> Navigate to the <strong>Data Management</strong> page to add 
                  your customer feedback, priority items, and communication channels.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm">
                  <strong>Step 2:</strong> View the <strong>Dashboard</strong> to see real-time sentiment 
                  metrics, regional analysis, and feedback trends. Use the time period filters to analyze 
                  different timeframes.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm">
                  <strong>Step 3:</strong> Check the <strong>Prioritization Engine</strong> to identify 
                  high-impact improvement opportunities. Review AI-generated insights for specific 
                  recommendations.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm">
                  <strong>Step 4:</strong> After implementing changes, use the <strong>Impact Tracker</strong> 
                  to measure success with before/after comparisons and track key metrics over time.
                </p>
              </div>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
