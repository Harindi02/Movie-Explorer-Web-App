import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Film, Mail, Lock, User, LogIn, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

enum AuthMode {
  LOGIN = 'login',
  REGISTER = 'register',
}

const Login = () => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let success = false;

      if (mode === AuthMode.LOGIN) {
        success = await login(email, password);
        if (success) {
          navigate('/', { replace: true });
        } else {
          setError('Invalid email or password. Please try again.');
        }
      } else {
        if (!username) {
          setError('Username is required');
        } else if (!email.includes('@')) {
          setError('Please enter a valid email address');
        } else if (password.length < 6) {
          setError('Password must be at least 6 characters long');
        } else {
          success = await register(username, email, password);
          if (success) {
            navigate('/', { replace: true });
          } else {
            setError('Registration failed. Please try again.');
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === AuthMode.LOGIN ? AuthMode.REGISTER : AuthMode.LOGIN);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gray-50 dark:bg-gray-900">
      <div className="relative w-full max-w-md">
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full p-4 shadow-lg">
          <Film size={28} className="text-white" />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-8 pt-10">
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-1">
              {mode === AuthMode.LOGIN ? 'Welcome Back!' : 'Create Account'}
            </h1>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
              {mode === AuthMode.LOGIN
                ? 'Login to access your favorites'
                : 'Join to explore and save movies'}
            </p>

            {error && (
              <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start">
                <AlertTriangle size={18} className="text-red-600 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {mode === AuthMode.REGISTER && (
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your username"
                    />
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={mode === AuthMode.LOGIN ? "Your password" : "Create a password"}
                  />
                </div>
                {mode === AuthMode.LOGIN && (
                  <div className="mt-1 text-right">
                    <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-2 px-4 rounded-lg text-white font-medium transition-colors ${
                  loading
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn size={18} className="mr-2" />
                    {mode === AuthMode.LOGIN ? 'Sign In' : 'Create Account'}
                  </span>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {mode === AuthMode.LOGIN 
                  ? "Don't have an account?" 
                  : "Already have an account?"}
                <button
                  onClick={toggleMode}
                  className="ml-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  {mode === AuthMode.LOGIN ? 'Sign up' : 'Sign in'}
                </button>
              </p>
              
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                <p>This is a demo app with simulated authentication.</p>
                <p>No real authentication is performed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;