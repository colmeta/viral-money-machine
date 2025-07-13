import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

export const viralVideos = pgTable("viral_videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  platform: text("platform").notNull(), // tiktok, instagram, youtube
  url: text("url").notNull(),
  views: integer("views").notNull(),
  engagement_rate: real("engagement_rate").notNull(),
  ai_score: integer("ai_score").notNull(), // 0-100
  captions: text("captions"),
  hashtags: text("hashtags"),
  audio_transcript: text("audio_transcript"),
  status: text("status").notNull().default("pending"), // pending, processing, processed
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const affiliateProducts = pgTable("affiliate_products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  commission_rate: real("commission_rate").notNull(),
  commission_amount: real("commission_amount"),
  url: text("url").notNull(),
  gravity: integer("gravity"), // for clickbank products
  refund_rate: real("refund_rate"),
  has_upsells: boolean("has_upsells").default(false),
  is_recurring: boolean("is_recurring").default(false),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const scripts = pgTable("scripts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  content_type: text("content_type").notNull(), // side-hustle, affiliate-marketing, passive-income, etc.
  video_length: text("video_length").notNull(), // 15s, 30s, 60s, 3m
  target_audience: text("target_audience").notNull(),
  template_type: text("template_type").notNull(), // success-story, tips-tricks, motivation
  ai_generated: boolean("ai_generated").default(true),
  status: text("status").notNull().default("draft"), // draft, approved, used
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  script_id: integer("script_id").references(() => scripts.id),
  title: text("title").notNull(),
  filename: text("filename"),
  duration: integer("duration"), // in seconds
  status: text("status").notNull().default("generating"), // generating, ready, posted
  generated_at: timestamp("generated_at").notNull().defaultNow(),
});

export const scheduledPosts = pgTable("scheduled_posts", {
  id: serial("id").primaryKey(),
  video_id: integer("video_id").references(() => videos.id),
  platform: text("platform").notNull(),
  scheduled_time: timestamp("scheduled_time").notNull(),
  caption: text("caption"),
  hashtags: text("hashtags"),
  status: text("status").notNull().default("scheduled"), // scheduled, posted, failed
  posted_at: timestamp("posted_at"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  video_id: integer("video_id").references(() => videos.id),
  platform: text("platform").notNull(),
  views: integer("views").default(0),
  engagement_rate: real("engagement_rate").default(0),
  revenue: real("revenue").default(0),
  conversion_rate: real("conversion_rate").default(0),
  date: timestamp("date").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
});

export const insertViralVideoSchema = createInsertSchema(viralVideos).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertAffiliateProductSchema = createInsertSchema(affiliateProducts).omit({
  id: true,
  created_at: true,
});

export const insertScriptSchema = createInsertSchema(scripts).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  generated_at: true,
});

export const insertScheduledPostSchema = createInsertSchema(scheduledPosts).omit({
  id: true,
  created_at: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
  date: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ViralVideo = typeof viralVideos.$inferSelect;
export type InsertViralVideo = z.infer<typeof insertViralVideoSchema>;

export type AffiliateProduct = typeof affiliateProducts.$inferSelect;
export type InsertAffiliateProduct = z.infer<typeof insertAffiliateProductSchema>;

export type Script = typeof scripts.$inferSelect;
export type InsertScript = z.infer<typeof insertScriptSchema>;

export type Video = typeof videos.$inferSelect;
export type InsertVideo = z.infer<typeof insertVideoSchema>;

export type ScheduledPost = typeof scheduledPosts.$inferSelect;
export type InsertScheduledPost = z.infer<typeof insertScheduledPostSchema>;

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
