import { BookOpen, GraduationCap, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Total Students",
    value: "2,847",
    change: "+12.5%",
    icon: GraduationCap,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Total Teachers",
    value: "142",
    change: "+3.2%",
    icon: Users,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Total Courses",
    value: "68",
    change: "+8.1%",
    icon: BookOpen,
    color: "bg-purple-500",
  },
];

function StatCard({ stat }: { stat: (typeof stats)[number] }) {
  const Icon = stat.icon;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center gap-1 text-green-600 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>{stat.change}</span>
        </div>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
      <p className="text-3xl text-[#D4AF37]">{stat.value}</p>
    </div>
  );
}

export function StatisticsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
