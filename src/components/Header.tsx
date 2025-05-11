import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Heart, User, Sun, Moon, Search as SearchIcon, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setShowSearch(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-gray-900 shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400"
          >
            <Film size={28} className="text-red-600 dark:text-red-500" />
            <span className="text-xl font-bold hidden sm:block">
              MovieExplorer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === '/' ? 'font-semibold text-red-600 dark:text-red-500' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className={`nav-link ${
                location.pathname === '/favorites' ? 'font-semibold text-red-600 dark:text-red-500' : ''
              }`}
            >
              Favorites
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="action-button"
              aria-label="Search"
            >
              <SearchIcon size={20} />
            </button>

            <button
              onClick={toggleTheme}
              className="action-button"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                  <User size={16} />
                  <span className="text-sm font-medium">{user?.username}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden scale-0 group-hover:scale-100 origin-top-right transition-all duration-200">
                  <div className="py-2">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="action-button"
              aria-label="Search"
            >
              <SearchIcon size={20} />
            </button>
            <button
              onClick={toggleTheme}
              className="action-button"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="action-button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar Panel */}
        {showSearch && (
          <div className="absolute left-0 right-0 px-4 py-3 bg-white dark:bg-gray-800 shadow-md mt-2">
            <SearchBar onClose={() => setShowSearch(false)} />
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col px-4 py-3">
              <Link
                to="/"
                className="py-2 hover:text-red-600 dark:hover:text-red-500"
              >
                Home
              </Link>
              <Link
                to="/favorites"
                className="py-2 hover:text-red-600 dark:hover:text-red-500"
              >
                <div className="flex items-center space-x-2">
                  <Heart size={16} />
                  <span>Favorites</span>
                </div>
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="py-2 text-left hover:text-red-600 dark:hover:text-red-500"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="py-2 hover:text-red-600 dark:hover:text-red-500"
                >
                  Login / Register
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;