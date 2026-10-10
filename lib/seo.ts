import type { Metadata } from "next";

/* =========================================================
   SEO — shared site facts and a per-page metadata helper
   SITE_URL comes from NEXT_PUBLIC_SITE_URL when set (e.g. on a
   staging host); otherwise the production domain is used.
   ========================================================= */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://bhventures.ae").replace(/\/+$/, "");

export const SITE_NAME = "BH Ventures FZE LLC";

export const SITE_DESCRIPTION =
  "BH Ventures FZE LLC is a Dubai free-zone venture platform bridging international trade, technology, data, marketing and innovation from the UAE.";

export const DEFAULT_OG_IMAGE = "/images/about/story/story-foundation.jpg";

export const ORG = {
  email: "info@bhventures.ae",
  phone: "+971559466820",
  logo: "/images/bh-ventures-logo.jpeg",
  founder: "Badar Ul Haq",
  sameAs: ["https://wa.me/971559466820", "https://t.me/bderr_04"],
};

/** Trim a description to search-result length on a word boundary. */
export function clip(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:\s]+$/, "")}…`;
}

/** Absolute URL for a site path or an already-absolute URL. */
export function absUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${encodeURI(pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`)}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path with trailing slash, e.g. "/about/" (matches trailingSlash: true). */
  path: string;
  image?: string;
  type?: "website" | "article";
};

/**
 * Full metadata for one page: title, description, canonical URL, and
 * Open Graph / Twitter cards. openGraph is set in full on every page
 * because a child segment's openGraph replaces the parent's entirely.
 */
export function pageMeta({ title, description, path, image, type = "website" }: PageMetaInput): Metadata {
  const desc = clip(description);
  const img = absUrl(image || DEFAULT_OG_IMAGE);
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;

  return {
    title: path === "/" ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      locale: "en_AE",
      title: fullTitle,
      description: desc,
      images: [{ url: img, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [img],
    },
  };
}

/** Serialize JSON-LD safely for a <script type="application/ld+json">. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
