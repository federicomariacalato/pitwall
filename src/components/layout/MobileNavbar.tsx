import { NavLink } from "react-router-dom";
import { navItems } from "./navItems";

export function MobileNavbar() {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-10 grid min-h-17 grid-cols-4 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_20px_rgba(0,0,0,0.35)] md:hidden"
    >
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 text-xs transition-colors ${
              isActive
                ? "font-semibold text-primary"
                : "font-medium text-muted-foreground"
            }`
          }
        >
          <Icon className="size-5.5" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
