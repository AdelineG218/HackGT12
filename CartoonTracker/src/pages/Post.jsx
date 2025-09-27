import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Post.css'
import { supabase } from '../client'


const Post = () =>  {
    const {id} = useParams()
    const [post, setPost] = useState(null)
    const [info, setInfo] = useState(null)


    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('crewmates')
                .select()
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching crewmate:", error.message);
            } else {
                setPost(data);

                if (data.speed+data.strength >= 20) {
                    setInfo(`${data.name} is quite a powerful ${data.type}! ${data.strength > data.speed ? "There's no way you'd win an arm-wrestling match" : "There's no way you'd win a race"} against this crewmate.`);
                } else if (data.speed > 7) {
                    setInfo(`Wow! ${data.name} sure is fast!`);
                } else if (data.strength > 7) {
                    setInfo(`Wow! ${data.name} sure is strong!`);
                } else if (data.strength < 4) {
                    setInfo(`Yikes! ${data.name} is even weaker than a kitten ${data.magic ? "despite having magic" : "and has no magic"}.`);
                } else if (data.magic) {
                    setInfo(`It's a good thing that ${data.name} has magic!`);
                } else if (data.speed < 4) {
                    setInfo(`No need to worry about ${data.name}. Even a turtle could beat this crewmate in a race.`);
                } else {
                    setInfo(`Unfortunately, this crewmate is just an average ${data.type}.`);
                }
            }
        };

        fetchPost();
    }, [id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className="Post">
            <h1 className="pname">{post.name}</h1>
            <h4 className='pauthor'>{post.type}</h4>
            <div className='pstats'>
                <p className="pdescription">Speed: {post.speed}</p>
                <p className="pdescription">Strength: {post.strength}</p>
                <p className='pdescription'>Has Magic: {post.magic ? "Yes" : "No"}</p>
            </div>
            {info && <p className='pdescription2'><strong>{info}</strong></p>}
        </div>
    );
};

export default Post