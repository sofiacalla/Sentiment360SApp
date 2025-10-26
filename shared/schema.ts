/**
 * Database Schema Definition
 * 
 * This file defines the PostgreSQL database schema using Drizzle ORM.
 * It includes table definitions, validation schemas, and TypeScript types
 * for the Sentiment360 analytics platform.
 */

import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Regional Sentiment Table
 * Stores aggregated sentiment scores for different U.S. regions
 */
export const regionalSentiment = pgTable("regional_sentiment", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`), // Auto-generated UUID
  region: text("region").notNull(), // Region name (e.g., "Northeast", "West")
  sentimentScore: decimal("sentiment_score", { precision: 3, scale: 1 }).notNull(), // Score 0.0-10.0
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`), // Last update timestamp
});

/**
 * Customer Feedback Table
 * Stores individual customer feedback entries from various channels
 */
export const feedback = pgTable("feedback", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`), // Auto-generated UUID
  text: text("text").notNull(), // Feedback content
  sentiment: text("sentiment").notNull(), // Sentiment classification: positive, negative, neutral
  source: text("source").notNull(), // Channel: Twitter, Facebook, Instagram, Email, Live Chat
  region: text("region").notNull(), // U.S. region where feedback originated
  timestamp: timestamp("timestamp").notNull().default(sql`now()`), // When feedback was received
});

/**
 * Sentiment Trends Table
 * Stores historical sentiment score data points for trend analysis
 */
export const sentimentTrends = pgTable("sentiment_trends", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`), // Auto-generated UUID
  month: text("month").notNull(), // Month abbreviation (e.g., "Jan", "Feb")
  score: decimal("score", { precision: 3, scale: 1 }).notNull(), // Sentiment score for the month
  year: integer("year").notNull(), // Year (e.g., 2024)
});

/**
 * Priority Items Table
 * Stores improvement initiatives for the prioritization matrix
 */
export const priorityItems = pgTable("priority_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`), // Auto-generated UUID
  title: text("title").notNull(), // Short title of the initiative
  description: text("description").notNull(), // Detailed description
  impact: integer("impact").notNull(), // Business impact score (1-10)
  effort: integer("effort").notNull(), // Implementation effort score (1-10)
  category: text("category").notNull(), // Category (Product, Support, Engineering, etc.)
  rank: integer("rank").notNull(), // Priority ranking
});

/**
 * AI Insights Table
 * Stores AI-generated recommendations based on feedback analysis
 * TODO: Replace with actual OpenAI API integration
 */
export const aiInsights = pgTable("ai_insights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`), // Auto-generated UUID
  title: text("title").notNull(), // Insight title
  description: text("description").notNull(), // Detailed recommendation with data references
  priority: text("priority").notNull(), // Priority level: high, medium, low
  impact: text("impact").notNull(), // Expected impact statement
  createdAt: timestamp("created_at").notNull().default(sql`now()`), // When insight was generated
});

/**
 * Impact Metrics Table
 * Stores before/after metrics to measure success of implemented changes
 */
export const impactMetrics = pgTable("impact_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`), // Auto-generated UUID
  metricName: text("metric_name").notNull(), // Name of metric being tracked
  beforeValue: text("before_value").notNull(), // Value before change
  afterValue: text("after_value").notNull(), // Value after change
  improvement: integer("improvement").notNull(), // Percentage improvement
  unit: text("unit"), // Unit of measurement (e.g., "hours", "/10", "%")
});

/**
 * Usage Metrics Table
 * Stores weekly user engagement and satisfaction data
 */
export const usageMetrics = pgTable("usage_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`), // Auto-generated UUID
  week: text("week").notNull(), // Week label (e.g., "Week 1", "Week 2")
  dailyActiveUsers: integer("daily_active_users").notNull(), // Number of daily active users
  satisfactionScore: decimal("satisfaction_score", { precision: 3, scale: 1 }).notNull(), // Satisfaction score
});

/**
 * Channels Table
 * Stores integrated communication channel information
 * TODO: Add Twitter API integration
 * TODO: Add Instagram API integration
 * TODO: Add Facebook API integration
 */
export const channels = pgTable("channels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`), // Auto-generated UUID
  name: text("name").notNull(), // Channel name (e.g., "Twitter", "Email")
  status: text("status").notNull(), // Status: active or inactive
  messageCount: text("message_count").notNull(), // Formatted message count (e.g., "2.5K")
});

// ============================================================================
// Insert Schemas for Validation
// These schemas validate data before inserting into the database
// Auto-generated fields (id, timestamps) are omitted from validation
// ============================================================================

export const insertRegionalSentimentSchema = createInsertSchema(regionalSentiment).omit({
  id: true, // Auto-generated
  updatedAt: true, // Auto-generated
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true, // Auto-generated
  timestamp: true, // Auto-generated
});

export const insertSentimentTrendSchema = createInsertSchema(sentimentTrends).omit({
  id: true, // Auto-generated
});

export const insertPriorityItemSchema = createInsertSchema(priorityItems).omit({
  id: true, // Auto-generated
});

export const insertAIInsightSchema = createInsertSchema(aiInsights).omit({
  id: true, // Auto-generated
  createdAt: true, // Auto-generated
});

export const insertImpactMetricSchema = createInsertSchema(impactMetrics).omit({
  id: true, // Auto-generated
});

export const insertUsageMetricSchema = createInsertSchema(usageMetrics).omit({
  id: true, // Auto-generated
});

export const insertChannelSchema = createInsertSchema(channels).omit({
  id: true, // Auto-generated
});

// ============================================================================
// TypeScript Types
// These types are inferred from the schemas for type-safe data handling
// ============================================================================

// Regional Sentiment types
export type RegionalSentiment = typeof regionalSentiment.$inferSelect;
export type InsertRegionalSentiment = z.infer<typeof insertRegionalSentimentSchema>;

// Feedback types
export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;

// Sentiment Trend types
export type SentimentTrend = typeof sentimentTrends.$inferSelect;
export type InsertSentimentTrend = z.infer<typeof insertSentimentTrendSchema>;

// Priority Item types
export type PriorityItem = typeof priorityItems.$inferSelect;
export type InsertPriorityItem = z.infer<typeof insertPriorityItemSchema>;

// AI Insight types
export type AIInsight = typeof aiInsights.$inferSelect;
export type InsertAIInsight = z.infer<typeof insertAIInsightSchema>;

// Impact Metric types
export type ImpactMetric = typeof impactMetrics.$inferSelect;
export type InsertImpactMetric = z.infer<typeof insertImpactMetricSchema>;

// Usage Metric types
export type UsageMetric = typeof usageMetrics.$inferSelect;
export type InsertUsageMetric = z.infer<typeof insertUsageMetricSchema>;

// Channel types
export type Channel = typeof channels.$inferSelect;
export type InsertChannel = z.infer<typeof insertChannelSchema>;
