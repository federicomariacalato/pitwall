import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { MobileNavbar } from "./MobileNavbar";

export function Layout() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-310 px-4 py-8 pb-24 md:px-10 md:py-10 md:pb-16">
        <Outlet />
      </main>
      <MobileNavbar />
    </>
  );
}
