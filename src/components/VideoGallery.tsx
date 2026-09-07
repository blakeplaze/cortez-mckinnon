"use client";

import Image from "next/image";
import { useState } from "react";
import { videos, youtubeThumb, type Video } from "@/lib/videos";

export function VideoGallery({ limit }: { limit?: number }) {
  const list = limit ? videos.slice(0, limit) : videos;
  const [active, setActive] = useState<Video | null>(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActive(video)}
            className="card-hover group overflow-hidden border border-ice/15 bg-white/2 text-left"
          >
            <div className="relative aspect-video overflow-hidden bg-black">
              <Image
                src={youtubeThumb(video.id)}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-sm bg-ice px-4 py-2 text-[0.65rem] font-semibold tracking-[0.16em] text-ink uppercase">
                  Play
                </span>
              </span>
            </div>
            <p className="px-3 py-3 text-sm">{video.title}</p>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/80"
            aria-label="Close video"
            onClick={() => setActive(null)}
          />
          <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3">
              <p className="truncate pr-4 text-sm">{active.title}</p>
              <button type="button" className="text-xs tracking-[0.16em] uppercase" onClick={() => setActive(null)}>
                Close
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                title={active.title}
                src={`https://www.youtube.com/embed/${active.id}?autoplay=1`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
