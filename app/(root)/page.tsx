import BookList from "@/components/book/book-list";
import { getLatestBooks } from "@/lib/actions/book.actions";

export default async function Page() {
  const latestBooks = await getLatestBooks();

  return (
    <section className="py-8">
      <h1 className="h2-bold mb-6">Available Books</h1>

      <BookList books={latestBooks} />
    </section>
  );
}
