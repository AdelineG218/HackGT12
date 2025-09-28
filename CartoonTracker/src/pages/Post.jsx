import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Post.css'
import { supabase } from '../client'
import { CircularProgressBar } from '../components/ProgressBar.jsx';

const Post = () =>  {
    const {id} = useParams()
    const [show, setShow] = useState(null)


    useEffect(() => {
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
        };

        fetchPost();
    }, [id]);

    if (!show) return <p>Loading...</p>;

    return (
        <div className="Post">
            <div>
                <img className='imgformat' src={show.img} alt={show.name} />
            </div>

            <div className='pstats'>
                <h1 className="pname show-details">{show.name}</h1>
                <p className="pdescription show-details detail-item">{show.tv_rating}</p>
                <p className="pdescription show-details detail-item">Rating: {show.average_rating}/10 Stars</p>
                <p className='pdescription show-details detail-item'>Description: {show.desc}</p>
                <p className='pdescription show-details detail-item'>Genres: {show.genre.join(", ")}</p>
            </div>
            
            <div>
                <CircularProgressBar num_episodes_watched={show.num_episodes_watched}
                total_num_episodes={show.total_num_episodes} />
            </div>
        </div>
    );
};

export default Post