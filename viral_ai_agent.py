#!/usr/bin/env python3
"""
Viral AI Agent - Complete Affiliate Marketing Automation Platform
Converts viral content analysis and script generation into a single Python script
"""

import os
import json
import sqlite3
import requests
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
import openai
from openai import OpenAI

# Configuration
class Config:
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', 'your-openai-key-here')
    DATABASE_FILE = 'viral_ai_agent.db'
    
    # Affiliate Product Data
    AFFILIATE_PRODUCTS = [
        {
            "name": "Systeme.io",
            "category": "AI & Automation Tools",
            "commission_rate": 60,
            "commission_amount": 162,  # $27-$297 average
            "url": "https://systeme.io/affiliate",
            "is_recurring": True
        },
        {
            "name": "ClickFunnels 2.0",
            "category": "AI & Automation Tools", 
            "commission_rate": 40,
            "commission_amount": 78,  # $38-$118 average
            "url": "https://clickfunnels.com/affiliates",
            "is_recurring": True
        },
        {
            "name": "Jasper AI",
            "category": "AI Content Creation",
            "commission_rate": 30,
            "commission_amount": 45,  # $15-$75 average
            "url": "https://jasper.ai/affiliate",
            "is_recurring": True
        },
        {
            "name": "GetResponse",
            "category": "Email Marketing Automation",
            "commission_rate": 33,
            "commission_amount": 90,  # $16-$165 average
            "url": "https://getresponse.com/affiliate",
            "is_recurring": True
        },
        {
            "name": "Legendary Marketer",
            "category": "High-Ticket Courses",
            "commission_rate": 60,
            "commission_amount": 1550,  # $100-$3000 average
            "url": "https://legendarymarketer.com/affiliate",
            "is_recurring": False
        },
        {
            "name": "ClickBank High-Ticket",
            "category": "High-Ticket Courses",
            "commission_rate": 62,
            "commission_amount": 1350,  # $500-$2200 average
            "url": "https://clickbank.com",
            "is_recurring": False
        }
    ]

# Data Models
@dataclass
class ViralVideo:
    id: Optional[int] = None
    title: str = ""
    platform: str = ""
    url: str = ""
    views: int = 0
    engagement_rate: float = 0.0
    ai_score: int = 0
    captions: str = ""
    hashtags: str = ""
    status: str = "discovered"
    audio_transcript: str = ""
    created_at: str = ""

@dataclass
class AffiliateProduct:
    id: Optional[int] = None
    name: str = ""
    category: str = ""
    commission_rate: int = 0
    commission_amount: int = 0
    url: str = ""
    is_recurring: bool = False
    created_at: str = ""

@dataclass
class GeneratedScript:
    id: Optional[int] = None
    title: str = ""
    content: str = ""
    content_type: str = ""
    video_length: str = ""
    target_audience: str = ""
    template_type: str = ""
    ai_generated: bool = True
    status: str = "generated"
    created_at: str = ""

@dataclass
class Analytics:
    id: Optional[int] = None
    platform: str = ""
    views: int = 0
    engagement_rate: float = 0.0
    revenue: int = 0
    conversion_rate: float = 0.0
    date: str = ""

