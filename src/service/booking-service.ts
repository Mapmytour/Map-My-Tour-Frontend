import { apiClient, API_ENDPOINTS } from '@/lib/api';
import {
  Booking,
  BookingParticipant,
  BookingPayment,
  BookingFilters,
} from '@/types/booking';
import { APIResponse } from '@/types/APIResponse';

// Request types for booking service
export interface CreateBookingRequest {
  tourId: string;
  availabilityId: string;
  participants: CreateParticipantRequest[];
  specialRequests?: string;
  dietaryRequirements?: string[];
  accessibilityNeeds?: string;
  source?: 'website' | 'phone' | 'email' | 'agent' | 'walk-in';
}

export interface CreateParticipantRequest {
  type: 'adult' | 'child' | 'infant';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  passport?: {
    number: string;
    expiryDate: string;
    nationality: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  dietaryRequirements?: string[];
  medicalConditions?: string[];
  accessibilityNeeds?: string[];
}

export interface UpdateBookingRequest extends Partial<CreateBookingRequest> {
  id: string;
}

export interface UpdateParticipantRequest extends Partial<CreateParticipantRequest> {
  id: string;
}

export interface AddPaymentRequest {
  amount: number;
  currency: string;
  method: 'credit-card' | 'debit-card' | 'bank-transfer' | 'paypal' | 'cash';
  type: 'deposit' | 'balance' | 'full-payment';
  transactionId?: string;
}

export interface UpdatePaymentRequest extends Partial<AddPaymentRequest> {
  id: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
}

export interface RefundPaymentRequest {
  id: string;
  amount: number;
  reason: string;
  refundMethod?: string;
}

export interface BookingSearchRequest {
  query?: string;
  filters?: BookingFilters;
  sortBy?: 'bookingDate' | 'tourStartDate' | 'total' | 'status' | 'bookingNumber';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface SendEmailRequest {
  subject: string;
  message: string;
  template?: string;
  includeVoucher?: boolean;
}

export interface BulkStatusUpdateRequest {
  bookingIds: string[];
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  reason?: string;
}

class BookingService {
  // ========================
  // Basic CRUD Operations
  // ========================

  /**
   * Get all bookings with optional filters
   */
  async getAllBookings(filters?: BookingFilters): Promise<APIResponse<{
    bookings: Booking[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    try {
      const params = filters ? this.buildFilterParams(filters) : undefined;
      const response = await apiClient.get<{
        bookings: Booking[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(API_ENDPOINTS.BOOKINGS.GET_ALL, params);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch bookings: ${error}`);
    }
  }

  /**
   * Get booking by ID
   */
  async getBookingById(id: string): Promise<APIResponse<Booking>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.GET_BY_ID.replace(':id', id);
      const response = await apiClient.get<Booking>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch booking: ${error}`);
    }
  }

  /**
   * Create new booking
   */
  async createBooking(data: CreateBookingRequest): Promise<APIResponse<Booking>> {
    try {
      const response = await apiClient.post<Booking>(
        API_ENDPOINTS.BOOKINGS.CREATE,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to create booking: ${error}`);
    }
  }

  /**
   * Update booking
   */
  async updateBooking(data: UpdateBookingRequest): Promise<APIResponse<Booking>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.UPDATE.replace(':id', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<Booking>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update booking: ${error}`);
    }
  }

  /**
   * Delete booking
   */
  async deleteBooking(id: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.DELETE.replace(':id', id);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete booking: ${error}`);
    }
  }

  // ========================
  // User-specific Bookings
  // ========================

  /**
   * Get current user's bookings
   */
  async getUserBookings(page?: number, limit?: number): Promise<APIResponse<{
    bookings: Booking[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    try {
      const params: Record<string, string> = {};
      if (page) params.page = page.toString();
      if (limit) params.limit = limit.toString();

      const response = await apiClient.get<{
        bookings: Booking[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(API_ENDPOINTS.BOOKINGS.GET_USER_BOOKINGS, Object.keys(params).length ? params : undefined);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch user bookings: ${error}`);
    }
  }

