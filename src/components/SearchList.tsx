import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BookPathMap, sectionNameMap } from "@/lib/types";
import { useSearchStore } from "@/store/use-search-store";

export default function SearchList() {
  const { storeResults, error, isSearchComplete } = useSearchStore();

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (storeResults.length === 0 && isSearchComplete) {
    return (
      <div className="flex justify-center">
        <span>Нет результатов.</span>
      </div>
    );
  }

  return (
    <section>
      {isSearchComplete && (
        <span className="text-gray-500">
          {storeResults.length}{" "}
          {storeResults.length === 1 ? "результат" : "результатов"} найдено
        </span>
      )}
      <ul className="space-y-4 mt-1">
        {storeResults.map((verse) => {
          const idChapterTwo = verse.id_chapter_two || 1;
          const isSubChapter =
            idChapterTwo > 1
              ? `${verse.id_chapter}/${idChapterTwo}`
              : verse.id_chapter;

          const bookPath = BookPathMap[verse.id_book];
          const to = `/${bookPath.section}/${bookPath.bookName}/${isSubChapter}#verse-${verse.poemNumber}`;
          const sectionName = sectionNameMap[bookPath.section];

          return (
            <li key={`${verse.id_book}-${isSubChapter}-${verse.poemNumber}`}>
              <Link to={to}>
                <Card className="bg-white shadow-md">
                  <CardHeader>
                    <CardTitle className="text-sm">
                      {sectionName}: {verse.chapter}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-x-2 flex text-sm">
                    <span className="font-bold">{verse.poemNumber}</span>
                    <div className="space-y-2 w-full">
                      <p>{verse.verse}</p>
                      <p className="rtl text-right">{verse.verse_ivrit}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
