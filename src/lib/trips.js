import { trips } from "@/data/trips";

const normalizeText = (value) => String(value ?? "").trim().toLowerCase();

const applyLimit = (items, limit) => {
  if (!Number.isFinite(limit)) return items;
  return items.slice(0, Math.max(0, Math.floor(limit)));
};

const getCategoryMatches = (trip, categoryId) => {
  if (!categoryId) return true;

  const categories = Array.isArray(trip.categories) ? trip.categories : [];

  return categories.some(
    (category) => normalizeText(category) === normalizeText(categoryId)
  );
};

const getActivityMatches = (trip, activityId) => {
  if (!activityId) return true;

  const activities = Array.isArray(trip.activities) ? trip.activities : [];

  return activities.some(
    (activity) => normalizeText(activity) === normalizeText(activityId)
  );
};

export function getAllTrips() {
  return [...trips];
}

export function getTripBySlug(slug) {
  if (!slug) return null;

  return trips.find((trip) => trip.slug === slug) || null;
}

export function getTripById(id) {
  if (!id) return null;

  return trips.find((trip) => trip.id === id) || null;
}

export function getTripsByCategory(categoryId, limit = Infinity) {
  if (!categoryId) return [];

  const filteredTrips = trips.filter((trip) =>
    getCategoryMatches(trip, categoryId)
  );

  return applyLimit(filteredTrips, limit);
}

export function getTripsByActivity(activityId, limit = Infinity) {
  if (!activityId) return [];

  const filteredTrips = trips.filter((trip) =>
    getActivityMatches(trip, activityId)
  );

  return applyLimit(filteredTrips, limit);
}

export function getTripsBySlugs(slugs = []) {
  if (!Array.isArray(slugs)) return [];

  const uniqueSlugs = [...new Set(slugs)];

  return uniqueSlugs
    .map((slug) => getTripBySlug(slug))
    .filter(Boolean);
}

export function getFeaturedTrips(limit = 6) {
  const featuredTrips = trips.filter((trip) => trip.featured === true);

  return applyLimit(featuredTrips, limit);
}

export function getPopularTrips(limit = 6) {
  const popularTrips = trips.filter((trip) => trip.popular === true);

  return applyLimit(popularTrips, limit);
}

export function getFilteredTrips({
  categoryId = null,
  activityId = null,
  search = "",
  sort = "featured",
  featuredOnly = false,
  popularOnly = false,
} = {}) {
  const searchTerm = normalizeText(search);

  const filteredTrips = trips.filter((trip) => {
    const matchesCategory = getCategoryMatches(trip, categoryId);
    const matchesActivity = getActivityMatches(trip, activityId);

    const matchesFeatured = !featuredOnly || trip.featured === true;
    const matchesPopular = !popularOnly || trip.popular === true;

    const searchableContent = [
      trip.title,
      trip.location,
      trip.country,
      trip.summary,
      trip.description,
      ...(trip.categories || []),
      ...(trip.activities || []),
      ...(trip.highlights || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      !searchTerm || searchableContent.includes(searchTerm);

    return (
      matchesCategory &&
      matchesActivity &&
      matchesFeatured &&
      matchesPopular &&
      matchesSearch
    );
  });

  switch (sort) {
    case "price-low":
      return filteredTrips.sort(
        (a, b) => a.priceFrom - b.priceFrom
      );

    case "price-high":
      return filteredTrips.sort(
        (a, b) => b.priceFrom - a.priceFrom
      );

    case "duration-short":
      return filteredTrips.sort(
        (a, b) => a.durationDays - b.durationDays
      );

    case "duration-long":
      return filteredTrips.sort(
        (a, b) => b.durationDays - a.durationDays
      );

    case "date-soon":
      return filteredTrips.sort((a, b) =>
        String(a.departureDate || "").localeCompare(
          String(b.departureDate || "")
        )
      );

    case "latest":
      return filteredTrips.sort((a, b) =>
        String(b.departureDate || "").localeCompare(
          String(a.departureDate || "")
        )
      );

    case "title-asc":
      return filteredTrips.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    case "title-desc":
      return filteredTrips.sort((a, b) =>
        b.title.localeCompare(a.title)
      );

    default:
      return filteredTrips;
  }
}

export function getRelatedTrips(
  currentTrip,
  limit = 3,
  { includeFallback = true } = {}
) {
  const trip =
    typeof currentTrip === "string"
      ? getTripBySlug(currentTrip)
      : currentTrip;

  if (!trip?.slug) return [];

  const currentCategories = trip.categories || [];
  const currentActivities = trip.activities || [];

  const scoredTrips = trips
    .filter((item) => item.slug !== trip.slug)
    .map((item) => {
      const sharedCategories = (item.categories || []).filter(
        (category) => currentCategories.includes(category)
      ).length;

      const sharedActivities = (item.activities || []).filter(
        (activity) => currentActivities.includes(activity)
      ).length;

      return {
        trip: item,
        sharedCategories,
        sharedActivities,
        score: sharedCategories * 3 + sharedActivities,
      };
    });

  const matchingTrips = scoredTrips
    .filter((item) => item.sharedCategories > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.trip);

  if (!includeFallback) {
    return applyLimit(matchingTrips, limit);
  }

  const matchingSlugs = new Set(matchingTrips.map((item) => item.slug));

  const fallbackTrips = scoredTrips
    .filter((item) => !matchingSlugs.has(item.trip.slug))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.trip);

  return applyLimit([...matchingTrips, ...fallbackTrips], limit);
}

export function getTripsForExperience(experience, limit = Infinity) {
  if (!experience) return [];

  const selectedTrips = getTripsBySlugs(experience.tripSlugs || []);
  const selectedSlugs = new Set(selectedTrips.map((trip) => trip.slug));

  const categoryTrips = experience.categoryId
    ? getTripsByCategory(experience.categoryId)
    : [];

  const remainingTrips = categoryTrips.filter(
    (trip) => !selectedSlugs.has(trip.slug)
  );

  return applyLimit([...selectedTrips, ...remainingTrips], limit);
}

export function getExperiencesForTrip(trip, experiences = []) {
  if (!trip || !Array.isArray(experiences)) return [];

  return experiences.filter((experience) =>
    (trip.categories || []).includes(experience.categoryId)
  );
}

export function formatTripPrice(price, currency = "USD") {
  const amount = Number(price);

  if (!Number.isFinite(amount) || amount < 0) {
    return "Price unavailable";
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(amount);
  }
}