import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Regional sentiment data
export const regionalSentiment = pgTable("regional_sentiment", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  region: text("region").notNull(),
  sentimentScore: decimal("sentiment_score", { precision: 3, scale: 1 }).notNull(),
  updatedAt: timestamp("updated_at").notNull().default(sql`now()`),
});

// Customer feedback entries
export const feedback = pgTable("feedback", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  text: text("text").notNull(),
  sentiment: text("sentiment").notNull(), // positive, negative, neutral
  source: text("source").notNull(), // Twitter, Facebook, Instagram, Email, Live Chat
  region: text("region").notNull(),
  timestamp: timestamp("timestamp").notNull().default(sql`now()`),
});

// Sentiment trend data points
export const sentimentTrends = pgTable("sentiment_trends", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  month: text("month").notNull(),
  score: decimal("score", { precision: 3, scale: 1 }).notNull(),
  year: integer("year").notNull(),
});

// Priority items for improvement
export const priorityItems = pgTable("priority_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  impact: integer("impact").notNull(), // 1-10
  effort: integer("effort").notNull(), // 1-10
  category: text("category").notNull(),
  rank: integer("rank").notNull(),
});

// AI-generated insights
export const aiInsights = pgTable("ai_insights", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: text("priority").notNull(), // high, medium, low
  impact: text("impact").notNull(),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

// Impact metrics
export const impactMetrics = pgTable("impact_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  metricName: text("metric_name").notNull(),
  beforeValue: text("before_value").notNull(),
  afterValue: text("after_value").notNull(),
  improvement: integer("improvement").notNull(), // percentage
  unit: text("unit"),
});

// Usage metrics over time
export const usageMetrics = pgTable("usage_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  week: text("week").notNull(),
  dailyActiveUsers: integer("daily_active_users").notNull(),
  satisfactionScore: decimal("satisfaction_score", { precision: 3, scale: 1 }).notNull(),
});

// Integrated channels
export const channels = pgTable("channels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  status: text("status").notNull(), // active, inactive
  messageCount: text("message_count").notNull(),
});

// Insert schemas
export const insertRegionalSentimentSchema = createInsertSchema(regionalSentiment).omit({
  id: true,
  updatedAt: true,
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  timestamp: true,
});

export const insertSentimentTrendSchema = createInsertSchema(sentimentTrends).omit({
  id: true,
});

export const insertPriorityItemSchema = createInsertSchema(priorityItems).omit({
  id: true,
});

export const insertAIInsightSchema = createInsertSchema(aiInsights).omit({
  id: true,
  createdAt: true,
});

export const insertImpactMetricSchema = createInsertSchema(impactMetrics).omit({
  id: true,
});

export const insertUsageMetricSchema = createInsertSchema(usageMetrics).omit({
  id: true,
});

export const insertChannelSchema = createInsertSchema(channels).omit({
  id: true,
});

// Types
export type RegionalSentiment = typeof regionalSentiment.$inferSelect;
export type InsertRegionalSentiment = z.infer<typeof insertRegionalSentimentSchema>;

export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;

export type SentimentTrend = typeof sentimentTrends.$inferSelect;
export type InsertSentimentTrend = z.infer<typeof insertSentimentTrendSchema>;

export type PriorityItem = typeof priorityItems.$inferSelect;
export type InsertPriorityItem = z.infer<typeof insertPriorityItemSchema>;

export type AIInsight = typeof aiInsights.$inferSelect;
export type InsertAIInsight = z.infer<typeof insertAIInsightSchema>;

export type ImpactMetric = typeof impactMetrics.$inferSelect;
export type InsertImpactMetric = z.infer<typeof insertImpactMetricSchema>;

export type UsageMetric = typeof usageMetrics.$inferSelect;
export type InsertUsageMetric = z.infer<typeof insertUsageMetricSchema>;

export type Channel = typeof channels.$inferSelect;
export type InsertChannel = z.infer<typeof insertChannelSchema>;
