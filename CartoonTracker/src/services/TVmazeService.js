// services/TVmazeService.js
class TVmazeService {
    constructor() {
        this.baseUrl = 'https://api.tvmaze.com';
    }

    async getPopularShows() {
        try {
            console.log('Fetching shows from TVmaze API...');
            
            // Try direct fetch first
            const response = await fetch(`${this.baseUrl}/shows`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const shows = await response.json();
            console.log('API Response received:', shows.length, 'shows');
            
            // Filter to get popular shows (those with good ratings)
            const popularShows = shows
                .filter(show => show.rating?.average > 7)
                .slice(0, 20);
                
            return popularShows;
            
        } catch (error) {
            console.error('TVmaze API fetch failed:', error);
            // Fallback to sample data
            return this.getSampleShows();
        }
    }

    getSampleShows() {
        return [
            {
                id: 1,
                name: "Sample Show 1",
                rating: { average: 8.5 },
                genres: ["Drama", "Thriller"],
                status: "Running",
                image: { medium: "https://via.placeholder.com/210x295/667eea/ffffff?text=Show+1" }
            },
            {
                id: 2,
                name: "Sample Show 2", 
                rating: { average: 7.8 },
                genres: ["Comedy"],
                status: "Ended",
                image: { medium: "https://via.placeholder.com/210x295/764ba2/ffffff?text=Show+2" }
            },
            // Add more sample shows as needed
        ];
    }
}

export default TVmazeService;