class DatabaseManager:
    def __init__(self, db_file: str = Config.DATABASE_FILE):
        self.db_file = db_file
        self.init_database()
    
    def init_database(self):
        """Initialize SQLite database with all required tables"""
        conn = sqlite3.connect(self.db_file)
        cursor = conn.cursor()
        
        # Create tables
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS viral_videos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                platform TEXT NOT NULL,
                url TEXT NOT NULL,
                views INTEGER DEFAULT 0,
                engagement_rate REAL DEFAULT 0.0,
                ai_score INTEGER DEFAULT 0,
                captions TEXT,
                hashtags TEXT,
                status TEXT DEFAULT 'discovered',
                audio_transcript TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS affiliate_products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                commission_rate INTEGER NOT NULL,
                commission_amount INTEGER NOT NULL,
                url TEXT NOT NULL,
                is_recurring BOOLEAN DEFAULT FALSE,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS generated_scripts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                content_type TEXT NOT NULL,
                video_length TEXT NOT NULL,
                target_audience TEXT NOT NULL,
                template_type TEXT NOT NULL,
                ai_generated BOOLEAN DEFAULT TRUE,
                status TEXT DEFAULT 'generated',
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS analytics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                platform TEXT NOT NULL,
                views INTEGER DEFAULT 0,
                engagement_rate REAL DEFAULT 0.0,
                revenue INTEGER DEFAULT 0,
                conversion_rate REAL DEFAULT 0.0,
                date TEXT DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def insert_viral_video(self, video: ViralVideo) -> int:
        """Insert a viral video record"""
        conn = sqlite3.connect(self.db_file)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO viral_videos 
            (title, platform, url, views, engagement_rate, ai_score, captions, hashtags, status, audio_transcript)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (video.title, video.platform, video.url, video.views, video.engagement_rate, 
              video.ai_score, video.captions, video.hashtags, video.status, video.audio_transcript))
        
        video_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return video_id
    
    def get_viral_videos(self) -> List[ViralVideo]:
        """Get all viral videos"""
        conn = sqlite3.connect(self.db_file)
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM viral_videos ORDER BY ai_score DESC')
        rows = cursor.fetchall()
        
        videos = []
        for row in rows:
            videos.append(ViralVideo(
                id=row[0], title=row[1], platform=row[2], url=row[3], views=row[4],
                engagement_rate=row[5], ai_score=row[6], captions=row[7], hashtags=row[8],
                status=row[9], audio_transcript=row[10], created_at=row[11]
            ))
        
        conn.close()
        return videos
    
    def insert_script(self, script: GeneratedScript) -> int:
        """Insert a generated script"""
        conn = sqlite3.connect(self.db_file)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO generated_scripts 
            (title, content, content_type, video_length, target_audience, template_type, ai_generated, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (script.title, script.content, script.content_type, script.video_length,
              script.target_audience, script.template_type, script.ai_generated, script.status))
        
        script_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return script_id
    
    def get_scripts(self) -> List[GeneratedScript]:
        """Get all generated scripts"""
        conn = sqlite3.connect(self.db_file)
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM generated_scripts ORDER BY created_at DESC')
        rows = cursor.fetchall()
        
        scripts = []
        for row in rows:
            scripts.append(GeneratedScript(
                id=row[0], title=row[1], content=row[2], content_type=row[3],
                video_length=row[4], target_audience=row[5], template_type=row[6],
                ai_generated=row[7], status=row[8], created_at=row[9]
            ))
        
        conn.close()
        return scripts
    
    def seed_sample_data(self):
        """Populate database with sample data"""
        conn = sqlite3.connect(self.db_file)
        cursor = conn.cursor()
        
        # Clear existing data
        cursor.execute('DELETE FROM viral_videos')
        cursor.execute('DELETE FROM affiliate_products')
        cursor.execute('DELETE FROM generated_scripts')
        cursor.execute('DELETE FROM analytics')
        
        # Insert sample viral videos
        sample_videos = [
            ("How I Make $8,600/Month in Passive Income (Work 2 Hours Daily)", "TikTok", "https://tiktok.com/sample1", 
             1200000, 12.5, 94, "Lost my waitressing job during pandemic. Now I make $8,600/month with affiliate marketing...", 
             "#passiveincome #affiliatemarketing #sidehustle", "processed", "Hey everyone, so I know this sounds crazy..."),
            ("5 AI Tools That Actually Make Money (I Made $3,200 This Week)", "Instagram", "https://instagram.com/sample2",
             890000, 9.8, 87, "After testing 50+ AI tools, these 5 actually generate income...",
             "#aitools #generativeai #makemoneywithai", "processed", "I've tested over 50 different AI tools..."),
            ("Wealth Building Secrets They Don't Want You to Know", "YouTube", "https://youtube.com/sample3",
             650000, 11.2, 89, "The wealth building strategies that made me $25K last month...",
             "#wealthbuilding #passiveincome #investing", "processed", "What I'm about to share with you..."),
            ("ChatGPT + This Tool = $500/Day (AI Money Method)", "TikTok", "https://tiktok.com/sample4",
             750000, 10.3, 91, "Everyone uses ChatGPT wrong. I combine it with this one tool...",
             "#chatgpt #aitools #makemoneywithai", "processed", "Most people are using ChatGPT completely wrong..."),
            ("How AI Automation Replaced My 9-5 Income", "YouTube", "https://youtube.com/sample6",
             580000, 11.8, 92, "AI didn't take my job - it gave me a better one...",
             "#aiautomation #artificialintelligence #makemoneywithai", "processed", "A year ago I was making $60,000...")
        ]
        
        for video_data in sample_videos:
            cursor.execute('''
                INSERT INTO viral_videos (title, platform, url, views, engagement_rate, ai_score, captions, hashtags, status, audio_transcript)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', video_data)
        
        # Insert affiliate products
        for product in Config.AFFILIATE_PRODUCTS:
            cursor.execute('''
                INSERT INTO affiliate_products (name, category, commission_rate, commission_amount, url, is_recurring)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (product['name'], product['category'], product['commission_rate'], 
                  product['commission_amount'], product['url'], product['is_recurring']))
        
        # Insert sample scripts
        sample_scripts = [
            ("Morning Motivation: Start Your Side Hustle Today", 
             "🎯 Hook: 'I used to hate Monday mornings. Now I wake up excited because my side hustle made me $500 while I slept.'\n\n❗ Problem: 'Most people are stuck in jobs they hate, living paycheck to paycheck, with no way out.'\n\n💡 Solution: 'I discovered affiliate marketing - promoting products I believe in and earning commissions.'\n\n📊 Proof: 'In 6 months, I went from $0 to $8,600/month working just 2 hours daily.'\n\n📞 Call to Action: 'Comment START if you want the exact blueprint I used. It's completely free.'",
             "Motivational", "60 seconds", "Aspiring Entrepreneurs", "success-story", True, "approved"),
            ("5 AI Tools That Actually Make Money (Not ChatGPT)",
             "🎯 Hook: 'Everyone talks about ChatGPT, but these 5 AI tools actually generate income.'\n\n❗ Problem: 'Most people use AI tools for fun, not profit. They're missing the real money-making opportunities.'\n\n💡 Solution: 'I use Jasper AI for content, Systeme.io for automation, and 3 other tools to create multiple income streams.'\n\n📊 Proof: 'Last month: $3,200 from AI-generated content, $2,100 from automation, $1,800 from AI affiliate commissions.'\n\n📞 Call to Action: 'Drop a 🤖 if you want my complete AI money-making toolkit.'",
             "AI Tools Review", "45 seconds", "Tech-Savvy Entrepreneurs", "tips-tricks", True, "approved"),
            ("Wealth Building Secrets Rich People Don't Share",
             "🎯 Hook: 'Rich people have 7 income streams. Poor people have 1. Here's how to build yours.'\n\n❗ Problem: 'You're trading time for money. Rich people make money work for them while they sleep.'\n\n💡 Solution: 'I built multiple passive income streams: affiliate marketing, course sales, and recurring commissions.'\n\n📊 Proof: 'Stream 1: $2,400/month. Stream 2: $1,800/month. Stream 3: $4,400/month. Total: $8,600/month.'\n\n📞 Call to Action: 'Comment WEALTH if you want my 7-stream income blueprint.'",
             "Wealth Building", "75 seconds", "Wealth Seekers", "success-story", True, "approved")
        ]
        
        for script_data in sample_scripts:
            cursor.execute('''
                INSERT INTO generated_scripts (title, content, content_type, video_length, target_audience, template_type, ai_generated, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', script_data)
        
        # Insert sample analytics
        sample_analytics = [
            ("TikTok", 1200000, 12.5, 2400, 4.2),
            ("Instagram", 890000, 9.8, 1800, 3.8),
            ("YouTube", 650000, 11.2, 1400, 5.1)
        ]
        
        for analytics_data in sample_analytics:
            cursor.execute('''
                INSERT INTO analytics (platform, views, engagement_rate, revenue, conversion_rate)
                VALUES (?, ?, ?, ?, ?)
            ''', analytics_data)
        
        conn.commit()
        conn.close()
        print("Database seeded with sample data successfully!")

class AIAgent:
    def __init__(self, api_key: str):
        self.client = OpenAI(api_key=api_key)
        self.db = DatabaseManager()
    
    def analyze_viral_video(self, video_url: str, transcript: str) -> Dict[str, Any]:
        """Analyze a viral video for affiliate marketing potential"""
        try:
            prompt = f"""
            Analyze this viral video for affiliate marketing potential. The video transcript is: "{transcript}"
            
            Provide a JSON response with:
            - score: 0-100 rating for affiliate marketing potential
            - engagement_quality: "high", "medium", or "low"
            - content_themes: Array of main themes
            - success_factors: Array of reasons why it's viral
            - recommendations: Array of actionable suggestions
            
            Focus on Shannon Smith's authentic approach to affiliate marketing and AI/automation content.
            """
            
            response = self.client.chat.completions.create(
                model="gpt-4o",  # the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
                messages=[
                    {"role": "system", "content": "You are an expert at analyzing viral content for affiliate marketing potential. Respond with valid JSON only."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            
            return json.loads(response.choices[0].message.content)
            
        except Exception as e:
            print(f"Error analyzing video: {e}")
            return {
                "score": 0,
                "engagement_quality": "unknown",
                "content_themes": ["analysis_failed"],
                "success_factors": ["Could not analyze"],
                "recommendations": ["Retry analysis"]
            }
    
    def generate_script(self, content_type: str, video_length: str, target_audience: str, 
                       key_message: str, template_type: str) -> Dict[str, Any]:
        """Generate a script based on viral patterns"""
        try:
            prompt = f"""
            Generate a viral video script for affiliate marketing with these parameters:
            - Content Type: {content_type}
            - Video Length: {video_length}
            - Target Audience: {target_audience}
            - Key Message: {key_message}
            - Template Type: {template_type}
            
            Create a script following Shannon Smith's authentic approach. Focus on:
            - High-ticket affiliate products (Systeme.io, ClickFunnels, Jasper AI)
            - Authentic storytelling with real income numbers
            - Trust-building through personal experiences
            - Clear call-to-action for engagement
            
            Return JSON with:
            - title: Compelling video title
            - hook: Opening hook (first 3 seconds)
            - problem: Problem identification
            - solution: Solution presentation
            - proof: Social proof/results
            - cta: Call to action
            - full_script: Complete script
            - hashtags: Array of relevant hashtags
            - estimated_engagement: Predicted engagement rate (0-100)
            """
            
            response = self.client.chat.completions.create(
                model="gpt-4o",  # the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
                messages=[
                    {"role": "system", "content": "You are an expert at creating viral affiliate marketing scripts. Respond with valid JSON only."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            
            return json.loads(response.choices[0].message.content)
            
        except Exception as e:
            print(f"Error generating script: {e}")
            return {
                "title": "Error generating script",
                "hook": "Script generation failed",
                "problem": "Technical error occurred",
                "solution": "Please try again",
                "proof": "No results available",
                "cta": "Contact support",
                "full_script": "Script generation failed due to technical error.",
                "hashtags": ["#error"],
                "estimated_engagement": 0
            }
    
    def score_content_authenticity(self, content: str) -> int:
        """Score content authenticity (0-100)"""
        try:
            prompt = f"""
            Score this content for authenticity on a scale of 0-100.
            Consider: personal story elements, specific numbers, realistic claims, trust indicators.
            
            Content: "{content}"
            
            Return only a number between 0-100.
            """
            
            response = self.client.chat.completions.create(
                model="gpt-4o",  # the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
                messages=[
                    {"role": "system", "content": "You are an expert at evaluating content authenticity. Return only a number."},
                    {"role": "user", "content": prompt}
                ]
            )
            
            return int(response.choices[0].message.content.strip())
            
        except Exception as e:
            print(f"Error scoring authenticity: {e}")
            return 50

class ViralAIAgent:
    def __init__(self):
        self.db = DatabaseManager()
        self.ai = AIAgent(Config.OPENAI_API_KEY)
        
    def scan_viral_content(self, platform: str = "all") -> List[ViralVideo]:
        """Simulate scanning for viral content (500K+ views in past 7 days)"""
        print(f"Scanning for viral content on {platform}...")
        
        # In real implementation, this would connect to social media APIs
        # For now, return sample data from database
        return self.db.get_viral_videos()
    
    def generate_content_script(self, content_type: str, video_length: str, 
                               target_audience: str, key_message: str, 
                               template_type: str) -> GeneratedScript:
        """Generate a new content script"""
        print(f"Generating {content_type} script for {target_audience}...")
        
        script_data = self.ai.generate_script(
            content_type, video_length, target_audience, key_message, template_type
        )
        
        script = GeneratedScript(
            title=script_data.get('title', 'Generated Script'),
            content=script_data.get('full_script', 'Content generation failed'),
            content_type=content_type,
            video_length=video_length,
            target_audience=target_audience,
            template_type=template_type,
            ai_generated=True,
            status="generated"
        )
        
        script_id = self.db.insert_script(script)
        script.id = script_id
        
        print(f"Script generated successfully: {script.title}")
        return script
    
    def get_dashboard_stats(self) -> Dict[str, Any]:
        """Get dashboard statistics"""
        videos = self.db.get_viral_videos()
        scripts = self.db.get_scripts()
        
        total_views = sum(v.views for v in videos)
        avg_engagement = sum(v.engagement_rate for v in videos) / len(videos) if videos else 0
        
        return {
            "monthly_revenue": 5600,
            "videos_created": len(scripts),
            "avg_engagement": round(avg_engagement, 1),
            "conversion_rate": 4.2,
            "total_views": total_views,
            "viral_videos_found": len([v for v in videos if v.ai_score > 85])
        }
    
    def get_affiliate_products(self) -> List[Dict[str, Any]]:
        """Get affiliate products with commission data"""
        return Config.AFFILIATE_PRODUCTS
    
    def run_interactive_mode(self):
        """Run the agent in interactive mode"""
        print("\n🚀 Viral AI Agent - Affiliate Marketing Automation")
        print("=" * 50)
        
        while True:
            print("\nChoose an option:")
            print("1. Scan for viral content")
            print("2. Generate content script")
            print("3. View dashboard stats")
            print("4. View affiliate products")
            print("5. View generated scripts")
            print("6. Seed sample data")
            print("7. Exit")
            
            choice = input("\nEnter your choice (1-7): ").strip()
            
            if choice == "1":
                self.scan_viral_content_interactive()
            elif choice == "2":
                self.generate_script_interactive()
            elif choice == "3":
                self.show_dashboard_stats()
            elif choice == "4":
                self.show_affiliate_products()
            elif choice == "5":
                self.show_generated_scripts()
            elif choice == "6":
                self.db.seed_sample_data()
            elif choice == "7":
                print("Goodbye!")
                break
            else:
                print("Invalid choice. Please try again.")
    
    def scan_viral_content_interactive(self):
        """Interactive viral content scanning"""
        print("\n📊 Scanning for viral content...")
        videos = self.scan_viral_content()
        
        if not videos:
            print("No viral videos found in database. Run option 6 to seed sample data.")
            return
        
        print(f"\nFound {len(videos)} viral videos:")
        for i, video in enumerate(videos[:5], 1):
            print(f"{i}. {video.title}")
            print(f"   Platform: {video.platform} | Views: {video.views:,} | AI Score: {video.ai_score}")
            print(f"   Engagement: {video.engagement_rate}%")
            print()
    
    def generate_script_interactive(self):
        """Interactive script generation"""
        print("\n✍️ Generate Content Script")
        
        content_type = input("Content type (AI Tools/Passive Income/Wealth Building): ").strip()
        video_length = input("Video length (30s/60s/90s): ").strip()
        target_audience = input("Target audience: ").strip()
        key_message = input("Key message: ").strip()
        template_type = input("Template type (success-story/tips-tricks/motivational): ").strip()
        
        if not all([content_type, video_length, target_audience, key_message, template_type]):
            print("Please fill in all fields.")
            return
        
        script = self.generate_content_script(
            content_type, video_length, target_audience, key_message, template_type
        )
        
        print(f"\n📝 Generated Script: {script.title}")
        print("-" * 50)
        print(script.content)
        print("-" * 50)
    
    def show_dashboard_stats(self):
        """Show dashboard statistics"""
        print("\n📈 Dashboard Statistics")
        stats = self.get_dashboard_stats()
        
        print(f"Monthly Revenue: ${stats['monthly_revenue']:,}")
        print(f"Videos Created: {stats['videos_created']}")
        print(f"Average Engagement: {stats['avg_engagement']}%")
        print(f"Conversion Rate: {stats['conversion_rate']}%")
        print(f"Total Views: {stats['total_views']:,}")
        print(f"Viral Videos Found: {stats['viral_videos_found']}")
    
    def show_affiliate_products(self):
        """Show affiliate products"""
        print("\n💰 Affiliate Products")
        products = self.get_affiliate_products()
        
        for product in products:
            print(f"• {product['name']}")
            print(f"  Category: {product['category']}")
            print(f"  Commission: {product['commission_rate']}% (${product['commission_amount']} avg)")
            print(f"  Recurring: {'Yes' if product['is_recurring'] else 'No'}")
            print(f"  URL: {product['url']}")
            print()
    
    def show_generated_scripts(self):
        """Show generated scripts"""
        print("\n📝 Generated Scripts")
        scripts = self.db.get_scripts()
        
        if not scripts:
            print("No scripts found. Generate some scripts first!")
            return
        
        for i, script in enumerate(scripts, 1):
            print(f"{i}. {script.title}")
            print(f"   Type: {script.content_type} | Length: {script.video_length}")
            print(f"   Audience: {script.target_audience} | Status: {script.status}")
            print()

def main():
    """Main function to run the Viral AI Agent"""
    # Check if OpenAI API key is set
    if Config.OPENAI_API_KEY == 'your-openai-key-here':
        print("⚠️  Please set your OPENAI_API_KEY environment variable")
        print("   export OPENAI_API_KEY='your-actual-api-key'")
        print("   or edit the Config class in this script")
        return
    
    try:
        # Initialize and run the agent
        agent = ViralAIAgent()
        agent.run_interactive_mode()
        
    except KeyboardInterrupt:
        print("\n\nExiting...")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()