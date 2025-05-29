import StatsCards from '@/components/admin/StatsCards';
import RecentBookings from '@/components/admin/RecentBookings';
import RevenueChart from '@/components/admin/RevenueChart';

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="space-y-8">
        {/* Stats Cards */}
        <StatsCards />
        
        {/* Charts and Analytics */}
        <div className="grid lg:grid-cols-2 gap-8">
          <RevenueChart />
          <RecentBookings />
        </div>
      </div>
    </div>
  );
}