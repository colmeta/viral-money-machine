import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Bot } from "lucide-react";

interface VideoSearchFormProps {
  onSearch: (params: SearchParams) => void;
  onAutoScan: () => void;
  isLoading?: boolean;
}

export interface SearchParams {
  platform: string;
  minViews: number;
  timePeriod: string;
  niche: string;
}

export default function VideoSearchForm({ onSearch, onAutoScan, isLoading }: VideoSearchFormProps) {
  const [platform, setPlatform] = useState("TikTok");
  const [minViews, setMinViews] = useState(500000);
  const [timePeriod, setTimePeriod] = useState("Past 7 days");
  const [niche, setNiche] = useState("Side Hustles");

  const handleSearch = () => {
    onSearch({
      platform,
      minViews,
      timePeriod,
      niche
    });
  };

  return (
    <div className="form-section mb-6">
      <div className="form-grid">
        <div>
          <Label htmlFor="platform">Platform</Label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TikTok">TikTok</SelectItem>
              <SelectItem value="Instagram Reels">Instagram Reels</SelectItem>
              <SelectItem value="YouTube Shorts">YouTube Shorts</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="minViews">Minimum Views</Label>
          <Input
            id="minViews"
            type="number"
            value={minViews}
            onChange={(e) => setMinViews(Number(e.target.value))}
            placeholder="500000"
          />
        </div>
        
        <div>
          <Label htmlFor="timePeriod">Time Period</Label>
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Past 7 days">Past 7 days</SelectItem>
              <SelectItem value="Past 14 days">Past 14 days</SelectItem>
              <SelectItem value="Past 30 days">Past 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="niche">Niche</Label>
          <Select value={niche} onValueChange={setNiche}>
            <SelectTrigger>
              <SelectValue placeholder="Select niche" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Side Hustles">Side Hustles</SelectItem>
              <SelectItem value="Affiliate Marketing">Affiliate Marketing</SelectItem>
              <SelectItem value="Passive Income">Passive Income</SelectItem>
              <SelectItem value="All Niches">All Niches</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-3">
        <Button 
          onClick={handleSearch}
          disabled={isLoading}
          className="flex items-center"
        >
          <Search className="w-4 h-4 mr-2" />
          {isLoading ? "Searching..." : "Search Viral Videos"}
        </Button>
        <Button 
          onClick={onAutoScan}
          variant="outline"
          className="flex items-center bg-secondary text-white hover:bg-secondary/90 border-secondary"
        >
          <Bot className="w-4 h-4 mr-2" />
          Auto-Scan Mode
        </Button>
      </div>
    </div>
  );
}
