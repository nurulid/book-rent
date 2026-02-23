import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getBookAvailability, getBookAvailabilityLabel } from "@/lib/utils";
import { Book } from "./types";

const BookCard = ({ book }: { book: Book }) => {
  const bookStatus = getBookAvailability(book.stock ?? 0);
  const bookStatusLabel = getBookAvailabilityLabel(bookStatus);

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle>
            <Link href={`/book/${book.slug}`}>{book.title}</Link>
          </CardTitle>
          <Badge variant={bookStatus === "available" ? "default" : "secondary"}>
            {bookStatusLabel}
          </Badge>
        </div>
        <CardDescription>by {book.author}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-muted-foreground line-clamp-2 text-sm">{book.desc}</p>
        <p className="line-clamp-3 text-sm">{book.synopsis}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{book.category}</Badge>
          <Badge variant="outline">{book.genre}</Badge>
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex-wrap justify-between gap-2 text-xs">
        <span className="text-muted-foreground">
          {book.pages} pages
        </span>
        <span className="font-medium">{book.publish}</span>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
