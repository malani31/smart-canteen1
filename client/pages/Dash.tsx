import { DemoResponse } from "@shared/api";
import { useMemo } from "react";
import {
  IndianRupee,
  LineChart,
  Link,
  ShieldCheck,
  Trash2,
} from "lucide-react";
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

const Dash = () => {
  const totals = useMemo(() => {
    const prepared = history.reduce((sum, d) => sum + (d.sold + 8), 0);
    const sold = history.reduce((s, d) => s + d.sold, 0);
    const wastage = Math.max(0, prepared - sold);
    const reduction = 32; // indicative improvement with forecasting
    return { prepared, sold, wastage, reduction };
  }, []);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" /> Demand Forecast
          </CardTitle>
          <CardDescription>
            Moving average with feedback-adjusted projection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DemandChart data={history} forecastDays={3} />
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-accent/60 p-3 text-sm">
              Model: 3-day MA + feedback
            </div>
            <div className="rounded-md bg-accent/60 p-3 text-sm">
              Peak Day: Fri
            </div>
            <div className="rounded-md bg-accent/60 p-3 text-sm">
              Next 3-day projection shown
            </div>
          </div>
        </CardContent>
      </Card>

      <section id="wastage" className="container py-14">
        <Card>
          <CardHeader>
            <CardTitle>Food Wastage Tracking</CardTitle>
            <CardDescription>
              Monitor daily variance and optimize preparation
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {history.map((d) => {
              const prepared = d.sold + 8;
              const waste = Math.max(0, prepared - d.sold);
              return (
                <div key={d.day} className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">{d.day}</p>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <p className="text-muted-foreground">Prep</p>
                      <p className="font-semibold">{prepared}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sold</p>
                      <p className="font-semibold">{d.sold}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Waste</p>
                      <p className="font-semibold">{waste}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>
      <Card className="w-[1300px] mx-auto ">
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
  );
};

export default Dash;
