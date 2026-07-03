/**
 * All localStorage keys the app uses live here, so services don't
 * duplicate the same string in three places and risk it drifting.
 */
export const STORAGE_KEYS = {
  currentUser: 'travel_app_user',
  registeredUsers: 'travel_app_users',
  /** actual key per user is this prefix + their email, e.g. travel_app_favorites_jane@x.com */
  favoritesPrefix: 'travel_app_favorites_',
  guestFavorites: 'travel_app_favorites_guest'
};