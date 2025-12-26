import { siteConfig } from "./site-config";
import mockData from "./mock-youtube.json";

export type Video = {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  duration?: string;
  url: string;
  category?: string;
};

const API_BASE = "https://www.googleapis.com/youtube/v3";
const apiKey = process.env.YOUTUBE_API_KEY;

async function fetchJson(url: string) {
  const res = await fetch(url, { next: { revalidate: 60 * 30 } });
  if (!res.ok) throw new Error("Failed to fetch YouTube data");
  return res.json();
}

export async function getLatestVideos(): Promise<Video[]> {
  if (!apiKey) return mockData.latest as Video[];
  const channelId = siteConfig.channelId;
  const url = `${API_BASE}/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=8`;
  const json = await fetchJson(url);
  return (json.items || []).map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    publishedAt: item.snippet.publishedAt,
    thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  }));
}

export async function getVideosByPlaylist(playlistId: string): Promise<Video[]> {
  if (!apiKey) {
    return (mockData.playlists as Record<string, Video[]>)[playlistId] || [];
  }
  const url = `${API_BASE}/playlistItems?key=${apiKey}&playlistId=${playlistId}&part=snippet,contentDetails&maxResults=12`;
  const json = await fetchJson(url);
  return (json.items || []).map((item: any) => ({
    id: item.contentDetails.videoId,
    title: item.snippet.title,
    publishedAt: item.contentDetails.videoPublishedAt,
    thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
    url: `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`,
  }));
}
