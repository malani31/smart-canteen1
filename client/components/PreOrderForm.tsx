import { useState } from "react";
import { useCart } from "@/lib/cart";

export default function PreOrderForm() {
  const { totalPrice, clear } = useCart();
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    // simple client-side order flow
    if (!name || !time) {
      alert("Please provide your name and pickup time.");
      return;
    }
    alert(
      `Thanks ${name}! Your order of $${totalPrice.toFixed(2)} is placed for ${time}.`,
    );
    clear();
    setName("");
    setTime("");
    setNotes("");
  }

  return (
    <form onSubmit={handlePlaceOrder} className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="col-span-1 rounded-md border border-input bg-background px-3 py-2"
        />
        <input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Pickup time (e.g. 12:30 PM)"
          className="col-span-1 rounded-md border border-input bg-background px-3 py-2"
        />
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes (optional)"
          className="col-span-1 rounded-md border border-input bg-background px-3 py-2"
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Place Order
        </button>
      </div>
    </form>
  );
}
