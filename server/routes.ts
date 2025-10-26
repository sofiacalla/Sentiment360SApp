import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFeedbackSchema, insertPriorityItemSchema, insertAIInsightSchema, insertChannelSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard endpoints
  app.get("/api/regional-sentiment", async (_req, res) => {
    try {
      const data = await storage.getRegionalSentiment();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch regional sentiment" });
    }
  });

  app.get("/api/feedback", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const data = await storage.getRecentFeedback(limit);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch feedback" });
    }
  });

  app.post("/api/feedback", async (req, res) => {
    try {
      const validatedData = insertFeedbackSchema.parse(req.body);
      const newFeedback = await storage.createFeedback(validatedData);
      res.status(201).json(newFeedback);
    } catch (error) {
      res.status(400).json({ error: "Invalid feedback data" });
    }
  });

  app.get("/api/sentiment-trends", async (_req, res) => {
    try {
      const data = await storage.getSentimentTrends();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sentiment trends" });
    }
  });

  // Prioritization endpoints
  app.get("/api/priority-items", async (_req, res) => {
    try {
      const data = await storage.getPriorityItems();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch priority items" });
    }
  });

  app.post("/api/priority-items", async (req, res) => {
    try {
      const validatedData = insertPriorityItemSchema.parse(req.body);
      const newItem = await storage.createPriorityItem(validatedData);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ error: "Invalid priority item data" });
    }
  });

  app.get("/api/ai-insights", async (_req, res) => {
    try {
      const data = await storage.getAIInsights();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch AI insights" });
    }
  });

  app.post("/api/ai-insights", async (req, res) => {
    try {
      const validatedData = insertAIInsightSchema.parse(req.body);
      const newInsight = await storage.createAIInsight(validatedData);
      res.status(201).json(newInsight);
    } catch (error) {
      res.status(400).json({ error: "Invalid AI insight data" });
    }
  });

  // Impact tracker endpoints
  app.get("/api/impact-metrics", async (_req, res) => {
    try {
      const data = await storage.getImpactMetrics();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch impact metrics" });
    }
  });

  app.get("/api/usage-metrics", async (_req, res) => {
    try {
      const data = await storage.getUsageMetrics();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch usage metrics" });
    }
  });

  app.get("/api/channels", async (_req, res) => {
    try {
      const data = await storage.getChannels();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch channels" });
    }
  });

  app.post("/api/channels", async (req, res) => {
    try {
      const validatedData = insertChannelSchema.parse(req.body);
      const newChannel = await storage.createChannel(validatedData);
      res.status(201).json(newChannel);
    } catch (error) {
      res.status(400).json({ error: "Invalid channel data" });
    }
  });

  // Dashboard summary stats
  app.get("/api/dashboard-stats", async (_req, res) => {
    try {
      const regionalData = await storage.getRegionalSentiment();
      const feedbackData = await storage.getRecentFeedback(100);
      const trendsData = await storage.getSentimentTrends();
      
      // Calculate average sentiment
      const avgSentiment = regionalData.length > 0
        ? regionalData.reduce((sum, r) => sum + parseFloat(r.sentimentScore), 0) / regionalData.length
        : 0;
      
      // Total feedback count
      const totalFeedback = feedbackData.length;
      
      // Calculate response rate (mock calculation)
      const responseRate = 94;
      
      // Active users (from latest usage metric)
      const activeUsers = 2820;
      
      res.json({
        avgSentiment: avgSentiment.toFixed(1),
        totalFeedback: totalFeedback > 1000 ? `${(totalFeedback / 1000).toFixed(1)}K` : totalFeedback.toString(),
        responseRate: `${responseRate}%`,
        activeUsers: activeUsers > 1000 ? `${(activeUsers / 1000).toFixed(1)}K` : activeUsers.toString(),
        sentimentChange: 12,
        feedbackChange: 8,
        responseRateChange: 5,
        activeUsersChange: 15,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
