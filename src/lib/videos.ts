export type Video = {
  id: string;
  title: string;
};

export const videos: Video[] = [
  {
    id: "cisl0_VdnD0",
    title: "Puddle — Official Music Video",
  },
  {
    id: "0FRGeJnBP3s",
    title: "Out This Club feat. Lex",
  },
  {
    id: "OFxCF5AzGgc",
    title: "Rights From Wrong (Intro)",
  },
  {
    id: "0VQQ0pmDnN4",
    title: "Bonni & Clyde",
  },
  {
    id: "Xxnz2oiNz8A",
    title: "Magic Sh!t feat. J.Rich",
  },
  {
    id: "qS4Mb758wqs",
    title: "Heartfelt",
  },
  {
    id: "OYzOh9156VY",
    title: "I Might",
  },
  {
    id: "DqA8umlItyU",
    title: "Business feat. Treydoe",
  },
];

export function youtubeThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function youtubeWatch(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}
