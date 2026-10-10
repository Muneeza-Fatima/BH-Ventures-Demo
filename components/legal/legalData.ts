/* =========================================================
   LEGAL PAGES — shared company facts and page content
   Used by /privacy, /terms and /disclaimer. Everything here
   describes what the site actually does today; update it if
   a form, integration or service changes.

   freeZone / licenceNo: fill these in once the trade licence
   details are confirmed. While empty, the pages show a line
   saying licence details are available on request.
   ========================================================= */

export type LegalSection = {
  id: string;
  heading: string;
  body: string[];
  list?: string[];
};

export const LEGAL = {
  company: "BH Ventures FZE LLC",
  location: "Dubai, United Arab Emirates",
  freeZone: "",
  licenceNo: "",
  email: "info@bhventures.ae",
  phone: "+971 55 946 6820",
  whatsapp: "https://wa.me/971559466820",
  telegram: "https://t.me/bderr_04",
  telegramHandle: "@bderr_04",
  lastUpdated: "10 October 2026",
};

export const COMPANY_LINE = `${LEGAL.company} is a free-zone company registered in ${LEGAL.location}.`;

/* ---------------------------------------------------------
   PRIVACY POLICY
   --------------------------------------------------------- */

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    body: [
      `${COMPANY_LINE} This policy explains what personal information we receive through this website, why we use it and the choices you have.`,
      `If you have any question about this policy, write to us at ${LEGAL.email}.`,
    ],
  },
  {
    id: "what-we-collect",
    heading: "Information we collect",
    body: [
      "We only receive information that you choose to send us, plus a small amount of technical data needed for the site to work:",
    ],
    list: [
      "Contact form: your name, email address, country, phone number (optional), subject and message. The form opens your own email app, so the message reaches us as a normal email that you send.",
      "Careers: the details and CV you choose to email us when you apply or share your profile.",
      "WhatsApp and Telegram: your name, number or username and the content of any message you send us through these apps.",
      "Newsletter: the email address you send us to subscribe to BH Ventures Signals.",
      "Website assistant (chatbot): the questions you type and the replies shown in the chat window.",
      "Technical data: your language preference, stored in your own browser, and cookies that may be set by the Google Translate tool.",
    ],
  },
  {
    id: "how-we-use",
    heading: "How we use your information",
    body: ["We use your information only to:"],
    list: [
      "reply to your enquiry and discuss a possible project or partnership;",
      "review job applications and contact candidates;",
      "send the newsletter, if you asked to receive it;",
      "answer your questions through the website assistant;",
      "keep the website working, secure and available in your chosen language.",
    ],
  },
  {
    id: "third-parties",
    heading: "Third-party services",
    body: [
      "Some features rely on services provided by other companies, which process data under their own privacy policies:",
    ],
    list: [
      "Google: the website assistant sends your chat messages to Google's Gemini AI service to generate a reply, and the language selector uses Google Translate.",
      "WhatsApp (Meta) and Telegram: when you contact us through these apps.",
      "Your email provider: when you send us an email from the contact form, careers page or newsletter form.",
      "Image hosting: some pictures are loaded from Unsplash and country flags from flagcdn.com, which may receive your IP address when the images load.",
    ],
  },
  {
    id: "sharing",
    heading: "Sharing your information",
    body: [
      "We do not sell your personal information. We share it only with the service providers listed above, or where we are required to do so by law.",
    ],
  },
  {
    id: "retention",
    heading: "How long we keep it",
    body: [
      "We keep enquiries, applications and messages only for as long as we need them for the purpose they were sent, or as required by law. You can ask us to delete your information at any time.",
      "Chat messages sent to the website assistant are not saved in a database by us.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: [
      "In line with the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021) and other laws that apply to us, you may ask to access, correct or delete your personal information, or withdraw a consent you gave, such as your newsletter subscription.",
      `To make a request, email ${LEGAL.email}. We will respond within a reasonable time.`,
    ],
  },
  {
    id: "cookies",
    heading: "Cookies and browser storage",
    body: [
      "We do not use advertising or analytics cookies. The site stores your language choice in your browser so it is remembered on your next visit, and the Google Translate tool may set its own cookies when it is used.",
      "You can clear cookies and stored data at any time from your browser settings.",
    ],
  },
  {
    id: "security",
    heading: "Security",
    body: [
      "We take reasonable steps to protect the information we receive. No method of sending data over the internet is completely secure, so please avoid sending sensitive information, such as passwords or payment details, through the website or chat.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The date at the top of this page shows when it was last changed.",
    ],
  },
];

