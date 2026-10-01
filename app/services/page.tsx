// app/services/cloud-mining/page.tsx
import type { Metadata } from "next";
import CloudMining from "@/components/service/service";

export const metadata: Metadata = {
  title: "Cloud Mining | BH Ventures",
  description:
    "Rent mining hashrate without buying or managing hardware. Compare BH Ventures cloud mining plans, fees and contract terms.",
};

export default function CloudMiningPage() {
  return (
    <main className="w-full min-w-0 min-h-screen bg-[#0a1a2c] overflow-x-clip">
      <CloudMining />
    </main>
  );
}