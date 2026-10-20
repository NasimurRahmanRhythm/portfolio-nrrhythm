export const site = {
  url: "https://portfolio-nrrhythm.vercel.app",
  name: "Md. Nasimur Rahman",
  role: "Software Engineer",
  location: "Dhaka, Bangladesh",
  email: "rhythm4538@gmail.com",
  resume: "/assets/resume.pdf",
  title: "Md. Nasimur Rahman | Software Engineer",
  description:
    "Software Engineer at ShellBeeHaken building full-stack products with React, Next.js and Node.js: brand-aware GenAI content pipelines, payments, real-time systems and scroll-driven 3D web experiences.",
};

export const socials = [
  { name: "GitHub", href: "https://github.com/NasimurRahmanRhythm" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/md-nasimur-rahman-rhythm/" },
];

// In-page anchors on the home page, full links everywhere else.
export const sectionHref = (pathname: string, hash: string) => (pathname === "/" ? hash : `/${hash}`);

export const nav = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];