/* ---------------------------------------------------------
   TERMS & CONDITIONS
   --------------------------------------------------------- */

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of these terms",
    body: [
      `These terms apply to your use of this website, operated by ${LEGAL.company}. ${COMPANY_LINE} By using the website you agree to these terms. If you do not agree, please do not use the site.`,
    ],
  },
  {
    id: "use-of-site",
    heading: "Using the website",
    body: ["You agree to use the website lawfully and not to:"],
    list: [
      "copy, scrape or reproduce its content for commercial use without our written permission;",
      "try to break, overload or gain unauthorised access to the site or its systems;",
      "send false information, impersonate another person or misuse the contact channels.",
    ],
  },
  {
    id: "information-only",
    heading: "Information only, not an offer",
    body: [
      "The content on this website, including service descriptions, prices, packages, calculators, statistics and examples, is provided for general information. It is not an offer, and it does not create a contract.",
      "Any service, including cloud-mining plans, is provided only under a separate written agreement or final offer, which sets out the actual terms, prices and conditions. If anything on the website differs from that agreement, the agreement applies.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    body: [
      `The BH Ventures name, logo, text, design and other original content on this website belong to ${LEGAL.company} and may not be used without our permission. Third-party names, logos and images belong to their respective owners.`,
    ],
  },
  {
    id: "third-party",
    heading: "Third-party links and services",
    body: [
      "The website links to, or works with, services run by others, such as WhatsApp, Telegram, Google and cryptocurrency mining pools. We are not responsible for their content, availability or practices, and your use of them is subject to their own terms.",
    ],
  },
  {
    id: "assistant",
    heading: "Website assistant",
    body: [
      "The chat assistant uses artificial intelligence to answer general questions. Its answers may be incomplete or incorrect, are not binding on us and are not professional advice. Please confirm important details with our team.",
    ],
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: [
      "The website is provided \"as is\". To the extent allowed by law, we are not liable for any loss or damage arising from your use of, or reliance on, the website or its content, including any interruption or error.",
    ],
  },
  {
    id: "indemnity",
    heading: "Indemnity",
    body: [
      "You agree to compensate us for any claim or loss caused by your misuse of the website or your breach of these terms.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: [
      "We may update these terms at any time. The date at the top of this page shows when they were last changed, and continued use of the website means you accept the updated terms.",
    ],
  },
  {
    id: "governing-law",
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai. Any dispute will be handled by the competent courts of Dubai.",
    ],
  },
];

/* ---------------------------------------------------------
   DISCLAIMER
   --------------------------------------------------------- */

export const DISCLAIMER_SECTIONS: LegalSection[] = [
  {
    id: "general",
    heading: "General information",
    body: [
      `The information on this website is published by ${LEGAL.company} for general purposes only. We try to keep it accurate and up to date, but we make no promise that it is complete, current or free of errors, and it may change without notice.`,
    ],
  },
  {
    id: "no-advice",
    heading: "Not financial or professional advice",
    body: [
      "Nothing on this website is financial, investment, legal or tax advice. Please speak to a qualified, independent adviser before making any decision based on it.",
    ],
  },
  {
    id: "crypto-risk",
    heading: "Cryptocurrency and cloud-mining risk",
    body: ["Cloud mining and other cryptocurrency activities carry real risk. In particular:"],
    list: [
      "Bitcoin prices, network difficulty and mining-pool performance change, so rewards can fall and are not guaranteed.",
      "Prices, hashrate figures and calculator results shown on the website are estimates for illustration only.",
      "Uptime figures are targets, confirmed in the final offer, not guarantees.",
      "Past performance does not indicate future results, and you may lose some or all of the money you commit.",
      "Rules on cryptocurrency differ between countries. It is your responsibility to check that taking part is legal where you live.",
    ],
  },
  {
    id: "web3",
    heading: "Web3 and digital assets",
    body: [
      "Our Web3 content describes strategy, technology and advisory services. It is not an offer or invitation to buy, sell or invest in any token, security or digital asset.",
    ],
  },
  {
    id: "figures",
    heading: "Figures and examples",
    body: [
      "Statistics, performance figures (such as marketing return on investment), case examples and projections on this website are illustrations. Actual results depend on many factors and will vary.",
    ],
  },
  {
    id: "third-party-names",
    heading: "Third-party names and logos",
    body: [
      "Names and logos of other companies, platforms and mining pools appear for reference only. Their use does not mean those companies endorse us or have a partnership with us, unless we say so clearly.",
    ],
  },
  {
    id: "assistant",
    heading: "Website assistant",
    body: [
      "Answers from the AI chat assistant are generated automatically and may be wrong. They do not replace a confirmed answer from our team.",
    ],
  },
  {
    id: "external-links",
    heading: "External links",
    body: [
      "Links to other websites are provided for convenience. We do not control those sites and are not responsible for their content.",
    ],
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: [
      "To the extent allowed by law, we are not liable for any loss or damage resulting from the use of, or reliance on, any information on this website.",
    ],
  },
];
