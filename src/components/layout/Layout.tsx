import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileNavbar } from "./MobileNavbar";

export function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-310 flex-1 px-4 py-8 md:px-10 md:py-10 md:pb-16">
        <Outlet />
      </main>
      <Footer />
      <MobileNavbar />
    </div>
  );
}
