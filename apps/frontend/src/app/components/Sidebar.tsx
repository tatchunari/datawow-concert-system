"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  mode: "admin" | "user";
  onSwitch: () => void;
}

export default function Sidebar({ mode, onSwitch }: SidebarProps) {
  const pathname = usePathname();

  const adminLinks = [
    { name: "Dashboard", href: "/dashboard/admin" },
    { name: "Users", href: "/dashboard/admin/users" },
    { name: "Reports", href: "/dashboard/admin/reports" },
  ];

  const userLinks = [
    { name: "My Profile", href: "/dashboard/user" },
    { name: "My Orders", href: "/dashboard/user/orders" },
    { name: "Support", href: "/dashboard/user/support" },
  ];

  const links = mode === "admin" ? adminLinks : userLinks;

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-bold mb-4">
          {mode === "admin" ? "Admin Panel" : "User Dashboard"}
        </h2>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-3 py-2 rounded ${
                  pathname === link.href
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onSwitch}
        className="mt-6 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm text-gray-200"
      >
        Switch to {mode === "admin" ? "User" : "Admin"} Mode
      </button>
    </aside>
  );
}
