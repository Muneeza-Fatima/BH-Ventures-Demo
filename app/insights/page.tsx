// app/insights/page.tsx
import type { Metadata } from "next";
import Insights from "@/components/insight/insights";

export const metadata: Metadata = {
  title: "Insights | BH Ventures",
  description:
    "Short notes from the trade, technology and growth teams at BH Ventures in Dubai.",
};

export default function InsightsPage() {
  return (
    <main className="w-full min-w-0 min-h-screen bg-[#0a1a2c] overflow-x-clip">
      <Insights />
    </main>
  );
}