/**
 * Data Storage Layer
 * 
 * This file implements the storage interface for interacting with the database.
 * It provides a clean abstraction layer between the API routes and database operations.
 */

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

/**
 * Storage Interface
 * Defines all database operations available in the application
 */
export interface IStorage {
  // Regional sentiment operations
  getRegionalSentiment(): Promise<RegionalSentiment[]>;
  
  // Feedback operations
  getRecentFeedback(limit?: number): Promise<Feedback[]>;
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  
  // Sentiment trends operations
  getSentimentTrends(): Promise<SentimentTrend[]>;
  
  // Priority items operations
  getPriorityItems(): Promise<PriorityItem[]>;
  createPriorityItem(item: InsertPriorityItem): Promise<PriorityItem>;
  
  // AI insights operations
  getAIInsights(): Promise<AIInsight[]>;
  createAIInsight(insight: InsertAIInsight): Promise<AIInsight>;
  
  // Impact metrics operations
  getImpactMetrics(): Promise<ImpactMetric[]>;
  
  // Usage metrics operations
  getUsageMetrics(): Promise<UsageMetric[]>;
  
  // Channels operations
  getChannels(): Promise<Channel[]>;
  createChannel(channel: InsertChannel): Promise<Channel>;
}

/**
 * Database Storage Implementation
 * Implements the IStorage interface using Drizzle ORM and PostgreSQL
 */
export class DatabaseStorage implements IStorage {
  /**
   * Get Regional Sentiment Data
   * Fetches sentiment scores for all regions
   * @returns Array of regional sentiment data
   */
  async getRegionalSentiment(): Promise<RegionalSentiment[]> {
    return await db.select().from(regionalSentiment);
  }
  
  /**
   * Get Recent Feedback
   * Fetches the most recent customer feedback entries
   * @param limit - Maximum number of feedback items to return (default: 10)
   * @returns Array of feedback items ordered by timestamp (newest first)
   */
  async getRecentFeedback(limit: number = 10): Promise<Feedback[]> {
    return await db
      .select()
      .from(feedback)
      .orderBy(desc(feedback.timestamp)) // Sort by newest first
      .limit(limit);
  }
  
  /**
   * Create New Feedback
   * Inserts a new customer feedback entry into the database
   * @param insertFeedback - Feedback data to insert
   * @returns The newly created feedback entry with generated ID
   */
  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const [newFeedback] = await db
      .insert(feedback)
      .values(insertFeedback)
      .returning(); // Return the created record
    return newFeedback;
  }
  
  /**
   * Get Sentiment Trends
   * Fetches historical sentiment trend data for charts
   * @returns Array of sentiment trend data points
   */
  async getSentimentTrends(): Promise<SentimentTrend[]> {
    return await db.select().from(sentimentTrends);
  }
  
  /**
   * Get Priority Items
   * Fetches all priority items for the impact vs effort matrix
   * @returns Array of priority items
   */
  async getPriorityItems(): Promise<PriorityItem[]> {
    return await db.select().from(priorityItems);
  }
  
  /**
   * Create Priority Item
   * Inserts a new priority item into the database
   * @param item - Priority item data to insert
   * @returns The newly created priority item with generated ID
   */
  async createPriorityItem(item: InsertPriorityItem): Promise<PriorityItem> {
    const [newItem] = await db
      .insert(priorityItems)
      .values(item)
      .returning(); // Return the created record
    return newItem;
  }
  
  /**
   * Get AI Insights
   * Fetches AI-generated insights ordered by creation date
   * @returns Array of AI insights (newest first)
   */
  async getAIInsights(): Promise<AIInsight[]> {
    return await db
      .select()
      .from(aiInsights)
      .orderBy(desc(aiInsights.createdAt)); // Sort by newest first
  }
  
  /**
   * Create AI Insight
   * Inserts a new AI-generated insight into the database
   * TODO: Replace manual insertion with OpenAI API integration
   * @param insight - AI insight data to insert
   * @returns The newly created insight with generated ID
   */
  async createAIInsight(insight: InsertAIInsight): Promise<AIInsight> {
    const [newInsight] = await db
      .insert(aiInsights)
      .values(insight)
      .returning(); // Return the created record
    return newInsight;
  }
  
  /**
   * Get Impact Metrics
   * Fetches all before/after impact metrics
   * @returns Array of impact metrics
   */
  async getImpactMetrics(): Promise<ImpactMetric[]> {
    return await db.select().from(impactMetrics);
  }
  
  /**
   * Get Usage Metrics
   * Fetches user engagement metrics over time
   * @returns Array of usage metrics
   */
  async getUsageMetrics(): Promise<UsageMetric[]> {
    return await db.select().from(usageMetrics);
  }
  
  /**
   * Get Channels
   * Fetches all integrated communication channels
   * @returns Array of channel data
   */
  async getChannels(): Promise<Channel[]> {
    return await db.select().from(channels);
  }
  
  /**
   * Create Channel
   * Inserts a new communication channel into the database
   * TODO: Add Twitter API integration for automatic message counting
   * TODO: Add Instagram API integration for automatic message counting
   * TODO: Add Facebook API integration for automatic message counting
   * @param insertChannel - Channel data to insert
   * @returns The newly created channel with generated ID
   */
  async createChannel(insertChannel: InsertChannel): Promise<Channel> {
    const [newChannel] = await db
      .insert(channels)
      .values(insertChannel)
      .returning(); // Return the created record
    return newChannel;
  }
}

/**
 * Storage Instance
 * Singleton instance of the database storage implementation
 * Used throughout the application for database operations
 */
export const storage = new DatabaseStorage();
