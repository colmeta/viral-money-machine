# Viral AI Agent - Python Script Version

This is a complete Python conversion of the Viral AI Agent platform, combining all functionality into a single script for affiliate marketing automation.

## Features

### 🎯 Core Functionality
- **Viral Content Discovery**: Analyze trending videos with 500K+ views
- **AI-Powered Script Generation**: Create authentic affiliate marketing scripts
- **Database Management**: SQLite database for persistent storage
- **Analytics Dashboard**: Track performance and revenue metrics
- **Affiliate Product Management**: Built-in catalog of high-commission products

### 💰 Affiliate Products Included
- **Systeme.io**: 60% recurring commission ($162 avg)
- **ClickFunnels 2.0**: 40% recurring commission ($78 avg)
- **Jasper AI**: 30% recurring commission ($45 avg)
- **GetResponse**: 33% recurring commission ($90 avg)
- **Legendary Marketer**: 60% commission ($1,550 avg)
- **ClickBank High-Ticket**: 62% commission ($1,350 avg)

### 🎬 Content Types Supported
- AI Tools & Automation
- Passive Income & Wealth Building
- Shannon Smith's Authentic Approach
- Side Hustles & Entrepreneurship
- High-Ticket Affiliate Marketing

## Installation & Setup

### 1. Install Dependencies
```bash
pip install openai requests
```

### 2. Set OpenAI API Key
```bash
export OPENAI_API_KEY='your-actual-api-key-here'
```

### 3. Run the Script
```bash
python viral_ai_agent.py
```

## Usage

### Interactive Mode
The script runs in interactive mode with these options:

1. **Scan for viral content** - Analyze trending videos
2. **Generate content script** - Create AI-powered scripts
3. **View dashboard stats** - See performance metrics
4. **View affiliate products** - Browse commission opportunities
5. **View generated scripts** - Review created content
6. **Seed sample data** - Populate database with examples

### Example Script Generation
```
Content type: AI Tools
Video length: 60s
Target audience: Aspiring Entrepreneurs
Key message: How to make money with AI
Template type: success-story
```

### Sample Generated Output
```
🎯 Hook: 'Everyone talks about ChatGPT, but these 5 AI tools actually generate income.'

❗ Problem: 'Most people use AI tools for fun, not profit. They're missing the real money-making opportunities.'

💡 Solution: 'I use Jasper AI for content, Systeme.io for automation, and 3 other tools to create multiple income streams.'

📊 Proof: 'Last month: $3,200 from AI-generated content, $2,100 from automation, $1,800 from AI affiliate commissions.'

📞 Call to Action: 'Drop a 🤖 if you want my complete AI money-making toolkit.'
```

## Database Structure

The script uses SQLite with these tables:
- `viral_videos` - Trending content analysis
- `affiliate_products` - Commission tracking
- `generated_scripts` - AI-created content
- `analytics` - Performance metrics

## Shannon Smith's Approach

The script follows Shannon Smith's proven strategies:
- **Authentic storytelling** with real income numbers
- **Trust-building** through personal experiences
- **High-ticket focus** on recurring commissions
- **Specific results** rather than vague promises

## Customization

### Adding New Affiliate Products
Edit the `AFFILIATE_PRODUCTS` list in the `Config` class:
```python
{
    "name": "Your Product",
    "category": "Category",
    "commission_rate": 50,
    "commission_amount": 100,
    "url": "https://your-affiliate-link.com",
    "is_recurring": True
}
```

### Modifying AI Prompts
Update the prompt templates in the `AIAgent` class methods:
- `analyze_viral_video()`
- `generate_script()`
- `score_content_authenticity()`

## Advanced Features

### Batch Processing
The script can process multiple videos and generate scripts in batches.

### Analytics Integration
Built-in tracking for:
- Monthly revenue
- Video creation count
- Engagement rates
- Conversion metrics

### Export Capabilities
Data can be exported to CSV or JSON for external analysis.

## Troubleshooting

### Common Issues
1. **OpenAI API Key**: Ensure your API key is valid and has sufficient credits
2. **Database Permissions**: Check write permissions for SQLite database file
3. **Network Issues**: Verify internet connection for API calls

### Error Handling
The script includes comprehensive error handling for:
- API failures
- Database errors
- Invalid user input
- Network connectivity issues

## Support

For issues or questions:
1. Check the error messages in the console
2. Verify your OpenAI API key is working
3. Ensure all dependencies are installed
4. Review the database file permissions

## License

This script is designed for personal and educational use in affiliate marketing automation.