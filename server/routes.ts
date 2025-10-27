/**
 * API Routes Definition
 * 
 * This file defines all REST API endpoints for the Sentiment360 application.
 * Each endpoint handles HTTP requests and returns JSON responses.
 */

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFeedbackSchema, insertPriorityItemSchema, insertAIInsightSchema, insertChannelSchema } from "@shared/schema";

/**
 * Register API Routes
 * Sets up all API endpoints and creates the HTTP server
 * @param app - Express application instance
 * @returns HTTP server instance
 */
export async function registerRoutes(app: Express): Promise<Server> {
  
  // ============================================================================
  // Dashboard Endpoints
  // ============================================================================
  
  /**
   * GET /api/regional-sentiment
   * Fetches sentiment scores grouped by U.S. region
   * Used by: Dashboard page for regional sentiment chart
   */
  app.get("/api/regional-sentiment", async (_req, res) => {
    try {
      const data = await storage.getRegionalSentiment();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch regional sentiment" });
    }
  });

  /**
   * GET /api/feedback
   * Fetches recent customer feedback entries
   * Query params:
   *   - limit: Number of feedback items to return (default: 10)
   * Used by: Dashboard page for feedback highlights
   */
  app.get("/api/feedback", async (req, res) => {
    try {
      // Parse optional limit parameter from query string
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const data = await storage.getRecentFeedback(limit);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch feedback" });
    }
  });

  /**
   * POST /api/feedback
   * Creates a new customer feedback entry
   * Request body: { text, sentiment, source, region }
   * Used by: Manage page feedback form
   */
  app.post("/api/feedback", async (req, res) => {
    try {
      // Validate request body using Zod schema
      const validatedData = insertFeedbackSchema.parse(req.body);
      const newFeedback = await storage.createFeedback(validatedData);
      res.status(201).json(newFeedback); // 201 Created
    } catch (error) {
      res.status(400).json({ error: "Invalid feedback data" });
    }
  });

  /**
   * GET /api/sentiment-trends
   * Fetches historical sentiment trend data
   * Query params:
   *   - period: "daily" for daily data, omit for monthly data
   *   - days: Number of days for daily data (default: 30)
   * Used by: Dashboard page for sentiment trend chart
   */
  app.get("/api/sentiment-trends", async (req, res) => {
    try {
      // Check if daily data is requested
      if (req.query.period === "daily") {
        const days = req.query.days ? parseInt(req.query.days as string) : 30;
        const data = await storage.getDailySentimentTrends(days);
        res.json(data);
      } else {
        // Return monthly data for 90D and All views
        const data = await storage.getSentimentTrends();
        res.json(data);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sentiment trends" });
    }
  });

  // ============================================================================
  // Prioritization Endpoints
  // ============================================================================
  
  /**
   * GET /api/priority-items
   * Fetches all priority items for the impact vs effort matrix
   * Used by: Prioritization page for matrix visualization
   */
  app.get("/api/priority-items", async (_req, res) => {
    try {
      const data = await storage.getPriorityItems();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch priority items" });
    }
  });

  /**
   * POST /api/priority-items
   * Creates a new priority item
   * Request body: { title, description, impact, effort, category, rank }
   * Used by: Manage page priority form
   */
  app.post("/api/priority-items", async (req, res) => {
    try {
      // Validate request body using Zod schema
      const validatedData = insertPriorityItemSchema.parse(req.body);
      const newItem = await storage.createPriorityItem(validatedData);
      res.status(201).json(newItem); // 201 Created
    } catch (error) {
      res.status(400).json({ error: "Invalid priority item data" });
    }
  });

  /**
   * GET /api/ai-insights
   * Fetches AI-generated insights and recommendations
   * TODO: Replace with OpenAI API integration for dynamic insights
   * Used by: Prioritization page for AI insights section
   */
  app.get("/api/ai-insights", async (_req, res) => {
    try {
      const data = await storage.getAIInsights();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch AI insights" });
    }
  });

  /**
   * POST /api/ai-insights
   * Creates a new AI insight (manual for now)
   * Request body: { title, description, priority, impact }
   * TODO: Replace with automated OpenAI API calls
   */
  app.post("/api/ai-insights", async (req, res) => {
    try {
      // Validate request body using Zod schema
      const validatedData = insertAIInsightSchema.parse(req.body);
      const newInsight = await storage.createAIInsight(validatedData);
      res.status(201).json(newInsight); // 201 Created
    } catch (error) {
      res.status(400).json({ error: "Invalid AI insight data" });
    }
  });

  // ============================================================================
  // Impact Tracker Endpoints
  // ============================================================================
  
  /**
   * GET /api/impact-metrics
   * Fetches before/after metrics showing improvement results
   * Used by: Impact Tracker page for success metrics cards
   */
  app.get("/api/impact-metrics", async (_req, res) => {
    try {
      const data = await storage.getImpactMetrics();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch impact metrics" });
    }
  });

  /**
   * GET /api/usage-metrics
   * Fetches user engagement metrics over time
   * Used by: Impact Tracker page for usage metrics chart
   */
  app.get("/api/usage-metrics", async (_req, res) => {
    try {
      const data = await storage.getUsageMetrics();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch usage metrics" });
    }
  });

  /**
   * GET /api/channels
   * Fetches all integrated communication channels
   * TODO: Add Twitter API integration
   * TODO: Add Instagram API integration
   * TODO: Add Facebook API integration
   * Used by: Impact Tracker page for channels section
   */
  app.get("/api/channels", async (_req, res) => {
    try {
      const data = await storage.getChannels();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch channels" });
    }
  });

  /**
   * POST /api/channels
   * Creates a new communication channel
   * Request body: { name, status, messageCount }
   * Used by: Manage page channel form
   */
  app.post("/api/channels", async (req, res) => {
    try {
      // Validate request body using Zod schema
      const validatedData = insertChannelSchema.parse(req.body);
      const newChannel = await storage.createChannel(validatedData);
      res.status(201).json(newChannel); // 201 Created
    } catch (error) {
      res.status(400).json({ error: "Invalid channel data" });
    }
  });

  // ============================================================================
  // Dashboard Summary Stats
  // ============================================================================
  
  /**
   * GET /api/dashboard-stats
   * Calculates and returns aggregated dashboard metrics
   * Returns: {
   *   avgSentiment: Average sentiment across all regions
   *   totalFeedback: Total number of feedback entries
   *   responseRate: Customer response rate percentage
   *   activeUsers: Number of active users
   *   ...change percentages for each metric
   * }
   * Used by: Dashboard page for metric cards
   */
  app.get("/api/dashboard-stats", async (_req, res) => {
    try {
      // Fetch data from multiple sources
      const regionalData = await storage.getRegionalSentiment();
      const feedbackData = await storage.getRecentFeedback(100);
      const trendsData = await storage.getSentimentTrends();
      
      // Calculate average sentiment across all regions
      const avgSentiment = regionalData.length > 0
        ? regionalData.reduce((sum, r) => sum + parseFloat(r.sentimentScore), 0) / regionalData.length
        : 0;
      
      // Count total feedback entries
      const totalFeedback = feedbackData.length;
      
      // TODO: Calculate actual response rate from real data
      const responseRate = 94;
      
      // TODO: Fetch actual active users from usage metrics
      const activeUsers = 2820;
      
      // Format and return dashboard statistics
      res.json({
        avgSentiment: avgSentiment.toFixed(1), // Format to 1 decimal place
        // Format large numbers with K suffix
        totalFeedback: totalFeedback > 1000 ? `${(totalFeedback / 1000).toFixed(1)}K` : totalFeedback.toString(),
        responseRate: `${responseRate}%`,
        activeUsers: activeUsers > 1000 ? `${(activeUsers / 1000).toFixed(1)}K` : activeUsers.toString(),
        // TODO: Calculate actual change percentages from historical data
        sentimentChange: 12,
        feedbackChange: 8,
        responseRateChange: 5,
        activeUsersChange: 15,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // Create and return HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
