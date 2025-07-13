import { useQuery } from "@tanstack/react-query";
import { DollarSign, Video, Heart, TrendingUp, Search, Plus, CalendarPlus } from "lucide-react";
import MetricsCard from "@/components/dashboard/metrics-card";
import VideoItem from "@/components/dashboard/video-item";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface DashboardStats {
  monthly_revenue: number;
  videos_created: number;
  avg_engagement: number;
  conversion_rate: number;
  total_views: number;
  viral_videos_found: number;
}

export default function Dashboard() {
  const { toast } = useToast();
  
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: viralVideos } = useQuery({
    queryKey: ["/api/viral-videos"],
  });

  const handleQuickAction = (action: string) => {
    toast({
      title: "Quick Action",
      description: `${action} functionality will be implemented soon`,
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-600 mt-1">Monitor your viral video autopilot performance</p>
      </div>
      
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Monthly Revenue"
          value={`$${stats?.monthly_revenue?.toLocaleString() || 0}`}
          icon={<DollarSign className="w-6 h-6" />}
          change="+12% from last month"
          iconColor="secondary"
        />
        
        <MetricsCard
          title="Videos Created"
          value={stats?.videos_created || 0}
          icon={<Video className="w-6 h-6" />}
          change="+28 this week"
          iconColor="primary"
        />
        
        <MetricsCard
          title="Avg. Engagement"
          value={`${(stats?.avg_engagement || 0).toFixed(1)}%`}
          icon={<Heart className="w-6 h-6" />}
          change="+5% improvement"
          iconColor="accent"
        />
        
        <MetricsCard
          title="Conversion Rate"
          value={`${(stats?.conversion_rate || 0).toFixed(1)}%`}
          icon={<TrendingUp className="w-6 h-6" />}
          change="Industry avg: 2.1%"
          iconColor="primary"
        />
      </div>
      
      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Viral Videos Found</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {viralVideos?.slice(0, 3).map((video: any) => (
                  <VideoItem
                    key={video.id}
                    title={video.title}
                    views={`${(video.views / 1000).toFixed(0)}K`}
                    engagement={`${video.engagement_rate}%`}
                    score={video.ai_score}
                    onView={() => handleQuickAction("View Video")}
                  />
                )) || (
                  <div className="text-center py-8 text-gray-500">
                    <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>No viral videos found yet</p>
                    <p className="text-sm">Start the viral video agent to begin finding trending content</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button 
                className="w-full justify-start"
                onClick={() => handleQuickAction("Find Viral Videos")}
              >
                <Search className="w-4 h-4 mr-2" />
                Find Viral Videos
              </Button>
              <Button 
                className="w-full justify-start bg-secondary hover:bg-secondary/90"
                onClick={() => handleQuickAction("Create New Script")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Script
              </Button>
              <Button 
                className="w-full justify-start bg-accent hover:bg-accent/90"
                onClick={() => handleQuickAction("Schedule Post")}
              >
                <CalendarPlus className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
            </div>
          </div>
          
          {/* Posting Schedule */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Morning Motivation</p>
                  <p className="text-xs text-gray-600">9:00 AM</p>
                </div>
                <Badge className="status-posted">Posted</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Lunch Break Tips</p>
                  <p className="text-xs text-gray-600">12:30 PM</p>
                </div>
                <Badge className="status-scheduled">Scheduled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">Evening Wealth</p>
                  <p className="text-xs text-gray-600">7:00 PM</p>
                </div>
                <Badge className="status-pending">Pending</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
