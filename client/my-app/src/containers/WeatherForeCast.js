import React from 'react'
import useFetch from '../hooks/useFetch'
import Loader from '../components/Loader'
import Search  from "../components/Search";
import FadeIn from "react-fade-in";
import { WiDayCloudyHigh } from 'react-icons/wi'
import WeatherDaily from '../components/WeatherDaily'

const WeatherForeCast = ({ coords, coordsErr }) => {
    const render = (coords, fn) => {
        const { latitude: lat, longitude: lon } = coords;
        if (lat && lon) {
            const { data, loading, done, error } = fn(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=ed1fbb3ba37ed0f62f5c289e223ad401&units=imperial`);

            return (
                <>
                    {
                        !done && <Loader loading={loading} done={done} loadingText={'Fetching Weather Data'} />
                    }
                    {              
                        data && (
                            <FadeIn className='weather-display'>
                                {
                                    data.daily.map((dailyWeather, index) => <WeatherDaily key={index} dailyWeather={dailyWeather} />)
                                }
                            </FadeIn>
                        )
                    }
                    {
                        error && <h2 style={{ marginTop: '1.5rem' }}>{error}</h2>
                    }
                </>
            )
        } else {
            return (
                <>
                    {
                        !coordsErr ? (<FadeIn>
                            <Loader loading={true} done={false} loadingText={'Getting Your Coordinates'} />
                        </FadeIn>) : <h2 style={{ marginTop: '1.5rem' }}>{coordsErr}</h2>
                    }
                </>
            )
        }
    }

    return (
        <div className="weather-forecast">
            <header className="weather-forecast__header" style={{ color: '#dfdfdf' }}>
                <h1>Weather ForeCast</h1>
                <WiDayCloudyHigh style={{ fontSize: '9rem', marginLeft: '1rem' }}/>
            </header>
            <Search />
            {
                render(coords, useFetch)
            }
        </div>
    )
}

export default WeatherForeCast;