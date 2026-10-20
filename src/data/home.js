export const travelServices = [
  {
    id: "flights",
    icon: "flight",
    title: "Flight Booking",
    description: "Discover the best routes and fares for every journey ahead.",
  },
  {
    id: "hotels",
    icon: "hotel",
    title: "Hotel Reservation",
    description: "Find exceptional stays that bring comfort to every destination.",
  },
  {
    id: "tours",
    icon: "tour",
    title: "Tailored Tours",
    description: "Explore unforgettable journeys designed around your travel style.",
  },
  {
    id: "visas",
    icon: "visa",
    title: "Visa Assistance",
    description: "Travel with confidence through helpful visa and document guidance.",
  },
];



export const featuredDestination = {
  id: "bali",
  name: "Bali, Indonesia",
  location: "Indonesia",
  description: "Discover Bali's breathtaking coastline, timeless traditions, and extraordinary island experiences.",
  details:
    "From dramatic coastal cliffs and turquoise waters to ancient temples and vibrant local traditions, Bali offers a beautiful balance of adventure, relaxation, and cultural discovery.",
  highlights: ["Spectacular coastal landscapes", "Traditional Balinese culture", "Tropical island adventures"],
  images: {
    coast: "/images/destinations/bali-coast.jpg",
    gate: "/images/destinations/bali-gate.jpg",
  },
};



export const travelExperiences = [
  {
    id: "family-holidays",
    categoryId: "family",
    categorySlug: "family-adventures",
    featuredTripSlug: "banff-national-park-explorer",

    title: "Family Holidays",
    description: "Meaningful adventures for the whole family.",

    image: "/images/experiences/family-holidays.jpg",
    imageAlt: "Family-friendly travel destination surrounded by beautiful natural scenery",

    details:
      "Create lasting memories with family-friendly destinations, inspiring activities, and experiences designed for travelers of every age.",

    highlights: [
      "Family-friendly destinations",
      "Memorable outdoor activities",
      "Relaxed and flexible journeys",
    ],

    tripSlugs: [
      "banff-national-park-explorer",
      "bali-island-escape",
      "rome-cultural-discovery",
    ],
  },
  {
    id: "romantic-getaways",
    categoryId: "romantic",
    categorySlug: "romantic-getaways",
    featuredTripSlug: "amalfi-coast-getaway",

    title: "Romantic Getaways",
    description: "Beautiful escapes made for two.",

    image: "/images/experiences/romantic-getaways.jpg",
    imageAlt: "Beautiful romantic destination with breathtaking coastal scenery",

    details:
      "Discover breathtaking landscapes, intimate retreats, and unforgettable moments with someone special.",

    highlights: [
      "Scenic destinations",
      "Intimate travel experiences",
      "Unforgettable shared moments",
    ],

    tripSlugs: [
      "amalfi-coast-getaway",
      "kyoto-heritage-journey",
      "swiss-alps-mountain-escape",
      "queenstown-adventure-escape",
    ],
  },
  {
    id: "adventure-escapes",
    categoryId: "adventure",
    categorySlug: "adventure-escapes",
    featuredTripSlug: "patagonia-wilderness-adventure",

    title: "Adventure Escapes",
    description: "Go beyond the ordinary and explore more.",

    image: "/images/experiences/adventure-escapes.jpg",
    imageAlt: "Spectacular mountains and scenic landscapes perfect for outdoor adventures",

    details:
      "Experience extraordinary outdoor adventures, from mountain trails and peaceful lakes to remarkable natural wonders.",

    highlights: [
      "Mountain exploration",
      "Outdoor adventures",
      "Extraordinary natural landscapes",
    ],

    tripSlugs: [
      "patagonia-wilderness-adventure",
      "swiss-alps-mountain-escape",
      "queenstown-adventure-escape",
      "banff-national-park-explorer",
    ],
  },
  {
    id: "cultural-journeys",
    categoryId: "cultural",
    categorySlug: "cultural-encounters",
    featuredTripSlug: "rome-cultural-discovery",

    title: "Cultural Journeys",
    description: "Discover traditions that inspire.",

    image: "/images/experiences/cultural-journeys.jpg",
    imageAlt: "Historic cultural destination featuring remarkable traditional architecture",

    details:
      "Connect with the stories, traditions, architecture, and cultural heritage that make every destination unique.",

    highlights: [
      "Local traditions",
      "Cultural landmarks",
      "Authentic destination experiences",
    ],

    tripSlugs: [
      "rome-cultural-discovery",
      "kyoto-heritage-journey",
      "marrakech-cultural-escape",
      "bali-island-escape",
    ],
  },
  {
    id: "island-retreats",
    categoryId: "island",
    categorySlug: "island-hideaways",
    featuredTripSlug: "bali-island-escape",

    title: "Island Retreats",
    description: "Slow down in paradise.",

    image: "/images/experiences/island-retreats.jpg",
    imageAlt: "Beautiful tropical island retreat with turquoise waters and coastal scenery",

    details:
      "Escape to beautiful tropical destinations surrounded by turquoise waters, dramatic coastlines, and peaceful island scenery.",

    highlights: [
      "Tropical destinations",
      "Beautiful coastal landscapes",
      "Relaxing island escapes",
    ],

    tripSlugs: [
      "bali-island-escape",
      "amalfi-coast-getaway",
    ],
  },
];


export const travelBenefits = [
  {
    id: "planning",
    icon: "planning",
    title: "Expert Planning",
    description: "Thoughtfully designed journeys for effortless exploration.",
    details: "Explore carefully considered itineraries, destination inspiration, and travel ideas designed around different interests.",
  },
  {
    id: "support",
    icon: "support",
    title: "Dedicated Support",
    description: "Helpful guidance for a more confident travel experience.",
    details: "Discover useful travel information, practical preparation tips, and guidance to help you plan your journey.",
  },
  {
    id: "value",
    icon: "value",
    title: "Exceptional Value",
    description: "Discover remarkable experiences worth remembering.",
    details: "Compare travel experiences and discover destinations that balance comfort, adventure, and memorable moments.",
  },
  {
    id: "sustainable",
    icon: "sustainable",
    title: "Responsible Travel",
    description: "Explore more thoughtfully and respect the world around us.",
    details: "Learn how thoughtful travel choices can support local communities, cultural heritage, and the natural environment.",
  },
];