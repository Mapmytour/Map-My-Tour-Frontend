
export default function HistoryPage() {
  const history = [
    { id: 1, tour: "Goa Beach Tour", date: "2024-02-15", status: "completed", rating: 5 },
    { id: 2, tour: "Manali Trek", date: "2023-12-10", status: "completed", rating: 4 },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Travel History</h1>

      <div className="space-y-6">
        History Items
      </div>
    </div>
  );
}