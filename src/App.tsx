import { Header } from "./components/layout/Header";
import { MobileNavbar } from "./components/layout/MobileNavbar";
import { NextRaceCard } from "./components/nextRace/NextRaceCard";

function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center pb-17 md:pb-0">
        <div className="text-center space-y-2">
          <NextRaceCard />
        </div>
      </main>
      <MobileNavbar />
    </>
  );
}

export default App;
