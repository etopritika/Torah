import { Link } from "react-router-dom";
import { useParams } from "react-router";

type Book = {
  id: string;
  name: string;
  file: string;
  href: string;
};

type BooksBySection = {
  [key: string]: Book[];
};

const books: BooksBySection = {
  tora: [
    {
      id: "beresheet",
      name: "Берешит",
      file: "/tora/obj-beresheet.js",
      href: "/sections/tora/books/beresheet/chapters/1",
    },
    {
      id: "schmot",
      name: "Шмот",
      file: "/tora/obj-schmot.js",
      href: "/sections/tora/books/schmot/chapters/1",
    },
    {
      id: "vaikra",
      name: "Ваикра",
      file: "/tora/obj-vaikra.js",
      href: "/sections/tora/books/vaikra/chapters/1",
    },
    {
      id: "bemidbar",
      name: "Бемидбар",
      file: "/tora/obj-bemidbar.js",
      href: "/sections/tora/books/bemidbar/chapters/1",
    },
    {
      id: "dvarim",
      name: "Дварим",
      file: "/tora/obj-dvarim.js",
      href: "/sections/tora/books/dvarim/chapters/1",
    },
  ],
  neviim: [
    { id: "neviim", name: "Йешуа", file: "/neviim/obj-yeshua.js", href: "" },
  ],
  ketuvim: [
    {
      id: "ketuvim",
      name: "Тегілім",
      file: "/ketuvim/obj-tehilim.js",
      href: "",
    },
  ],
};

export default function BooksPage() {
  const { sectionName } = useParams<{ sectionName: string }>();

  if (!sectionName) {
    return <p className="text-red-500">Книга не найдена</p>;
  }

  return (
    <section className="py-6">
      <ul className="space-y-4">
        {books[sectionName].map((book) => (
          <li key={book.id}>
            <Link
              to={book.href}
              className="inline-block bg-brown-dark text-white py-2 px-4 rounded-lg min-w-[150px] text-center"
            >
              {book.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
