import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { supabase } from '../client'
import { Link } from 'react-router-dom'

const ReadPosts = () => {

    const [posts, setPosts] = useState([])
    // const [summary, setSummary] = useState({speedSum: 0, strengthSum: 0, hasTypes: [], minSpeed: 10000, minSpName: "", minStrength: 10000, minStName: "", crewmateCount: 0, magicCount: 0})
    const [result, setResult] = useState("The result is unknown.");

    useEffect(() => {
        const fetchPosts = async () => {
            const {data} = await supabase
                .from('crewmates')
                .select()
                .order('created_at', {ascending: false})
                console.log(data)

                setPosts(data)
                const speedSum = data.reduce((sum, crewmate) => (crewmate.speed || 0), 0);
                const strengthSum = data.reduce((sum, crewmate) => (crewmate.strength || 0), 0);
                let magicCount = 0;
                let minSpeed = ["", 10000];
                let minStrength = ["", 10000];
                const types = new Set();
                for (let i = 0; i < data.length; i++) {
                    types.add(data[i].type);
                    if (data[i].magic) {
                        magicCount++;
                    }
                    if (data[i].speed < minSpeed[1]) {
                        minSpeed[0] = data[i].name;
                        minSpeed[1] = data[i].speed;
                    }
                    if (data[i].strength < minStrength[1]) {
                        minStrength[0] = data[i].name;
                        minStrength[1] = data[i].strength;
                    }
                }
                let res = "Your crew has failed to defeat the final boss.";
                if (data.length > 4 && data.length < 10 && speedSum >= 40 && strengthSum >= 30 && types.size == 4 && minSpeed > 3 && minStrength > 2 && magicCount > 0) {
                    setResult(`Congratulations! Your crew of ${data.length} is fast and strong enough to defeat the final boss. There ${magicCount > 1 ? `are ${magicCount} crewmates` : `is 1 crewmate`} with magic and a diverse amount of crewmate types.`)
                } else {
                    if (data.length < 5) {
                        res += " You need to have more than 4 crewmates."
                    } else if (data.length > 9) {
                        res += " You need to have fewer than 10 crewmates."
                    }
                    res += ` You have ${data.length} crewmates.`;
                    if (speedSum < 40) {
                        res += " Your team is not fast enough. You need a combined speed of 40 or more.";
                    }
                    res += ` Currently, you have a combined speed of  ${speedSum}.`;
                    if (strengthSum < 30) {
                        res += " Your team is not strong enough. You need a combined strength of 30 or more.";
                    }
                    res += ` You have a combined strength of  ${strengthSum}.`;
                    if (types.size < 4) {
                        const possTypes = ["Ranger", "Fighter", "Mage", "Healer"];
                        const notInCrew = possTypes.filter(t => !types.has(t));
                        res += ` You need at least one of each crewmate type. You need [${notInCrew}].`;
                    }
                    if (magicCount < 1) {
                        res += " You need at least one crewmate who can do magic.";
                    } else {
                        res += ` Luckily, you have ${magicCount > 1 ? `${magicCount} crewmates` : `1 crewmate`} who can do magic.`;
                    }
                    if (minSpeed[1] < 4) {
                        res += ` Uh oh! ${minSpeed[0]} only has a speed of ${minSpeed[1]}. All crewmates must have speeds of 4 or more.`;
                    }
                    if (minStrength[1] < 3) {
                        res += ` Additionally, ${minStrength[0]} only has a strength of ${minStrength[1]}. All crewmates must have speeds of 3 or more.`;
                    }
                    setResult(res);
                }
        }
        fetchPosts();
    }, [])
    
    return (
        <>
            {posts && <p className='description'>{result}</p>}
            <div className="ReadPosts">
                {
                    posts && posts.length > 0 ?
                    [...posts]
                    .map((post) => (
                        <Link to={'crewmate/' + post.id} key={post.id} style={{textDecoration: 'none'}}>
                            <Card 
                                key={post.id}
                                id={post.id} 
                                name={post.name}
                                type={post.type}
                                speed={post.speed}
                                strength={post.strength}
                                magic={post.magic}
                            />
                        </Link>)
                    ) : <h2>{'No Crewmates Yet 😞'}</h2>
                }
            </div>
        </>
    )
}

export default ReadPosts