import { NavLink } from "react-router-dom";
import { navItems } from "./navItems";

export function Navbar() {
  return (
    <nav aria-label="Main" className="hidden gap-2 self-stretch md:flex">
      {navItems.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex items-center border-b-2 px-3.5 text-base font-medium transition-colors ${
              isActive
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
