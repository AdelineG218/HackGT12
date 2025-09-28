import axios from "axios"

const promptSnowflake = async(prompt) => {
    const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN
    const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT

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
        
        return result.join().replaceAll(",","").replaceAll('"',"")
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

export default promptSnowflake