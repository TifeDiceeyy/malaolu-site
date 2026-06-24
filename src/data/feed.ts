export type FeedBlock =
  | {
      type: "images";
      items: { src: string; alt: string; w: number; h: number }[];
      caption?: string;
      href?: string;
    }
  | { type: "youtube"; id: string; loop?: boolean; caption?: string }
  | { type: "spotify"; playlistId: string; caption?: string }
  | { type: "soundcloud"; trackUrl: string; caption?: string }
  | { type: "quote"; text: string };

// TODO(owner): real Suavee imagery (Petalos cards, editorials, beanies, caps, etc.)
// { type:"images", items:[{src:"/img/petalos.jpg",alt:"Petalos Playing Cards",w:1000,h:1400}],
//   caption:"Petalos Playing Cards — Suavee Studios, S/S 2025." },
export const feed: FeedBlock[] = [];
