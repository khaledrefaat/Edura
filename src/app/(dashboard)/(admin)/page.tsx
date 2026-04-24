import { RecentActivity } from './components/recent-activity';
import { StatisticsCards } from './components/statistics-cards';
import { UpcomingClasses } from './components/upcoming-classes';

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Page Header */}

      <StatisticsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <UpcomingClasses />
      </div>
    </div>
  );
}
