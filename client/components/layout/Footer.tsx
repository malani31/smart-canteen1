export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-background/60">
      <div className="container py-8 text-sm text-muted-foreground grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <p className="font-semibold text-foreground">Smart Canteen</p>
          <p className="mt-2 max-w-sm">
            PS09: Demand-aware college canteen with digital pre-orders, UPI
            payments, and wastage tracking.
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Quick Links</p>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#forecast" className="hover:text-foreground">
                Forecast
              </a>
            </li>
            <li>
              <a href="#preorder" className="hover:text-foreground">
                Pre-Order
              </a>
            </li>
            <li>
              <a href="#wastage" className="hover:text-foreground">
                Wastage
              </a>
            </li>
          </ul>
        </div>
        <div className="md:text-right">
          <p>© {year} Smart Canteen</p>
          <p className="mt-1">Made for colleges</p>
        </div>
      </div>
    </footer>
  );
}
