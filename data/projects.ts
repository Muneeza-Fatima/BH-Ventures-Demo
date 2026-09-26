export type ProjectStatus = "ACTIVE" | "IN DEVELOPMENT" | "EXPLORING";

export type ProjectSection = {
  heading: string;
  text: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  status: ProjectStatus;
  location: string;
  sections: ProjectSection[];
  takeaways: string[];
};

export const projects: Project[] = [
  {
    slug: "ai-business-intelligence",
    number: "01",
    title: "AI Business Intelligence",
    category: "Artificial Intelligence",
    description:
      "An intelligent business platform transforming complex data into practical insights and smarter decisions.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85",
    status: "ACTIVE",
    location: "Dubai, UAE",
    sections: [
      {
        heading: "The opportunity",
        text:
          "Businesses generate more information than ever, but turning that information into clear decisions remains a challenge. This project explores how artificial intelligence can simplify complex business data.",
      },
      {
        heading: "The approach",
        text:
          "The platform brings together business intelligence, automated analysis and intuitive reporting so teams can identify patterns, understand performance and act with greater confidence.",
      },
      {
        heading: "Looking ahead",
        text:
          "The concept is designed to evolve with changing business needs, creating a scalable foundation for smarter and more connected decision-making.",
      },
    ],
    takeaways: [
      "AI-powered business intelligence",
      "Automated data analysis",
      "Actionable decision-making",
      "Scalable digital platform",
    ],
  },

  {
    slug: "connected-mobility",
    number: "02",
    title: "Connected Mobility",
    category: "Automotive Technology",
    description:
      "A technology-driven mobility concept connecting vehicles, data and modern digital experiences.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=85",
    status: "IN DEVELOPMENT",
    location: "Dubai, UAE",
    sections: [
      {
        heading: "The opportunity",
        text:
          "Modern mobility is increasingly connected. Vehicles, users and digital services can work together to create more seamless experiences.",
      },
      {
        heading: "The approach",
        text:
          "Connected Mobility explores the relationship between automotive technology, real-time data and digital customer experiences.",
      },
      {
        heading: "Looking ahead",
        text:
          "The initiative is being developed around a flexible technology ecosystem capable of adapting to the next generation of mobility services.",
      },
    ],
    takeaways: [
      "Connected vehicle technology",
      "Real-time data experiences",
      "Digital mobility services",
      "Future-focused automotive innovation",
    ],
  },

  {
    slug: "digital-growth-platform",
    number: "03",
    title: "Digital Growth Platform",
    category: "Digital Transformation",
    description:
      "A scalable digital ecosystem helping businesses connect technology, customers and sustainable growth.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85",
    status: "ACTIVE",
    location: "Dubai, UAE",
    sections: [
      {
        heading: "The opportunity",
        text:
          "Businesses need digital systems that connect internal operations with changing customer expectations and new opportunities.",
      },
      {
        heading: "The approach",
        text:
          "This platform focuses on combining technology, customer experience and business processes into a unified digital ecosystem.",
      },
      {
        heading: "Looking ahead",
        text:
          "The platform is designed to support continued growth while remaining flexible enough to adapt as markets and technologies evolve.",
      },
    ],
    takeaways: [
      "Digital transformation",
      "Connected customer experiences",
      "Scalable technology",
      "Business growth infrastructure",
    ],
  },

  {
    slug: "future-commerce",
    number: "04",
    title: "Future Commerce",
    category: "Innovation",
    description:
      "Exploring new approaches to commerce through technology, data and connected customer experiences.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85",
    status: "EXPLORING",
    location: "Dubai, UAE",
    sections: [
      {
        heading: "The opportunity",
        text:
          "Customer expectations are changing quickly as digital experiences become a central part of modern commerce.",
      },
      {
        heading: "The approach",
        text:
          "Future Commerce explores how data, technology and connected experiences can create more relevant and efficient ways for businesses to engage customers.",
      },
      {
        heading: "Looking ahead",
        text:
          "The project remains open to new technologies, partnerships and business models that could shape the next generation of commerce.",
      },
    ],
    takeaways: [
      "Digital commerce innovation",
      "Connected customer experiences",
      "Data-driven growth",
      "Emerging business models",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}