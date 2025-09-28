import { useState } from "react"
// import promptSnowflake from "../services/promptSnowflake"

const Recommendations = () => {
    const [state, setState] = useState("")

    // const ask = async() => {
    //     console.log(await promptSnowflake("hello!"))
    // }

    // console.log("Recommendations ran")
    // console.log("zzz")
    
    return (
        <div>
            <button>Recommend!</button>
            <p></p>
        </div>
    )

}

export default Recommendations