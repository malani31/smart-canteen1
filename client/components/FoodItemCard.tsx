import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export type FoodItem = {
  id: string;
  name: string;
  price: number;
  logo: string; // emoji or single character
};

type Props = {
  item: FoodItem;
  onAdd: (item: FoodItem) => void;
};

export function FoodItemCard({ item, onAdd }: Props) {
  return (
    <Card className="group relative overflow-hidden border-border/60 transition-all hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
            <AvatarFallback className="text-xl bg-secondary">
              <span aria-hidden>{item.logo}</span>
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold tracking-tight">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Fresh, delicious and made to order
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-2xl font-bold">${item.price.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button onClick={() => onAdd(item)} className="w-full">
          <ShoppingCart className="mr-2" /> Add to cart
        </Button>
      </CardFooter>
      <div className="pointer-events-none absolute inset-x-0 -bottom-16 h-32 translate-y-6 bg-gradient-to-t from-primary/10 to-transparent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
    </Card>
  );
}
