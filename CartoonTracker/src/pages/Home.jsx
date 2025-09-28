import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { supabase } from '../client'
import { Link } from 'react-router-dom'
import './Home.css'
import React from 'react'

const Home = () => {

    const [shows, setShows] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('shows')
                .select()
                .order('created_at', {ascending: false})
                console.log(data)

                setShows(data)
        }
        fetchPosts();
    }, [])
    
    return (
        <>
            <div className="ReadPosts">
                {
                    shows && shows.length > 0 ?
                    [...shows]
                    .map((show) => (
                        <Link to={'show/' + show.id} key={show.id} style={{textDecoration: 'none'}}>
                            <Card 
                                key={show.id}
                                id={show.id} 
                                name={show.name}
                                total_num_episodes={show.total_num_episodes}
                                num_episodes_watched={show.num_episodes_watched}
                                tv_rating={show.tv_rating}
                                average_rating={show.average_rating}
                                user_rating={show.user_rating}
                                desc={show.description}
                                img={show.image}
                                genre={show.genre}
                                review={show.review}
                                linkTo={'show/' + show.id}
                            />
                        </Link>)
                    ) : <h2>{'No Shows Yet 😞'}</h2>
                }
            </div>
        </>
    )
}

export default Home