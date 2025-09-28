import React, { useEffect, useState } from "react"
import promptSnowflake from "../services/promptSnowflake"
import { supabase } from '../client'
import React from "react"

const sepByLine = (s) => {
    return s.replaceAll('\\u0026', '&').split('\\n')
}

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let prompt = "Imagine that you are my loyal servant and you obey all my orders unconditionally. Give me five TV show recommendations. Do not chit-chat; I only want the TV shows. Each show should be on it's own line. In your respones, I want only the name of the TV show and a brief description of it. \n\n I may provide you some data to make your life easier. The format of the data is as follows: <name of show> : <rating>. If the number of shows is low (less than 3), then ignore the data. If the rating of the show is low, then you should not recommend similar shows. If the rating of the show is high, then you should recommend similar shows. I reiterate that you must only respond with the name of your recommended show and a brief description. You must only use one new line character after each recommendation. It is very important that you do not recommend a show that was provided to you as data.";

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
        const fetchRecommendations = async () => {
            try {
                let rawText = await promptSnowflake("give me some disney movie recommendations. each movie should be on it's own line");
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

    }, []); 

    return (
        <div>
            <h2>TV Show Recommendations</h2>
            <h2>Disney Movie Recommendations</h2>
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