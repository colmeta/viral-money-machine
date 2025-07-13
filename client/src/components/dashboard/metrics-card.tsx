interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  iconColor?: "primary" | "secondary" | "accent";
}

export default function MetricsCard({ 
  title, 
  value, 
  icon, 
  change, 
  iconColor = "primary" 
}: MetricsCardProps) {
  const iconColorClass = {
    primary: "metric-icon-primary",
    secondary: "metric-icon-secondary",
    accent: "metric-icon-accent"
  }[iconColor];

  return (
    <div className="metric-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`metric-icon ${iconColorClass}`}>
          {icon}
        </div>
      </div>
      {change && (
        <div className="mt-4">
          <span className="text-sm text-secondary font-medium">{change}</span>
        </div>
      )}
    </div>
  );
}
