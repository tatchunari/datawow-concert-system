"use client";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Menu, X, Home, Inbox, RefreshCcw, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect current mode based on URL path
  const mode = pathname.startsWith("/dashboard/admin") ? "admin" : "user";

  // Get user_id from query (or default to 1)
  const userId = searchParams.get("user_id") || "1";
  // Admin-only links
  const adminLinks = [
    { name: "Home", href: "/dashboard/admin", icon: "Home" },
    { name: "History", href: "/dashboard/admin/history", icon: "History" },
  ];

  // User-only links
  const userLinks = [
    { name: "Home", href: "/dashboard/user", icon: "History" },
    {
      name: "History",
      href: `/dashboard/user/history?user_id=${userId}`,
      icon: "Inbox",
    },
  ];

  // Switch between admin and user dashboard
  const handleSwitch = () => {
    router.push(
      mode === "admin"
        ? `/dashboard/user?user_id=${userId}`
        : "/dashboard/admin"
    );
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button - Fixed at top */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-60 bg-white px-6 py-10 
          flex flex-col justify-between 
          border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div>
          {/* Header title */}
          <h1 className="text-lg font-semibold mb-6">
            {mode === "admin" ? "Admin" : "User"}
          </h1>

          {/* Render links based on mode */}
          <ul className="space-y-2 mt-8">
            {(mode === "admin" ? adminLinks : userLinks).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex flex-row items-center gap-2 p-2 rounded transition ${
                    pathname === link.href
                      ? "bg-[#EAF5FA] text-black"
                      : "hover:bg-[#EAF5FA] text-gray-500"
                  }`}
                >
                  {link.icon === "Home" ? (
                    <Home className="w-5 h-5" />
                  ) : link.icon === "History" ? (
                    <Inbox className="w-5 h-5" />
                  ) : null}
                  <p className="text-md">{link.name}</p>
                </Link>
              </li>
            ))}
          </ul>

          {/* Switch Mode Button */}
          <button
            onClick={handleSwitch}
            className="mt-8 w-full bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm text-gray-200 transition-colors flex flex-row gap-2 items-center justify-center"
          >
            <RefreshCcw className="w-5" />
            Switch to {mode === "admin" ? "User" : "Admin"}
          </button>
        </div>

        <button className="text-gray-700 hover:text-gray-900 text-left transition-colors flex flex-row gap-2 items-center">
          <LogOut />
          Logout
        </button>
      </aside>
    </>
  );
}
