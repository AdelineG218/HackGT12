import snowflake from "snowflake-sdk"
import axios from "axios"

const promptSnowflake = async(prompt) => {
    const ACCOUNT_IDENTIFIER = "QZUSPNN-PENGDUCK"
    const AUTH_TOKEN = "eyJraWQiOiI4NDM4NTkzOTQ2MSIsImFsZyI6IkVTMjU2In0.eyJwIjoiMzI5NjMyNTE2OjMyOTYzMjUxNiIsImlzcyI6IlNGOjEwNDkiLCJleHAiOjE3NjAyODkzMzh9.UyoVPxf1x4UKsQ3bMexO1sjv98hQv4MFv2-BMBtxwuZbu-tfoRXggiDVv5TCBTjVwueogz-0O82IZhLkPEJnkg"
    const API_ENDPOINT = "https://QZUSPNN-PENGDUCK.snowflakecomputing.com/api/v2/cortex/inference:complete"
    const USERNAME = "PENGDUCK"

    const connection = snowflake.createConnection({
        account: ACCOUNT_IDENTIFIER,
        username: USERNAME,
        password: AUTH_TOKEN
    })

    // Try to connect to Snowflake, and check whether the connection was successful.
    if (!connection) {
        connection.connect(
            (err, conn) => {
                if (err) {
                    console.error('Unable to connect: ' + err.message);
                    }
                else {
                    console.log('Successfully connected to Snowflake.');
                    // Optional: store the connection ID.
                        connection_ID = conn.getId();
                    }
            }
        );
    }

    const payload = {
        model: 'claude-3-5-sonnet',
        messages: [ {
                role: 'user',
                content: prompt
            }
        ]
    };

    const parseCortexData = (data) => {
        let lines = data.split('\n')
        let result = []
        for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        let start = line.indexOf('text":') + 7
        let end = line.indexOf('}', start)
        if (line) {
            result.push(line.substring(start, end))
        }
        }
        
        return result.join().replaceAll('"',"").replaceAll('\\',"").replaceAll(',','')
    }

    const callCortexAPI = async() => {
        try {
            const response = await axios.post(API_ENDPOINT, payload, {
                headers: {
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            return parseCortexData(response.data);

        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error Response Data:', error.response.data);
                console.error('Error Status:', error.response.status);
                console.error('Error Headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error Message:', error.message);
            }
            return null
        }
    }

    return await callCortexAPI(prompt);
}

const main = async() => {
    let text = await promptSnowflake("hello!")
    console.log(text)
}

main()

export default promptSnowflake