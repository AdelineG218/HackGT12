import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Post.css'
import { supabase } from '../client'


const Post = () =>  {
    const {id} = useParams()
    const [show, setShow] = useState(null)
    const [review, setReview] = useState({season:"", text:""})
    const [loading, setLoading] = useState(true);

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from('shows')
            .select()
            .eq('id', id)
            .single();

        if (error) {
            console.error("Error fetching show:", error.message);
        } else {
            setShow(data);
        }
        setLoading(false);
    };
    
    useEffect(() => {
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setReview((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const createReview = async (event) => {
        event.preventDefault();

        const {data, error} = await supabase
            .from('shows')
            .update({review: [...(show.review || []), review.season + " - " + review.text]})
            .eq('id', id);
        
        if (error) {
            console.error("Insert error:", error.message);
            alert("Failed to update review.");
        } else {
            console.log("Review updated:", data);
            setReview({ season: '', text: '' })
            fetchPost()
        }
    }

    if (loading) return <p>Loading...</p>;
    if (!show) return <p>Show not found.</p>

    return (
        <div className="Post">
            <h1 className="pname">{show.name}</h1>
            <div className='pstats'>
                <p className="pdescription">{show.tv_rating}</p>
                <p className="pdescription">Rating: {show.average_rating}/10 Stars</p>
                <p className='pdescription'>Description: {show.desc}</p>
            </div>

            {show.review && show.review.length > 0 && (
                <div className='review-box'>
                    <p>Reviews</p>
                    <ul className="review-list">
                        {show.review.map((s, idx) => (
                            <li className="review-item" key={idx}>{s}</li>
                        ))}
                    </ul>
                </div>)}

            <form className='review-form'>
                <label htmlFor="season">Review for (episode/season): </label><br />
                <input type="season" id="season" name="season" value={review.season} onChange={handleChange} /><br /><br />

                <label htmlFor="review">Review: </label><br />
                <textarea id="text" name="text" value={review.text} onChange={handleChange} /><br /><br />

                <input type="submit" value="Submit" onClick={createReview} />
            </form>
        </div>
    );
};

export default Post