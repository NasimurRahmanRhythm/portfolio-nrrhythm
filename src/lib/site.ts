export const site = {
  name: "Md. Nasimur Rahman",
  short: "Rhythm",
  role: "Software Engineer",
  location: "Dhaka, Bangladesh",
  timeZone: "Asia/Dhaka",
  email: "rhythm4538@gmail.com",
  resume: "/assets/resume.pdf",
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
