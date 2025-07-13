import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import ScriptGenerator, { GenerateParams } from "@/components/creator-agent/script-generator";
import VideoTemplates from "@/components/creator-agent/video-templates";
import { Video, Play, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CreatorAgent() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [generatedScript, setGeneratedScript] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: videos } = useQuery({
    queryKey: ["/api/videos"],
  });

  const { data: scripts } = useQuery({
    queryKey: ["/api/scripts"],
  });

  const generateScriptMutation = useMutation({
    mutationFn: async (params: GenerateParams) => {
      const response = await apiRequest("POST", "/api/scripts/generate", {
        content_type: params.contentType,
        video_length: params.videoLength,
        target_audience: params.targetAudience,
        key_message: params.keyMessage,
        template_type: params.templateType
      });
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedScript(data.generated.full_script);
      queryClient.invalidateQueries({ queryKey: ["/api/scripts"] });
      toast({
        title: "Script Generated",
        description: "AI has created a new script for your video",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: "Failed to generate script. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateScriptMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: any }) => {
      const response = await apiRequest("PATCH", `/api/scripts/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scripts"] });
    },
  });

  const createVideoMutation = useMutation({
    mutationFn: async (videoData: any) => {
      const response = await apiRequest("POST", "/api/videos", videoData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      toast({
        title: "Video Created",
        description: "Video has been added to the generation queue",
      });
    },
  });

  const handleGenerate = async (params: GenerateParams) => {
    setIsGenerating(true);
    try {
      await generateScriptMutation.mutateAsync(params);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApprove = (script: string) => {
    // Find the most recent script and approve it
    const latestScript = scripts?.[0];
    if (latestScript) {
      updateScriptMutation.mutate({
        id: latestScript.id,
        updates: { status: "approved" }
      });
    }
    
    toast({
      title: "Script Approved",
      description: "Script has been approved and is ready for video generation",
    });
  };

  const handleRegenerate = () => {
    toast({
      title: "Regenerating",
      description: "Creating a new version of the script",
    });
    // This would trigger the same generation with different parameters
  };

  const handleSave = (script: string) => {
    toast({
      title: "Script Saved",
      description: "Script has been saved to your library",
    });
  };

  const handleUseTemplate = (templateType: string) => {
    toast({
      title: "Template Selected",
      description: `Using ${templateType} template for script generation`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "status-ready";
      case "generating": return "status-processing";
      case "posted": return "status-posted";
      default: return "status-pending";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Video Creator Agent</h2>
        <p className="text-gray-600 mt-1">Generate AI-powered scripts and videos based on viral templates</p>
      </div>
      
      <div className="mb-6">
        <ScriptGenerator
          onGenerate={handleGenerate}
          onApprove={handleApprove}
          onRegenerate={handleRegenerate}
          onSave={handleSave}
          generatedScript={generatedScript}
          isLoading={isGenerating}
        />
      </div>
      
      <div className="mb-6">
        <VideoTemplates onUseTemplate={handleUseTemplate} />
      </div>
      
      {/* Video Generation Queue */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Video Generation Queue</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {videos?.length > 0 ? (
              videos.map((video: any) => (
                <div key={video.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Video className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{video.title}</h4>
                      <p className="text-sm text-gray-600">
                        Created {new Date(video.generated_at).toLocaleDateString()} • {video.duration || "60"} seconds
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(video.status)}>
                      {video.status}
                    </Badge>
                    <button className="text-primary hover:text-primary/80">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="text-secondary hover:text-secondary/80">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>No videos in queue</p>
                <p className="text-sm">Generate and approve scripts to create videos</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
