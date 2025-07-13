#!/usr/bin/env python3
"""
Example usage of the Viral AI Agent Python script
Demonstrates key features without requiring user interaction
"""

import os
from viral_ai_agent import ViralAIAgent, Config

def demo_without_api_key():
    """Demo the agent features that don't require OpenAI API"""
    print("🚀 Viral AI Agent Demo - Core Features")
    print("=" * 50)
    
    # Initialize agent
    agent = ViralAIAgent()
    
    # Seed sample data
    print("📚 Seeding sample data...")
    agent.db.seed_sample_data()
    
    # Show dashboard stats
    print("\n📈 Dashboard Statistics")
    stats = agent.get_dashboard_stats()
    for key, value in stats.items():
        if isinstance(value, (int, float)):
            if key == 'monthly_revenue':
                print(f"  {key.replace('_', ' ').title()}: ${value:,}")
            elif key in ['total_views']:
                print(f"  {key.replace('_', ' ').title()}: {value:,}")
            else:
                print(f"  {key.replace('_', ' ').title()}: {value}")
    
    # Show affiliate products
    print("\n💰 Top Affiliate Products")
    products = agent.get_affiliate_products()
    for product in products[:4]:
        recurring = "Recurring" if product['is_recurring'] else "One-time"
        print(f"  • {product['name']}: {product['commission_rate']}% commission (${product['commission_amount']} avg) - {recurring}")
    
    # Show viral videos
    print("\n🎬 Viral Videos Found")
    videos = agent.scan_viral_content()
    for video in videos[:3]:
        print(f"  • {video.title}")
        print(f"    {video.platform} | {video.views:,} views | AI Score: {video.ai_score}/100")
    
    # Show generated scripts
    print("\n📝 Generated Scripts")
    scripts = agent.db.get_scripts()
    for script in scripts[:2]:
        print(f"  • {script.title}")
        print(f"    {script.content_type} | {script.video_length} | {script.target_audience}")
    
    print("\n✅ Demo completed successfully!")
    print("\nTo use AI features, set your OpenAI API key:")
    print("  export OPENAI_API_KEY='your-api-key-here'")
    print("  python viral_ai_agent.py")

def demo_with_api_key():
    """Demo AI features if API key is available"""
    if Config.OPENAI_API_KEY == 'your-openai-key-here':
        print("\n⚠️  Set OPENAI_API_KEY environment variable to test AI features")
        return
    
    print("\n🤖 Testing AI Features...")
    agent = ViralAIAgent()
    
    # Test script generation
    try:
        script = agent.generate_content_script(
            content_type="AI Tools",
            video_length="60 seconds",
            target_audience="Aspiring Entrepreneurs",
            key_message="How to make money with AI tools",
            template_type="success-story"
        )
        print(f"✅ Generated script: {script.title}")
        print(f"📄 Preview: {script.content[:100]}...")
    except Exception as e:
        print(f"❌ Script generation failed: {e}")

if __name__ == "__main__":
    # Run the demo
    demo_without_api_key()
    demo_with_api_key()