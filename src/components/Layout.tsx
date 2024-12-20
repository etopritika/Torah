import DesktopSidebar from "./Sidebar/DesktopSidebar";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import ScrollUpButton from "./Scroll-up-button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isSearchPage = pathname.includes("/search");
  return (
    <div className="h-screen container mx-auto px-4">
      <Header />
      <DesktopSidebar />
      <main
        className={`md:ml-80 h-full ${
          isSearchPage ? "pt-14 py-2 md:pt-2" : "pt-14"
        }`}
      >
        {children}
      </main>
      <ScrollUpButton />
    </div>
  );
}
