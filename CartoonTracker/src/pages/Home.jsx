import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { supabase } from '../client'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import TVmazeUserService from '../services/TVmazeService'
import './Home.css'
import React from 'react'

const Home = () => {
    const [userShows, setUserShows] = useState([]) // Your existing Supabase shows
    const [apiShows, setApiShows] = useState([]) // TVmaze API shows
    const [loading, setLoading] = useState(true)
    const [apiError, setApiError] = useState(null)
    const navigate = useNavigate()

    // Fetch your existing Supabase shows
    useEffect(() => {
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('shows')
                .select()
                .order('created_at', {ascending: false})
            console.log('User shows data:', data)
            setUserShows(data || [])
        }
        fetchPosts();
    }, [])

    // Fetch TVmaze API shows (keeping your original implementation)
    useEffect(() => {
        console.log('Home component mounted - starting data fetch...')
        
        const fetchTVData = async () => {
            try {
                setLoading(true)
                setApiError(null)
                const service = new TVmazeUserService()
                
                console.log('Fetching TV data...')
                const tvShows = await service.getPopularShows()
                
                const safeShows = Array.isArray(tvShows) ? tvShows : []
                
                console.log('TV data processed:', safeShows.length, 'shows')
                setApiShows(safeShows)
                
                if (safeShows.length === 0) {
                    setApiError('No TV shows data available. Please check your connection.')
                }
                
            } catch (error) {
                console.error('Error fetching TV data:', error)
                setApiError('Failed to load TV shows data. Using sample data.')
                const service = new TVmazeUserService()
                const sampleShows = service.getSampleShows()
                setApiShows(sampleShows)
            } finally {
                setLoading(false)
            }
        }

        fetchTVData()
    }, [])

    // Render function for API shows (your original TVmaze grid layout)
    const renderApiShowItem = (show, index) => {
        if (!show || typeof show !== 'object') {
            return null
        }
    
        const showData = show
        
        return (
            <div key={showData.id || index} className="show-item">
                <div className="show-image-container">
                    {showData.image?.medium ? (
                        <img src={showData.image.medium} alt={showData.name} className="show-image" />
                    ) : (
                        <div className="no-image">No Image</div>
                    )}
                </div>
                <div className="show-info">
                    <h4 className="show-title">{showData.name || 'Unknown Show'}</h4>
                    {showData.rating?.average && (
                        <p className="show-rating">⭐ {showData.rating.average}/10</p>
                    )}
                    {showData.genres && Array.isArray(showData.genres) && showData.genres.length > 0 && (
                        <p className="show-genres">{showData.genres.join(', ')}</p>
                    )}
                    {showData.status && (
                        <p className={`show-status status-${showData.status.toLowerCase()}`}>
                            {showData.status}
                        </p>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="home-container">
            {/* Header Section */}
            <div className="home-header">
                <h1>TV Show Tracker</h1>
                <p>Manage your personal collection and discover new shows</p>
            </div>

            {/* User's Shows Section - Using Card System */}
            <section className="user-shows-section">
                <div className="section-header">
                    <h2>Your Show Collection ({userShows.length})</h2>
                    <Link to="/new" className="add-show-btn">
                        + Add New Show
                    </Link>
                </div>
                
                <div className="card-grid">
                    {userShows && userShows.length > 0 ? (
                        userShows.map((show) => (
                            <div key={show.id} className="card-container" onClick={() => navigate('show/' + show.id)}>
                                <Card 
                                    id={show.id} 
                                    name={show.name}
                                    total_num_episodes={show.total_num_episodes}
                                    num_episodes_watched={show.num_episodes_watched}
                                    tv_rating={show.tv_rating}
                                    average_rating={show.average_rating}
                                    user_rating={show.user_rating}
                                    desc={show.description}
                                    img={show.image}  // This will be your cover image
                                    genre={show.genre}
                                    review={show.review}
                                    linkTo={'show/' + show.id}
                                /> 
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <h3>No shows in your collection yet</h3>
                            <p>Start by adding your first show!</p>
                            <Link to="/new" className="cta-button">
                                Add Your First Show
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* TVmaze API Shows Section - Using Grid Layout */}
            <section className="api-shows-section">
                <div className="section-header">
                    <h2>Popular TV Shows</h2>
                    <span className="show-count">{apiShows.length} shows</span>
                </div>
                
                {apiError && (
                    <div className="api-warning">
                        <p>{apiError}</p>
                    </div>
                )}
                
                {loading ? (
                    <div className="loading">Loading popular shows...</div>
                ) : (
                    <div className="api-shows-content">
                        <div className="shows-grid">
                            {apiShows.length === 0 ? (
                                <p className="no-shows">No shows available. Please check your internet connection.</p>
                            ) : (
                                <div className="shows-list">
                                    {apiShows.slice(0, 12).map((show, index) => 
                                        renderApiShowItem(show, index)
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Home