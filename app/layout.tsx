import "./globals.css";
import type { ReactNode } from "react";
import NavTabs from "./components/NavTabs";

export const metadata = {
  title: "BBM Beginner Tracker",
  description: "Workout tracking app based on Barbell Medicine Beginner Standard"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <main className="app-content">{children}</main>
          <NavTabs />
        </div>
      </body>
    </html>
  );
}
