import NotificationItem from '@/components/user/NotificationItem';

export default function NotificationsPage() {
  const notifications = [
    { id: 1, type: "booking", message: "Your booking for Himalayan Trek is confirmed", date: "2024-03-15", read: false },
    { id: 2, type: "reminder", message: "Don't forget to pack for your upcoming tour", date: "2024-03-14", read: true },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <button className="text-blue-600 hover:text-blue-700">Mark all as read</button>
      </div>
      
      <div className="space-y-4">
        {notifications.map(notification => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}