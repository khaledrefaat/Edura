import { Activity } from "lucide-react";

const recentActivities = [
  {
    id: 1,
    action: "New student enrolled",
    course: "Advanced Mathematics",
    time: "5 min ago",
  },
  {
    id: 2,
    action: "Course completed",
    course: "Introduction to Physics",
    time: "1 hour ago",
  },
  {
    id: 3,
    action: "New teacher joined",
    course: "English Literature",
    time: "2 hours ago",
  },
  {
    id: 4,
    action: "Assignment submitted",
    course: "Computer Science 101",
    time: "3 hours ago",
  },
];

function ActivityItem({
  activity,
}: {
  activity: (typeof recentActivities)[number];
}) {
  return (
    <div className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
      <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2"></div>
      <div className="flex-1">
        <p className="text-sm mb-1">{activity.action}</p>
        <p className="text-sm text-[#D4AF37]">{activity.course}</p>
        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
      </div>
    </div>
  );
}

export function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-[#D4AF37]" />
        <h2 className="text-xl">Recent Activity</h2>
      </div>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
