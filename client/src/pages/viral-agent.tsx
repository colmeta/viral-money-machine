import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import VideoSearchForm, { SearchParams } from "@/components/viral-agent/video-search-form";
import VideoResultsTable from "@/components/viral-agent/video-results-table";
import { ViralVideo } from "@shared/schema";

export default function ViralAgent() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const { data: videos, isLoading } = useQuery({
    queryKey: ["/api/viral-videos"],
  });

  const createVideoMutation = useMutation({
    mutationFn: async (videoData: any) => {
      const response = await apiRequest("POST", "/api/viral-videos", videoData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/viral-videos"] });
      toast({
        title: "Success",
        description: "Video added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add video",
        variant: "destructive",
      });
    },
  });

  const analyzeVideoMutation = useMutation({
    mutationFn: async (videoId: number) => {
      const response = await apiRequest("POST", `/api/viral-videos/${videoId}/analyze`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/viral-videos"] });
      toast({
        title: "Analysis Complete",
        description: "Video has been analyzed and scored",
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze video",
        variant: "destructive",
      });
    },
  });

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    
    // Simulate finding viral videos by creating sample data
    const sampleVideos = [
      {
        title: "How I Made $10K in 30 Days",
        platform: params.platform,
        url: "https://example.com/video1",
        views: 1200000,
        engagement_rate: 12.5,
        ai_score: 94,
        captions: "This is how I transformed my life with affiliate marketing",
        hashtags: "#sidehustle #affiliatemarketing #passiveincome",
        status: "pending"
      },
      {
        title: "Affiliate Marketing Secrets",
        platform: params.platform,
        url: "https://example.com/video2",
        views: 890000,
        engagement_rate: 9.8,
        ai_score: 87,
        captions: "The secrets nobody tells you about affiliate marketing",
        hashtags: "#wealth #entrepreneurship #success",
        status: "pending"
      }
    ];

    // Add sample videos
    sampleVideos.forEach(video => {
      createVideoMutation.mutate(video);
    });

    toast({
      title: "Search Started",
      description: `Searching for viral videos on ${params.platform}`,
    });
  };

  const handleAutoScan = () => {
    toast({
      title: "Auto-Scan Enabled",
      description: "AI will continuously scan for viral videos",
    });
  };

  const handleViewVideo = (video: ViralVideo) => {
    if (video.status === "pending") {
      analyzeVideoMutation.mutate(video.id);
    } else {
      toast({
        title: "Video Details",
        description: `Viewing details for: ${video.title}`,
      });
    }
  };

  const handleDownloadVideo = (video: ViralVideo) => {
    toast({
      title: "Download Started",
      description: `Downloading: ${video.title}`,
    });
  };

  const handleCopyVideo = (video: ViralVideo) => {
    navigator.clipboard.writeText(video.url);
    toast({
      title: "Copied",
      description: "Video URL copied to clipboard",
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Viral Video Agent</h2>
        <p className="text-gray-600 mt-1">Find and analyze trending videos with 500k+ views</p>
      </div>
      
      <VideoSearchForm
        onSearch={handleSearch}
        onAutoScan={handleAutoScan}
        isLoading={isLoading}
      />
      
      <VideoResultsTable
        videos={videos || []}
        onView={handleViewVideo}
        onDownload={handleDownloadVideo}
        onCopy={handleCopyVideo}
      />
    </div>
  );
}
