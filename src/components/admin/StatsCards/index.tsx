'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminStats } from '@/types/admin';

export default function StatsCards() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalTours: 0,
    totalBookings: 0,
    totalRevenue: 0,
    monthlyGrowth: {
      users: 0,
      bookings: 0,
      revenue: 0,
    },
  });

  useEffect(() => {
    // Mock data - replace with actual API call
    setStats({
      totalUsers: 1247,
      totalTours: 58,
      totalBookings: 342,
      totalRevenue: 2845000,
      monthlyGrowth: {
        users: 12.5,
        bookings: 8.3,
        revenue: 15.7,
      },
    });
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <div className="text-2xl">👥</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.monthlyGrowth.users}% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Tours</CardTitle>
          <div className="text-2xl">🗺️</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalTours}</div>
          <p className="text-xs text-muted-foreground">
            Currently available
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <div className="text-2xl">📅</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalBookings.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.monthlyGrowth.bookings}% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <div className="text-2xl">💰</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{(stats.totalRevenue / 100000).toFixed(1)}L</div>
          <p className="text-xs text-muted-foreground">
            +{stats.monthlyGrowth.revenue}% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}