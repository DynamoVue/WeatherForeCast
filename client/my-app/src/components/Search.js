import React, { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import { AiOutlineSearch } from 'react-icons/ai'
import { WeatherContext } from '../context/WeatherContext'
import './Search.css'

const Search = (prop) => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState({});
    const cancelToken = useRef(null);

    const { setCoords } = useContext(WeatherContext);

    useEffect(() => {     
        if (input) {
            fetchSearchResult(input);
        }
    }, [input]);

    const fetchSearchResult = async (search) => {
        try {
            setResults({
                loading: true
            });

            if (cancelToken.current) {
                cancelToken.current.cancel();
            }
    
            cancelToken.current = axios.CancelToken.source();
    
            const resp = await axios.get(`https://restcountries.eu/rest/v2/name/${search}`, {
                cancelToken: cancelToken.current.token
            });

            const data = await resp.data;

            const messageNotFound = data.length === 0 ? 'There are no more search results. Please try a new search.' : '';
            
            setResults({
                data,
                message: messageNotFound,
                loading: false
            });
        } catch (err) {
            setResults({
                message: 'Failed to fetch results.Please check network',
                loading: false,
            });
        }
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleSelectedResult = (coordsArray) => {
        const coords = {
            latitude: coordsArray[0],
            longitude: coordsArray[1]
        }

        setInput('');
        setResults({});

        setCoords(coords);
    }

    return (
        <div className="searchbar">
            <input type="text" placeholder="Search By City" name="search-bar" onChange={handleInputChange} value={input} className="searchbar__input" />
            <AiOutlineSearch   className="searchbar__icon" />
            {
                results.data && (
                    <div className="searchbar-results">
                        <div className="searchbar-results__title">
                            SUGGESTIONS
                        </div>
                        <div className="searchbar-results__content">
                            {
                                results.data.map(result => (
                                    <div 
                                        className="searchbar-results__result" 
                                        key={result.alpha2Code}
                                        onClick={() => handleSelectedResult(result.latlng)}
                                    >
                                        {result.name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Search;