import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'secondary';
  percentage?: string;
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  variant = 'default',
  percentage 
}: MetricCardProps) {
  const variantStyles = {
    default: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning', 
    destructive: 'bg-destructive',
    secondary: 'bg-secondary'
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 ${variantStyles[variant]} rounded-lg flex items-center justify-center`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <div className="text-sm text-muted-foreground">{title}</div>
            {subtitle && (
              <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
            )}
            {percentage && (
              <div className="text-xs text-muted-foreground mt-1">{percentage}</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}