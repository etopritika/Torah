import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 h-[calc(100%-40px)]">
        {children}
      </main>
    </>
  );
}
