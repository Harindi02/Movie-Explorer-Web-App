import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetails';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import SearchResults from './pages/SearchResults';

// Custom route wrapper for protected routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // In a real app, you would check for authentication here
  // For demo purposes, we'll just pass through
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <MovieProvider>
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movie/:id" element={<MovieDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route 
                    path="/favorites" 
                    element={
                      <ProtectedRoute>
                        <Favorites />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </MovieProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;