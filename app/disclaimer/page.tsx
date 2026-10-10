import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

import LegalPage from "@/components/legal/LegalPage";
import { DISCLAIMER_SECTIONS } from "@/components/legal/legalData";

export const metadata: Metadata = pageMeta({
  title: "Disclaimer",
  description:
    "Important information about the content on the BH Ventures FZE LLC website, including cryptocurrency, cloud-mining and Web3 risks.",
  path: "/disclaimer/",
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Disclaimer"
      intro="Please read this before relying on any information on this website, especially about cryptocurrency, cloud mining and digital assets."
      sections={DISCLAIMER_SECTIONS}
    />
  );
}
