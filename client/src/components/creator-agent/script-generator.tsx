import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Check, RotateCcw, Save } from "lucide-react";

interface ScriptGeneratorProps {
  onGenerate: (params: GenerateParams) => void;
  onApprove: (script: string) => void;
  onRegenerate: () => void;
  onSave: (script: string) => void;
  generatedScript?: string;
  isLoading?: boolean;
}

export interface GenerateParams {
  contentType: string;
  videoLength: string;
  targetAudience: string;
  keyMessage: string;
  templateType: string;
}

export default function ScriptGenerator({ 
  onGenerate, 
  onApprove, 
  onRegenerate, 
  onSave, 
  generatedScript, 
  isLoading 
}: ScriptGeneratorProps) {
  const [contentType, setContentType] = useState("Side Hustle Tips");
  const [videoLength, setVideoLength] = useState("60 seconds");
  const [targetAudience, setTargetAudience] = useState("Aspiring Entrepreneurs");
  const [keyMessage, setKeyMessage] = useState("");
  const [templateType, setTemplateType] = useState("success-story");

  const handleGenerate = () => {
    onGenerate({
      contentType,
      videoLength,
      targetAudience,
      keyMessage,
      templateType
    });
  };

  const formatScript = (script: string) => {
    return script
      .replace(/\[Hook\]/g, "🎯 Hook")
      .replace(/\[Problem\]/g, "❗ Problem")
      .replace(/\[Solution\]/g, "💡 Solution")
      .replace(/\[Proof\]/g, "📊 Proof")
      .replace(/\[CTA\]/g, "📞 Call to Action");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="form-section">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Script Generator</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="contentType">Content Type</Label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Side Hustle Tips">Side Hustle Tips</SelectItem>
                <SelectItem value="Affiliate Marketing">Affiliate Marketing</SelectItem>
                <SelectItem value="Passive Income">Passive Income</SelectItem>
                <SelectItem value="Success Stories">Success Stories</SelectItem>
                <SelectItem value="Motivational">Motivational</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="videoLength">Video Length</Label>
            <Select value={videoLength} onValueChange={setVideoLength}>
              <SelectTrigger>
                <SelectValue placeholder="Select video length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15 seconds">15 seconds</SelectItem>
                <SelectItem value="30 seconds">30 seconds</SelectItem>
                <SelectItem value="60 seconds">60 seconds</SelectItem>
                <SelectItem value="3 minutes">3 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="targetAudience">Target Audience</Label>
            <Select value={targetAudience} onValueChange={setTargetAudience}>
              <SelectTrigger>
                <SelectValue placeholder="Select target audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aspiring Entrepreneurs">Aspiring Entrepreneurs</SelectItem>
                <SelectItem value="Side Hustlers">Side Hustlers</SelectItem>
                <SelectItem value="College Students">College Students</SelectItem>
                <SelectItem value="Working Professionals">Working Professionals</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="keyMessage">Key Message</Label>
            <Textarea
              id="keyMessage"
              value={keyMessage}
              onChange={(e) => setKeyMessage(e.target.value)}
              placeholder="Enter your key message or topic..."
              className="h-20"
            />
          </div>
          
          <Button 
            onClick={handleGenerate}
            disabled={isLoading || !keyMessage.trim()}
            className="w-full"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            {isLoading ? "Generating..." : "Generate Script"}
          </Button>
        </div>
      </div>
      
      <div className="form-section">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Script</h3>
        <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
          {generatedScript ? (
            <div className="text-gray-700 whitespace-pre-wrap">
              {formatScript(generatedScript)}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center flex items-center justify-center h-full">
              Generate a script to see it here
            </p>
          )}
        </div>
        
        {generatedScript && (
          <div className="flex space-x-3">
            <Button 
              onClick={() => onApprove(generatedScript)}
              className="bg-secondary hover:bg-secondary/90"
            >
              <Check className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button 
              onClick={onRegenerate}
              variant="outline"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
            <Button 
              onClick={() => onSave(generatedScript)}
              className="bg-accent hover:bg-accent/90"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
