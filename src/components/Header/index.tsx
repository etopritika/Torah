import { useLocation } from "react-router-dom";
import { Breadcrumbs } from "./breadcrumbs";
import SearchButton from "./search-button";

export default function Header() {
  const location = useLocation();
  const pathSegments: string[] = location.pathname
    .split("/")
    .filter((segment) => segment);

  return (
    <header className="container mx-auto px-4">
      <div className="flex items-center justify-between">
        <Breadcrumbs pathSegments={pathSegments} />
        <SearchButton pathSegments={pathSegments} />
      </div>
    </header>
  );
}
