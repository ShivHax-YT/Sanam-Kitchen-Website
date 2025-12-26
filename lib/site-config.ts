export const siteConfig = {
  name: "Sanam's Kitchen",
  description:
    "Premium home cooking and video hub featuring vibrant recipes, curated playlists, and cozy kitchen inspiration.",
  url: "https://sanamskitchen.example.com",
  channelUrl: "https://www.youtube.com/c/sanamskitchen",
  channelId: process.env.YOUTUBE_CHANNEL_ID || "UCxxxxxxxxxxxxxxxxx",
  categories: [
    { label: "Breakfast", value: "breakfast" },
    { label: "Snacks", value: "snacks" },
    { label: "Dinner", value: "dinner" },
    { label: "Desserts", value: "desserts" },
    { label: "Drinks", value: "drinks" },
    { label: "Punjabi", value: "punjabi" },
    { label: "Healthy", value: "healthy" },
  ],
  playlists: {
    breakfast: "PLAYLIST_BREAKFAST_ID",
    snacks: "PLAYLIST_SNACKS_ID",
    dinner: "PLAYLIST_DINNER_ID",
    desserts: "PLAYLIST_DESSERTS_ID",
    drinks: "PLAYLIST_DRINKS_ID",
    punjabi: "PLAYLIST_PUNJABI_ID",
  },
};
