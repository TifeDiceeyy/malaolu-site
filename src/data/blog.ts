export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  images: { src: string; alt: string; w: number; h: number }[];
};

export const posts: BlogPost[] = [
  {
    slug: "suavee-ss-2026",
    title: "Behind the Collection: Suavee S/S 2026",
    category: "Studio",
    date: "2026-04-10",
    excerpt:
      "A look at the process behind Suavee's Spring/Summer 2026 collection — from initial concept sketches to the final editorial shoot.",
    images: [
      {
        src: "/assets/blog/IMG_4575.jpg",
        alt: "Suavee S/S 2026 editorial",
        w: 3780,
        h: 6720,
      },
      {
        src: "/assets/blog/IMG_4578.jpg",
        alt: "Suavee S/S 2026 campaign",
        w: 3780,
        h: 6720,
      },
    ],
  },
  {
    slug: "art-direction-notes",
    title: "Art Direction Notes: What Makes a Strong Campaign",
    category: "Process",
    date: "2026-06-22",
    excerpt:
      "Strong campaign creative isn't about budget — it's about conviction, cohesion, and the clarity of a single decisive idea.",
    images: [
      {
        src: "/assets/blog/IMG_1697.jpg",
        alt: "Art direction — campaign study",
        w: 3830,
        h: 4957,
      },
      {
        src: "/assets/blog/IMG_7745.jpg",
        alt: "Art direction — set detail",
        w: 3586,
        h: 4641,
      },
    ],
  },
  {
    slug: "styling-garment-space",
    title: "On Styling: The Relationship Between Garment and Space",
    category: "Craft",
    date: "2026-08-15",
    excerpt:
      "Styling is environmental. The way a piece sits against a background, a texture, a body — that relationship defines everything.",
    images: [
      {
        src: "/assets/blog/IMG_2910.jpg",
        alt: "Styling — garment and environment",
        w: 3628,
        h: 4695,
      },
      {
        src: "/assets/blog/IMG_9060.jpg",
        alt: "Styling — editorial portrait",
        w: 2400,
        h: 3600,
      },
    ],
  },
  {
    slug: "building-suavee-from-cyprus",
    title: "Building a Fashion Label From Cyprus",
    category: "Story",
    date: "2023-09-01",
    excerpt:
      "How Suavee came to life — the early days, the decisions made far from the fashion capitals, and what it taught me about creative independence.",
    images: [
      {
        src: "/assets/blog/IMG_8108.jpg",
        alt: "Suavee — founding era",
        w: 1080,
        h: 1920,
      },
      {
        src: "/assets/blog/IMG_9014.jpg",
        alt: "Suavee — Cyprus studio",
        w: 1080,
        h: 1920,
      },
      {
        src: "/assets/blog/IMG_9062.jpg",
        alt: "Suavee — early work",
        w: 1080,
        h: 1920,
      },
    ],
  },
];

// Flat list of all images with their post context for the masonry feed
export type FeedImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
};

export const feedImages: FeedImage[] = posts.flatMap((p) =>
  p.images.map((img) => ({
    ...img,
    slug: p.slug,
    title: p.title,
    category: p.category,
    excerpt: p.excerpt,
  })),
);
