import React, { useEffect, useState } from "react"
import promptSnowflake from "../services/promptSnowflake"
import { supabase } from '../client'

const sepByLine = (s) => {
    return s.replaceAll('\\u0026', '&').split('\\n')
}

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let prompt = "Please give me five TV shows. If I provide some movies below, the first part is the name and the second part is the rating. If the rating is high, then recommend movies like that. If low, don't. If I do not provide shows, then just recommend whatever. Please provide five recommendations with a short description in five lines of output. Do not mention my input whatsoever. Do not repeat movies. Do not number the recommendations. Do not space with blank lines.";

        const fetchPosts = async () => {
            const data = await supabase
                .from('shows')
                .select()
            const shows = data.data
            let watchData = ""
            for (let i = 0; i < shows.length; i++) {
                let show_and_rating = shows[i]['name'] + ' : ' + shows[i]['user_rating'] + '\n'
                watchData += (show_and_rating)
            }
            prompt += watchData
        };

        fetchPosts();

        const fetchRecommendations = async () => {
            try {
                // Await the promise to get the actual text
                let rawText = await promptSnowflake(prompt);
                let movies = sepByLine(rawText);
                // Update state with the actual data
                setRecommendations(movies);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
                setRecommendations(["Failed to load recommendations."]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchRecommendations();

    }, []); // Empty dependency array ensures it runs only once

    return (
        <div>
            <h2 style={{textAlign: "center"}}>TV Show Recommendations</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {recommendations.map((movie, index) => (
                        <li key={index}>{movie}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Recommendations