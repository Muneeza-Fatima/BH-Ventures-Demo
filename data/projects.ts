export type ProjectStatus =
  | "ACTIVE"
  | "IN DEVELOPMENT"
  | "EXPLORING";

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

  // Live project URL
  liveUrl?: string;

  // Technologies / tools
  tech: string[];

  sections: ProjectSection[];
  takeaways: string[];
};

export const projects: Project[] = [

  // =====================================================
  // 01 — MEDIRAG
  // =====================================================

  {
    slug: "medirag",
    number: "01",

    title: "MediRAG",

    category: "Artificial Intelligence",

    description:
      "An AI-powered RAG platform that transforms medical documents into a searchable, citation-backed knowledge system.",

    image:
      "https://images.pexels.com/photos/39192372/pexels-photo-39192372.jpeg",

    status: "ACTIVE",

    location: "Dubai, UAE",

    tech: [
      "FastAPI",
      "LangChain",
      "Gemini",
      "HuggingFace",
      "ChromaDB",
      "Streamlit",
    ],

    sections: [
      {
        heading: "The opportunity",

        text:
          "Medical information is often distributed across large documents, making it difficult to quickly locate reliable information. MediRAG explores how artificial intelligence and retrieval-augmented generation can make medical knowledge easier to search, understand and verify.",
      },

      {
        heading: "The approach",

        text:
          "The platform combines semantic retrieval, conversational AI and document-level source references. Instead of returning information without context, the system connects generated answers back to relevant source material so users can explore where the information came from.",
      },

      {
        heading: "Looking ahead",

        text:
          "MediRAG is designed as a foundation for more accessible and traceable AI-assisted knowledge retrieval, with opportunities to expand its document understanding, retrieval capabilities and user experience.",
      },
    ],

    takeaways: [
      "AI-powered medical knowledge retrieval",
      "Retrieval-augmented generation",
      "Citation-backed responses",
      "Semantic document search",
      "Conversational AI",
      "Source verification",
    ],
  },


  // =====================================================
  // 02 — CYBERISAI
  // =====================================================

  {
    slug: "cyberisai",
    number: "02",

    title: "CyberisAI",

    category: "Artificial Intelligence & Computer Vision",

    description:
      "An AI-powered computer vision platform designed to enhance CCTV monitoring through automated detection of security-related events.",

    image:
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1600&q=85",

    status: "IN DEVELOPMENT",

    location: "Dubai, UAE",

    tech: [
      "YOLOv11",
      "MediaPipe",
      "LSTM",
      "FastAPI",
      "React",
      "PostgreSQL",
      "OpenCV",
    ],

    sections: [
      {
        heading: "The opportunity",

        text:
          "Traditional CCTV monitoring can require people to continuously observe large amounts of video footage. CyberisAI explores how computer vision and machine learning can assist monitoring by automatically identifying potentially important events.",
      },

      {
        heading: "The approach",

        text:
          "The platform combines YOLOv11 object detection, MediaPipe pose analysis and LSTM-based temporal modelling. These technologies work together to analyse visual information and identify events such as fights, fire, smoke, weapons and other abnormal activity.",
      },

      {
        heading: "Looking ahead",

        text:
          "The project is designed around a centralized web dashboard where detected events and alerts can be presented in a structured way, creating a foundation for faster review and more organized video monitoring workflows.",
      },
    ],

    takeaways: [
      "AI-powered CCTV analysis",
      "Real-time computer vision",
      "YOLOv11 object detection",
      "Pose and activity analysis",
      "LSTM temporal modelling",
      "Centralized alert dashboard",
    ],
  },


  // =====================================================
  // 03 — VECTORCRAFT STUDIO
  // =====================================================

  {
    slug: "vectorcraft-studio",
    number: "03",

    title: "VectorCraft Studio",

    category: "Digital Agency & Web Development",

    description:
      "A modern digital studio website created to showcase technology, software engineering, UI/UX, AI, cloud and digital product services.",

    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",

    status: "ACTIVE",

    location: "Global",

    liveUrl:
      "https://vector-craft-mu.vercel.app/",

    tech: [
      "React",
      "Tailwind CSS",
      "JavaScript",
      "Vite",
    ],

    sections: [
      {
        heading: "The opportunity",

        text:
          "Digital agencies need more than a simple company website. Their online presence has to communicate technical capability, creative direction, services, case studies and credibility while remaining easy to navigate.",
      },

      {
        heading: "The approach",

        text:
          "VectorCraft Studio brings strategy, design and engineering into one digital experience. The website includes service sections, case studies, team information, pricing, insights and a structured contact experience.",
      },

      {
        heading: "Looking ahead",

        text:
          "The platform provides a flexible foundation for presenting digital products and services while allowing new projects, case studies and capabilities to be added as the studio grows.",
      },
    ],

    takeaways: [
      "Modern digital agency experience",
      "Technology and software engineering showcase",
      "UI/UX and product design presentation",
      "AI and cloud service positioning",
      "Case study structure",
      "Responsive web experience",
    ],
  },


  // =====================================================
  // 04 — ENGLISH TEA HOUSE
  // =====================================================

  {
    slug: "english-tea-house",
    number: "04",

    title: "English Tea House",

    category: "Web Experience",

    description:
      "A polished restaurant and hospitality website designed around reservations, ordering and an elegant tea-house experience.",

    image:
      "https://images.pexels.com/photos/34104122/pexels-photo-34104122.png",

    status: "ACTIVE",

    location: "Digital Experience",

    liveUrl:
      "https://tea-house-website-2jng.vercel.app/",

    tech: [
      "Web Design",
      "Responsive UI",
      "JavaScript",
      "Interactive Experience",
    ],

    sections: [
      {
        heading: "The opportunity",

        text:
          "Hospitality websites need to communicate atmosphere while also making practical actions such as exploring the menu, ordering and making reservations simple for visitors.",
      },

      {
        heading: "The approach",

        text:
          "English Tea House is designed as a dedicated digital experience for a tea-house brand, combining visual storytelling with clear navigation and customer-focused interactions.",
      },

      {
        heading: "Looking ahead",

        text:
          "The website provides a flexible foundation for presenting menus, reservations, ordering experiences and other hospitality services through a cohesive digital interface.",
      },
    ],

    takeaways: [
      "Restaurant and hospitality website",
      "Elegant visual presentation",
      "Reservation-focused experience",
      "Online ordering experience",
      "Responsive interface",
      "Customer-focused navigation",
    ],
  },
];


// =====================================================
// FIND PROJECT
// =====================================================

export function getProjectBySlug(
  slug: string
): Project | undefined {
  return projects.find(
    (project) => project.slug === slug
  );
}