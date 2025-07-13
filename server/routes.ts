import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertViralVideoSchema, 
  insertAffiliateProductSchema, 
  insertScriptSchema, 
  insertVideoSchema, 
  insertScheduledPostSchema, 
  insertAnalyticsSchema 
} from "@shared/schema";
import { analyzeViralVideo, generateScript, scoreContentAuthenticity } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Dashboard stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const videos = await storage.getVideos();
      const analytics = await storage.getAnalytics();
      const viralVideos = await storage.getViralVideos();
      
      const totalRevenue = analytics.reduce((sum, a) => sum + (a.revenue || 0), 0);
      const totalViews = analytics.reduce((sum, a) => sum + (a.views || 0), 0);
      const avgEngagement = analytics.length > 0 
        ? analytics.reduce((sum, a) => sum + (a.engagement_rate || 0), 0) / analytics.length 
        : 0;
      const avgConversion = analytics.length > 0
        ? analytics.reduce((sum, a) => sum + (a.conversion_rate || 0), 0) / analytics.length
        : 0;

      res.json({
        monthly_revenue: totalRevenue,
        videos_created: videos.length,
        avg_engagement: avgEngagement,
        conversion_rate: avgConversion,
        total_views: totalViews,
        viral_videos_found: viralVideos.length
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
  });

  // Viral Videos
  app.get("/api/viral-videos", async (req, res) => {
    try {
      const videos = await storage.getViralVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch viral videos" });
    }
  });

  app.post("/api/viral-videos", async (req, res) => {
    try {
      const data = insertViralVideoSchema.parse(req.body);
      const video = await storage.createViralVideo(data);
      res.json(video);
    } catch (error) {
      res.status(400).json({ error: "Invalid video data" });
    }
  });

  app.post("/api/viral-videos/:id/analyze", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const video = await storage.getViralVideo(id);
      
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }

      const analysis = await analyzeViralVideo(
        video.title,
        video.captions || "",
        video.hashtags || "",
        video.views,
        video.engagement_rate
      );

      const updatedVideo = await storage.updateViralVideo(id, {
        ai_score: analysis.score,
        status: "processed"
      });

      res.json({ analysis, video: updatedVideo });
    } catch (error) {
      res.status(500).json({ error: "Failed to analyze video" });
    }
  });

  // Affiliate Products
  app.get("/api/affiliate-products", async (req, res) => {
    try {
      const products = await storage.getAffiliateProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch affiliate products" });
    }
  });

  app.post("/api/affiliate-products", async (req, res) => {
    try {
      const data = insertAffiliateProductSchema.parse(req.body);
      const product = await storage.createAffiliateProduct(data);
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  // Scripts
  app.get("/api/scripts", async (req, res) => {
    try {
      const scripts = await storage.getScripts();
      res.json(scripts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scripts" });
    }
  });

  app.post("/api/scripts", async (req, res) => {
    try {
      const data = insertScriptSchema.parse(req.body);
      const script = await storage.createScript(data);
      res.json(script);
    } catch (error) {
      res.status(400).json({ error: "Invalid script data" });
    }
  });

  app.post("/api/scripts/generate", async (req, res) => {
    try {
      const { content_type, video_length, target_audience, key_message, template_type } = req.body;
      
      if (!content_type || !video_length || !target_audience || !key_message || !template_type) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const generatedScript = await generateScript(
        content_type,
        video_length,
        target_audience,
        key_message,
        template_type
      );

      const script = await storage.createScript({
        title: generatedScript.title,
        content: generatedScript.full_script,
        content_type,
        video_length,
        target_audience,
        template_type,
        ai_generated: true,
        status: "draft"
      });

      res.json({ script, generated: generatedScript });
    } catch (error) {
      res.status(500).json({ error: "Failed to generate script" });
    }
  });

  app.patch("/api/scripts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const script = await storage.updateScript(id, updates);
      
      if (!script) {
        return res.status(404).json({ error: "Script not found" });
      }

      res.json(script);
    } catch (error) {
      res.status(500).json({ error: "Failed to update script" });
    }
  });

  // Videos
  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  app.post("/api/videos", async (req, res) => {
    try {
      const data = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(data);
      res.json(video);
    } catch (error) {
      res.status(400).json({ error: "Invalid video data" });
    }
  });

  app.patch("/api/videos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const video = await storage.updateVideo(id, updates);
      
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }

      res.json(video);
    } catch (error) {
      res.status(500).json({ error: "Failed to update video" });
    }
  });

  // Scheduled Posts
  app.get("/api/scheduled-posts", async (req, res) => {
    try {
      const posts = await storage.getScheduledPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scheduled posts" });
    }
  });

  app.post("/api/scheduled-posts", async (req, res) => {
    try {
      const data = insertScheduledPostSchema.parse(req.body);
      const post = await storage.createScheduledPost(data);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid post data" });
    }
  });

  app.patch("/api/scheduled-posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const post = await storage.updateScheduledPost(id, updates);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update scheduled post" });
    }
  });

  // Analytics
  app.get("/api/analytics", async (req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  app.get("/api/analytics/video/:videoId", async (req, res) => {
    try {
      const videoId = parseInt(req.params.videoId);
      const analytics = await storage.getAnalyticsByVideo(videoId);
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch video analytics" });
    }
  });

  app.post("/api/analytics", async (req, res) => {
    try {
      const data = insertAnalyticsSchema.parse(req.body);
      const analytics = await storage.createAnalytics(data);
      res.json(analytics);
    } catch (error) {
      res.status(400).json({ error: "Invalid analytics data" });
    }
  });

  // Content scoring
  app.post("/api/content/score", async (req, res) => {
    try {
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      const score = await scoreContentAuthenticity(content);
      res.json({ score });
    } catch (error) {
      res.status(500).json({ error: "Failed to score content" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
