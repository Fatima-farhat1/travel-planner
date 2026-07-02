/**
 * Shared shape for a city everywhere in the app: search results,
 * favorites, and the city-details page all use this same interface.
 */
export interface CityResult {
  id: string;
  name: string;
  country: string;
  region: string;
  population: number;
  latitude: number;
  longitude: number;
  image: string;
  /** short human-readable line shown on cards, e.g. "Douro, Portugal • 237,591 people" */
  description: string;
}

/** City-details page gets a couple of extra fields the search list doesn't need. */
export interface CityDetail extends CityResult {
  timezone?: string;
  elevationMeters?: number | null;
}