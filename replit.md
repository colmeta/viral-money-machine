# Viral AI Agent

## Overview

This is a complete viral video autopilot AI agent platform built to help content creators maximize their affiliate marketing success through AI-powered video analysis and content generation. The application has been converted from TypeScript/Node.js to a comprehensive Python script that combines all functionality into a single file. It uses SQLite for persistent storage and OpenAI for AI capabilities. The platform is specifically designed around Shannon Smith's authentic affiliate marketing approach, focusing on high-ticket products and trust-building content.

## User Preferences

Preferred communication style: Simple, everyday language.

Content Focus: Cover all niches including:
- Shannon Smith's passive income & wealth building approach
- AI tools, generative AI, and AI automation 
- How to earn with AI and AI money-making methods
- Traditional affiliate marketing and side hustles
- Multiple income streams and financial freedom

Affiliate Products: Focus on high-commission recurring products like Systeme.io (60% lifetime), ClickFunnels 2.0 (40% recurring), Jasper AI (30% recurring), and high-ticket courses up to $3,000 commissions.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with Tailwind CSS styling
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with CSS variables for theming

### Python Script Architecture
- **Runtime**: Python 3.11 with standard libraries
- **Language**: Python with dataclasses and type hints
- **Database**: SQLite with native Python integration
- **AI Integration**: OpenAI API for content analysis and generation
- **Interactive Mode**: Command-line interface for all operations

### Database Design
- **Database**: SQLite with persistent storage
- **Schema Management**: Native Python SQLite integration
- **Storage Layer**: DatabaseManager class with type-safe operations
- **Tables**: 
  - `viral_videos` - Tracked viral content with analytics
  - `affiliate_products` - Product catalog with commission data
  - `generated_scripts` - AI-generated content scripts
  - `analytics` - Performance tracking data
- **Sample Data**: Pre-populated with authentic affiliate marketing content covering all niches

## Key Components

### Viral Video Agent
- Finds trending videos with 500K+ views in the past 7 days
- Analyzes viral content from TikTok, Instagram, and YouTube
- Scores content based on affiliate marketing potential (0-100)
- Extracts captions, hashtags, and engagement metrics
- Takes screenshots and downloads audio for transcription
- Provides AI-powered insights and recommendations
- Integrates with Google Sheets for data tracking

### Video Creator Agent
- Generates scripts using OpenAI based on viral content patterns
- Supports multiple content types (side hustles, affiliate marketing, passive income)
- Provides templates for different video formats (15s, 30s, 60s, 3m)
- Offers pre-built templates (success stories, tips & tricks, motivation)
- Creates authentic content based on Shannon Smith's approach
- Saves scripts to database and updates Google Sheets
- Generates videos using free tools (Hugging Face, VEO 3, etc.)

### Scheduler Agent
- Calendar interface for content planning with time and dates
- Multi-platform posting (TikTok, Instagram, YouTube) without API requirements
- Bulk scheduling capabilities
- Post status tracking (scheduled, posted, failed)
- Selects content tagged as "ready to be posted" from Google Sheets
- Uploads videos to platforms and updates tracking sheets

### Analytics Dashboard
- Revenue tracking and ROI calculations
- Engagement metrics across platforms
- Conversion rate monitoring
- Performance trend analysis
- Integration with Google Sheets for comprehensive tracking

## Data Flow

1. **Content Discovery**: Auto-scan mode finds viral videos with 500K+ views in past 7 days
2. **Content Analysis**: AI analyzes videos for affiliate marketing potential and extracts metadata
3. **Data Storage**: All video data, scores, and insights are saved to Google Sheets
4. **Script Generation**: AI creates optimized scripts based on viral patterns and Shannon Smith's approach
5. **Video Creation**: Scripts are converted to videos using free generation tools
6. **Content Scheduling**: Automated posting calendar schedules content across platforms
7. **Performance Tracking**: Analytics are collected and displayed in dashboards with Google Sheets integration

## Affiliate Marketing Integration

The platform combines Shannon Smith's proven affiliate marketing strategies with modern AI/automation content:

### Content Categories:
- **Passive Income & Wealth Building**: Shannon Smith's authentic approach with real income transformations
- **AI Tools & Automation**: ChatGPT, Jasper AI, automation tools, and generative AI workflows
- **Traditional Affiliate Marketing**: High-ticket products, side hustles, and multiple income streams
- **Financial Freedom**: Building wealth, escaping 9-5, and achieving lifestyle freedom

### Affiliate Products Integration:
- **Systeme.io**: 60% recurring lifetime commissions ($27-$297/month)
- **ClickFunnels 2.0**: 40% recurring + bonuses ($38-$118/month)
- **Jasper AI**: 30% recurring for AI content creation ($15-$75/month)
- **GetResponse**: 33% recurring for email automation ($16-$165/month)
- **Legendary Marketer**: High-ticket courses ($100-$3,000 commissions)
- **ClickBank**: 50-75% on high-ticket programs ($500-$2,200 per sale)

### Strategy Elements:
- **Authentic Content**: Generate scripts that build trust through personal stories and real income numbers
- **Recurring Income**: Prioritize products with subscription models for ongoing commissions
- **Proven Templates**: Use success story, tips & tricks, and motivational formats that convert
- **Trust Building**: Content emphasizes authenticity, specific results, and helpful advice

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL for serverless database hosting
- **AI Service**: OpenAI API for content analysis and generation
- **Authentication**: Session-based auth with connect-pg-simple
- **UI Components**: Radix UI for accessible component primitives
- **Styling**: Tailwind CSS for utility-first styling

### Development Tools
- **Build**: Vite with React plugin and TypeScript support
- **Database**: Drizzle ORM with PostgreSQL adapter
- **Validation**: Zod for runtime type checking
- **Development**: TSX for TypeScript execution, ESBuild for production builds

## Deployment Strategy

### Development
- Uses Vite dev server with HMR for frontend
- Express server with TSX for backend hot reloading
- Replit integration with runtime error overlays

### Production
- Frontend: Vite build process outputs to `dist/public`
- Backend: ESBuild bundles server code to `dist/index.js`
- Database: Drizzle migrations managed via `db:push` command
- Environment: Requires `DATABASE_URL` and `OPENAI_API_KEY` environment variables

### Key Features
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Shared Types**: Common schema definitions in `shared/` directory
- **Error Handling**: Comprehensive error boundaries and API error handling
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Performance**: Optimized builds with code splitting and lazy loading

The application follows modern web development practices with a focus on type safety, developer experience, and scalable architecture patterns.