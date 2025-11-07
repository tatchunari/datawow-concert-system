"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Detect current mode based on URL path
  const mode = pathname.startsWith("/dashboard/admin") ? "admin" : "user";

  // Admin-only links
  const adminLinks = [
    { name: "Home", href: "/dashboard/admin" },
    { name: "History", href: "/dashboard/admin/history" },
  ];

  // Switch between admin and user dashboard
  const handleSwitch = () => {
    router.push(mode === "admin" ? "/dashboard/user" : "/dashboard/admin");
  };

  return (
    <aside className="w-60 bg-white px-6 py-10 flex flex-col justify-between border-r border-gray-200">
      <div>
        {/* Header title */}
        <h1 className="text-lg font-semibold mb-6">
          {mode === "admin" ? "Admin" : "User"}
        </h1>

        {/* Only render links for admin */}
        {mode === "admin" && (
          <ul className="space-y-2 mt-8">
            {adminLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block p-2 rounded transition ${
                    pathname === link.href
                      ? "bg-[#EAF5FA] text-black"
                      : "hover:bg-[#EAF5FA] text-gray-500"
                  }`}
                >
                  <p className="text-md">{link.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {/* Switch Mode Button */}
        <button
          onClick={handleSwitch}
          className="mt-8 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm text-gray-200"
        >
          Switch to {mode === "admin" ? "User" : "Admin"}
        </button>
      </div>
    </aside>
  );
}
