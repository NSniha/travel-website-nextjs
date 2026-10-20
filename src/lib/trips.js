import { trips } from "@/data/trips";

export function getAllTrips() {
  return trips;
}

export function getTripBySlug(slug) {
  return trips.find((trip) => trip.slug === slug) || null;
}

export function getFilteredTrips({ categoryId = null, activityId = null, search = "", sort = "featured" } = {}) {
  const normalizedSearch = search.trim().toLowerCase();

  const filteredTrips = trips.filter((trip) => {
    const matchesCategory = !categoryId || trip.categories.includes(categoryId);
    const matchesActivity = !activityId || trip.activities.includes(activityId);
    const searchableContent = `${trip.title} ${trip.location} ${trip.country} ${trip.summary}`.toLowerCase();
    const matchesSearch = !normalizedSearch || searchableContent.includes(normalizedSearch);

    return matchesCategory && matchesActivity && matchesSearch;
  });

  if (sort === "price-low") return filteredTrips.sort((a, b) => a.priceFrom - b.priceFrom);
  if (sort === "price-high") return filteredTrips.sort((a, b) => b.priceFrom - a.priceFrom);
  if (sort === "duration-short") return filteredTrips.sort((a, b) => a.durationDays - b.durationDays);
  if (sort === "duration-long") return filteredTrips.sort((a, b) => b.durationDays - a.durationDays);

  return filteredTrips;
}

export function formatTripPrice(price, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}