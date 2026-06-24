export const site = {
  name: "Malaolu Abdulrazak",
  fullName: "Abdulrazak Olaide Malaolu",
  role: "Creative Director • Art Director • Stylist",
  email: "olaideabdulrazak5@gmail.com",
  copyright: "© 2026 Abdulrazak Olaide Malaolu. All Rights Reserved.",
  nav: [
    { label: "Home", to: "/" },
    { label: "Work", href: "/assets/Abdulrazak_Portfolio.pdf", external: true },
    { label: "Suavee", href: "https://www.suaveestudios.com/", external: true },
    { label: "About", to: "/about" },
  ],
  socials: [
    { label: "Email", href: "mailto:olaideabdulrazak5@gmail.com" },
    { label: "Instagram", href: "" }, // TODO(owner): handle
    { label: "X", href: "" }, // TODO(owner): handle
    { label: "TikTok", href: "" }, // TODO(owner): handle
  ],
} as const;
