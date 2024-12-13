import beresheetChapters from "@/lib/book-chapters/tora/beresheet-chapters";
import bemidbarChapters from "@/lib/book-chapters/tora/bemidbar-chapters";
import dvarimChapters from "@/lib/book-chapters/tora/dvarim-chapters";
import schmotChapters from "@/lib/book-chapters/tora/schmot-chapters";
import vaikraChapters from "@/lib/book-chapters/tora/vaikra-chapters";
import { useParams } from "react-router-dom";
import AppPagination from "@/components/App-pagination";
import { ChapterList } from "@/components/Chapter-list";
import { NoChapters } from "@/components/No-chapters";

const chaptersMap: Record<
  string,
  {
    key: number;
    start: number;
    end: number;
    verses: number;
    chapterName: string;
  }[]
> = {
  beresheet: beresheetChapters,
  bemidbar: bemidbarChapters,
  dvarim: dvarimChapters,
  schmot: schmotChapters,
  vaikra: vaikraChapters,
};

export default function ChaptersPage() {
  const { chapterPage, bookName, sectionName } = useParams<{
    chapterPage: string | undefined;
    bookName: string | undefined;
    sectionName: string | undefined;
  }>();

  if (!bookName || !chaptersMap[bookName]) {
    return <NoChapters sectionName={sectionName || ""} />;
  }

  const chapters = chaptersMap[bookName];

  const page = parseInt(chapterPage || "1", 10);

  const chaptersPerPage = 10;
  const totalChapters = chapters.length;
  const totalPages = Math.ceil(totalChapters / chaptersPerPage);

  const startIndex = (page - 1) * chaptersPerPage;
  const endIndex = Math.min(startIndex + chaptersPerPage, totalChapters);

  const chaptersToRender = chapters.slice(startIndex, endIndex);

  return (
    <section className="py-6 space-y-6 h-full">
      <ChapterList
        chapters={chaptersToRender}
        sectionName={sectionName || ""}
        bookName={bookName}
      />
      <AppPagination
        currentPage={page}
        totalPages={totalPages}
        sectionName={sectionName || ""}
        bookName={bookName}
      />
    </section>
  );
}
