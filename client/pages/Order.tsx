import { useMemo } from "react";
import { ShoppingCart, Utensils } from "lucide-react";
import { FoodItem, FoodItemCard } from "@/components/FoodItemCard";
import { useCart } from "@/lib/Cart";

const Order = () => {
  const items: FoodItem[] = useMemo(
    () => [
      { id: "pizza", name: "Margherita Pizza", price: 12, logo: "🍕" },
      { id: "burger", name: "Classic Burger", price: 10, logo: "🍔" },
      { id: "sushi", name: "Salmon Sushi", price: 15, logo: "🍣" },
      { id: "salad", name: "Garden Salad", price: 9, logo: "🥗" },
      { id: "pasta", name: "Creamy Pasta", price: 13, logo: "🍝" },
      { id: "tacos", name: "Street Tacos", price: 11, logo: "🌮" },
    ],
    [],
  );

  const { add } = useCart();

  return (
    <main className="container mx-auto px-4 pb-16 pt-10">
      <section>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Place your order
            </h1>
            <p className="mt-2 max-w-prose text-muted-foreground">
              Explore our chef-crafted favorites and add your picks to the cart.
              Fresh, fast, and delicious.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <FoodItemCard key={item.id} item={item} onAdd={add} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Order;
