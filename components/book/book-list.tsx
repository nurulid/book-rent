import BookCard from "@/components/book/book-card";
import type { Book } from "@/components/book/types";

const BookList = ({ books }: { books: Book[] }) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
