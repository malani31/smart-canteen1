import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { IndianRupee, Timer } from "lucide-react";

const MENU = [
  { id: "idli", name: "Idli Sambar", price: 25 },
  { id: "poha", name: "Poha", price: 20 },
  { id: "paratha", name: "Aloo Paratha", price: 35 },
  { id: "tea", name: "Masala Chai", price: 15 },
];

function isValidUPI(upi: string) {
  return /^[a-zA-Z0-9_.-]{3,}@[a-zA-Z]{2,}$/.test(upi);
}

function isValidStudentId(id: string) {
  return /^[a-zA-Z0-9]{6,}$/.test(id);
}

export function PreOrderForm() {
  const [item, setItem] = useState(MENU[0].id);
  const [qty, setQty] = useState(1);
  const [pickup, setPickup] = useState("12:30");
  const [studentId, setStudentId] = useState("");
  const [upi, setUpi] = useState("");

  const selected = useMemo(() => MENU.find((m) => m.id === item)!, [item]);
  const amount = useMemo(
    () => Math.max(0, selected.price * qty),
    [selected.price, qty],
  );

  const upiUrl = useMemo(() => {
    const params = new URLSearchParams({
      pa: upi,
      pn: "Smart Canteen",
      cu: "INR",
      am: amount.toString(),
      tn: `Pre-order ${selected.name} x${qty} @ ${pickup}`,
    });
    return `upi://pay?${params.toString()}`;
  }, [upi, amount, selected.name, qty, pickup]);

  const canPay = isValidUPI(upi) && isValidStudentId(studentId) && qty > 0;

  function submit() {
    toast.success("Pre-order placed", {
      description: `${selected.name} x${qty} scheduled at ${pickup}. Amount ₹${amount}. Student ${studentId}.`,
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Menu Item</Label>
          <Select value={item} onValueChange={setItem}>
            <SelectTrigger>
              <SelectValue placeholder="Choose item" />
            </SelectTrigger>
            <SelectContent>
              {MENU.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name} • ₹{m.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Quantity</Label>
          <Input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </div>
        {/* <div className="space-y-2">
          <Label className="inline-flex items-center gap-2">
            Pickup Time <Timer className="h-4 w-4" />
          </Label>
          <Input
            type="time"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
        </div> */}
        <div className="space-y-2 sm:col-span-2">
          <Label>Student ID</Label>
          <Input
            placeholder="e.g. STU1234"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value.toUpperCase())}
          />
          {!studentId || isValidStudentId(studentId) ? null : (
            <p className="text-xs text-destructive">
              Enter at least 6 alphanumeric characters.
            </p>
          )}
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>UPI ID</Label>
          <Input
            placeholder="name@bank"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
          />
          {!upi || isValidUPI(upi) ? null : (
            <p className="text-xs text-destructive">
              Enter a valid UPI ID, e.g. username@upi
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-md border bg-muted/40 p-3">
        <div className="text-sm">
          <p className="text-muted-foreground">Payable Amount</p>
          <p className="mt-1 text-lg font-semibold inline-flex items-center gap-1">
            <IndianRupee className="h-4 w-4" />
            {amount}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={submit} disabled={!canPay}>
            Place Order
          </Button>
          <Button asChild disabled={!canPay}>
            <a href={upiUrl}>Pay via UPI</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PreOrderForm;
