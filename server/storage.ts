import {
  regionalSentiment,
  feedback,
  sentimentTrends,
  priorityItems,
  aiInsights,
  impactMetrics,
  usageMetrics,
  channels,
  type RegionalSentiment,
  type Feedback,
  type InsertFeedback,
  type SentimentTrend,
  type PriorityItem,
  type InsertPriorityItem,
  type AIInsight,
  type InsertAIInsight,
  type ImpactMetric,
  type UsageMetric,
  type Channel,
  type InsertChannel,
} from "@shared/schema";
import { db } from "./db";
import { desc } from "drizzle-orm";

export interface IStorage {
  // Regional sentiment
  getRegionalSentiment(): Promise<RegionalSentiment[]>;
  
  // Feedback
  getRecentFeedback(limit?: number): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  
  // Sentiment trends
  getSentimentTrends(): Promise<SentimentTrend[]>;
  
  // Priority items
  getPriorityItems(): Promise<PriorityItem[]>;
  createPriorityItem(item: InsertPriorityItem): Promise<PriorityItem>;
  
  // AI insights
  getAIInsights(): Promise<AIInsight[]>;
  createAIInsight(insight: InsertAIInsight): Promise<AIInsight>;
  
  // Impact metrics
  getImpactMetrics(): Promise<ImpactMetric[]>;
  
  // Usage metrics
  getUsageMetrics(): Promise<UsageMetric[]>;
  
  // Channels
  getChannels(): Promise<Channel[]>;
  createChannel(channel: InsertChannel): Promise<Channel>;
}

export class DatabaseStorage implements IStorage {
  async getRegionalSentiment(): Promise<RegionalSentiment[]> {
    return await db.select().from(regionalSentiment);
  }
  
  async getRecentFeedback(limit: number = 10): Promise<Feedback[]> {
    return await db
      .select()
      .from(feedback)
      .orderBy(desc(feedback.timestamp))
      .limit(limit);
  }
  
  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const [newFeedback] = await db
      .insert(feedback)
      .values(insertFeedback)
      .returning();
    return newFeedback;
  }
  
  async getSentimentTrends(): Promise<SentimentTrend[]> {
    return await db.select().from(sentimentTrends);
  }
  
  async getPriorityItems(): Promise<PriorityItem[]> {
    return await db.select().from(priorityItems);
  }
  
  async createPriorityItem(item: InsertPriorityItem): Promise<PriorityItem> {
    const [newItem] = await db
      .insert(priorityItems)
      .values(item)
      .returning();
    return newItem;
  }
  
  async getAIInsights(): Promise<AIInsight[]> {
    return await db
      .select()
      .from(aiInsights)
      .orderBy(desc(aiInsights.createdAt));
  }
  
  async createAIInsight(insight: InsertAIInsight): Promise<AIInsight> {
    const [newInsight] = await db
      .insert(aiInsights)
      .values(insight)
      .returning();
    return newInsight;
  }
  
  async getImpactMetrics(): Promise<ImpactMetric[]> {
    return await db.select().from(impactMetrics);
  }
  
  async getUsageMetrics(): Promise<UsageMetric[]> {
    return await db.select().from(usageMetrics);
  }
  
  async getChannels(): Promise<Channel[]> {
    return await db.select().from(channels);
  }
  
  async createChannel(insertChannel: InsertChannel): Promise<Channel> {
    const [newChannel] = await db
      .insert(channels)
      .values(insertChannel)
      .returning();
    return newChannel;
  }
}

export const storage = new DatabaseStorage();
