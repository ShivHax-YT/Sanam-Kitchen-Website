import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageShell } from "@/components/layout/page-shell";
import { SectionHeader } from "@/components/sections/section-header";
import { VideoCard } from "@/components/videos/video-card";
import { getLatestVideos, getVideosByPlaylist } from "@/lib/youtube";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Videos | Sanam's Kitchen",
  description: "Watch Sanam's Kitchen videos by playlist and category.",
};

export default async function VideosPage() {
  const latest = await getLatestVideos();
  const playlistEntries = await Promise.all(
    Object.entries(siteConfig.playlists).map(async ([key, playlistId]) => {
      const videos = await getVideosByPlaylist(playlistId);
      return { key, playlistId, videos };
    })
  );

  return (
    <div className="section-padding">
      <PageShell>
        <SectionHeader title="Videos" eyebrow="Streaming" />
        <Tabs defaultValue="all" className="mt-6">
          <TabsList>
            <TabsTrigger value="all">Latest</TabsTrigger>
            {playlistEntries.map((entry) => (
              <TabsTrigger key={entry.key} value={entry.key}>
                {entry.key.charAt(0).toUpperCase() + entry.key.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="all">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>
          {playlistEntries.map((entry) => (
            <TabsContent key={entry.key} value={entry.key}>
              {entry.videos.length === 0 ? (
                <p className="text-slate-600">No videos yet in this playlist.</p>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {entry.videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </PageShell>
    </div>
  );
}
