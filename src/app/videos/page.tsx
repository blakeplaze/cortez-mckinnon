import { VideoGallery } from "@/components/VideoGallery";

export const metadata = {
  title: "Videos | Tezz McKinnon est. 1996",
};

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-[0.72rem] tracking-[0.24em] text-muted uppercase">Visuals</p>
      <h1 className="display mt-2 text-6xl sm:text-7xl">Latest videos</h1>
      <p className="mt-4 max-w-xl text-sm text-cream/70">
        Official videos from Cortez McKinnon. Click one to play. Full catalog is
        on YouTube.
      </p>
      <div className="mt-12">
        <VideoGallery />
      </div>
      <a
        href="https://www.youtube.com/c/CortezMckinnon"
        target="_blank"
        rel="noreferrer"
        className="btn btn-ghost mt-10"
      >
        YouTube channel
      </a>
    </div>
  );
}
