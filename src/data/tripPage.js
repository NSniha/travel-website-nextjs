export const tripHero = {
  title: ["Find Your Next", "Great Adventure."],
  description: "Explore extraordinary places, discover meaningful experiences, and find journeys that feel uniquely yours.",
  image: "/images/trip/trip-hero.jpg",
  imageAlt: "Breathtaking alpine mountains, evergreen forests, and a peaceful turquoise lake",
};


export const tripCategories = [
  {
    id: "family",
    slug: "family-adventures",
    title: "Family Adventures",
    description: "Big discoveries and beautiful moments for explorers of every age.",
    image: "/images/trip/categories/family.jpg",
    alt: "Family enjoying a peaceful outdoor adventure surrounded by nature",
  },
  {
    id: "romantic",
    slug: "romantic-getaways",
    title: "Two-Person Escapes",
    description: "Discover extraordinary places and unforgettable moments together.",
    image: "/images/trip/categories/romantic.jpg",
    alt: "Couple enjoying a spectacular mountain landscape together",
  },
  {
    id: "adventure",
    slug: "adventure-escapes",
    title: "Wild Horizons",
    description: "Follow remarkable trails and experience the beauty beyond the familiar.",
    image: "/images/trip/categories/adventure.jpg",
    alt: "Adventurer exploring a beautiful alpine lake and mountain scenery",
  },
  {
    id: "cultural",
    slug: "cultural-encounters",
    title: "Cultural Encounters",
    description: "Discover the traditions and stories that make every place unique.",
    image: "/images/trip/categories/cultural.jpg",
    alt: "Colorful traditional cultural celebration showcasing local heritage",
  },
  {
    id: "island",
    slug: "island-hideaways",
    title: "Island Hideaways",
    description: "Find your own paradise where the ocean meets endless possibilities.",
    image: "/images/trip/categories/island.jpg",
    alt: "Breathtaking tropical island surrounded by turquoise ocean waters",
  },
];


export const tripActivities = [
  {
    id: "sailing",
    title: "Sunset Sailing",
    description: "Sail across peaceful waters and discover the magic of golden-hour horizons.",
    image: "/images/trip/activities/coastal-sailing.jpg",
    imageAlt: "Sailboat floating on calm ocean waters during a beautiful sunset",
    categorySlug: "island-hideaways",
    categoryName: "Island Hideaways",
    details: "Experience the extraordinary beauty of the coastline as the sun slowly disappears beyond the horizon. Discover peaceful ocean views, refreshing sea breezes, and unforgettable moments on the water.",
    highlights: ["Beautiful sunset views", "Scenic coastal landscapes", "Relaxing sailing experiences"],
  },
  {
    id: "cultural",
    title: "Cultural Immersion",
    description: "Explore vibrant traditions and discover the stories behind every culture.",
    image: "/images/trip/activities/cultural-discovery.jpg",
    imageAlt: "Traditional cultural performer wearing a colorful ceremonial costume",
    categorySlug: "cultural-encounters",
    categoryName: "Cultural Encounters",
    details: "Step into a world of fascinating traditions, vibrant celebrations, and meaningful cultural discoveries. Explore the customs, creativity, and stories that give every destination its unique identity.",
    highlights: ["Traditional celebrations", "Local art and heritage", "Meaningful cultural encounters"],
  },
  {
    id: "trekking",
    title: "Forest Trekking",
    description: "Follow scenic trails and uncover the hidden wonders of the natural world.",
    image: "/images/trip/activities/mountain-trekking.jpg",
    imageAlt: "Traveler hiking along a beautiful forest trail surrounded by tall evergreen trees",
    categorySlug: "adventure-escapes",
    categoryName: "Wild Horizons",
    details: "Leave the familiar behind and explore breathtaking forest trails, peaceful mountain paths, and extraordinary natural landscapes. Every step brings a new perspective and a deeper connection with nature.",
    highlights: ["Scenic hiking trails", "Mountain and forest landscapes", "Outdoor exploration"],
  },
  {
    id: "wildlife",
    title: "Wildlife Safaris",
    description: "Witness remarkable wildlife and discover nature in its purest form.",
    image: "/images/trip/activities/wildlife-encounters.jpg",
    imageAlt: "Lion resting with a young cub in a peaceful natural environment",
    categorySlug: "adventure-escapes",
    categoryName: "Wild Horizons",
    details: "Discover the incredible diversity of the natural world through responsible wildlife experiences. Observe fascinating animals, explore beautiful habitats, and appreciate the importance of protecting our planet.",
    highlights: ["Wildlife observation", "Natural habitat exploration", "Responsible nature experiences"],
  },
];


