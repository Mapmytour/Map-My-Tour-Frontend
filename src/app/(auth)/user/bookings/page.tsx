
export default function BookingsPage() {
  const bookings = [
    { id: 1, tour: "Himalayan Trek", date: "2024-04-15", status: "confirmed", amount: 15000 },
    { id: 2, tour: "Goa Beach Tour", date: "2024-03-20", status: "completed", amount: 8000 },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
      </div>

      <div className="space-y-6">
        Bookings
      </div>
    </div>
  );
}