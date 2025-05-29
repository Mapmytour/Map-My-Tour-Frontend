import CartItem from '@/components/user/CartItem';
import CartSummary from '@/components/user/CartSummary';

export default function CartPage() {
  const cartItems = [
    { id: 1, tour: "Himalayan Trek", price: 15000, quantity: 2 },
    { id: 2, tour: "Kerala Backwaters", price: 12000, quantity: 1 },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <CartSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
}