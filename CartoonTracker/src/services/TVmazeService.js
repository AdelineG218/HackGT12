import axios from 'axios';

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
            console.log('🔗 Fetching from TVmaze API via proxy...');
            
            // Use the Vite proxy path
            const response = await fetch('/api/shows');
            
            console.log('📡 Response status:', response.status);
            console.log('📡 Response ok:', response.ok);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ API success, received:', data.length, 'shows');
            
            const shows = data.slice(0, 20);
            return shows;
            
        } catch (error) {
            console.error('❌ Proxy failed:', error.message);
            
            // Fallback to direct API call
            console.log('🔄 Trying direct API call...');
            try {
                const directResponse = await fetch('https://api.tvmaze.com/shows');
                if (directResponse.ok) {
                    const directData = await directResponse.json();
                    console.log('✅ Direct API success:', directData.length, 'shows');
                    return directData.slice(0, 20);
                }
            } catch (directError) {
                console.error('❌ Direct API also failed:', directError.message);
            }
            
            // Final fallback
            console.log('📋 Using sample data');
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