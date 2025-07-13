import { Play, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VideoItemProps {
  title: string;
  views: string;
  engagement: string;
  score: number;
  onView?: () => void;
}

export default function VideoItem({ 
  title, 
  views, 
  engagement, 
  score, 
  onView 
}: VideoItemProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "score-excellent";
    if (score >= 80) return "score-good";
    if (score >= 70) return "score-fair";
    return "score-poor";
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
      <div className="video-thumbnail">
        <Play className="w-5 h-5 text-gray-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{views} views • {engagement} engagement</p>
        <div className="flex items-center mt-2">
          <Badge className={getScoreColor(score)}>
            Score: {score}/100
          </Badge>
        </div>
      </div>
      <button 
        onClick={onView}
        className="text-primary hover:text-primary/80 transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
}
