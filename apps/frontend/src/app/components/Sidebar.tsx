"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Determine mode from the current path
  const mode = pathname.startsWith("/dashboard/admin") ? "admin" : "user";

  const adminLinks = [
    { name: "Home", href: "/dashboard/admin" },
    { name: "History", href: "/dashboard/admin/history" },
  ];

  const handleSwitch = () => {
    if (mode === "admin") {
      router.push("/dashboard/user");
    } else {
      router.push("/dashboard/admin");
    }
  };

  return (
    <aside className="w-[240px] bg-white px-6 py-15 flex flex-col justify-between">
      <div>
        <h1 className="mb-6">{mode === "admin" ? "Admin" : "User"}</h1>

        <ul className="space-y-2 mt-8">
          {adminLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block p-2 rounded ${
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

        {/* Switch Mode Button */}
        <button
          onClick={handleSwitch}
          className="mt-6 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm text-gray-200"
        >
          Switch to {mode === "admin" ? "User" : "Admin"}
        </button>
      </div>
    </aside>
  );
}
