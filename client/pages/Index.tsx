import { DemoResponse } from "@shared/api";
import { useMemo } from "react";
import { Link } from "react-router-dom";

import { IndianRupee, LineChart, ShieldCheck, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DemandChart, { DemandPoint } from "@/components/charts/DemandChart";
import PreOrderForm from "@/components/orders/PreOrderForm";
import { Button } from "@/components/ui/button";

const history: DemandPoint[] = [
  { day: "Mon", sold: 120, feedback: 0.2 },
  { day: "Tue", sold: 130, feedback: 0.1 },
  { day: "Wed", sold: 110, feedback: -0.05 },
  { day: "Thu", sold: 150, feedback: 0.15 },
  { day: "Fri", sold: 170, feedback: 0.25 },
  { day: "Sat", sold: 90, feedback: -0.1 },
  { day: "Sun", sold: 80, feedback: -0.2 },
];

export default function Index() {
  const totals = useMemo(() => {
    const prepared = history.reduce((sum, d) => sum + (d.sold + 8), 0);
    const sold = history.reduce((s, d) => s + d.sold, 0);
    const wastage = Math.max(0, prepared - sold);
    const reduction = 32; // indicative improvement with forecasting
    return { prepared, sold, wastage, reduction };
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="  overflow-hidden border-b bg-gradient-to-b from-emerald-50 to-background ">
        <div className="container  grid gap-10 py-16 md:grid-cols-2 md:gap-12 ">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground"></span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Smart Canteen
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Predict demand with past purchase data and student feedback.
              Enable digital pre-orders and UPI payments while tracking food
              wastage in real time.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex h-10 justify-center items-center bg-green-600 text-white border px-3 border-green-400 px-5 rounded-lg">
                <Link to="/preorder" className="text-white font-semibold">
                  Pre-order
                </Link>
              </div>
              <div className="flex justify-center items-center border border-green-400 px-5 rounded-lg">
                <Link to="/dash" className="text-green-700 font-semibold">
                  Dashboard
                </Link>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border bg-card p-4 text-center">
                <p className="text-xs text-muted-foreground">Today Forecast</p>
                <p className="mt-1 text-2xl font-bold">~145</p>
              </div>
              <div className="rounded-lg border bg-card p-4 text-center">
                <p className="text-xs text-muted-foreground">Pre-orders</p>
                <p className="mt-1 text-2xl font-bold">36</p>
              </div>
              <div className="rounded-lg border bg-card p-4 text-center">
                <p className="text-xs text-muted-foreground">Wastage ↓</p>
                <p className="mt-1 text-2xl font-bold">{totals.reduction}%</p>
              </div>
              <div className="rounded-lg border bg-card p-4 text-center">
                <p className="text-xs text-muted-foreground">UPI Ready</p>
                <p className="mt-1 text-2xl font-bold">Yes</p>
              </div>
            </div>
          </div>
          <div>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/boy-collecting-food-from-school-food-canteen-6257663-5121390.png"></img>
          </div>
        </div>
      </section>

      <section
        id="preorder"
        className="border-t bg-muted/30 py-14 mx-auto mt-10"
      >
        <div className="container grid gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-center border bg-white border-gray-300 p-4 rounded-lg dark:bg-black">
            <h2 className="text-3xl font-bold">Digital Pre-Order & Payment</h2>
            <p className="mt-2 text-muted-foreground">
              Reserve your meal, skip the queue, and pay via UPI. Orders are
              linked to your student ID.
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-muted-foreground">
              <li className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Realtime pickup slots
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                UPI deep-link payments
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Verified student access
              </li>
            </ul>
          </div>
          <Card className="border bg-white border-gray-300 p-4 rounded-lg dark:bg-black">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 ">
                <ShieldCheck className="h-5 w-5" /> UPI & Student ID
              </CardTitle>
              <CardDescription>
                Secure payments and verified student identity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Generate UPI deep links instantly at checkout.</p>
              <p>• Validate student IDs for campus-only access.</p>
              <p>• Reduce cash handling and queues.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="w-[1200px] mt-8 mx-auto ">
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
            <PreOrderForm />
          </CardContent>
        </Card>
      </div>

      {/* Forecast */}
      <section id="forecast" className="container py-14  ">
        <div className=" gap-6 md:grid-cols-3 flex items-center justify-center">
          <Card className="w-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" /> Weekly Overview
              </CardTitle>
              <CardDescription>Past sales vs projected demand</CardDescription>
            </CardHeader>
            <CardContent>
              <DemandChart data={history} forecastDays={3} />
            </CardContent>
          </Card>

          <Card className="w-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" /> Wastage Metrics
              </CardTitle>
              <CardDescription>
                Track prepared vs sold to minimize waste
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md border p-3">
                <p className="text-muted-foreground">Prepared</p>
                <p className="mt-1 text-xl font-bold">{totals.prepared}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="text-muted-foreground">Sold</p>
                <p className="mt-1 text-xl font-bold">{totals.sold}</p>
              </div>
              <div className="rounded-md border p-3 col-span-2">
                <p className="text-muted-foreground">Wastage</p>
                <p className="mt-1 text-xl font-bold">{totals.wastage}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pre-order */}

      {/* Wastage */}
    </main>
  );
}
