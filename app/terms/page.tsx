import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

import LegalPage from "@/components/legal/LegalPage";
import { TERMS_SECTIONS } from "@/components/legal/legalData";

export const metadata: Metadata = pageMeta({
  title: "Terms & Conditions",
  description:
    "The terms that apply when you use the BH Ventures FZE LLC website, including acceptable use, intellectual property and governing law.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="The rules for using this website. Services themselves are provided only under a separate written agreement or final offer."
      sections={TERMS_SECTIONS}
    />
  );
}
