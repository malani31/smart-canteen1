import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IndianRupee, LineChart, Salad, Trash2 } from "lucide-react";

const nav = [
  { href: "#forecast", label: "Forecast", icon: LineChart },
  { href: "#preorder", label: "Pre-Order", icon: IndianRupee },
  { href: "#wastage", label: "Wastage", icon: Trash2 },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur",
        scrolled ? "shadow-sm" : "border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-extrabold">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/90 text-primary-foreground shadow-sm">
            <Salad className="h-5 w-5" />
          </div>
          <span className="text-lg tracking-tight">Smart Canteen</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <n.icon className="h-4 w-4 text-foreground/60 group-hover:text-foreground" />
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Toggle theme"
            onClick={() => setDark((v) => !v)}
          >
            {dark ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                Light
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                Dark
              </span>
            )}
          </Button>
          <Button asChild size="sm">
            <a href="#preorder">Order Now</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