export const popularDestinations = [
  {
    id: "switzerland",
    name: "Swiss Alps",
    country: "Switzerland",
    countryCode: "ch",
    description: "Discover dramatic peaks, peaceful valleys, and unforgettable alpine scenery.",
    image: "/images/trip/trip-hero.jpg",
    imageAlt: "Beautiful mountain landscape with alpine scenery",
    categorySlug: "adventure-escapes",
  },
  {
    id: "indonesia",
    name: "Bali",
    country: "Indonesia",
    countryCode: "id",
    description: "Explore tropical coastlines, vibrant traditions, and inspiring island escapes.",
    image: "/images/trip/categories/island.jpg",
    imageAlt: "Tropical cliffs and beautiful ocean scenery",
    categorySlug: "island-hideaways",
  },
  {
    id: "new-zealand",
    name: "Queenstown",
    country: "New Zealand",
    countryCode: "nz",
    description: "Find extraordinary adventures among mountains, lakes, and wild landscapes.",
    image: "/images/trip/categories/adventure.jpg",
    imageAlt: "Adventurer exploring a beautiful mountain landscape",
    categorySlug: "adventure-escapes",
  },
  {
    id: "japan",
    name: "Kyoto",
    country: "Japan",
    countryCode: "jp",
    description: "Experience fascinating traditions, timeless architecture, and cultural discovery.",
    image: "/images/trip/categories/cultural.jpg",
    imageAlt: "Colorful traditional cultural celebration",
    categorySlug: "cultural-encounters",
  },
  {
    id: "italy",
    name: "Amalfi Coast",
    country: "Italy",
    countryCode: "it",
    description: "Discover coastal beauty, romantic escapes, and unforgettable Mediterranean views.",
    image: "/images/trip/categories/romantic.jpg",
    imageAlt: "Couple enjoying a beautiful scenic travel destination",
    categorySlug: "romantic-getaways",
  },
  {
    id: "canada",
    name: "Banff",
    country: "Canada",
    countryCode: "ca",
    description: "Find inspiration in wide-open spaces, beautiful forests, and mountain scenery.",
    image: "/images/trip/categories/family.jpg",
    imageAlt: "Travelers enjoying a peaceful natural landscape",
    categorySlug: "family-adventures",
  },
];


export const tripOffer = {
  title: "Discover Remarkable Travel Deals Designed for You",
  description: "Explore inspiring getaway ideas, extraordinary destinations, and thoughtful travel opportunities for your next adventure.",
  badge: "A new way to explore extraordinary places",
  heading: ["Go Further,", "Spend Less."],
  discountLabel: "Featured offer concept",
  discount: 40,
  note: "Preview promotion — final discounts, pricing, and availability are yet to be confirmed.",
  buttonText: "Explore Now",
  buttonHref: "/trip/category/adventure-escapes",
  image: "/images/trip/travel-offer.jpg",
  imageAlt: "Beautiful green mountain valleys surrounded by forests and morning mist",
};


export const bookingSteps = [
  {
    id: "discover",
    number: "01",
    title: "Discover & Choose",
    description: "Explore remarkable destinations and find the journey that inspires you.",
    details: "Every unforgettable adventure begins with a little inspiration. Explore WAYLUME's destination guides, discover different travel styles, and find experiences that match your interests.",
    highlights: [
      "Explore inspiring destinations",
      "Discover different travel experiences",
      "Find journeys that match your interests",
    ],
  },
  {
    id: "personalize",
    number: "02",
    title: "Shape Your Journey",
    description: "Imagine an experience that reflects your interests and travel style.",
    details: "Think about the places you want to visit, the experiences you hope to enjoy, and the moments that matter most. Use these ideas to create a travel plan that feels uniquely yours.",
    highlights: [
      "Identify your travel preferences",
      "Choose meaningful activities",
      "Plan your ideal travel experience",
    ],
  },
  {
    id: "review",
    number: "03",
    title: "Review Your Plans",
    description: "Explore important travel details and prepare with confidence.",
    details: "Review your preferred destinations, suggested itineraries, travel dates, and important requirements before making any reservations through an available travel provider.",
    highlights: [
      "Review your travel itinerary",
      "Check important destination information",
      "Confirm arrangements with your provider",
    ],
  },
  {
    id: "prepare",
    number: "04",
    title: "Get Ready to Explore",
    description: "Prepare the essentials and look forward to your next adventure.",
    details: "From organizing travel documents to preparing your packing list, a little thoughtful planning helps make your journey smoother and more enjoyable.",
    highlights: [
      "Prepare important travel documents",
      "Organize your packing checklist",
      "Get ready for extraordinary experiences",
    ],
  },
];