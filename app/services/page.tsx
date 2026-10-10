// app/services/cloud-mining/page.tsx
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import CloudMining from "@/components/service/service";

export const metadata: Metadata = pageMeta({
  title: "Cloud Mining",
  description:
    "Rent mining hashrate without buying or managing hardware. Compare BH Ventures cloud mining plans, fees and contract terms.",
  path: "/services/",
});

export default function CloudMiningPage() {
  return (
    <main className="w-full min-w-0 min-h-screen bg-[#0a1a2c] overflow-x-clip">
      <CloudMining />
    </main>
  );
}