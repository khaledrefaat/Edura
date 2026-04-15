import { RecentActivity } from './components/recent-activity';
import { StatisticsCards } from './components/statistics-cards';
import { UpcomingClasses } from './components/upcoming-classes';

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <StatisticsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <UpcomingClasses />
      </div>
    </div>
  );
}
