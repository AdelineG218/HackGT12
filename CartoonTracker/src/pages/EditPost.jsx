import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './EditPost.css'
import { supabase } from '../client'

const EditPost = () => {

    const {id} = useParams()
    const [show, setShow] = useState({name: "", total_num_episodes: 0, num_episodes_watched: 0, tv_rating: "", average_rating: 0, user_rating: 0, description: "", image: "", genre: [], review: ""})

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
                setShow(...data, {genre: data.genre.join(",")});
                console.log(show.genre);
            }
        };

        fetchPost();
    }, [id]);
    
    const handleChange = (event) => {
        const {name, value} = event.target
        setShow( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }



    const updatePost = async (event) => {
        event.preventDefault();

        const genreArray = Array.isArray(show.genre) ? show.genre : show.genre.split(",");
        const {data, error} = await supabase
            .from('shows')
            .update({name: show.name,
                total_num_episodes: show.total_num_episodes,
                num_episodes_watched: show.num_episodes_watched,
                tv_rating: show.tv_rating,
                average_rating: show.average_rating,
                user_rating: show.user_rating,
                desc: show.description,
                img: show.image,
                genre: genreArray})
            .eq('id', id);
        
        if (error) {
            console.error("Insert error:", error.message);
            alert("Failed to update Post.");
        } else {
            console.log("Post updated:", data);
            window.location = "/";
        }
    }

    const deletePost = async (event) => {
        event.preventDefault();

        const {error} = await supabase
            .from('shows')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error("Insert error:", error.message);
            alert("Failed to delete Post.");
        } else {
            console.log("Post deleted.");
            window.location = "/";
        }
    }

    return (
        <div>
            <form>
                <label htmlFor="name">Show Name</label><br />
                <input type="text" id="name" name="name" value={show.name} onChange={handleChange} /><br /><br />

                <label htmlFor="tv_rating">TV Rating</label><br />
                <input type="text" id="tv_rating" name="tv_rating" value={show.tv_rating} onChange={handleChange} /><br /><br />

                <label htmlFor="genre">Genre (comma separated)</label><br />
                <input type="text" id="genre" name="genre" value={show.genre} onChange={handleChange} /><br /><br />

                <label htmlFor="description">Description</label><br />
                <textarea id="description" name="description" value={show.description} onChange={handleChange} /><br /><br />
                
                <label htmlFor="average_rating">Average Rating</label><br />
                <input type="number" step="0.1" id="average_rating" name="average_rating" value={show.average_rating} onChange={handleChange} /><br /><br />

                <label htmlFor="total_num_episodes">Total Number of Episodes</label><br />
                <input type="number" id="total_num_episodes" name="total_num_episodes" value={show.total_num_episodes} onChange={handleChange} /><br /><br />

                <label htmlFor="num_episodes_watched">Episodes Watched</label><br />
                <input type="number" id="num_episodes_watched" name="num_episodes_watched" value={show.num_episodes_watched} onChange={handleChange} /><br /><br />

                <label htmlFor="user_rating">Your Rating</label><br />
                <input type="number" step="0.1" id="user_rating" name="user_rating" value={show.user_rating} onChange={handleChange} /><br /><br />

                <label htmlFor="image">Image URL</label><br />
                <input type="text" id="image" name="image" value={show.image} onChange={handleChange} /><br /><br />

                <input type="submit" value="Submit" onClick={updatePost} /><br /><br />
                <button onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost