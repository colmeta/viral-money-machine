import { Link, useLocation } from "wouter";
import { 
  Rocket, 
  BarChart3, 
  Search, 
  Video, 
  Calendar, 
  TrendingUp, 
  Settings, 
  User 
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Viral Video Agent", href: "/viral-agent", icon: Search },
  { name: "Video Creator Agent", href: "/creator-agent", icon: Video },
  { name: "Scheduler Agent", href: "/scheduler-agent", icon: Calendar },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-primary">
        <h1 className="text-white text-xl font-bold">
          <Rocket className="inline w-5 h-5 mr-2" />
          Viral AI Agent
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? "sidebar-active" 
                  : "sidebar-inactive"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Shannon Smith</p>
            <p className="text-xs text-gray-500">Affiliate Marketer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
