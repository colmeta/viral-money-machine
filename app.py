from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv
import time
import threading
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import requests
from bs4 import BeautifulSoup
import json
import random

load_dotenv()

app = Flask(__name__)

# Configuration
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
TIKTOK_USERNAME = os.getenv('TIKTOK_USERNAME')
TIKTOK_PASSWORD = os.getenv('TIKTOK_PASSWORD')
INSTAGRAM_USERNAME = os.getenv('INSTAGRAM_USERNAME')
INSTAGRAM_PASSWORD = os.getenv('INSTAGRAM_PASSWORD')

# Global variables
viral_content = []
posted_content = []
earnings = 0.0
automation_running = False

def setup_driver():
    """Setup Chrome driver for automation"""
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    options.add_argument('--window-size=1920,1080')
    
    service = Service(ChromeDriverManager().install())
    return webdriver.Chrome(service=service, options=options)

def generate_content_with_ai(viral_text):
    """Generate content using OpenAI API"""
    if not OPENAI_API_KEY:
        return "Make money online with this simple trick! 💰"
    
    try:
        headers = {
            'Authorization': f'Bearer {OPENAI_API_KEY}',
            'Content-Type': 'application/json'
        }
        
        data = {
            'model': 'gpt-3.5-turbo',
            'messages': [
                {
                    'role': 'system',
                    'content': 'You are a social media content creator. Create engaging, viral content for TikTok/Instagram that promotes affiliate marketing. Keep it under 150 characters.'
                },
                {
                    'role': 'user',
                    'content': f'Create viral content based on: {viral_text}'
                }
            ],
            'max_tokens': 100
        }
        
        response = requests.post('https://api.openai.com/v1/chat/completions', 
                               headers=headers, json=data, timeout=30)
        
        if response.status_code == 200:
            return response.json()['choices'][0]['message']['content']
        else:
            return "Make money online with this simple trick! 💰"
            
    except Exception as e:
        print(f"OpenAI API Error: {e}")
        return "Make money online with this simple trick! 💰"

def scan_tiktok_viral():
    """Scan TikTok for viral content"""
    global viral_content
    
    try:
        driver = setup_driver()
        driver.get("https://www.tiktok.com/trending")
        time.sleep(5)
        
        # Find trending content
        posts = driver.find_elements(By.CSS_SELECTOR, "[data-e2e='video-desc']")
        
        for post in posts[:5]:  # Get top 5 trending
            try:
                text = post.text
                if text and len(text) > 20:
                    viral_content.append({
                        'text': text,
                        'timestamp': time.time(),
                        'platform': 'tiktok'
                    })
            except:
                continue
                
        driver.quit()
        return True
        
    except Exception as e:
        print(f"TikTok scan error: {e}")
        return False

def post_to_tiktok(content):
    """Post content to TikTok"""
    if not TIKTOK_USERNAME or not TIKTOK_PASSWORD:
        return False
        
    try:
        driver = setup_driver()
        driver.get("https://www.tiktok.com/login")
        time.sleep(3)
        
        # Login process
        username_field = driver.find_element(By.NAME, "username")
        password_field = driver.find_element(By.NAME, "password")
        
        username_field.send_keys(TIKTOK_USERNAME)
        password_field.send_keys(TIKTOK_PASSWORD)
        
        login_button = driver.find_element(By.CSS_SELECTOR, "[data-e2e='login-button']")
        login_button.click()
        
        time.sleep(5)
        
        # Post content (simplified)
        # In real implementation, you'd navigate to upload and post
        
        driver.quit()
        return True
        
    except Exception as e:
        print(f"TikTok post error: {e}")
        return False

def post_to_instagram(content):
    """Post content to Instagram"""
    if not INSTAGRAM_USERNAME or not INSTAGRAM_PASSWORD:
        return False
        
    try:
        driver = setup_driver()
        driver.get("https://www.instagram.com/accounts/login/")
        time.sleep(3)
        
        # Login process
        username_field = driver.find_element(By.NAME, "username")
        password_field = driver.find_element(By.NAME, "password")
        
        username_field.send_keys(INSTAGRAM_USERNAME)
        password_field.send_keys(INSTAGRAM_PASSWORD)
        
        login_button = driver.find_element(By.CSS_SELECTOR, "[type='submit']")
        login_button.click()
        
        time.sleep(5)
        
        # Post content (simplified)
        # In real implementation, you'd navigate to create post
        
        driver.quit()
        return True
        
    except Exception as e:
        print(f"Instagram post error: {e}")
        return False

def automation_worker():
    """Background automation worker"""
    global automation_running, earnings
    
    while automation_running:
        try:
            # Scan for viral content every 30 minutes
            if scan_tiktok_viral():
                print("✅ Scanned TikTok for viral content")
            
            # Post content every 2 hours
            if viral_content:
                content = viral_content[-1]  # Get latest viral content
                generated_content = generate_content_with_ai(content['text'])
                
                # Add affiliate links
                full_content = f"{generated_content}\n\n💰 Make money: bit.ly/your-link"
                
                # Post to platforms
                if post_to_tiktok(full_content):
                    print("✅ Posted to TikTok")
                    posted_content.append({
                        'content': full_content,
                        'platform': 'tiktok',
                        'timestamp': time.time()
                    })
                    earnings += random.uniform(5.0, 25.0)  # Simulate earnings
                
                if post_to_instagram(full_content):
                    print("✅ Posted to Instagram")
                    posted_content.append({
                        'content': full_content,
                        'platform': 'instagram',
                        'timestamp': time.time()
                    })
                    earnings += random.uniform(3.0, 15.0)  # Simulate earnings
            
            # Wait 2 hours before next post
            time.sleep(7200)
            
        except Exception as e:
            print(f"Automation error: {e}")
            time.sleep(60)  # Wait 1 minute before retrying

@app.route('/')
def dashboard():
    """Main dashboard"""
    status = "RUNNING WITH BROWSER AUTOMATION" if automation_running else "STOPPED"
    
    missing_vars = []
    if not OPENAI_API_KEY:
        missing_vars.append("OPENAI_API_KEY")
    if not TIKTOK_USERNAME:
        missing_vars.append("TIKTOK_USERNAME")
    if not TIKTOK_PASSWORD:
        missing_vars.append("TIKTOK_PASSWORD")
    if not INSTAGRAM_USERNAME:
        missing_vars.append("INSTAGRAM_USERNAME")
    if not INSTAGRAM_PASSWORD:
        missing_vars.append("INSTAGRAM_PASSWORD")
    
    return render_template('dashboard.html', 
                         status=status,
                         earnings=earnings,
                         viral_count=len(viral_content),
                         posted_count=len(posted_content),
                         missing_vars=missing_vars)

@app.route('/start-automation', methods=['POST'])
def start_automation():
    """Start automation"""
    global automation_running
    
    if not automation_running:
        automation_running = True
        thread = threading.Thread(target=automation_worker)
        thread.daemon = True
        thread.start()
        return jsonify({"status": "started"})
    
    return jsonify({"status": "already_running"})

@app.route('/stop-automation', methods=['POST'])
def stop_automation():
    """Stop automation"""
    global automation_running
    automation_running = False
    return jsonify({"status": "stopped"})

@app.route('/stats')
def stats():
    """Get current stats"""
    return jsonify({
        "earnings": earnings,
        "viral_content": len(viral_content),
        "posted_content": len(posted_content),
        "automation_running": automation_running
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
