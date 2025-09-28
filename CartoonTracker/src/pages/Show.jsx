import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import './Show.css'
import React from 'react'

const Show = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [show, setShow] = useState(null)
    const [review, setReview] = useState('')
    const [userRating, setUserRating] = useState(0)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        const fetchShow = async () => {
            const { data } = await supabase
                .from('shows')
                .select()
                .eq('id', id)
                .single()
              
                
            setShow(data)
            setReview(data?.review || '')
            setUserRating(data?.user_rating || 0)
        }
        fetchShow()
    }, [id])

    const saveReview = async () => {
        const { error } = await supabase
            .from('shows')
            .update({ 
                review: review,
                user_rating: userRating
            })
            .eq('id', id)
        
        if (!error) {
            setIsEditing(false)
            // Refresh the show data
            const { data } = await supabase
                .from('shows')
                .select()
                .eq('id', id)
                .single()
            setShow(data)
        }
    }

    if (!show) return <div>Loading...</div>

    return (
        <div className="show-detail-container">
            {/* Show Information */}
            <div className="show-header">
                <button onClick={() => navigate('/')} className="back-button">← Back</button>
                <h1>{show.name}</h1>
                <img src={show.image} alt={show.name} className="show-cover" />
            </div>

            {/* Show Details */}
            <div className="show-info">
                <p><strong>Genre:</strong> {show.genre}</p>
                <p><strong>Episodes:</strong> {show.num_episodes_watched}/{show.total_num_episodes}</p>
                <p><strong>Rating:</strong> {show.tv_rating}</p>
            </div>

            {/* Personal Review Section */}
            <div className="review-section">
                <h2>Your Personal Review</h2>
                
                {!isEditing ? (
                    // Display Mode
                    <div className="review-display">
                        <div className="rating-display">
                            <strong>Your Rating:</strong> 
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < userRating ? 'star filled' : 'star'}>
                                    {i < userRating ? '★' : '☆'}
                                </span>
                            ))}
                            ({userRating}/5)
                        </div>
                        <div className="review-text">
                            {review || "No review yet. Click 'Add Review' to write one!"}
                        </div>
                        <button onClick={() => setIsEditing(true)} className="edit-button">
                            {review ? 'Edit Review' : 'Add Review'}
                        </button>
                    </div>
                ) : (
                    // Edit Mode
                    <div className="review-edit">
                        <div className="rating-input">
                            <label>Your Rating:</label>
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                        key={rating}
                                        type="button"
                                        className={rating <= userRating ? 'star-btn active' : 'star-btn'}
                                        onClick={() => setUserRating(rating)}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <span>({userRating}/5)</span>
                        </div>
                        
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your personal review here..."
                            rows="6"
                            className="review-textarea"
                        />
                        
                        <div className="review-actions">
                            <button onClick={saveReview} className="save-button">
                                Save Review
                            </button>
                            <button onClick={() => setIsEditing(false)} className="cancel-button">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Show