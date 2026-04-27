import { BookOpen, Clock, Users } from "lucide-react";

const stats = [
  {
    label: "Active Courses",
    value: "4",
    icon: BookOpen,
    color: "bg-blue-500",
  },
  {
    label: "Total Students",
    value: "87",
    icon: Users,
    color: "bg-green-500",
  },
  {
    label: "Classes This Week",
    value: "12",
    icon: Clock,
    color: "bg-purple-500",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.value}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl text-[#D4AF37] mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
