export type Book = {
  id: string;
  title: string;
  slug: string;
  author: string;
  desc: string;
  publish: number;
  pages: number;
  synopsis: string;
  category: string;
  genre: string;
  stock: number;
  status: "available" | "limited";
  condition: "new" | "good" | "fair";
};
