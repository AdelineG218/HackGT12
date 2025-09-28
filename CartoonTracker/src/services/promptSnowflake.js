const ACCOUNT_IDENTIFIER = import.meta.env.VITE_ACCOUNT_IDENTIFIER
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT
const USERNAME = import.meta.env.VITE_USERNAME

const promptSnowflake = async(prompt) => {
    const snowflake = require('snowflake-sdk')
    const connection = snowflake.createConnection({
        account: ACCOUNT_IDENTIFIER,
        username: USERNAME,
        password: AUTH_TOKEN
    })

    // Try to connect to Snowflake, and check whether the connection was successful.
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

    const axios = require('axios');


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
    const text = await promptSnowflake("how many r's are in strawberry?")
    console.log(text)
}

main()