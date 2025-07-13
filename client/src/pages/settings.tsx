import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [autoPosting, setAutoPosting] = useState(true);
  const [scanFrequency, setScanFrequency] = useState("Every 2 hours");
  const [contentStyle, setContentStyle] = useState("Authentic & Personal");
  const [morningTime, setMorningTime] = useState("09:00");
  const [eveningTime, setEveningTime] = useState("19:00");

  const platforms = [
    {
      name: "TikTok",
      username: "@hustlewithshan",
      connected: true,
      icon: "🎵",
      color: "platform-tiktok"
    },
    {
      name: "Instagram",
      username: "@hustlewithshan",
      connected: true,
      icon: "📸",
      color: "platform-instagram"
    },
    {
      name: "YouTube",
      username: "Not connected",
      connected: false,
      icon: "📺",
      color: "platform-youtube"
    }
  ];

  const handleConnect = (platform: string) => {
    toast({
      title: "Connect Platform",
      description: `Connecting to ${platform}...`,
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully",
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Configure your AI agents and integrations</p>
      </div>
      
      {/* Platform Connections */}
      <div className="form-section mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Connections</h3>
        <div className="space-y-4">
          {platforms.map((platform) => (
            <div key={platform.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center text-lg`}>
                  {platform.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{platform.name}</h4>
                  <p className="text-sm text-gray-600">
                    {platform.connected ? `Connected as ${platform.username}` : platform.username}
                  </p>
                </div>
              </div>
              {platform.connected ? (
                <Badge className="status-posted">Connected</Badge>
              ) : (
                <Button onClick={() => handleConnect(platform.name)}>
                  Connect
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Google Sheets Integration */}
      <div className="form-section mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Google Sheets Integration</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 platform-google rounded-lg flex items-center justify-center">
                📊
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Google Sheets</h4>
                <p className="text-sm text-gray-600">Connected to viral-video-data spreadsheet</p>
              </div>
            </div>
            <Badge className="status-posted">Connected</Badge>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Spreadsheet Configuration</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Viral videos data: Sheet 1</p>
              <p>• Video scripts: Sheet 2</p>
              <p>• Posting schedule: Sheet 3</p>
              <p>• Revenue tracking: Sheet 4</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Agent Settings */}
      <div className="form-section mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Agent Settings</h3>
        <div className="space-y-6">
          <div>
            <Label htmlFor="scanFrequency">Viral Video Scan Frequency</Label>
            <Select value={scanFrequency} onValueChange={setScanFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Every 2 hours">Every 2 hours</SelectItem>
                <SelectItem value="Every 4 hours">Every 4 hours</SelectItem>
                <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                <SelectItem value="Daily">Daily</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="contentStyle">Content Generation Style</Label>
            <Select value={contentStyle} onValueChange={setContentStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Authentic & Personal">Authentic & Personal</SelectItem>
                <SelectItem value="Professional & Informative">Professional & Informative</SelectItem>
                <SelectItem value="Motivational & Energetic">Motivational & Energetic</SelectItem>
                <SelectItem value="Educational & Detailed">Educational & Detailed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Posting Schedule</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="morningTime" className="text-xs text-gray-500">Morning Post</Label>
                <Input
                  id="morningTime"
                  type="time"
                  value={morningTime}
                  onChange={(e) => setMorningTime(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="eveningTime" className="text-xs text-gray-500">Evening Post</Label>
                <Input
                  id="eveningTime"
                  type="time"
                  value={eveningTime}
                  onChange={(e) => setEveningTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Auto-posting</h4>
              <p className="text-sm text-gray-600">Automatically post scheduled content</p>
            </div>
            <Switch
              checked={autoPosting}
              onCheckedChange={setAutoPosting}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="px-8">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
