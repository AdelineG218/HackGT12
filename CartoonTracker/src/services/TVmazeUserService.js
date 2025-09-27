import axios from 'axios';

class TVmazeUserService {
    constructor(username = null, apiKey = null, baseURL = 'https://api.tvmaze.com') {
        const finalUsername = username || process.env.REACT_APP_TVMAZE_USERNAME;
        const finalApiKey = apiKey || process.env.REACT_APP_TVMAZE_API_KEY;
        
        if (!finalUsername || !finalApiKey) {
            console.warn('TVmaze credentials not found. Some endpoints may not work.');
        }

        this.client = axios.create({
            baseURL: baseURL,
            timeout: 10000,
        });

        if (finalUsername && finalApiKey) {
            this.client.defaults.auth = {
                username: finalUsername,
                password: finalApiKey
            };
        }
    }

    // AUTHENTICATION
    async validateAuth() {
        try {
            const response = await this.client.get('/auth/validate');
            return response.data;
        } catch (error) {
            console.error('Auth validation failed:', error.message);
            throw error;
        }
    }

    // MARKED EPISODES (REMOVED DUPLICATE)
    async getMarkedEpisodes() {
        try {
            const response = await this.client.get('/user/episodes');
            return response.data;
        } catch (error) {
            console.error('Error getting marked episodes:', error.message);
            throw error;
        }
    }

    async markEpisode(episodeId) {
        try {
            const response = await this.client.put(`/user/episodes/${episodeId}`);
            return response.data;
        } catch (error) {
            console.error('Error marking episode:', error.message);
            throw error;
        }
    }

    async unmarkEpisode(episodeId) {
        try {
            const response = await this.client.delete(`/user/episodes/${episodeId}`);
            return response.data;
        } catch (error) {
            console.error('Error unmarking episode:', error.message);
            throw error;
        }
    }

    // FOLLOWED SHOWS
    async getFollowedShows() {
        try {
            const response = await this.client.get('/user/follows/shows');
            return response.data;
        } catch (error) {
            console.error('Error getting followed shows:', error.message);
            throw error;
        }
    }

    async followShow(showId) {
        try {
            const response = await this.client.put(`/user/follows/shows/${showId}`);
            return response.data;
        } catch (error) {
            console.error('Error following show:', error.message);
            throw error;
        }
    }

    async unfollowShow(showId) {
        try {
            const response = await this.client.delete(`/user/follows/shows/${showId}`);
            return response.data;
        } catch (error) {
            console.error('Error unfollowing show:', error.message);
            throw error;
        }
    }

    // SCROBBLING 
    async scrobbleEpisode(episodeId, action = 'watched') {
        try {
            const response = await this.client.put(`/scrobble/episodes/${episodeId}`, {
                type: action // 'watched' or 'acquired'
            });
            return response.data;
        } catch (error) {
            console.error('Error scrobbling episode:', error.message);
            throw error;
        }
    }

    // GENERIC METHODS 
    async makeRequest(method, endpoint, data = null) {
        try {
            const config = {
                method: method,
                url: endpoint
            };
            
            if (data) {
                config.data = data;
            }
            
            const response = await this.client(config);
            return response.data;
        } catch (error) {
            console.error(`API Error (${method} ${endpoint}):`, error.message);
            throw error;
        }
    }

    // Quick access methods using the generic request method
    async getFollowedPeople() {
        return this.makeRequest('GET', '/user/follows/people');
    }

    async getVotedShows() {
        return this.makeRequest('GET', '/user/votes/shows');
    }
}

export default TVmazeUserService;