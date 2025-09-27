import React from 'react'
import './Card.css' // Optional: if you want styling

const Card = ({ 
    id, 
    name, 
    total_num_episodes, 
    num_episodes_watched, 
    tv_rating, 
    average_rating, 
    user_rating, 
    desc, 
    img, 
    genre, 
    review,
    linkTo 
}) => {
    return (
        <div className="card">
            {img && <img src={img} alt={name} className="card-image" />}
            <div className="card-content">
                <h3 className="card-title">{name}</h3>
                <p className="card-genre">{genre}</p>
                <p className="card-rating">Rating: {average_rating || tv_rating || user_rating}</p>
                <p className="card-episodes">
                    Episodes: {num_episodes_watched || 0}/{total_num_episodes || '?'}
                </p>
                {desc && <p className="card-desc">{desc}</p>}
                {review && <p className="card-review">Review: {review}</p>}
            </div>
        </div>
    )
}

export default Card