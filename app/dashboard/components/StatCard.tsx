// app/admin/components/StatCard.tsx
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  iconBgColor?: string;
  iconColor?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
};
 
export default function StatCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconBgColor = "bg-blue-100",
  iconColor = "text-blue-600",
  trend,
  className = "",
}: StatCardProps) {
  // Déterminer automatiquement la tendance si non fournie
  const isPositive = trend === "up" || (trend === undefined && change && change >= 0);
  const isNegative = trend === "down" || (trend === undefined && change && change < 0);

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Titre */}
          <p className="text-sm text-gray-500 font-medium mb-2">{title}</p>

          {/* Valeur principale */}
          <h3 className="text-3xl font-bold text-gray-900 mb-3">{value}</h3>

          {/* Changement / Tendance */}
          {(change !== undefined || changeLabel) && (
            <div className="flex items-center gap-2">
              {change !== undefined && (
                <>
                  {isPositive && <TrendingUp className="w-4 h-4 text-green-500" />}
                  {isNegative && <TrendingDown className="w-4 h-4 text-red-500" />}
                  <span
                    className={`text-sm font-semibold ${
                      isPositive
                        ? "text-green-600"
                        : isNegative
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {isPositive && change > 0 ? "+" : ""}
                    {change}%
                  </span>
                </>
              )}
              {changeLabel && (
                <span className="text-sm text-gray-500">{changeLabel}</span>
              )}
            </div>
          )}
        </div>

        {/* Icône */}
        <div
          className={`w-12 h-12 rounded-lg ${iconBgColor} flex items-center justify-center flex-shrink-0`}
        >
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}