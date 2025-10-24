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

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(channels);
  await db.delete(usageMetrics);
  await db.delete(impactMetrics);
  await db.delete(aiInsights);
  await db.delete(priorityItems);
  await db.delete(sentimentTrends);
  await db.delete(feedback);
  await db.delete(regionalSentiment);

  // Seed regional sentiment
  await db.insert(regionalSentiment).values([
    { region: "Northeast", sentimentScore: "8.2" },
    { region: "Southeast", sentimentScore: "7.5" },
    { region: "Midwest", sentimentScore: "7.9" },
    { region: "Southwest", sentimentScore: "6.8" },
    { region: "West", sentimentScore: "8.5" },
  ]);

  // Seed feedback
  await db.insert(feedback).values([
    {
      text: "Amazing customer service! The support team resolved my issue within minutes. Highly recommend!",
      sentiment: "positive",
      source: "Twitter",
      region: "West",
    },
    {
      text: "The new update is confusing. Hard to find features I used to use daily. Please improve navigation.",
      sentiment: "negative",
      source: "Facebook",
      region: "Southeast",
    },
    {
      text: "Love the latest features! The app is getting better with each update. Keep up the great work!",
      sentiment: "positive",
      source: "Instagram",
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

  // Seed sentiment trends
  await db.insert(sentimentTrends).values([
    { month: "Jan", score: "7.2", year: 2024 },
    { month: "Feb", score: "7.4", year: 2024 },
    { month: "Mar", score: "7.1", year: 2024 },
    { month: "Apr", score: "7.6", year: 2024 },
    { month: "May", score: "7.8", year: 2024 },
    { month: "Jun", score: "7.9", year: 2024 },
    { month: "Jul", score: "8.0", year: 2024 },
    { month: "Aug", score: "7.7", year: 2024 },
    { month: "Sep", score: "8.2", year: 2024 },
    { month: "Oct", score: "8.3", year: 2024 },
  ]);

  // Seed priority items
  await db.insert(priorityItems).values([
    {
      title: "Mobile App UX Improvements",
      description: "Simplify navigation and add search functionality",
      impact: 9,
      effort: 3,
      category: "Product",
      rank: 1,
    },
    {
      title: "Customer Support Response Time",
      description: "Reduce average response time from 4h to 1h",
      impact: 9,
      effort: 6,
      category: "Support",
      rank: 2,
    },
    {
      title: "Bug Fixes - Payment Flow",
      description: "Address checkout issues affecting 5% of users",
      impact: 9,
      effort: 4,
      category: "Engineering",
      rank: 3,
    },
    {
      title: "Premium Feature Launch",
      description: "Advanced analytics dashboard for enterprise users",
      impact: 7,
      effort: 8,
      category: "Product",
      rank: 4,
    },
    {
      title: "Documentation Updates",
      description: "Expand API documentation and add more examples",
      impact: 4,
      effort: 2,
      category: "Content",
      rank: 5,
    },
  ]);

  // Seed AI insights
  await db.insert(aiInsights).values([
    {
      title: "Improve Mobile App Navigation",
      description:
        "33% of negative feedback mentions difficulty finding features in the mobile app. Consider adding a search function and reorganizing the main menu.",
      priority: "high",
      impact: "Potential 15% reduction in support tickets",
    },
    {
      title: "Expand Customer Support Hours",
      description:
        "Response time complaints peak between 6-9 PM EST. Adding evening support could significantly improve satisfaction scores in the Southeast region.",
      priority: "medium",
      impact: "Expected 20% improvement in response time ratings",
    },
    {
      title: "Launch Feature Tutorial Series",
      description:
        "Users who complete onboarding have 2.5x higher satisfaction. Creating video tutorials for advanced features could drive engagement.",
      priority: "medium",
      impact: "Estimated 25% increase in feature adoption",
    },
  ]);

  // Seed impact metrics
  await db.insert(impactMetrics).values([
    {
      metricName: "Time to Resolution",
      beforeValue: "4.2",
      afterValue: "1.5",
      improvement: 64,
      unit: "hours",
    },
    {
      metricName: "Customer Satisfaction",
      beforeValue: "7.2",
      afterValue: "8.5",
      improvement: 18,
      unit: "/10",
    },
    {
      metricName: "Retention Rate",
      beforeValue: "78%",
      afterValue: "91%",
      improvement: 17,
      unit: "",
    },
  ]);

  // Seed usage metrics
  await db.insert(usageMetrics).values([
    { week: "Week 1", dailyActiveUsers: 1200, satisfactionScore: "7.2" },
    { week: "Week 2", dailyActiveUsers: 1450, satisfactionScore: "7.4" },
    { week: "Week 3", dailyActiveUsers: 1680, satisfactionScore: "7.6" },
    { week: "Week 4", dailyActiveUsers: 1820, satisfactionScore: "7.8" },
    { week: "Week 5", dailyActiveUsers: 2100, satisfactionScore: "8.0" },
    { week: "Week 6", dailyActiveUsers: 2350, satisfactionScore: "8.2" },
    { week: "Week 7", dailyActiveUsers: 2580, satisfactionScore: "8.3" },
    { week: "Week 8", dailyActiveUsers: 2820, satisfactionScore: "8.5" },
  ]);

  // Seed channels
  await db.insert(channels).values([
    { name: "Twitter", status: "active", messageCount: "12.5K" },
    { name: "Facebook", status: "active", messageCount: "8.3K" },
    { name: "Instagram", status: "active", messageCount: "15.2K" },
    { name: "Email", status: "active", messageCount: "4.1K" },
    { name: "Live Chat", status: "active", messageCount: "2.8K" },
  ]);

  console.log("✅ Database seeded successfully!");
}

seed()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
