import { BookMarked, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import BookLinks from "./BookLinks";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BOOKS } from "@/lib/routes";
import { useReadingStore } from "@/store/use-reading-store";

export default function MobileSidebar() {
  const { pathname } = useLocation();
  const pathSegments: string[] = pathname
    .split("/")
    .filter((segment) => segment);
  const currentSection = pathSegments[0] || "";
  const currentBook = pathSegments[1] || "";

  const { lastPathname, chapterName } = useReadingStore(
    (state) => state.lastRead,
  );

  return (
    <Sheet>
      <SheetHeader className="sr-only">
        <SheetTitle>Навигация</SheetTitle>
        <SheetDescription>Выберите нужную книгу</SheetDescription>
      </SheetHeader>
      <SheetTrigger asChild>
        <button aria-label="Toggle Sidebar" className="h-10 w-10 p-2 lg:hidden">
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full bg-white p-4">
        <nav className="rounded-lg p-2">
          <SheetClose asChild>
            <Link
              to="/"
              className={`block border-b py-4 ${
                currentSection === "" ? "font-bold" : ""
              }`}
            >
              Танах
            </Link>
          </SheetClose>
          <Accordion type="single" collapsible defaultValue={currentSection}>
            <AccordionItem value="tora">
              <AccordionTrigger>Тора</AccordionTrigger>
              <BookLinks
                booksList={BOOKS.tora}
                currentBook={currentBook}
                closeOnClick={true}
              />
            </AccordionItem>
            <AccordionItem value="neviim">
              <AccordionTrigger>Невиим</AccordionTrigger>
              <BookLinks
                booksList={BOOKS.neviim}
                currentBook={currentBook}
                closeOnClick={true}
              />
            </AccordionItem>
            <AccordionItem value="ketuvim">
              <AccordionTrigger>Ктувим</AccordionTrigger>
              <BookLinks
                booksList={BOOKS.ketuvim}
                currentBook={currentBook}
                closeOnClick={true}
              />
            </AccordionItem>
          </Accordion>
          {lastPathname && chapterName && (
            <SheetClose asChild>
              <Link
                to={lastPathname}
                className={`flex items-center border-b py-4 text-sm ${
                  pathname === lastPathname ? "font-bold" : ""
                }`}
              >
                <BookMarked className="mr-2" size={16} /> {chapterName}
              </Link>
            </SheetClose>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
