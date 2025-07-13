import { useQuery } from "@tanstack/react-query";
import { DollarSign, Eye, TrendingUp, Trophy } from "lucide-react";
import MetricsCard from "@/components/dashboard/metrics-card";
import { BarChart3, PieChart } from "lucide-react";

export default function Analytics() {
  const { data: analytics } = useQuery({
    queryKey: ["/api/analytics"],
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const mockTopContent = [
    {
      title: "How I Made $8,600 in Passive Income",
      platform: "TikTok",
      date: "3 days ago",
      views: "1.2M",
      engagement: "12.5%",
      revenue: "$2,400",
      roi: "480%"
    },
    {
      title: "5 Side Hustles That Actually Work",
      platform: "Instagram",
      date: "1 week ago",
      views: "890K",
      engagement: "9.8%",
      revenue: "$1,800",
      roi: "360%"
    },
    {
      title: "Affiliate Marketing Secrets Revealed",
      platform: "YouTube",
      date: "2 weeks ago",
      views: "650K",
      engagement: "11.2%",
      revenue: "$1,400",
      roi: "280%"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <p className="text-gray-600 mt-1">Track your performance and ROI across all platforms</p>
      </div>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total Revenue"
          value="$25,800"
          icon={<DollarSign className="w-6 h-6" />}
          change="+22% from last month"
          iconColor="secondary"
        />
        
        <MetricsCard
          title="Total Views"
          value="2.4M"
          icon={<Eye className="w-6 h-6" />}
          change="+15% engagement rate"
          iconColor="primary"
        />
        
        <MetricsCard
          title="Conversion Rate"
          value="4.2%"
          icon={<TrendingUp className="w-6 h-6" />}
          change="Above industry avg"
          iconColor="accent"
        />
        
        <MetricsCard
          title="ROI"
          value="340%"
          icon={<Trophy className="w-6 h-6" />}
          change="Excellent performance"
          iconColor="primary"
        />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Revenue chart visualization</p>
              <p className="text-sm text-gray-400">Chart integration coming soon</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Platform breakdown chart</p>
              <p className="text-sm text-gray-400">Chart integration coming soon</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Performing Content */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Content</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-header">Content</th>
                  <th className="table-header">Views</th>
                  <th className="table-header">Engagement</th>
                  <th className="table-header">Revenue</th>
                  <th className="table-header">ROI</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockTopContent.map((content, index) => (
                  <tr key={index}>
                    <td className="table-cell">
                      <div className="text-sm font-medium text-gray-900">{content.title}</div>
                      <div className="text-sm text-gray-500">{content.platform} • {content.date}</div>
                    </td>
                    <td className="table-cell text-gray-900">{content.views}</td>
                    <td className="table-cell text-gray-900">{content.engagement}</td>
                    <td className="table-cell text-gray-900">{content.revenue}</td>
                    <td className="table-cell text-gray-900">{content.roi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
