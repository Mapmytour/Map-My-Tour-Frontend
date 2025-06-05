
export default function WishlistPage() {
  const wishlistItems = [
    { id: 1, tour: "Rajasthan Heritage", price: 12000, image: "/tour1.jpg" },
    { id: 2, tour: "Ladakh Adventure", price: 18000, image: "/tour2.jpg" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        WishList Items
      </div>
    </div>
  );
}