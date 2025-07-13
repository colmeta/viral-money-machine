import { Play, Eye, BarChart3, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScheduledPost } from "@shared/schema";

interface ScheduledPostsProps {
  posts: ScheduledPost[];
  onView: (post: ScheduledPost) => void;
  onAnalyze: (post: ScheduledPost) => void;
  onEdit: (post: ScheduledPost) => void;
  onDelete: (post: ScheduledPost) => void;
}

export default function ScheduledPosts({ 
  posts, 
  onView, 
  onAnalyze, 
  onEdit, 
  onDelete 
}: ScheduledPostsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "posted": return "status-posted";
      case "scheduled": return "status-scheduled";
      case "failed": return "status-failed";
      default: return "status-pending";
    }
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  };

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <Play className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No scheduled posts</h3>
        <p className="text-gray-600">Create your first scheduled post to see it here</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Scheduled Posts</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="video-thumbnail">
                  <Play className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {post.caption?.substring(0, 50) || "Untitled Post"}
                    {post.caption && post.caption.length > 50 && "..."}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {formatDateTime(post.scheduled_time)} • {post.platform}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(post.status)}>
                  {post.status}
                </Badge>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onView(post)}
                    className="text-primary hover:text-primary/80"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  {post.status === "posted" && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onAnalyze(post)}
                      className="text-secondary hover:text-secondary/80"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                  )}
                  {post.status === "scheduled" && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onEdit(post)}
                        className="text-primary hover:text-primary/80"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onDelete(post)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
