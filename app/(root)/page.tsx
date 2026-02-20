import BookList from "@/components/book/book-list";
import sampleData from "@/db/sample-data";

export default function Page() {
  const { books } = sampleData;

  return (
    <section className="py-8">
      <h1 className="h2-bold mb-6">Available Books</h1>

      <BookList books={books} />
    </section>
  );
}
