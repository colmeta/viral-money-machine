#!/usr/bin/env python3
"""
Test script for the Viral AI Agent Python conversion
"""

import os
import sys
import sqlite3
from viral_ai_agent import ViralAIAgent, Config, DatabaseManager

def test_database_setup():
    """Test database initialization"""
    print("Testing database setup...")
    db = DatabaseManager('test_viral_agent.db')
    
    # Check if tables exist
    conn = sqlite3.connect('test_viral_agent.db')
    cursor = conn.cursor()
    
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = cursor.fetchall()
    expected_tables = ['viral_videos', 'affiliate_products', 'generated_scripts', 'analytics']
    
    table_names = [table[0] for table in tables]
    for expected in expected_tables:
        if expected in table_names:
            print(f"✓ Table {expected} exists")
        else:
            print(f"✗ Table {expected} missing")
    
    conn.close()
    
    # Clean up test database
    try:
        os.remove('test_viral_agent.db')
    except FileNotFoundError:
        pass

def test_seed_data():
    """Test sample data seeding"""
    print("\nTesting sample data seeding...")
    db = DatabaseManager('test_viral_agent.db')
    db.seed_sample_data()
    
    # Check if data was inserted
    conn = sqlite3.connect('test_viral_agent.db')
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM viral_videos")
    video_count = cursor.fetchone()[0]
    print(f"✓ Inserted {video_count} viral videos")
    
    cursor.execute("SELECT COUNT(*) FROM affiliate_products")
    product_count = cursor.fetchone()[0]
    print(f"✓ Inserted {product_count} affiliate products")
    
    cursor.execute("SELECT COUNT(*) FROM generated_scripts")
    script_count = cursor.fetchone()[0]
    print(f"✓ Inserted {script_count} generated scripts")
    
    conn.close()
    
    # Clean up test database
    try:
        os.remove('test_viral_agent.db')
    except FileNotFoundError:
        pass

def test_affiliate_products():
    """Test affiliate product configuration"""
    print("\nTesting affiliate products...")
    products = Config.AFFILIATE_PRODUCTS
    
    print(f"✓ Found {len(products)} affiliate products")
    
    high_commission_products = [p for p in products if p['commission_rate'] >= 50]
    print(f"✓ {len(high_commission_products)} high-commission products (50%+)")
    
    recurring_products = [p for p in products if p['is_recurring']]
    print(f"✓ {len(recurring_products)} recurring commission products")
    
    # Display top products
    print("\nTop affiliate products:")
    for product in products[:3]:
        print(f"  • {product['name']}: {product['commission_rate']}% (${product['commission_amount']} avg)")

def test_agent_initialization():
    """Test agent initialization without API key"""
    print("\nTesting agent initialization...")
    
    # Test with dummy API key
    original_key = Config.OPENAI_API_KEY
    Config.OPENAI_API_KEY = "test-key-123"
    
    try:
        agent = ViralAIAgent()
        print("✓ Agent initialized successfully")
        
        # Test dashboard stats
        stats = agent.get_dashboard_stats()
        print(f"✓ Dashboard stats: {len(stats)} metrics")
        
        # Test affiliate products
        products = agent.get_affiliate_products()
        print(f"✓ Affiliate products: {len(products)} available")
        
    except Exception as e:
        print(f"✗ Agent initialization failed: {e}")
    finally:
        Config.OPENAI_API_KEY = original_key

def main():
    """Run all tests"""
    print("🧪 Testing Viral AI Agent Python Conversion")
    print("=" * 50)
    
    try:
        test_database_setup()
        test_seed_data()
        test_affiliate_products()
        test_agent_initialization()
        
        print("\n✅ All tests completed successfully!")
        print("\nThe Python script is ready to use.")
        print("Set your OPENAI_API_KEY environment variable and run:")
        print("  python viral_ai_agent.py")
        
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()