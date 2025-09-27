import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Post.css'
import { supabase } from '../client'


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
            <h1 className="pname">{show.name}</h1>
            <div className='pstats'>
                <p className="pdescription">{show.tv_rating}</p>
                <p className="pdescription">Rating: {show.average_rating}/10 Stars</p>
            </div>
        </div>
    );
};

export default Post