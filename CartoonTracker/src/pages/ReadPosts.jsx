import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { Link } from 'react-router-dom'
import TVmazeUserService from '../services/TVmazeService'
import './ReadPosts.css';

const ReadPosts = () => {
    const [posts, setPosts] = useState([])
    const [result, setResult] = useState("The result is unknown.")
    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(true)
    const [apiError, setApiError] = useState(null)

    useEffect(() => {
        console.log('ReadPosts component mounted - starting data fetch...')
        
        const fetchTVData = async () => {
            try {
                setLoading(true)
                setApiError(null)
                const service = new TVmazeUserService()
                
                console.log('Fetching TV data...')
                const tvShows = await service.getPopularShows()
                
                const safeShows = Array.isArray(tvShows) ? tvShows : []
                
                console.log('TV data processed:', safeShows.length, 'shows')
                setShows(safeShows)
                
                if (safeShows.length === 0) {
                    setApiError('No TV shows data available. Please check your connection.')
                }
                
            } catch (error) {
                console.error('Error fetching TV data:', error)
                setApiError('Failed to load TV shows data. Using sample data.')
                const service = new TVmazeUserService()
                const sampleShows = service.getSampleShows()
                setShows(sampleShows)
            } finally {
                setLoading(false)
            }
        }

        const fetchPosts = async () => {
            try {
                const { data } = await supabase
                    .from('shows')
                    .select()
                    .order('created_at', { ascending: false })
                
                setPosts(data || [])
                
            } catch (error) {
                console.error('Error fetching posts:', error)
            }
        }

        fetchTVData()
        fetchPosts()

    }, [])

    const renderShowItem = (show, index) => {
        if (!show || typeof show !== 'object') {
            return null
        }
    
        const showData = show
        
        return (
            <div className="read-posts-container">
                <div className="tv-shows-section">
                    <h2>TV Shows from TVmaze</h2>
                    
                    {apiError && (
                        <div className="api-warning">
                            <p>{apiError}</p>
                        </div>
                    )}
                    
                    {loading ? (
                        <div className="loading">Loading TV shows...</div>
                    ) : (
                        <div className="tv-content">
                            <div className="tv-stats">
                                <div className="stat-card">
                                    <h3>📺 Available Shows</h3>
                                    <p className="stat-number">{shows.length}</p>
                                </div>
                            </div>
        
                            <div className="shows-grid">
                                <h3>Popular TV Shows</h3>
                                {shows.length === 0 ? (
                                    <p className="no-shows">No shows available. Please check your internet connection.</p>
                                ) : (
                                    <div className="shows-list">
                                        {shows.slice(0, 20).map((show, index) => 
                                            renderShowItem(show, index)
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
        </div>
    )
}

export default ReadPosts