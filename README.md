 # Movie Explorer

A beautiful React application to explore movies using the TMDb API. Search, discover, and save your favorite films.

## Features

- **Movie Search**: Real-time search results as you type
- **Movie Discovery**: Browse trending and popular movies
- **Favorites**: Save your favorite movies locally 
- **Detailed Movie Pages**: View comprehensive movie information, trailers, and more
- **Responsive Design**: Works beautifully on all devices
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

- React 18
- TypeScript
- React Router for navigation
- Material UI components
- Tailwind CSS for styling
- Axios for API requests
- Context API for state management
- LocalStorage for saving favorites

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your TMDb API key:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Getting a TMDb API Key

1. Create an account at [themoviedb.org](https://www.themoviedb.org/signup)
2. Go to your account settings
3. Click on the "API" link in the left sidebar
4. Follow the instructions to request an API key

## Deployment

This project is configured for easy deployment to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up your environment variables
4. Deploy!

## Project Structure

- `src/components/`: Reusable UI components
- `src/contexts/`: React context providers
- `src/pages/`: Main application pages
- `src/types/`: TypeScript interfaces and type definitions
- `src/utils/`: Utility functions and API logic

## License

This project is licensed under the MIT License.

---

This project uses the TMDb API but is not endorsed or certified by TMDb.