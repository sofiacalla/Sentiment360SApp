/**
 * Database Seeding Script
 * 
 * This script populates the database with initial demo data for the Sentiment360 application.
 * Run this script to quickly set up a working prototype with realistic sample data.
 * 
 * Usage: tsx server/seed.ts
 */

import { db } from "./db";
import {
  regionalSentiment,
  feedback,
  sentimentTrends,
  priorityItems,
  aiInsights,
  impactMetrics,
  usageMetrics,
  channels,
} from "@shared/schema";

/**
 * Main Seed Function
 * Clears existing data and inserts fresh demo data
 */
async function seed() {
  console.log("🌱 Seeding database...");

  // ============================================================================
  // Clear Existing Data
  // Delete in reverse dependency order to avoid foreign key constraints
  // ============================================================================
  await db.delete(channels);
  await db.delete(usageMetrics);
  await db.delete(impactMetrics);
  await db.delete(aiInsights);
  await db.delete(priorityItems);
  await db.delete(sentimentTrends);
  await db.delete(feedback);
  await db.delete(regionalSentiment);

  // ============================================================================
  // Seed Regional Sentiment Data
  // Sample sentiment scores for all 5 major U.S. regions
  // Scores range from 0-10 (higher is better)
  // ============================================================================
  await db.insert(regionalSentiment).values([
    { region: "Northeast", sentimentScore: "8.2" }, // Highest satisfaction
    { region: "Southeast", sentimentScore: "7.5" },
    { region: "Midwest", sentimentScore: "7.9" },
    { region: "Southwest", sentimentScore: "6.8" }, // Lowest - needs attention
    { region: "West", sentimentScore: "8.5" }, // Best performing region
  ]);

  // ============================================================================
  // Seed Customer Feedback
  // Sample feedback from various channels demonstrating different sentiment types
  // TODO: Replace with real Twitter API data
  // TODO: Replace with real Instagram API data
  // TODO: Replace with real Facebook API data
  // ============================================================================
  await db.insert(feedback).values([
    {
      text: "Amazing customer service! The support team resolved my issue within minutes. Highly recommend!",
      sentiment: "positive",
      source: "Twitter", // TODO: Connect to Twitter API
      region: "West",
    },
    {
      text: "The new update is confusing. Hard to find features I used to use daily. Please improve navigation.",
      sentiment: "negative",
      source: "Facebook", // TODO: Connect to Facebook API
      region: "Southeast",
    },
    {
      text: "Love the latest features! The app is getting better with each update. Keep up the great work!",
      sentiment: "positive",
      source: "Instagram", // TODO: Connect to Instagram API
      region: "Northeast",
    },
    {
      text: "Response time has improved significantly. Thank you for listening to feedback!",
      sentiment: "positive",
      source: "Email",
      region: "Midwest",
    },
    {
      text: "The mobile app needs work. Too many bugs and crashes frequently.",
      sentiment: "negative",
      source: "Live Chat",
      region: "Southwest",
    },
  ]);

  // ============================================================================
  // Seed Sentiment Trends
  // Historical sentiment scores showing improvement over 10 months
  // Used for trend line chart on dashboard
  // ============================================================================
  await db.insert(sentimentTrends).values([
    { month: "Jan", score: "7.2", year: 2024 }, // Starting baseline
    { month: "Feb", score: "7.4", year: 2024 },
    { month: "Mar", score: "7.1", year: 2024 }, // Slight dip
    { month: "Apr", score: "7.6", year: 2024 },
    { month: "May", score: "7.8", year: 2024 },
    { month: "Jun", score: "7.9", year: 2024 },
    { month: "Jul", score: "8.0", year: 2024 }, // Crossed 8.0 threshold
    { month: "Aug", score: "7.7", year: 2024 }, // Temporary decline
    { month: "Sep", score: "8.2", year: 2024 },
    { month: "Oct", score: "8.3", year: 2024 }, // Current - all-time high
  ]);

  // ============================================================================
  // Seed Priority Items
  // Projects for the impact vs effort prioritization matrix
  // Impact and Effort are rated 1-10
  // ============================================================================
  await db.insert(priorityItems).values([
    {
      title: "Mobile App UX Improvements",
      description: "Simplify navigation and add search functionality",
      impact: 9, // High impact
      effort: 3, // Low effort - Quick win!
      category: "Product",
      rank: 1, // Top priority
    },
    {
      title: "Customer Support Response Time",
      description: "Reduce average response time from 4h to 1h",
      impact: 9, // High impact
      effort: 6, // Medium effort
      category: "Support",
      rank: 2,
    },
    {
      title: "Bug Fixes - Payment Flow",
      description: "Address checkout issues affecting 5% of users",
      impact: 9, // High impact - affects revenue
      effort: 4, // Low-medium effort
      category: "Engineering",
      rank: 3,
    },
    {
      title: "Premium Feature Launch",
      description: "Advanced analytics dashboard for enterprise users",
      impact: 7, // Medium-high impact
      effort: 8, // High effort - Major project
      category: "Product",
      rank: 4,
    },
    {
      title: "Documentation Updates",
      description: "Expand API documentation and add more examples",
      impact: 4, // Lower impact
      effort: 2, // Very low effort
      category: "Content",
      rank: 5,
    },
  ]);

  // ============================================================================
  // Seed AI Insights
  // Data-driven recommendations based on feedback analysis
  // TODO: Replace with actual OpenAI API integration for dynamic insights
  // ============================================================================
  await db.insert(aiInsights).values([
    {
      title: "Improve Mobile App Navigation",
      description:
        "33% of negative feedback mentions difficulty finding features in the mobile app. Consider adding a search function and reorganizing the main menu.",
      priority: "high",
      impact: "Potential 15% reduction in support tickets",
      // This insight is based on analyzing feedback sentiment patterns
    },
    {
      title: "Expand Customer Support Hours",
      description:
        "Response time complaints peak between 6-9 PM EST. Adding evening support could significantly improve satisfaction scores in the Southeast region.",
      priority: "medium",
      impact: "Expected 20% improvement in response time ratings",
      // This insight correlates time-based complaints with regional data
    },
    {
      title: "Launch Feature Tutorial Series",
      description:
        "Users who complete onboarding have 2.5x higher satisfaction. Creating video tutorials for advanced features could drive engagement.",
      priority: "medium",
      impact: "Estimated 25% increase in feature adoption",
      // This insight compares user cohorts and satisfaction scores
    },
  ]);

  // ============================================================================
  // Seed Impact Metrics
  // Before/after measurements showing success of past initiatives
  // ============================================================================
  await db.insert(impactMetrics).values([
    {
      metricName: "Time to Resolution",
      beforeValue: "4.2", // Hours before improvement
      afterValue: "1.5", // Hours after improvement
      improvement: 64, // 64% improvement
      unit: "hours",
    },
    {
      metricName: "Customer Satisfaction",
      beforeValue: "7.2", // Score before
      afterValue: "8.5", // Score after
      improvement: 18, // 18% improvement
      unit: "/10",
    },
    {
      metricName: "Retention Rate",
      beforeValue: "78%",
      afterValue: "91%",
      improvement: 17, // 17 percentage point improvement
      unit: "",
    },
  ]);

  // ============================================================================
  // Seed Usage Metrics
  // Weekly user engagement and satisfaction tracking
  // Shows steady growth over 8 weeks
  // ============================================================================
  await db.insert(usageMetrics).values([
    { week: "Week 1", dailyActiveUsers: 1200, satisfactionScore: "7.2" },
    { week: "Week 2", dailyActiveUsers: 1450, satisfactionScore: "7.4" },
    { week: "Week 3", dailyActiveUsers: 1680, satisfactionScore: "7.6" },
    { week: "Week 4", dailyActiveUsers: 1820, satisfactionScore: "7.8" },
    { week: "Week 5", dailyActiveUsers: 2100, satisfactionScore: "8.0" },
    { week: "Week 6", dailyActiveUsers: 2350, satisfactionScore: "8.2" },
    { week: "Week 7", dailyActiveUsers: 2580, satisfactionScore: "8.3" },
    { week: "Week 8", dailyActiveUsers: 2820, satisfactionScore: "8.5" }, // Current week
    // Shows 135% user growth and steady satisfaction improvement
  ]);

  // ============================================================================
  // Seed Communication Channels
  // Integrated platforms for customer feedback collection
  // TODO: Add Twitter API integration for automatic message counting
  // TODO: Add Facebook API integration for automatic message counting
  // TODO: Add Instagram API integration for automatic message counting
  // ============================================================================
  await db.insert(channels).values([
    { name: "Twitter", status: "active", messageCount: "12.5K" }, // TODO: Connect Twitter API
    { name: "Facebook", status: "active", messageCount: "8.3K" }, // TODO: Connect Facebook API
    { name: "Instagram", status: "active", messageCount: "15.2K" }, // TODO: Connect Instagram API
    { name: "Email", status: "active", messageCount: "4.1K" },
    { name: "Live Chat", status: "active", messageCount: "2.8K" },
  ]);

  console.log("✅ Database seeded successfully!");
}

// ============================================================================
// Execute Seeding Script
// ============================================================================
seed()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1); // Exit with error code
  })
  .finally(() => {
    process.exit(0); // Exit successfully
  });
