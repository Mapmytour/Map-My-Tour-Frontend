
export default function UpcomingPage() {
  const upcomingTours = [
    {
      id: 1,
      tour: "Himalayan Trek",
      date: "2024-04-15",
      daysLeft: 25,
      status: "confirmed"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Upcoming Tours</h1>

      <div className="space-y-6">
        Upcoming Tours
      </div>
    </div>
  );
}