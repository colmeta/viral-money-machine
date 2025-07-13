import { 
  users, 
  viralVideos, 
  affiliateProducts, 
  scripts, 
  videos, 
  scheduledPosts, 
  analytics,
  type User, 
  type InsertUser,
  type ViralVideo,
  type InsertViralVideo,
  type AffiliateProduct,
  type InsertAffiliateProduct,
  type Script,
  type InsertScript,
  type Video,
  type InsertVideo,
  type ScheduledPost,
  type InsertScheduledPost,
  type Analytics,
  type InsertAnalytics
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Viral video operations
  getViralVideos(): Promise<ViralVideo[]>;
  getViralVideo(id: number): Promise<ViralVideo | undefined>;
  createViralVideo(video: InsertViralVideo): Promise<ViralVideo>;
  updateViralVideo(id: number, updates: Partial<ViralVideo>): Promise<ViralVideo | undefined>;

  // Affiliate product operations
  getAffiliateProducts(): Promise<AffiliateProduct[]>;
  getAffiliateProduct(id: number): Promise<AffiliateProduct | undefined>;
  createAffiliateProduct(product: InsertAffiliateProduct): Promise<AffiliateProduct>;

  // Script operations
  getScripts(): Promise<Script[]>;
  getScript(id: number): Promise<Script | undefined>;
  createScript(script: InsertScript): Promise<Script>;
  updateScript(id: number, updates: Partial<Script>): Promise<Script | undefined>;

  // Video operations
  getVideos(): Promise<Video[]>;
  getVideo(id: number): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(id: number, updates: Partial<Video>): Promise<Video | undefined>;

  // Scheduled post operations
  getScheduledPosts(): Promise<ScheduledPost[]>;
  getScheduledPost(id: number): Promise<ScheduledPost | undefined>;
  createScheduledPost(post: InsertScheduledPost): Promise<ScheduledPost>;
  updateScheduledPost(id: number, updates: Partial<ScheduledPost>): Promise<ScheduledPost | undefined>;

  // Analytics operations
  getAnalytics(): Promise<Analytics[]>;
  getAnalyticsByVideo(videoId: number): Promise<Analytics[]>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private viralVideos: Map<number, ViralVideo> = new Map();
  private affiliateProducts: Map<number, AffiliateProduct> = new Map();
  private scripts: Map<number, Script> = new Map();
  private videos: Map<number, Video> = new Map();
  private scheduledPosts: Map<number, ScheduledPost> = new Map();
  private analytics: Map<number, Analytics> = new Map();

  private currentUserId = 1;
  private currentViralVideoId = 1;
  private currentAffiliateProductId = 1;
  private currentScriptId = 1;
  private currentVideoId = 1;
  private currentScheduledPostId = 1;
  private currentAnalyticsId = 1;

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample viral videos covering all content types: AI, passive income, wealth building, affiliate marketing
    const sampleViralVideos = [
      {
        title: "How I Make $8,600/Month in Passive Income (Work 2 Hours Daily)",
        platform: "TikTok",
        url: "https://tiktok.com/sample1",
        views: 1200000,
        engagement_rate: 12.5,
        ai_score: 94,
        captions: "Lost my waitressing job during pandemic. Now I make $8,600/month with affiliate marketing working just 2 hours a day. Here's exactly how I did it...",
        hashtags: "#passiveincome #affiliatemarketing #sidehustle #entrepreneurship #workfromhome",
        status: "processed",
        audio_transcript: "Hey everyone, so I know this sounds crazy but I actually make over $8,600 a month now in passive income..."
      },
      {
        title: "5 AI Tools That Actually Make Money (I Made $3,200 This Week)",
        platform: "Instagram",
        url: "https://instagram.com/sample2",
        views: 890000,
        engagement_rate: 9.8,
        ai_score: 87,
        captions: "After testing 50+ AI tools, these 5 actually generate income. Tool #3 made me $1,200 in one day.",
        hashtags: "#aitools #generativeai #makemoneywithai #aiautomation #artificialintelligence #chatgpt",
        status: "processed",
        audio_transcript: "I've tested over 50 different AI tools and these 5 are the only ones that consistently generate income..."
      },
      {
        title: "Wealth Building Secrets They Don't Want You to Know",
        platform: "YouTube",
        url: "https://youtube.com/sample3",
        views: 650000,
        engagement_rate: 11.2,
        ai_score: 89,
        captions: "The wealth building strategies that made me $25K last month. Most people never learn these...",
        hashtags: "#wealthbuilding #passiveincome #investing #financialfreedom #makemoneyonline",
        status: "processed",
        audio_transcript: "What I'm about to share with you are the exact wealth building strategies that took me from broke to making $25,000..."
      },
      {
        title: "ChatGPT + This Tool = $500/Day (AI Money Method)",
        platform: "TikTok",
        url: "https://tiktok.com/sample4",
        views: 750000,
        engagement_rate: 10.3,
        ai_score: 91,
        captions: "Everyone uses ChatGPT wrong. I combine it with this one tool and make $500+ daily. Here's the exact process...",
        hashtags: "#chatgpt #aitools #makemoneywithai #artificialintelligence #generativeai #aiautomation",
        status: "processed",
        audio_transcript: "Most people are using ChatGPT completely wrong. Let me show you how I combine it with this tool to make $500 a day..."
      },
      {
        title: "5 Side Hustles That Actually Pay $100+ Daily",
        platform: "Instagram",
        url: "https://instagram.com/sample5",
        views: 950000,
        engagement_rate: 13.1,
        ai_score: 96,
        captions: "After testing 20+ side hustles, these 5 actually work. Number 3 changed my life completely.",
        hashtags: "#sidehustle #makemoneyonline #passiveincome #entrepreneurship #workfromhome",
        status: "processed",
        audio_transcript: "I've tried over 20 different side hustles and these 5 are the only ones that consistently pay..."
      },
      {
        title: "How AI Automation Replaced My 9-5 Income",
        platform: "YouTube",
        url: "https://youtube.com/sample6",
        views: 580000,
        engagement_rate: 11.8,
        ai_score: 92,
        captions: "AI didn't take my job - it gave me a better one. From $60K/year to $120K/year using AI automation. Here's how...",
        hashtags: "#aiautomation #artificialintelligence #makemoneywithai #generativeai #aitools #futureofwork",
        status: "processed",
        audio_transcript: "A year ago I was making $60,000 at my corporate job. Today I make $120,000 a year using AI automation..."
      }
    ];

    // AI & Automation Tools with your actual affiliate links
    const sampleProducts = [
      {
        name: "Systeme.io",
        category: "AI & Automation Tools",
        commission_rate: 60,
        commission_amount: 162, // Average of $27-$297
        url: "https://systeme.io/affiliate",
        gravity: 95,
        refund_rate: 5.0,
        has_upsells: true,
        is_recurring: true
      },
      {
        name: "ClickFunnels 2.0",
        category: "AI & Automation Tools",
        commission_rate: 40,
        commission_amount: 78, // Average of $38-$118
        url: "https://clickfunnels.com/affiliates",
        gravity: 88,
        refund_rate: 8.0,
        has_upsells: true,
        is_recurring: true
      },
      {
        name: "Jasper AI",
        category: "AI Content Creation",
        commission_rate: 30,
        commission_amount: 45, // Average of $15-$75
        url: "https://jasper.ai/affiliate",
        gravity: 82,
        refund_rate: 7.0,
        has_upsells: false,
        is_recurring: true
      },
      {
        name: "GetResponse",
        category: "Email Marketing Automation",
        commission_rate: 33,
        commission_amount: 90, // Average of $16-$165
        url: "https://getresponse.com/affiliate",
        gravity: 75,
        refund_rate: 6.0,
        has_upsells: true,
        is_recurring: true
      },
      {
        name: "ConvertKit",
        category: "Business & Marketing Tools",
        commission_rate: 30,
        commission_amount: 52, // Average of $9-$95
        url: "https://convertkit.com/affiliate",
        gravity: 70,
        refund_rate: 5.0,
        has_upsells: false,
        is_recurring: true
      },
      {
        name: "Leadpages",
        category: "Business & Marketing Tools",
        commission_rate: 50,
        commission_amount: 111, // Average of $24-$199
        url: "https://leadpages.com/affiliate",
        gravity: 65,
        refund_rate: 8.0,
        has_upsells: true,
        is_recurring: true
      },
      {
        name: "Legendary Marketer",
        category: "High-Ticket Courses",
        commission_rate: 60,
        commission_amount: 1550, // Average of $100-$3000
        url: "https://legendarymarketer.com/affiliate",
        gravity: 92,
        refund_rate: 12.0,
        has_upsells: true,
        is_recurring: false
      },
      {
        name: "ClickBank High-Ticket",
        category: "High-Ticket Courses",
        commission_rate: 62,
        commission_amount: 1350, // Average of $500-$2200
        url: "https://clickbank.com",
        gravity: 85,
        refund_rate: 15.0,
        has_upsells: true,
        is_recurring: false
      }
    ];

    // Sample generated scripts covering all content types: AI, passive income, wealth building, affiliate marketing
    const sampleScripts = [
      {
        title: "Morning Motivation: Start Your Side Hustle Today",
        content: "🎯 Hook: 'I used to hate Monday mornings. Now I wake up excited because my side hustle made me $500 while I slept.'\n\n❗ Problem: 'Most people are stuck in jobs they hate, living paycheck to paycheck, with no way out.'\n\n💡 Solution: 'I discovered affiliate marketing - promoting products I believe in and earning commissions.'\n\n📊 Proof: 'In 6 months, I went from $0 to $8,600/month working just 2 hours daily.'\n\n📞 Call to Action: 'Comment START if you want the exact blueprint I used. It's completely free.'",
        content_type: "Motivational",
        video_length: "60 seconds",
        target_audience: "Aspiring Entrepreneurs",
        template_type: "success-story",
        ai_generated: true,
        status: "approved"
      },
      {
        title: "5 AI Tools That Actually Make Money (Not ChatGPT)",
        content: "🎯 Hook: 'Everyone talks about ChatGPT, but these 5 AI tools actually generate income.'\n\n❗ Problem: 'Most people use AI tools for fun, not profit. They're missing the real money-making opportunities.'\n\n💡 Solution: 'I use Jasper AI for content, Systeme.io for automation, and 3 other tools to create multiple income streams.'\n\n📊 Proof: 'Last month: $3,200 from AI-generated content, $2,100 from automation, $1,800 from AI affiliate commissions.'\n\n📞 Call to Action: 'Drop a 🤖 if you want my complete AI money-making toolkit.'",
        content_type: "AI Tools Review",
        video_length: "45 seconds",
        target_audience: "Tech-Savvy Entrepreneurs",
        template_type: "tips-tricks",
        ai_generated: true,
        status: "approved"
      },
      {
        title: "Wealth Building Secrets Rich People Don't Share",
        content: "🎯 Hook: 'Rich people have 7 income streams. Poor people have 1. Here's how to build yours.'\n\n❗ Problem: 'You're trading time for money. Rich people make money work for them while they sleep.'\n\n💡 Solution: 'I built multiple passive income streams: affiliate marketing, course sales, and recurring commissions.'\n\n📊 Proof: 'Stream 1: $2,400/month. Stream 2: $1,800/month. Stream 3: $4,400/month. Total: $8,600/month.'\n\n📞 Call to Action: 'Comment WEALTH if you want my 7-stream income blueprint.'",
        content_type: "Wealth Building",
        video_length: "75 seconds",
        target_audience: "Wealth Seekers",
        template_type: "success-story",
        ai_generated: true,
        status: "approved"
      },
      {
        title: "Lunch Break Tip: Make Money While You Eat",
        content: "🎯 Hook: 'This 15-minute lunch break routine made me $2,400 last month.'\n\n❗ Problem: 'You're already scrolling your phone during lunch - why not make money doing it?'\n\n💡 Solution: 'I promote business courses and tools that actually help people succeed.'\n\n📊 Proof: 'My best month was $8,600 in commissions from just posting helpful content.'\n\n📞 Call to Action: 'Drop a 💰 if you want to learn my exact method.'",
        content_type: "Tips & Tricks",
        video_length: "30 seconds",
        target_audience: "Working Professionals",
        template_type: "tips-tricks",
        ai_generated: true,
        status: "approved"
      },
      {
        title: "How AI Automation Replaced My 9-5 Income",
        content: "🎯 Hook: 'AI didn't take my job - it gave me a better one. From $60K/year to $120K/year.'\n\n❗ Problem: 'Everyone fears AI will replace jobs, but nobody teaches you how to use AI to create better income.'\n\n💡 Solution: 'I built AI automation systems using ClickFunnels and GetResponse that work 24/7 without me.'\n\n📊 Proof: 'Month 1: $2,400. Month 6: $8,600. Month 12: $10,200. All from AI automation.'\n\n📞 Call to Action: 'Comment FREEDOM if you want to learn my AI automation blueprint.'",
        content_type: "AI Success Story",
        video_length: "90 seconds",
        target_audience: "Corporate Employees",
        template_type: "success-story",
        ai_generated: true,
        status: "approved"
      }
    ];

    // Sample analytics data
    const sampleAnalytics = [
      {
        platform: "TikTok",
        views: 1200000,
        engagement_rate: 12.5,
        revenue: 2400,
        conversion_rate: 4.2,
        video_id: null
      },
      {
        platform: "Instagram",
        views: 890000,
        engagement_rate: 9.8,
        revenue: 1800,
        conversion_rate: 3.8,
        video_id: null
      },
      {
        platform: "YouTube",
        views: 650000,
        engagement_rate: 11.2,
        revenue: 1400,
        conversion_rate: 5.1,
        video_id: null
      }
    ];

    // Initialize data
    sampleViralVideos.forEach(video => {
      const id = this.currentViralVideoId++;
      const now = new Date();
      this.viralVideos.set(id, {
        ...video,
        id,
        created_at: now,
        updated_at: now
      });
    });

    sampleProducts.forEach(product => {
      const id = this.currentAffiliateProductId++;
      this.affiliateProducts.set(id, {
        ...product,
        id,
        created_at: new Date()
      });
    });

    sampleScripts.forEach(script => {
      const id = this.currentScriptId++;
      const now = new Date();
      this.scripts.set(id, {
        ...script,
        id,
        created_at: now,
        updated_at: now
      });
    });

    sampleAnalytics.forEach(analytics => {
      const id = this.currentAnalyticsId++;
      this.analytics.set(id, {
        ...analytics,
        id,
        date: new Date()
      });
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Viral video operations
  async getViralVideos(): Promise<ViralVideo[]> {
    return Array.from(this.viralVideos.values()).sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  async getViralVideo(id: number): Promise<ViralVideo | undefined> {
    return this.viralVideos.get(id);
  }

  async createViralVideo(insertVideo: InsertViralVideo): Promise<ViralVideo> {
    const id = this.currentViralVideoId++;
    const now = new Date();
    const video: ViralVideo = { 
      ...insertVideo, 
      id,
      status: insertVideo.status || "pending",
      captions: insertVideo.captions || null,
      hashtags: insertVideo.hashtags || null,
      audio_transcript: insertVideo.audio_transcript || null,
      created_at: now,
      updated_at: now
    };
    this.viralVideos.set(id, video);
    return video;
  }

  async updateViralVideo(id: number, updates: Partial<ViralVideo>): Promise<ViralVideo | undefined> {
    const video = this.viralVideos.get(id);
    if (!video) return undefined;
    
    const updatedVideo = { ...video, ...updates, updated_at: new Date() };
    this.viralVideos.set(id, updatedVideo);
    return updatedVideo;
  }

  // Affiliate product operations
  async getAffiliateProducts(): Promise<AffiliateProduct[]> {
    return Array.from(this.affiliateProducts.values()).sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  async getAffiliateProduct(id: number): Promise<AffiliateProduct | undefined> {
    return this.affiliateProducts.get(id);
  }

  async createAffiliateProduct(insertProduct: InsertAffiliateProduct): Promise<AffiliateProduct> {
    const id = this.currentAffiliateProductId++;
    const product: AffiliateProduct = { 
      ...insertProduct, 
      id,
      commission_amount: insertProduct.commission_amount || null,
      gravity: insertProduct.gravity || null,
      refund_rate: insertProduct.refund_rate || null,
      has_upsells: insertProduct.has_upsells || null,
      is_recurring: insertProduct.is_recurring || null,
      created_at: new Date()
    };
    this.affiliateProducts.set(id, product);
    return product;
  }

  // Script operations
  async getScripts(): Promise<Script[]> {
    return Array.from(this.scripts.values()).sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  async getScript(id: number): Promise<Script | undefined> {
    return this.scripts.get(id);
  }

  async createScript(insertScript: InsertScript): Promise<Script> {
    const id = this.currentScriptId++;
    const now = new Date();
    const script: Script = { 
      ...insertScript, 
      id,
      status: insertScript.status || "draft",
      ai_generated: insertScript.ai_generated || null,
      created_at: now,
      updated_at: now
    };
    this.scripts.set(id, script);
    return script;
  }

  async updateScript(id: number, updates: Partial<Script>): Promise<Script | undefined> {
    const script = this.scripts.get(id);
    if (!script) return undefined;
    
    const updatedScript = { ...script, ...updates, updated_at: new Date() };
    this.scripts.set(id, updatedScript);
    return updatedScript;
  }

  // Video operations
  async getVideos(): Promise<Video[]> {
    return Array.from(this.videos.values()).sort((a, b) => 
      new Date(b.generated_at).getTime() - new Date(a.generated_at).getTime()
    );
  }

  async getVideo(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const id = this.currentVideoId++;
    const video: Video = { 
      ...insertVideo, 
      id,
      status: insertVideo.status || "generating",
      duration: insertVideo.duration || null,
      script_id: insertVideo.script_id || null,
      filename: insertVideo.filename || null,
      generated_at: new Date()
    };
    this.videos.set(id, video);
    return video;
  }

  async updateVideo(id: number, updates: Partial<Video>): Promise<Video | undefined> {
    const video = this.videos.get(id);
    if (!video) return undefined;
    
    const updatedVideo = { ...video, ...updates };
    this.videos.set(id, updatedVideo);
    return updatedVideo;
  }

  // Scheduled post operations
  async getScheduledPosts(): Promise<ScheduledPost[]> {
    return Array.from(this.scheduledPosts.values()).sort((a, b) => 
      new Date(a.scheduled_time).getTime() - new Date(b.scheduled_time).getTime()
    );
  }

  async getScheduledPost(id: number): Promise<ScheduledPost | undefined> {
    return this.scheduledPosts.get(id);
  }

  async createScheduledPost(insertPost: InsertScheduledPost): Promise<ScheduledPost> {
    const id = this.currentScheduledPostId++;
    const post: ScheduledPost = { 
      ...insertPost, 
      id,
      status: insertPost.status || "scheduled",
      video_id: insertPost.video_id || null,
      caption: insertPost.caption || null,
      hashtags: insertPost.hashtags || null,
      posted_at: insertPost.posted_at || null,
      created_at: new Date()
    };
    this.scheduledPosts.set(id, post);
    return post;
  }

  async updateScheduledPost(id: number, updates: Partial<ScheduledPost>): Promise<ScheduledPost | undefined> {
    const post = this.scheduledPosts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...updates };
    this.scheduledPosts.set(id, updatedPost);
    return updatedPost;
  }

  // Analytics operations
  async getAnalytics(): Promise<Analytics[]> {
    return Array.from(this.analytics.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getAnalyticsByVideo(videoId: number): Promise<Analytics[]> {
    return Array.from(this.analytics.values())
      .filter(a => a.video_id === videoId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = this.currentAnalyticsId++;
    const analytics: Analytics = { 
      ...insertAnalytics, 
      id,
      video_id: insertAnalytics.video_id || null,
      views: insertAnalytics.views || null,
      engagement_rate: insertAnalytics.engagement_rate || null,
      revenue: insertAnalytics.revenue || null,
      conversion_rate: insertAnalytics.conversion_rate || null,
      date: new Date()
    };
    this.analytics.set(id, analytics);
    return analytics;
  }
}

// DatabaseStorage implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getViralVideos(): Promise<ViralVideo[]> {
    return await db.select().from(viralVideos).orderBy(viralVideos.created_at);
  }

  async getViralVideo(id: number): Promise<ViralVideo | undefined> {
    const [video] = await db.select().from(viralVideos).where(eq(viralVideos.id, id));
    return video || undefined;
  }

  async createViralVideo(insertVideo: InsertViralVideo): Promise<ViralVideo> {
    const [video] = await db
      .insert(viralVideos)
      .values(insertVideo)
      .returning();
    return video;
  }

  async updateViralVideo(id: number, updates: Partial<ViralVideo>): Promise<ViralVideo | undefined> {
    const [video] = await db
      .update(viralVideos)
      .set(updates)
      .where(eq(viralVideos.id, id))
      .returning();
    return video || undefined;
  }

  async getAffiliateProducts(): Promise<AffiliateProduct[]> {
    return await db.select().from(affiliateProducts).orderBy(affiliateProducts.created_at);
  }

  async getAffiliateProduct(id: number): Promise<AffiliateProduct | undefined> {
    const [product] = await db.select().from(affiliateProducts).where(eq(affiliateProducts.id, id));
    return product || undefined;
  }

  async createAffiliateProduct(insertProduct: InsertAffiliateProduct): Promise<AffiliateProduct> {
    const [product] = await db
      .insert(affiliateProducts)
      .values(insertProduct)
      .returning();
    return product;
  }

  async getScripts(): Promise<Script[]> {
    return await db.select().from(scripts).orderBy(scripts.created_at);
  }

  async getScript(id: number): Promise<Script | undefined> {
    const [script] = await db.select().from(scripts).where(eq(scripts.id, id));
    return script || undefined;
  }

  async createScript(insertScript: InsertScript): Promise<Script> {
    const [script] = await db
      .insert(scripts)
      .values(insertScript)
      .returning();
    return script;
  }

  async updateScript(id: number, updates: Partial<Script>): Promise<Script | undefined> {
    const [script] = await db
      .update(scripts)
      .set(updates)
      .where(eq(scripts.id, id))
      .returning();
    return script || undefined;
  }

  async getVideos(): Promise<Video[]> {
    return await db.select().from(videos).orderBy(videos.generated_at);
  }

  async getVideo(id: number): Promise<Video | undefined> {
    const [video] = await db.select().from(videos).where(eq(videos.id, id));
    return video || undefined;
  }

  async createVideo(insertVideo: InsertVideo): Promise<Video> {
    const [video] = await db
      .insert(videos)
      .values(insertVideo)
      .returning();
    return video;
  }

  async updateVideo(id: number, updates: Partial<Video>): Promise<Video | undefined> {
    const [video] = await db
      .update(videos)
      .set(updates)
      .where(eq(videos.id, id))
      .returning();
    return video || undefined;
  }

  async getScheduledPosts(): Promise<ScheduledPost[]> {
    return await db.select().from(scheduledPosts).orderBy(scheduledPosts.scheduled_time);
  }

  async getScheduledPost(id: number): Promise<ScheduledPost | undefined> {
    const [post] = await db.select().from(scheduledPosts).where(eq(scheduledPosts.id, id));
    return post || undefined;
  }

  async createScheduledPost(insertPost: InsertScheduledPost): Promise<ScheduledPost> {
    const [post] = await db
      .insert(scheduledPosts)
      .values(insertPost)
      .returning();
    return post;
  }

  async updateScheduledPost(id: number, updates: Partial<ScheduledPost>): Promise<ScheduledPost | undefined> {
    const [post] = await db
      .update(scheduledPosts)
      .set(updates)
      .where(eq(scheduledPosts.id, id))
      .returning();
    return post || undefined;
  }

  async getAnalytics(): Promise<Analytics[]> {
    return await db.select().from(analytics).orderBy(analytics.date);
  }

  async getAnalyticsByVideo(videoId: number): Promise<Analytics[]> {
    return await db.select().from(analytics).where(eq(analytics.video_id, videoId));
  }

  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const [analyticsRecord] = await db
      .insert(analytics)
      .values(insertAnalytics)
      .returning();
    return analyticsRecord;
  }
}

export const storage = new DatabaseStorage();
