# Sanam's Kitchen Website

Premium Next.js (App Router) site for the Sanam's Kitchen YouTube channel. Includes recipe index/detail with MDX, YouTube-powered video gallery with mock fallback, and a content-dense homepage inspired by the provided references.

## Prerequisites
- Node.js LTS (18.x or 20.x recommended)
- npm 9+

## Local setup
```bash
npm install
npm run dev
```
The dev server runs at http://localhost:3000.

## Environment variables
Create `.env.local` in the project root:
```
YOUTUBE_API_KEY=your_api_key_here
YOUTUBE_CHANNEL_ID=your_channel_id_here
```
- Without `YOUTUBE_API_KEY`, the site falls back to `lib/mock-youtube.json`.
- Update `YOUTUBE_CHANNEL_ID` and playlist IDs in `lib/site-config.ts`.

### Finding YouTube IDs
- **Channel ID:** Open your YouTube channel, view page source, search for `channelId`, or use https://yt.lemnoslife.com/noKey/channels?forUsername=<handle>.
- **Playlist ID:** Open a playlist and copy the `list=` value from the URL.

## Adding playlists/categories
- Edit `lib/site-config.ts` to map categories to playlist IDs.
- The Videos page renders tabs for each playlist.

## Content
- Recipes live in `/content/recipes` as MDX with frontmatter for metadata, ingredients, steps, and tips.
- Thumbnails live in `/public/images` (placeholders included). Replace with your brand imagery.

## Testing & linting
```bash
npm run lint
```

## Deployment (Vercel)
1. Push this repo to GitHub.
2. Create a new Vercel project from the repo.
3. Set environment variables in Vercel (`YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID`).
4. Deploy—Vercel will run `npm install` and `npm run build` automatically.

## Troubleshooting
- **"npm not recognized"**: Ensure Node.js is installed and restart your terminal/VS Code.
- **Node version**: Run `node -v` to confirm you're on 18+.
- **YouTube quota/keys**: If API calls fail, confirm the key has Data API v3 enabled or rely on the mock data.
