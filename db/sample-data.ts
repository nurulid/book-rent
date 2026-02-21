import type { Prisma } from "@prisma/client";

const sampleData = {
  books: [
    {
      id: "8f2cb407-c53f-41ef-b96c-526f7f6698f5",
      title: "Atomic Habits",
      slug: "atomic-habits",
      author: "James Clear",
      desc: "A practical guide to building good habits and breaking bad ones.",
      publish: 2018,
      pages: 320,
      synopsis:
        "Atomic Habits explains how small daily improvements lead to remarkable long-term results.",
      category: "Non-Fiction",
      genre: "Self-Improvement",
      stock: 5,
      status: "available",
      condition: "fair",
    },
    {
      id: "af08a646-2e7b-4386-a597-94431453f6d5",
      title: "Deep Work",
      slug: "deep-work",
      author: "Cal Newport",
      desc: "Rules for focused success in a distracted world.",
      publish: 2016,
      pages: 304,
      synopsis:
        "Deep Work explains why focus is valuable and how to cultivate deep concentration.",
      category: "Non-Fiction",
      genre: "Productivity",
      stock: 3,
      status: "available",
      condition: "new",
    },
    {
      id: "2935fa00-545d-4aef-98cd-5f8fbfd98997",
      title: "The Psychology of Money",
      slug: "the-psychology-of-money",
      author: "Morgan Housel",
      desc: "Timeless lessons on wealth, greed, and happiness.",
      publish: 2020,
      pages: 256,
      synopsis:
        "Explores how behavior influences financial decisions more than knowledge.",
      category: "Non-Fiction",
      genre: "Finance",
      stock: 4,
      status: "available",
      condition: "good",
    },
    {
      id: "ef8f272f-9f89-42be-aebf-baff605f143a",
      title: "Clean Code",
      slug: "clean-code",
      author: "Robert C. Martin",
      desc: "A handbook of agile software craftsmanship.",
      publish: 2008,
      pages: 464,
      synopsis:
        "Teaches principles and best practices for writing maintainable code.",
      category: "Technology",
      genre: "Programming",
      stock: 2,
      status: "limited",
      condition: "fair",
    },
    {
      id: "9f5d36fe-84cf-4cbf-bb74-477865f2bba3",
      title: "The Pragmatic Programmer",
      slug: "the-pragmatic-programmer",
      author: "Andrew Hunt & David Thomas",
      desc: "Your journey to mastery in software development.",
      publish: 1999,
      pages: 352,
      synopsis:
        "Covers practical tips and philosophies for effective programming.",
      category: "Technology",
      genre: "Software Engineering",
      stock: 1,
      status: "limited",
      condition: "good",
    },
  ] satisfies Prisma.BookCreateManyInput[],
};

export default sampleData;
