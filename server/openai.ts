import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || ""
});

export interface VideoAnalysis {
  score: number;
  engagement_quality: string;
  content_themes: string[];
  success_factors: string[];
  recommendations: string[];
}

export interface GeneratedScript {
  title: string;
  hook: string;
  problem: string;
  solution: string;
  proof: string;
  cta: string;
  full_script: string;
  hashtags: string[];
  estimated_engagement: number;
}

export async function analyzeViralVideo(
  title: string,
  captions: string,
  hashtags: string,
  views: number,
  engagementRate: number
): Promise<VideoAnalysis> {
  try {
    const prompt = `
Analyze this viral video for affiliate marketing potential. Focus on wealth-building and side-hustle content quality.

Video Details:
- Title: ${title}
- Captions: ${captions}
- Hashtags: ${hashtags}
- Views: ${views}
- Engagement Rate: ${engagementRate}%

Provide analysis in JSON format with:
- score: number (0-100) based on affiliate marketing potential
- engagement_quality: string (poor/good/excellent)
- content_themes: array of main themes
- success_factors: array of what makes it successful
- recommendations: array of how to adapt this for affiliate marketing

Focus on authenticity, trust-building, and wealth-building themes like Shannon Smith's approach.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert affiliate marketing analyst specializing in viral content and wealth-building niches. Provide detailed, actionable insights."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      score: Math.max(0, Math.min(100, result.score || 0)),
      engagement_quality: result.engagement_quality || "good",
      content_themes: result.content_themes || [],
      success_factors: result.success_factors || [],
      recommendations: result.recommendations || []
    };
  } catch (error) {
    console.error("OpenAI analysis error:", error);
    throw new Error("Failed to analyze viral video: " + (error as Error).message);
  }
}

export async function generateScript(
  contentType: string,
  videoLength: string,
  targetAudience: string,
  keyMessage: string,
  templateType: string
): Promise<GeneratedScript> {
  try {
    const prompt = `
Generate a viral video script for affiliate marketing using Shannon Smith's authentic approach.

Requirements:
- Content Type: ${contentType}
- Video Length: ${videoLength}
- Target Audience: ${targetAudience}
- Key Message: ${keyMessage}
- Template Type: ${templateType}

Follow Shannon's successful formula:
1. Hook: Start with income transformation or relatable struggle
2. Problem: Address common pain points (job loss, financial stress)
3. Solution: Introduce affiliate marketing as the answer
4. Proof: Share specific income numbers and lifestyle changes
5. CTA: Simple, direct call-to-action

Create authentic, trust-building content that focuses on:
- Real income transformations
- Overcoming adversity
- Building passive income
- Working fewer hours
- Freedom and lifestyle
- AI tools and automation
- Generative AI for income
- Wealth building strategies
- Multiple income streams

Provide response in JSON format with:
- title: compelling video title
- hook: opening line
- problem: problem statement
- solution: solution presentation
- proof: credibility/proof points
- cta: call to action
- full_script: complete script text
- hashtags: relevant hashtags array
- estimated_engagement: predicted engagement rate (0-100)

Make it conversational, authentic, and inspiring while maintaining credibility.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert content creator specializing in authentic affiliate marketing scripts that build trust and drive engagement. Follow Shannon Smith's successful approach of sharing real income transformations and focusing on wealth-building."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      title: result.title || "Untitled Script",
      hook: result.hook || "",
      problem: result.problem || "",
      solution: result.solution || "",
      proof: result.proof || "",
      cta: result.cta || "",
      full_script: result.full_script || "",
      hashtags: result.hashtags || [],
      estimated_engagement: Math.max(0, Math.min(100, result.estimated_engagement || 50))
    };
  } catch (error) {
    console.error("OpenAI script generation error:", error);
    throw new Error("Failed to generate script: " + (error as Error).message);
  }
}

export async function scoreContentAuthenticity(content: string): Promise<number> {
  try {
    const prompt = `
Score this content for authenticity and trust-building potential in affiliate marketing (0-100).

Content: ${content}

Focus on:
- Personal story elements
- Specific numbers/results
- Relatable struggles
- Authentic tone
- Trust-building language
- Credibility indicators

Respond with just a number (0-100).
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert at evaluating content authenticity for affiliate marketing. Score based on trustworthiness, relatability, and credibility."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3
    });

    const score = parseInt(response.choices[0].message.content || "50");
    return Math.max(0, Math.min(100, score));
  } catch (error) {
    console.error("OpenAI authenticity scoring error:", error);
    return 50; // Default score if API fails
  }
}
