import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = (URL) => {
    const [response, setResponse] = useState({});

    useEffect(() => {
        const fetchData = async (URL) => {
            try {
                setResponse({
                    loading: true
                })
    
                const response = await axios.get(URL);
                const data = response.data;
    
                setResponse({
                    loading: false
                })
    
                setTimeout(() => {
                    setResponse({
                        loading: false,
                        done: true,
                        data
                    })
                }, 2000);
            } catch (err) {
                setResponse({
                    loading: false,
                    done: true,
                    error: err.message
                })
            }
        }

        fetchData(URL);
    }, [URL]);

    return response;
}

export default useFetch;