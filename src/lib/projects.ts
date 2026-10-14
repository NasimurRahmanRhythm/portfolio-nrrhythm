export type Project = {
  slug: string;
  title: string;
  /** Short name used on cards and in the "next project" link. */
  name: string;
  tagline: string;
  summary: string;
  year?: string;
  role: string;
  /** Who the work was for, e.g. the company it was built at. */
  context?: string;
  /** Shown instead of links when the work cannot be shared publicly. */
  private?: boolean;
  tech: string[];
  highlights?: { title: string; body: string }[];
  links: { live?: string; source?: string; extra?: { label: string; href: string }[] };
  cover?: string;
  /** Large showcase on the home page; the rest go in the compact list. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "kriya-ai",
    name: "Kriya AI",
    title: "Kriya AI: AI Marketing Co-pilot",
    tagline: "A brand's identity, turned into a content engine.",
    summary:
      "A multi-tenant SaaS that turns a Brand Kit into a full content operation: it plans multi-week calendars, writes captions in Bengali, Banglish or English, generates images, carousels and short vertical videos with Gemini and Veo, publishes them to five social platforms on schedule, and measures what works.",
    year: "Ongoing",
    role: "Software Engineer",
    context: "ShellBeeHaken",
    private: true,
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Supabase",
      "Vertex AI (Gemini, Veo)",
      "LangChain / LangGraph",
      "Zod",
      "Recharts",
      "AWS Elastic Beanstalk",
    ],
    links: {},
    featured: true,
  },
  {
    slug: "integrity-360",
    name: "Integrity 360°",
    title: "Integrity 360°: 3D Agency Website",
    tagline: "Scroll-built 3D rooms, stalls and stages for an events and interiors agency.",
    summary:
      "Website for a Dhaka-based 360° agency covering events, exhibition stalls, interiors and brand work. The spaces they build are rebuilt in real time with React Three Fiber: rooms, stalls and stages assemble piece by piece as you scroll, wrapped in an editorial layout with smooth scrolling and split-text motion.",
    year: "2026",
    role: "Design & Development",
    tech: ["Next.js", "React Three Fiber", "Three.js", "GSAP", "Lenis", "Motion", "Tailwind CSS"],
    highlights: [
      {
        title: "Procedural 3D scenes",
        body: "Rooms, exhibition stalls and stages are modelled in code with React Three Fiber and drei, then assembled piece by piece as the visitor scrolls, with lamps and lights fading in on cue.",
      },
      {
        title: "Scroll-driven storytelling",
        body: "GSAP ScrollTrigger and Lenis drive a sticky hero where photo panels spread in 3D behind drifting headlines, plus a service wheel, project browser and process timeline.",
      },
      {
        title: "Performance by design",
        body: "Every canvas renders only while it is on screen, scenes load lazily with dynamic imports, and walls that would block the camera hide themselves as the room turns.",
      },
      {
        title: "Editorial system",
        body: "A 6/12-column grid, Bodoni and Instrument Serif type scale, preloader with a ready signal, custom cursor and split-character title reveals.",
      },
    ],
    links: { source: "https://github.com/NasimurRahmanRhythm/interior-design" },
    cover: "/projects/integrity-360.jpg",
    featured: true,
  },
  {
    slug: "gallery-hamiduzzaman",
    name: "Gallery Hamiduzzaman",
    title: "Gallery Hamiduzzaman: Art Gallery & E-commerce",
    tagline: "Sculpture, drawing and public art, sold online with SSLCommerz.",
    summary:
      "A gallery website and online store for a circle of Bangladeshi sculptors and artists. Visitors browse artists, artworks, exhibitions and press, then buy through a cart and SSLCommerz checkout. Staff run everything from a full admin CMS.",
    year: "2026",
    role: "Full-stack Development",
    tech: ["Next.js", "Supabase", "PostgreSQL + RLS", "SSLCommerz", "GSAP", "Lenis", "Quill"],
    highlights: [
      {
        title: "SSLCommerz payments",
        body: "Cart, checkout and the full payment lifecycle: success, fail, cancel and server-to-server IPN routes, with orders settled only after the gateway validates the transaction.",
      },
      {
        title: "Orders and invoices",
        body: "Customers verify their email with a one-time code at sign-up, track their orders and download PDF invoices generated on the server. Admins sign in with an emailed OTP.",
      },
      {
        title: "Secure by default",
        body: "Supabase row-level security enforces that customers can only read their own orders; the service-role client is confined to a single, clearly marked admin reader.",
      },
      {
        title: "Admin CMS",
        body: "Staff manage artists, artworks, exhibitions, collaborations, press, blog posts, governing body, enquiries and orders, with rich-text editing and image and video uploads.",
      },
    ],
    links: { source: "https://github.com/NasimurRahmanRhythm/bengal-art-house" },
    cover: "/projects/gallery-hamiduzzaman.jpg",
    featured: true,
  },
  {
    slug: "vip-motors",
    name: "VIP Motors",
    title: "VIP Motors: Luxury Car Dealership",
    tagline: "A dealership site with a walk-through 360° showroom.",
    summary:
      "Website for a luxury and exotic car dealership: inventory with categories and comparison, test-drive and appointment booking, dealership maps, news and gallery, plus a 360° virtual showroom tour. A Supabase-backed admin runs the whole catalogue.",
    year: "2026",
    role: "Full-stack Development",
    tech: ["Next.js", "Supabase", "Server Actions", "Leaflet", "Framer Motion", "GSAP", "Quill"],
    highlights: [
      {
        title: "360° virtual showroom",
        body: "A panorama tour viewer with linked scenes and hotspots. Admins build the tour themselves: upload panoramas, place hotspots and link scenes in a visual editor.",
      },
      {
        title: "Upload checks that matter",
        body: "Panoramas must be equirectangular. The shape is validated in the browser for instant feedback and again in the server action, which is the authoritative check.",
      },
      {
        title: "Inventory and booking",
        body: "Category pages, side-by-side car comparison, test-drive and appointment booking with an admin queue, and dealership locations on Leaflet maps.",
      },
      {
        title: "SEO built in",
        body: "Generated sitemap, robots rules and Open Graph images, with typed data models for cars, news, gallery and appointments.",
      },
    ],
    links: { source: "https://github.com/NasimurRahmanRhythm/car-site" },
    cover: "/projects/vip-motors.jpg",
    featured: true,
  },
  {
    slug: "dermasoul",
    name: "DermaSoul",
    title: "DermaSoul: Clinic Website & Practice Console",
    tagline: "A boutique dermatology clinic, from first enquiry to printed prescription.",
    summary:
      "A public website for a dermatology clinic together with the console the clinic runs on. Reception, nurse, doctor and owner each get their own desk, and a visit moves between them in real time, ending with a printable prescription.",
    year: "2026",
    role: "Full-stack Development",
    tech: ["Next.js", "Supabase", "Realtime", "Zod", "GSAP", "Lenis", "Motion"],
    highlights: [
      {
        title: "Role-based desks",
        body: "Separate workspaces for reception, nurse, doctor and owner. Patients, visits, payments, staff, enquiries and website content each live where the role needs them.",
      },
      {
        title: "Real-time hand-offs",
        body: "Desk notifications arrive over Supabase Realtime as a visit moves through the clinic, with a polling backstop in case the websocket silently drops.",
      },
      {
        title: "Clinical tools",
        body: "A prescription pad, patient history, visit search and visit summaries, with prescriptions laid out for printing.",
      },
      {
        title: "Animated public site",
        body: "Treatments, packages, results, team, products and an enquiry flow, with smooth scrolling, split-text reveals and magnetic interactions.",
      },
    ],
    links: { source: "https://github.com/NasimurRahmanRhythm/skin-doctor-project" },
    cover: "/projects/dermasoul.jpg",
    featured: true,
  },
  {
    slug: "fam",
    name: "FAM",
    title: "FAM: AI-Powered Nutrition & Learning Platform",
    tagline: "Nutrition and learning, with RAG chatbots and subscriptions.",
    summary:
      "A full-stack nutrition and learning platform featuring AI-powered RAG chatbots, Stripe subscriptions, and AWS Lambda-driven event notifications.",
    role: "Software Engineer",
    context: "ShellBeeHaken",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "AWS Lambda"],
    links: {},
  },
  {
    slug: "kriyakarak",
    name: "Kriyakarak",
    title: "Kriyakarak: Service Marketplace Platform",
    tagline: "Connecting people with service providers across Bangladesh.",
    summary:
      "A service marketplace platform connecting users across Bangladesh, featuring real-time messaging with Socket.IO and optimized REST APIs.",
    role: "Software Engineer",
    context: "ShellBeeHaken",
    tech: ["Next.js", "Node.js", "MongoDB", "Socket.IO"],
    links: { live: "https://kriyakarak.com/" },
  },
  {
    slug: "honnemiru",
    name: "Honnemiru",
    title: "Honnemiru: Japanese Video-Based Survey Platform",
    tagline: "Video surveys for the Japanese market.",
    summary:
      "A Japanese video-based survey platform with advanced survey creation, filtering, and optimized GraphQL-powered backend workflows.",
    role: "Software Engineer",
    context: "ShellBeeHaken",
    tech: ["Next.js", "TypeScript", "GraphQL"],
    links: { live: "https://shellbeehaken.com/portfolio/5" },
  },
  {
    slug: "mapage",
    name: "Mapage",
    title: "Mapage: Salon Management Platform",
    tagline: "Running a salon from one dashboard.",
    summary:
      "A comprehensive salon management dashboard featuring job and notification modules, administrative workflows, and streamlined communication.",
    role: "Software Engineer",
    context: "ShellBeeHaken",
    tech: ["React", "Node.js", "MongoDB"],
    links: { live: "https://introduction.mapage.net/" },
  },
  {
    slug: "football-training",
    name: "Football Training App",
    title: "Football Training App: PWA & Mobile",
    tagline: "Training sessions, players and performance, on web and mobile.",
    summary:
      "An installable PWA and an Expo React Native app for football academies: organisations, coaches and players, training sessions and player performance, with JWT auth, email and Cloudinary media.",
    year: "2026",
    role: "Full-stack & Mobile Development",
    tech: ["Next.js PWA", "React Native (Expo)", "MongoDB", "JWT", "Cloudinary"],
    links: {
      source: "https://github.com/NasimurRahmanRhythm/football-training-app",
      extra: [{ label: "Mobile app source", href: "https://github.com/NasimurRahmanRhythm/football-training-app-native" }],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
