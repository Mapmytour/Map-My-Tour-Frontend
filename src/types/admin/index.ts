import { User } from "../auth";

export interface AdminStats {
  totalUsers: number;
  totalTours: number;
  totalBookings: number;
  totalRevenue: number;
  monthlyGrowth: {
    users: number;
    bookings: number;
    revenue: number;
  };
}

export interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  usersByCountry: { country: string; count: number }[];
}

export interface BookingStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  completedBookings: number;
  monthlyBookings: { month: string; count: number }[];
}

export interface TourPerformance {
  tourId: string;
  tourName: string;
  bookings: number;
  revenue: number;
  rating: number;
  views: number;
}

export interface AdminUser extends User {
  permissions: string[];
  lastLoginAt?: string;
  isActive: boolean;
}

export interface AdminFilters {
  dateRange: {
    from: string;
    to: string;
  };
  status?: string;
  category?: string;
  search?: string;
}