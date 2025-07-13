import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import PostingCalendar from "@/components/scheduler-agent/posting-calendar";
import ScheduledPosts from "@/components/scheduler-agent/scheduled-posts";
import { ScheduledPost } from "@shared/schema";

export default function SchedulerAgent() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: scheduledPosts } = useQuery({
    queryKey: ["/api/scheduled-posts"],
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData: any) => {
      const response = await apiRequest("POST", "/api/scheduled-posts", postData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scheduled-posts"] });
      toast({
        title: "Post Scheduled",
        description: "Your post has been scheduled successfully",
      });
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: any }) => {
      const response = await apiRequest("PATCH", `/api/scheduled-posts/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scheduled-posts"] });
    },
  });

  const handleAddPost = () => {
    // Sample scheduled post
    const samplePost = {
      video_id: 1,
      platform: "TikTok",
      scheduled_time: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      caption: "Transform your life with these side hustle tips! 💰",
      hashtags: "#sidehustle #passiveincome #entrepreneurship",
      status: "scheduled"
    };
    
    createPostMutation.mutate(samplePost);
  };

  const handleBulkSchedule = () => {
    const bulkPosts = [
      {
        video_id: 1,
        platform: "TikTok",
        scheduled_time: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
        caption: "Morning motivation: Start your side hustle today! 🌅",
        hashtags: "#morningmotivation #sidehustle #success",
        status: "scheduled"
      },
      {
        video_id: 2,
        platform: "Instagram",
        scheduled_time: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
        caption: "Lunch break tip: How to make money while you eat! 🍽️💰",
        hashtags: "#lunchbreak #passiveincome #affiliatemarketing",
        status: "scheduled"
      }
    ];

    bulkPosts.forEach(post => {
      createPostMutation.mutate(post);
    });

    toast({
      title: "Bulk Schedule Complete",
      description: "Multiple posts have been scheduled",
    });
  };

  const handleViewPost = (post: ScheduledPost) => {
    toast({
      title: "Post Details",
      description: `Viewing post scheduled for ${new Date(post.scheduled_time).toLocaleString()}`,
    });
  };

  const handleAnalyzePost = (post: ScheduledPost) => {
    toast({
      title: "Analytics",
      description: `Showing analytics for post on ${post.platform}`,
    });
  };

  const handleEditPost = (post: ScheduledPost) => {
    toast({
      title: "Edit Post",
      description: "Opening post editor",
    });
  };

  const handleDeletePost = (post: ScheduledPost) => {
    updatePostMutation.mutate({
      id: post.id,
      updates: { status: "cancelled" }
    });
    
    toast({
      title: "Post Cancelled",
      description: "The scheduled post has been cancelled",
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Scheduler Agent</h2>
        <p className="text-gray-600 mt-1">Automate your posting schedule across platforms</p>
      </div>
      
      <div className="mb-6">
        <PostingCalendar
          onAddPost={handleAddPost}
          onBulkSchedule={handleBulkSchedule}
        />
      </div>
      
      <ScheduledPosts
        posts={scheduledPosts || []}
        onView={handleViewPost}
        onAnalyze={handleAnalyzePost}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />
    </div>
  );
}
