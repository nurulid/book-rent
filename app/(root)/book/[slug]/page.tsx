import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Library,
  Layers,
  User,
} from "lucide-react";

import { getBookBySlug } from "@/lib/actions/book.actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBookAvailability, getBookAvailabilityLabel } from "@/lib/utils";

export default async function BookDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const book = await getBookBySlug(slug);
  const bookStatus = getBookAvailability(book?.stock ?? 0);
  const bookStatusLabel = getBookAvailabilityLabel(bookStatus);

  if (!book) notFound();

  return (
    <section className="py-8">
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">
            <ArrowLeft />
            Back to books
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="h2-bold leading-tight">
                  {book.title}
                </CardTitle>
                <CardDescription className="mt-2 flex items-center gap-2 text-base">
                  <User className="size-4" />
                  by {book.author}
                </CardDescription>
              </div>

              <Badge
                variant={bookStatus === "available" ? "default" : "secondary"}
              >
                {bookStatusLabel}
              </Badge>
            </div>

            <p className="text-muted-foreground text-sm">{book.desc}</p>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <h2 className="h3-bold mb-2">Synopsis</h2>
              <p className="text-muted-foreground leading-7">{book.synopsis}</p>
            </div>
          </CardContent>

          <CardFooter className="flex-wrap justify-between gap-3 mt-auto">
            <span className="text-muted-foreground flex items-center gap-2 text-sm">
              <Calendar className="size-4" />
              Published: {book.publish}
            </span>
            <span className="text-muted-foreground flex items-center gap-2 text-sm">
              <BookOpen className="size-4" />
              {book.pages} pages
            </span>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Book Information</CardTitle>
            <CardDescription>Quick details and availability.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground flex items-center gap-2">
                <Layers className="size-4" />
                Category
              </span>
              <span className="font-medium">{book.category}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground flex items-center gap-2">
                <Library className="size-4" />
                Genre
              </span>
              <span className="font-medium">{book.genre}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Condition</span>
              <span className="font-medium capitalize">{book.condition}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-muted-foreground">Stock</span>
              <span className="font-medium">{book.stock}</span>
            </div>
          </CardContent>

          <CardFooter className="mt-auto">
            <Button
              asChild
              size="lg"
              className="w-full"
              disabled={book.stock < 1}
            >
              <Link
                href={`/cart?bookId=${book.id}&title=${encodeURIComponent(
                  book.title,
                )}&author=${encodeURIComponent(book.author)}`}
              >
                {book.stock > 0 ? "Rent this book" : "Out of stock"}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
