import { db } from "./db";
import { viralVideos, affiliateProducts, scripts, analytics } from "@shared/schema";

async function seedDatabase() {
  console.log("Starting database seed...");

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

  // Sample generated scripts covering all content types
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

  try {
    // Clear existing data
    await db.delete(analytics);
    await db.delete(scripts);
    await db.delete(affiliateProducts);
    await db.delete(viralVideos);

    // Insert sample data
    await db.insert(viralVideos).values(sampleViralVideos);
    await db.insert(affiliateProducts).values(sampleProducts);
    await db.insert(scripts).values(sampleScripts);
    await db.insert(analytics).values(sampleAnalytics);

    console.log("Database seeded successfully!");
    console.log(`- ${sampleViralVideos.length} viral videos`);
    console.log(`- ${sampleProducts.length} affiliate products`);
    console.log(`- ${sampleScripts.length} scripts`);
    console.log(`- ${sampleAnalytics.length} analytics records`);

  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log("Seed completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });