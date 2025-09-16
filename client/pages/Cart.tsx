import { IndianRupee } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/lib/cart";
import PreOrderForm from "@/components/PreOrderForm";

export default function Cart() {
  const { cart, totalCount, totalPrice, setQty, remove } = useCart();
  const entries = Object.values(cart);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/40">
      <main className="py-10">
        <div className="w-full max-w-5xl mx-auto px-4">
          <Card className="bg-slate-100 dark:bg-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5" /> Place Your Order
              </CardTitle>
              <CardDescription>
                Choose an item, quantity, and pickup time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {entries.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground">
                    Your cart is empty
                  </div>
                ) : (
                  <div className="space-y-4">
                    {entries.map(({ item, qty }) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 rounded-md border border-border p-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-secondary text-xl">
                            {item.logo}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold truncate">
                              {item.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} each
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            aria-label={`Quantity for ${item.name}`}
                            type="number"
                            className="w-20 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={qty}
                            onChange={(e) =>
                              setQty(item.id, Number(e.target.value))
                            }
                            min={0}
                          />
                          <div className="text-right">
                            <div className="font-medium">
                              ${(item.price * qty).toFixed(2)}
                            </div>
                            <button
                              className="text-sm text-destructive mt-1"
                              onClick={() => remove(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="text-sm text-muted-foreground">
                        Items: {totalCount}
                      </div>
                      <div className="text-lg font-semibold">
                        Total: ${totalPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                )}

                <PreOrderForm />
              </div>
            </CardContent>
            <CardFooter />
          </Card>
        </div>
      </main>
    </div>
  );
}