  /**
   * Get specific user booking by ID
   */
  async getUserBookingById(id: string): Promise<APIResponse<Booking>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.GET_USER_BOOKING.replace(':id', id);
      const response = await apiClient.get<Booking>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch user booking: ${error}`);
    }
  }

  // ========================
  // Search and Filter
  // ========================

  /**
   * Search bookings
   */
  async searchBookings(request: BookingSearchRequest): Promise<APIResponse<{
    bookings: Booking[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }>> {
    try {
      const response = await apiClient.post<{
        bookings: Booking[];
        total: number;
        page: number;
        limit: number;
        pages: number;
      }>(API_ENDPOINTS.BOOKINGS.SEARCH, request);
      return response;
    } catch (error) {
      throw new Error(`Failed to search bookings: ${error}`);
    }
  }

  /**
   * Filter bookings
   */
  async filterBookings(filters: BookingFilters): Promise<APIResponse<Booking[]>> {
    try {
      const response = await apiClient.post<Booking[]>(
        API_ENDPOINTS.BOOKINGS.FILTER,
        filters
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to filter bookings: ${error}`);
    }
  }

  /**
   * Get bookings by status
   */
  async getBookingsByStatus(status: string): Promise<APIResponse<Booking[]>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.BY_STATUS.replace(':status', status);
      const response = await apiClient.get<Booking[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch bookings by status: ${error}`);
    }
  }

  /**
   * Get bookings by date range
   */
  async getBookingsByDateRange(from: string, to: string): Promise<APIResponse<Booking[]>> {
    try {
      const params = { from, to };
      const response = await apiClient.get<Booking[]>(
        API_ENDPOINTS.BOOKINGS.BY_DATE_RANGE,
        params
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch bookings by date range: ${error}`);
    }
  }

  /**
   * Get bookings by tour
   */
  async getBookingsByTour(tourId: string): Promise<APIResponse<Booking[]>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.BY_TOUR.replace(':tourId', tourId);
      const response = await apiClient.get<Booking[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch bookings by tour: ${error}`);
    }
  }

  /**
   * Get bookings by customer
   */
  async getBookingsByCustomer(customerId: string): Promise<APIResponse<Booking[]>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.BY_CUSTOMER.replace(':customerId', customerId);
      const response = await apiClient.get<Booking[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch bookings by customer: ${error}`);
    }
  }

  // ========================
  // Participants Management
  // ========================

  /**
   * Add participant to booking
   */
  async addParticipant(bookingId: string, participant: CreateParticipantRequest): Promise<APIResponse<BookingParticipant>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.ADD_PARTICIPANT.replace(':id', bookingId);
      const response = await apiClient.post<BookingParticipant>(endpoint, participant);
      return response;
    } catch (error) {
      throw new Error(`Failed to add participant: ${error}`);
    }
  }

  /**
   * Update participant
   */
  async updateParticipant(bookingId: string, data: UpdateParticipantRequest): Promise<APIResponse<BookingParticipant>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.UPDATE_PARTICIPANT
        .replace(':id', bookingId)
        .replace(':participantId', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<BookingParticipant>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update participant: ${error}`);
    }
  }

  /**
   * Remove participant from booking
   */
  async removeParticipant(bookingId: string, participantId: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.REMOVE_PARTICIPANT
        .replace(':id', bookingId)
        .replace(':participantId', participantId);
      const response = await apiClient.delete<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to remove participant: ${error}`);
    }
  }

  // ========================
  // Payment Management
  // ========================

  /**
   * Get booking payments
   */
  async getBookingPayments(bookingId: string): Promise<APIResponse<BookingPayment[]>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.GET_PAYMENTS.replace(':id', bookingId);
      const response = await apiClient.get<BookingPayment[]>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch booking payments: ${error}`);
    }
  }

  /**
   * Add payment to booking
   */
  async addPayment(bookingId: string, payment: AddPaymentRequest): Promise<APIResponse<BookingPayment>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.ADD_PAYMENT.replace(':id', bookingId);
      const response = await apiClient.post<BookingPayment>(endpoint, payment);
      return response;
    } catch (error) {
      throw new Error(`Failed to add payment: ${error}`);
    }
  }

  /**
   * Update payment
   */
  async updatePayment(bookingId: string, data: UpdatePaymentRequest): Promise<APIResponse<BookingPayment>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.UPDATE_PAYMENT
        .replace(':id', bookingId)
        .replace(':paymentId', data.id);
      const { id, ...updateData } = data;
      const response = await apiClient.put<BookingPayment>(endpoint, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update payment: ${error}`);
    }
  }

  /**
   * Refund payment
   */
  async refundPayment(bookingId: string, refundData: RefundPaymentRequest): Promise<APIResponse<BookingPayment>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.REFUND_PAYMENT
        .replace(':id', bookingId)
        .replace(':paymentId', refundData.id);
      const response = await apiClient.post<BookingPayment>(endpoint, refundData);
      return response;
    } catch (error) {
      throw new Error(`Failed to refund payment: ${error}`);
    }
  }

  // ========================
  // Status Management
  // ========================

  /**
   * Update booking status
   */
  async updateBookingStatus(bookingId: string, status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show', reason?: string): Promise<APIResponse<Booking>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.UPDATE_STATUS.replace(':id', bookingId);
      const response = await apiClient.put<Booking>(endpoint, { status, reason });
      return response;
    } catch (error) {
      throw new Error(`Failed to update booking status: ${error}`);
    }
  }

  /**
   * Confirm booking
   */
  async confirmBooking(bookingId: string): Promise<APIResponse<Booking>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.CONFIRM_BOOKING.replace(':id', bookingId);
      const response = await apiClient.put<Booking>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to confirm booking: ${error}`);
    }
  }

  /**
   * Cancel booking
   */
  async cancelBooking(bookingId: string, reason?: string): Promise<APIResponse<Booking>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.CANCEL_BOOKING.replace(':id', bookingId);
      const response = await apiClient.put<Booking>(endpoint, { reason });
      return response;
    } catch (error) {
      throw new Error(`Failed to cancel booking: ${error}`);
    }
  }

  /**
   * Check in booking
   */
  async checkInBooking(bookingId: string): Promise<APIResponse<Booking>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.CHECK_IN.replace(':id', bookingId);
      const response = await apiClient.put<Booking>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to check in booking: ${error}`);
    }
  }

  /**
   * Complete booking
   */
  async completeBooking(bookingId: string): Promise<APIResponse<Booking>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.COMPLETE.replace(':id', bookingId);
      const response = await apiClient.put<Booking>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to complete booking: ${error}`);
    }
  }

  // ========================
  // Communication
  // ========================

  /**
   * Send confirmation email
   */
  async sendConfirmation(bookingId: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.SEND_CONFIRMATION.replace(':id', bookingId);
      const response = await apiClient.post<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to send confirmation: ${error}`);
    }
  }

  /**
   * Send reminder email
   */
  async sendReminder(bookingId: string): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.SEND_REMINDER.replace(':id', bookingId);
      const response = await apiClient.post<{ message: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to send reminder: ${error}`);
    }
  }

  /**
   * Send custom email
   */
  async sendCustomEmail(bookingId: string, emailData: SendEmailRequest): Promise<APIResponse<{ message: string }>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.SEND_CUSTOM_EMAIL.replace(':id', bookingId);
      const response = await apiClient.post<{ message: string }>(endpoint, emailData);
      return response;
    } catch (error) {
      throw new Error(`Failed to send custom email: ${error}`);
    }
  }

  // ========================
  // Documents and Waivers
  // ========================

  /**
   * Upload waiver
   */
  async uploadWaiver(bookingId: string, file: File, participantId?: string): Promise<APIResponse<{ message: string; documentUrl: string }>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.UPLOAD_WAIVER.replace(':id', bookingId);
      const formData = new FormData();
      formData.append('waiver', file);
      if (participantId) {
        formData.append('participantId', participantId);
      }

      const response = await apiClient.upload<{ message: string; documentUrl: string }>(
        endpoint,
        file,
        participantId ? { participantId } : undefined
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to upload waiver: ${error}`);
    }
  }

  /**
   * Get booking documents
   */
  async getBookingDocuments(bookingId: string): Promise<APIResponse<{
    voucher?: string;
    invoice?: string;
    waivers: string[];
    tickets?: string[];
  }>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.GET_DOCUMENTS.replace(':id', bookingId);
      const response = await apiClient.get<{
        voucher?: string;
        invoice?: string;
        waivers: string[];
        tickets?: string[];
      }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch booking documents: ${error}`);
    }
  }

  /**
   * Generate voucher
   */
  async generateVoucher(bookingId: string): Promise<APIResponse<{ voucherUrl: string }>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.GENERATE_VOUCHER.replace(':id', bookingId);
      const response = await apiClient.post<{ voucherUrl: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to generate voucher: ${error}`);
    }
  }

  /**
   * Generate invoice
   */
  async generateInvoice(bookingId: string): Promise<APIResponse<{ invoiceUrl: string }>> {
    try {
      const endpoint = API_ENDPOINTS.BOOKINGS.GENERATE_INVOICE.replace(':id', bookingId);
      const response = await apiClient.post<{ invoiceUrl: string }>(endpoint);
      return response;
    } catch (error) {
      throw new Error(`Failed to generate invoice: ${error}`);
    }
  }

  // ========================
  // Statistics and Reports
  // ========================

  /**
   * Get booking statistics
   */
  async getBookingStats(dateRange?: { from: string; to: string }): Promise<APIResponse<{
    totalBookings: number;
    confirmedBookings: number;
    cancelledBookings: number;
    totalRevenue: number;
    averageBookingValue: number;
    recentBookings: Booking[];
    statusBreakdown: { status: string; count: number }[];
    monthlyTrends: { month: string; bookings: number; revenue: number }[];
  }>> {
    try {
      const params = dateRange ? { from: dateRange.from, to: dateRange.to } : undefined;
      const response = await apiClient.get<{
        totalBookings: number;
        confirmedBookings: number;
        cancelledBookings: number;
        totalRevenue: number;
        averageBookingValue: number;
        recentBookings: Booking[];
        statusBreakdown: { status: string; count: number }[];
        monthlyTrends: { month: string; bookings: number; revenue: number }[];
      }>(API_ENDPOINTS.BOOKINGS.GET_STATS, params);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch booking statistics: ${error}`);
    }
  }

  /**
   * Get revenue report
   */
  async getRevenueReport(dateRange: { from: string; to: string }): Promise<APIResponse<{
    totalRevenue: number;
    paidRevenue: number;
    pendingRevenue: number;
    refundedRevenue: number;
    dailyRevenue: { date: string; revenue: number }[];
    tourRevenue: { tourId: string; tourTitle: string; revenue: number }[];
  }>> {
    try {
      const response = await apiClient.post<{
        totalRevenue: number;
        paidRevenue: number;
        pendingRevenue: number;
        refundedRevenue: number;
        dailyRevenue: { date: string; revenue: number }[];
        tourRevenue: { tourId: string; tourTitle: string; revenue: number }[];
      }>(API_ENDPOINTS.BOOKINGS.GET_REVENUE_REPORT, dateRange);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch revenue report: ${error}`);
    }
  }

  /**
   * Get occupancy report
   */
  async getOccupancyReport(dateRange: { from: string; to: string }): Promise<APIResponse<{
    averageOccupancy: number;
    totalCapacity: number;
    totalBookings: number;
    dailyOccupancy: { date: string; occupancy: number; capacity: number }[];
    tourOccupancy: { tourId: string; tourTitle: string; occupancy: number }[];
  }>> {
    try {
      const response = await apiClient.post<{
        averageOccupancy: number;
        totalCapacity: number;
        totalBookings: number;
        dailyOccupancy: { date: string; occupancy: number; capacity: number }[];
        tourOccupancy: { tourId: string; tourTitle: string; occupancy: number }[];
      }>(API_ENDPOINTS.BOOKINGS.GET_OCCUPANCY_REPORT, dateRange);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch occupancy report: ${error}`);
    }
  }

  /**
   * Export bookings
   */
  async exportBookings(filters?: BookingFilters, format: 'csv' | 'excel' | 'pdf' = 'csv'): Promise<APIResponse<{ downloadUrl: string }>> {
    try {
      const data = { filters, format };
      const response = await apiClient.post<{ downloadUrl: string }>(
        API_ENDPOINTS.BOOKINGS.EXPORT_BOOKINGS,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to export bookings: ${error}`);
    }
  }

  // ========================
  // Bulk Operations
  // ========================

  /**
   * Bulk update booking status
   */
  async bulkUpdateStatus(data: BulkStatusUpdateRequest): Promise<APIResponse<{ updated: number }>> {
    try {
      const response = await apiClient.put<{ updated: number }>(
        API_ENDPOINTS.BOOKINGS.BULK_UPDATE_STATUS,
        data
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to bulk update booking status: ${error}`);
    }
  }

  /**
   * Bulk send reminders
   */
  async bulkSendReminders(bookingIds: string[], template?: string): Promise<APIResponse<{ sent: number }>> {
    try {
      const response = await apiClient.post<{ sent: number }>(
        API_ENDPOINTS.BOOKINGS.BULK_SEND_REMINDERS,
        { bookingIds, template }
      );
      return response;
    } catch (error) {
      throw new Error(`Failed to bulk send reminders: ${error}`);
    }
  }

  // ========================
  // Utility Methods
  // ========================

  /**
   * Build filter parameters for API requests
   */
  private buildFilterParams(filters: BookingFilters): Record<string, string> {
    const params: Record<string, string> = {};

    if (filters.status?.length) {
      params.status = filters.status.join(',');
    }
    if (filters.paymentStatus?.length) {
      params.paymentStatus = filters.paymentStatus.join(',');
    }
    if (filters.source?.length) {
      params.source = filters.source.join(',');
    }
    if (filters.dateRange) {
      params.dateFrom = filters.dateRange.from;
      params.dateTo = filters.dateRange.to;
    }
    if (filters.tourId) {
      params.tourId = filters.tourId;
    }
    if (filters.customerId) {
      params.customerId = filters.customerId;
    }

    return params;
  }

  /**
   * Calculate booking total (utility method)
   */
  calculateBookingTotal(booking: Booking): number {
    return booking.pricing.subtotal + booking.pricing.taxes + booking.pricing.fees - booking.pricing.discounts;
  }

  /**
   * Get booking status color (utility method for UI)
   */
  getBookingStatusColor(status: string): string {
    const colors: Record<string, string> = {
      pending: 'orange',
      confirmed: 'green',
      cancelled: 'red',
      completed: 'blue',
      'no-show': 'gray'
    };
    return colors[status] || 'gray';
  }
}

// Export singleton instance
export const bookingService = new BookingService();