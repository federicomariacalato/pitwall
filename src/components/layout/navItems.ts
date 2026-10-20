import { Calendar, Flag, House, Trophy } from "lucide-react";

export const navItems = [
  { to: "/", label: "Home", icon: House },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/standings", label: "Standings", icon: Trophy },
  { to: "/race/last", label: "Last race", icon: Flag },
];
