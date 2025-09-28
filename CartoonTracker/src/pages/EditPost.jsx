import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './EditPost.css'
import { supabase } from '../client'

const EditPost = () => {

    const {id} = useParams()
    const [post, setPost] = useState({name: "", type: "Ranger", speed: 0, strength: 0, magic: false})


    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('shows')
                .select()
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching crewmate:", error.message);
            } else {
                setPost(data);
                switch (data.type) {
                    case "Ranger":
                        document.getElementById("r0").checked = true;
                        break;
                    case "Fighter":
                        document.getElementById("r1").checked = true;
                        break;
                    case "Mage":
                        document.getElementById("r2").checked = true;
                        break;
                    case "Healer":
                        document.getElementById("r3").checked = true;
                        break;
                }
                if (data.magic) {
                    document.getElementById("magic").checked = true;
                }
            }
        };

        fetchPost();
    }, [id]);
    
    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const handleCheck = (event) => {
        const {name, checked} = event.target;
        if ((post.type == "Ranger" || post.type == "Fighter") && checked) {
            document.getElementById("magic").checked = false;
            alert("ALERT: Only Mages and Healers can have magic!");
        } else {
            setPost( (prev) => {
                return {
                    ...prev,
                    [name]:checked,
                }
            })
        }
    }

    const handleRadio = (event) => {
        const {name, id} = event.target
        ;

        let v = "Ranger";
        if (id == "r1") {
            v = "Fighter";
        } else if (id == "r2") {
            v = "Mage";
        } else if (id == "r3") {
            v = "Healer";
        }
        if ((id == "r0" || id == "r1") && document.getElementById("magic").checked) {
            document.getElementById("magic").checked = false;
            alert("ALERT: Only Mages and Healers can have magic!");
        }
        setPost( (prev) => {
            return {
                ...prev,
                [name]:v,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();

        const {data, error} = await supabase
            .from('shows')
            .update({name: post.name, type: post.type, speed: post.speed, strength: post.strength, magic: post.magic})
            .eq('id', id);
        
        if (error) {
            console.error("Insert error:", error.message);
            alert("Failed to update crewmate.");
        } else {
            console.log("Crewmate updated:", data);
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
            alert("Failed to delete crewmate.");
        } else {
            console.log("Crewmate deleted.");
            window.location = "/";
        }
    }

    return (
        <div>
            <form>
                <label htmlFor="name">Name</label> <br />
                <input type="text" id="name" name="name" value={post.name} onChange={handleChange} /><br />
                <br/>

                <fieldset>
                    <div className='radio'>
                        <label htmlFor="type">Ranger</label><br />
                        <input type="radio" id="r0" name="type" value={post.type} onChange={handleRadio} /><br />
                        <br/>
                    </div>
                    <div className='radio'>
                        <label htmlFor="type">Fighter</label><br />
                        <input type="radio" id="r1" name="type" value={post.type} onChange={handleRadio} /><br />
                        <br/>
                    </div>
                    <div className='radio'>
                        <label htmlFor="type">Mage</label><br />
                        <input type="radio" id="r2" name="type" value={post.type} onChange={handleRadio} /><br />
                        <br/>
                    </div>
                    <div className='radio'>
                        <label htmlFor="type">Healer</label><br />
                        <input type="radio" id="r3" name="type" value={post.type} onChange={handleRadio} /><br />
                        <br/>
                    </div>
                </fieldset>

                <label htmlFor="speed">Speed Level</label><br />
                <input type="text" id="speed" name="speed" value={post.speed} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="strength">Strength Level</label><br />
                <input type="text" id="strength" name="strength" value={post.strength} onChange={handleChange} /><br />
                <br/>
                
                <div className='check'>
                    <label htmlFor="magic">Has Magic?</label><br />
                    <input type="checkbox" id="magic" name="magic" value={post.magic} onChange={handleCheck} /><br />
                    <br/>
                </div>
                <input type="submit" value="Submit" onClick={updatePost} />
                <button className="deleteButton" onClick={deletePost} >Delete</button>
            </form>
        </div>
    )
}

export default EditPost