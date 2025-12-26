import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { Video } from "@/lib/youtube";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-smooth">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 320px, 100vw"
        />
        {video.duration && (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white">
            {video.duration}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col space-y-2 px-5 py-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{formatDate(video.publishedAt)}</p>
        <h3 className="font-semibold text-slate-900">{video.title}</h3>
        <div className="pt-2">
          <Button asChild size="sm" variant="outline">
            <Link href={video.url} target="_blank" rel="noreferrer">Watch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
