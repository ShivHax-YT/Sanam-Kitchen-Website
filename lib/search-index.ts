export type SearchItem = {
  title: string;
  type: "recipe" | "video";
  href: string;
  meta?: string;
};

export const searchIndex: SearchItem[] = [
  { title: "Creamy Tomato Basil Pasta", type: "recipe", href: "/recipes/creamy-tomato-pasta", meta: "Dinner • 40 mins" },
  { title: "Chai-Spiced Overnight Oats", type: "recipe", href: "/recipes/chai-spiced-overnight-oats", meta: "Breakfast • No-cook" },
  { title: "Paneer Tikka Wrap", type: "recipe", href: "/recipes/paneer-tikka-wrap", meta: "Snacks • 40 mins" },
  { title: "Punjabi Chole Bhature", type: "recipe", href: "/recipes/punjabi-chole-bhature", meta: "Punjabi • 90 mins" },
  { title: "Masala Omelette Sandwich", type: "recipe", href: "/recipes/masala-omelette-sandwich", meta: "Breakfast • 20 mins" },
  { title: "Creamy Mango Lassi", type: "recipe", href: "/recipes/mango-lassi", meta: "Drinks • 10 mins" },
  { title: "Tandoori Gobhi Steaks", type: "recipe", href: "/recipes/tandoori-gobhi", meta: "Dinner • 45 mins" },
  { title: "Kadai Paneer", type: "recipe", href: "/recipes/kadai-paneer", meta: "Punjabi • 35 mins" },
  { title: "Lemon Herb Quinoa Salad", type: "recipe", href: "/recipes/lemon-herb-quinoa", meta: "Healthy • 25 mins" },
  { title: "Spiced Hot Chocolate", type: "recipe", href: "/recipes/spiced-hot-chocolate", meta: "Desserts • 10 mins" },
  { title: "Paneer Tikka Wrap | Video", type: "video", href: "https://www.youtube.com/watch?v=mock1", meta: "08:12" },
  { title: "Masala Chai 3 Ways", type: "video", href: "https://www.youtube.com/watch?v=mock2", meta: "05:04" },
  { title: "Veggie Noodles Street Style", type: "video", href: "https://www.youtube.com/watch?v=mock3", meta: "06:55" }
];
