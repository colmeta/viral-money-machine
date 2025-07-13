import { Button } from "@/components/ui/button";
import { TrendingUp, Lightbulb, Zap } from "lucide-react";

interface VideoTemplatesProps {
  onUseTemplate: (templateType: string) => void;
}

const templates = [
  {
    id: "success-story",
    title: "Success Story",
    description: "Share your income transformation journey",
    icon: TrendingUp,
    gradient: "from-primary to-secondary"
  },
  {
    id: "tips-tricks",
    title: "Tips & Tricks",
    description: "Share actionable advice and strategies",
    icon: Lightbulb,
    gradient: "from-secondary to-accent"
  },
  {
    id: "motivation",
    title: "Motivation",
    description: "Inspire your audience to take action",
    icon: Zap,
    gradient: "from-accent to-primary"
  }
];

export default function VideoTemplates({ onUseTemplate }: VideoTemplatesProps) {
  return (
    <div className="form-section">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Templates</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <div 
              key={template.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className={`w-full h-32 bg-gradient-to-br ${template.gradient} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">{template.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <Button 
                onClick={() => onUseTemplate(template.id)}
                className="w-full"
              >
                Use Template
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
