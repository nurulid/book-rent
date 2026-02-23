import Link from "next/link";
import { Home, SearchX, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-10">
      <div className="w-full max-w-xl rounded-xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
          <SearchX className="size-7 text-muted-foreground" />
        </div>

        <p className="text-muted-foreground text-sm font-medium">404</p>
        <h1 className="h2-bold mt-2">Page not found</h1>
        <p className="text-muted-foreground mt-3">
          The page you&apos;re looking for does not exist, was removed, or the
          link is incorrect.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <Home />
              Back to home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/cart">
              <ShoppingCart />
              Go to cart
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
