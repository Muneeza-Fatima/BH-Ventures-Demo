import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";

import LegalPage from "@/components/legal/LegalPage";
import { PRIVACY_SECTIONS } from "@/components/legal/legalData";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How BH Ventures FZE LLC handles the personal information you share through our website, contact form, chat assistant and messaging channels.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="What information we receive through this website, how we use it, who helps us process it and the choices you have."
      sections={PRIVACY_SECTIONS}
    />
  );
}
