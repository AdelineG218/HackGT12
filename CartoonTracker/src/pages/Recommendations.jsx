import { useEffect, useState } from "react"
import promptSnowflake from "../services/promptSnowflake"

const sepByLine = (s) => {
    return s.replaceAll('\\u0026', '&').split('\\n')
}

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                // Await the promise to get the actual text
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
    }, []); // Empty dependency array ensures it runs only once

    return (
        <div>
            <h2>Disney Movie Recommendations</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {recommendations.map((movie, index) => (
                        <li key={index}>{movie}
                            <ul>
                                <li></li>
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Recommendations