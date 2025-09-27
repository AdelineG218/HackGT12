
class TVmazeUserService {
    constructor(username = null, apiKey = null) {
        this.baseURL = 'https://api.tvmaze.com';
        
        console.log('TVmaze Service initialized');

        // TVmaze API doesn't require authentication for public endpoints
        const finalUsername = username || import.meta.env?.VITE_TVMAZE_USERNAME || '';
        const finalApiKey = apiKey || import.meta.env?.VITE_TVMAZE_API_KEY || '';
        
        if (finalUsername && finalApiKey) {
            console.log('Authentication configured for user endpoints');
        }
    }

    async getPopularShows() {
        try {
            console.log('Fetching popular shows from TVmaze API...');
            
            // Use fetch directly since it's working (no CORS issues with TVmaze)
            const response = await fetch('https://api.tvmaze.com/shows');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`Successfully retrieved ${data.length} shows directly from TVmaze API`);
            
            const shows = data.slice(0, 20);
            console.log(`Displaying ${shows.length} shows`);
            return shows;
            
        } catch (error) {
            console.error('Error getting popular shows from API:', error.message);
            
            // Fallback to sample data
            console.log('Using sample data as fallback');
            return this.getSampleShows();
        }
    }

    getSampleShows() {
        console.log('Using sample TV show data');
        return [
            {
                id: 1,
                name: "Game of Thrones",
                rating: { average: 9.2 },
                genres: ["Drama", "Fantasy", "Adventure"],
                status: "Ended",
                image: { medium: "https://static.tvmaze.com/uploads/images/medium_portrait/190/476117.jpg" },
                summary: "<p>Seven noble families fight for control of the mythical land of Westeros.</p>"
            },
            {
                id: 2,
                name: "Breaking Bad",
                rating: { average: 9.5 },
                genres: ["Crime", "Drama", "Thriller"],
                status: "Ended",
                image: { medium: "https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg" },
                summary: "<p>A high school chemistry teacher diagnosed with cancer turns to a life of crime.</p>"
            },
            {
                id: 3,
                name: "Stranger Things",
                rating: { average: 8.7 },
                genres: ["Drama", "Fantasy", "Horror"],
                status: "Running",
                image: { medium: "https://static.tvmaze.com/uploads/images/medium_portrait/482/1205623.jpg" },
                summary: "<p>When a young boy disappears, his mother uncovers a mystery involving secret experiments.</p>"
            }
        ];
    }

    // These methods would require authentication
    async getFollowedShows() {
        try {
            console.log('Fetching followed shows...');
            // This endpoint requires authentication
            return [];
        } catch (error) {
            console.error('Error getting followed shows:', error.message);
            return [];
        }
    }

    async getMarkedEpisodes() {
        try {
            console.log('Fetching marked episodes...');
            // This endpoint requires authentication
            return [];
        } catch (error) {
            console.error('Error getting marked episodes:', error.message);
            return [];
        }
    }
}

export default TVmazeUserService;