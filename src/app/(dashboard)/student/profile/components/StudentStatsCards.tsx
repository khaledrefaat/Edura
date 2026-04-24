import { Award, BookOpen, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Enrolled Courses',
    value: '5',
    icon: BookOpen,
    color: 'bg-blue-500',
  },
  {
    label: 'Attendance Rate',
    value: '94%',
    icon: TrendingUp,
    color: 'bg-green-500',
  },
  {
    label: 'Completed',
    value: '12',
    icon: Award,
    color: 'bg-purple-500',
  },
];

export function StudentStatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
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
