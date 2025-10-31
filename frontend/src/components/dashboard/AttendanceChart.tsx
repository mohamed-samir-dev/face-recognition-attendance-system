import { TrendingUp, BarChart3, Activity, Target } from "lucide-react";
import { AttendanceChartProps } from "@/lib/types";

export default function AttendanceChart({ title, percentage, improvement, type }: AttendanceChartProps) {
  const renderLineChart = () => (
    <div className="h-40 rounded-2xl p-4">
      <div className="relative h-full">
        <svg className="w-full h-full" viewBox="0 0 300 120">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            points="20,100 70,85 120,70 170,60 220,45 270,30"
          />
          <circle cx="20" cy="100" r="4" fill="#3B82F6" />
          <circle cx="70" cy="85" r="4" fill="#3B82F6" />
          <circle cx="120" cy="70" r="4" fill="#059669" />
          <circle cx="170" cy="60" r="4" fill="#059669" />
          <circle cx="220" cy="45" r="4" fill="#10B981" />
          <circle cx="270" cy="30" r="4" fill="#10B981" />
        </svg>
        <div className="flex justify-between mt-2 text-xs text-[#555]">
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
      </div>
    </div>
  );

  const renderBarChart = () => (
    <div className="h-40 rounded-2xl p-4">
      <div className="flex items-end justify-between h-full space-x-2">
        {[60, 70, 80, 75, 85, 90].map((height, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-8 bg-gradient-to-t from-blue-400 to-emerald-400 rounded-t shadow-sm"
              style={{ height: `${height}%` }}
            ></div>
            <span className="text-xs text-[#555] mt-2">
              {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const getIcon = () => {
    return type === "line" ? <Activity className="w-5 h-5" /> : <BarChart3 className="w-5 h-5" />;
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-base font-bold text-[#1A1A1A]">
          {title}
        </h4>
        <div className="p-2 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
          <div className="text-blue-600">
            {getIcon()}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3 mb-4">
        <div className="text-3xl font-bold text-[#1A1A1A]">{percentage}%</div>
        <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 rounded-full">
          <TrendingUp className="w-3 h-3 text-green-600" />
          <span className="text-xs text-green-600 font-semibold">+{improvement}%</span>
        </div>
      </div>
      {type === "line" ? renderLineChart() : renderBarChart()}
    </div>
  );
}