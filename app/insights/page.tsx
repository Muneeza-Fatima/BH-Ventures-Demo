// app/insights/page.tsx
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Insights from "@/components/insight/insights";

export const metadata: Metadata = pageMeta({
  title: "Insights",
  description:
    "Short notes from the trade, technology and growth teams at BH Ventures in Dubai.",
  path: "/insights/",
});

export default function InsightsPage() {
  return (
    <main className="w-full min-w-0 min-h-screen bg-[#0a1a2c] overflow-x-clip">
      <Insights />
    </main>
  );
}