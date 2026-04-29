import { Dashboard } from "@/components/shared/ProtectedRoute";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Habit Tracker",
  description: "Manage habits, mark today complete, and view current streaks.",
  openGraph: {
    title: "Dashboard — Habit Tracker",
    description: "Manage your local daily habits and streaks.",
  },
};

export default function DashboardPage() {
  return <Dashboard />;
}