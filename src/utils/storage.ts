import { Movie, User, ThemeMode } from '../types';

// Keys for localStorage
const FAVORITES_KEY = 'movieExplorer_favorites';
const USER_KEY = 'movieExplorer_user';
const THEME_KEY = 'movieExplorer_theme';

// Save favorites to localStorage
export const saveFavorites = (favorites: Movie[]): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

// Load favorites from localStorage
export const loadFavorites = (): Movie[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

// Save user to localStorage (for mock auth)
export const saveUser = (user: User): void => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

// Load user from localStorage
export const loadUser = (): User | null => {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
    return null;
  }
};

// Remove user from localStorage (logout)
export const removeUser = (): void => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Error removing user from localStorage:', error);
  }
};

// Save theme preference to localStorage
export const saveTheme = (theme: ThemeMode): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
  }
};

// Load theme preference from localStorage
export const loadTheme = (): ThemeMode | null => {
  try {
    return localStorage.getItem(THEME_KEY) as ThemeMode | null;
  } catch (error) {
    console.error('Error loading theme from localStorage:', error);
    return null;
  }
};