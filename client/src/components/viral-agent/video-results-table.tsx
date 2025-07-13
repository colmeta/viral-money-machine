import { Play, Eye, Download, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ViralVideo } from "@shared/schema";

interface VideoResultsTableProps {
  videos: ViralVideo[];
  onView: (video: ViralVideo) => void;
  onDownload: (video: ViralVideo) => void;
  onCopy: (video: ViralVideo) => void;
}

export default function VideoResultsTable({ 
  videos, 
  onView, 
  onDownload, 
  onCopy 
}: VideoResultsTableProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "score-excellent";
    if (score >= 80) return "score-good";
    if (score >= 70) return "score-fair";
    return "score-poor";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processed": return "status-ready";
      case "processing": return "status-processing";
      case "pending": return "status-pending";
      default: return "status-pending";
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(0)}K`;
    }
    return views.toString();
  };

  if (videos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <Play className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
        <p className="text-gray-600">Try adjusting your search parameters to find viral videos</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Found Videos</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Last updated: 2 hours ago</span>
          <Button variant="ghost" size="sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">Video</th>
              <th className="table-header">Views</th>
              <th className="table-header">Engagement</th>
              <th className="table-header">AI Score</th>
              <th className="table-header">Status</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {videos.map((video) => (
              <tr key={video.id}>
                <td className="table-cell">
                  <div className="flex items-center">
                    <div className="video-thumbnail">
                      <Play className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{video.title}</div>
                      <div className="text-sm text-gray-500">{video.platform}</div>
                    </div>
                  </div>
                </td>
                <td className="table-cell text-gray-900">{formatViews(video.views)}</td>
                <td className="table-cell text-gray-900">{video.engagement_rate}%</td>
                <td className="table-cell">
                  <Badge className={getScoreColor(video.ai_score)}>
                    {video.ai_score}/100
                  </Badge>
                </td>
                <td className="table-cell">
                  <Badge className={getStatusColor(video.status)}>
                    {video.status}
                  </Badge>
                </td>
                <td className="table-cell">
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onView(video)}
                      className="text-primary hover:text-primary/80"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onDownload(video)}
                      className="text-secondary hover:text-secondary/80"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onCopy(video)}
                      className="text-accent hover:text-accent/80"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
