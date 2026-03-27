"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/workout", label: "Train" },
  { href: "/conditioning", label: "Conditioning" },
  { href: "/progress", label: "Progress" },
  { href: "/settings", label: "Settings" }
];

export default function NavTabs() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2">
        {tabs.map(tab => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 text-center text-xs ${
                active ? "text-accent" : "text-textSoft"
              }`}
            >
              <div
                className={`mx-auto rounded-full px-3 py-1 ${
                  active ? "bg-slate-800" : ""
                }`}
              >
                {tab.label}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
