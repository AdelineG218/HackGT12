import { useState } from 'react'
import './CreatePost.css'
import { supabase } from '../client'

const CreatePost = () => {

    const [show, setShow] = useState({name: "", total_num_episodes: 0, num_episodes_watched: 0, tv_rating: "", average_rating: 0, user_rating: 0, description: "", image: "", genre: [], review: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        setShow( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    // const handleCheck = (event) => {
    //     const {name, checked} = event.target;
    //     if ((post.type == "Ranger" || post.type == "Fighter") && checked) {
    //         document.getElementById("magic").checked = false;
    //         alert("ALERT: Only Mages and Healers can have magic!");
    //     } else {
    //         setPost( (prev) => {
    //             return {
    //                 ...prev,
    //                 [name]:checked,
    //             }
    //         })
    //     }
    // }

    // const handleRadio = (event) => {
    //     const {name, id} = event.target
    //     ;

    //     let v = "Ranger";
    //     if (id == "r1") {
    //         v = "Fighter";
    //     } else if (id == "r2") {
    //         v = "Mage";
    //     } else if (id == "r3") {
    //         v = "Healer";
    //     }
    //     if ((id == "r0" || id == "r1") && document.getElementById("magic").checked) {
    //         document.getElementById("magic").checked = false;
    //         alert("ALERT: Only Mages and Healers can have magic!");
    //     }
    //     setPost( (prev) => {
    //         return {
    //             ...prev,
    //             [name]:v,
    //         }
    //     })
    // }

    const createPost = async (event) => {
        event.preventDefault();

        const {data, error} = await supabase
            .from('crewmates')
            .insert({name: post.name, type: post.type, speed: post.speed, strength: post.strength, magic: post.magic})
            .select();
        
        if (error) {
            console.error("Insert error:", error.message);
            alert("Failed to create crewmate.");
        } else {
            console.log("Crewmate created:", data);
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

                <label htmlFor="review">Review</label><br />
                <textarea id="review" name="review" value={show.review} onChange={handleChange} /><br /><br />

                <label htmlFor="image">Image URL</label><br />
                <input type="text" id="image" name="image" value={show.image} onChange={handleChange} /><br /><br />

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost