"use client";

import { useState } from "react";
import type { ProjectMedia } from "@/data/projects";

function youtubeEmbedUrl(id: string) {
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
}

export default function ProjectMediaBlock({ media }: { media: ProjectMedia }) {
  const primary = media.videos.find((v) => v.primary) ?? media.videos[0];
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="mt-4 space-y-4">
      {primary && (
        <div className="rounded-lg overflow-hidden border border-cyan-900/40 bg-black/40 aspect-video">
          <iframe
            src={youtubeEmbedUrl(primary.id)}
            title={primary.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )}

      {media.images.length > 0 && (
        <div className="space-y-2">
          <div className="rounded-lg overflow-hidden border border-cyan-900/30 aspect-video max-h-56">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={media.images[activeImage]?.src}
              alt={media.images[activeImage]?.alt ?? "Project"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {media.images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`shrink-0 w-16 h-12 rounded overflow-hidden border transition-colors ${
                  i === activeImage ? "border-cyan-400" : "border-slate-700 opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {media.videos.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {media.videos.map((v) => (
            <a
              key={v.id}
              href={`https://youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tag hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
            >
              ▶ {v.title}
            </a>
          ))}
        </div>
      )}

      {media.docLink && (
        <a
          href={media.docLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-cyan-400/90 hover:text-cyan-300 inline-block"
        >
          Full documentation on GitHub →
        </a>
      )}
    </div>
  );
}
