import { WiHumidity, WiThermometer, WiStrongWind, WiWindDeg, WiRaindrop, WiDaySunnyOvercast } from 'react-icons/wi'
import moment from 'moment';
import './Weather.css'

const windDirections = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];

function getWeatherIconClass(resp) {
    var code = resp.weather[0].id;

    var sunrise = new Date(resp.sunrise * 1000);
    var sunset = new Date(resp.sunset * 1000);
    var today = new Date();

    if (today.getHours() >= sunrise.getHours() && today.getHours() < sunset.getHours) {
        return `wi wi-owm-day-${code}`
    } else {
        return `wi wi-owm-night-${code}`
    }
};

function getWeatherTemp(resp) {
    const tempDay = resp.feels_like.day;
    const cTemp = (tempDay - 32) / 1.8;

    return (Math.round(cTemp * 100) / 100).toFixed(0);
}

function getDateFormat(resp) {
    const date = new Date(resp.dt * 1000);

    return moment(date).format('dddd DD/MM');
}

function getWindDirection(resp) {
    const windDeg = resp.wind_deg;
    const index = Math.round(windDeg / 22.5) + 1;

    return windDirections[index];
}

const WeatherDaily = ({ dailyWeather }) => {
    return (
        <div className="weather-daily" style={{ padding: '2rem' }}>
            <div className="weather-daily__header">
                <h2>{getDateFormat(dailyWeather)}</h2>
            </div>
            <div className="weather-daily__content">
                <div className="weather-daily__icon">
                    <i className={getWeatherIconClass(dailyWeather)} style={{ fontSize: '7rem' }}></i>
                    <p style={{ fontSize: '1.5rem', marginTop: '1.5rem' }}>{dailyWeather.weather[0].description}</p>
                </div>
                <div className="weather-daily__description">
                    <div className="weather-daily__humidity weather-daily--block">
                        <WiHumidity style={{ fontSize: '2rem' }}/>
                        <span className='weather-daily__text'>
                            {dailyWeather.humidity}%
                        </span>
                    </div>
                    <div className="weather-daily__temp weather-daily--block">
                        <WiThermometer style={{ fontSize: '2rem' }}/>
                        <span className='weather-daily__text'>{getWeatherTemp(dailyWeather)} &#8451;</span>
                    </div>
                    <div className="weather-daily__wind weather-daily--block">
                        <WiStrongWind style={{ fontSize: '2rem' }}/>
                        <span className='weather-daily__text'>{dailyWeather.wind_speed} km/h</span>
                    </div>
                    <div className="weather-daily__wind weather-daily--block">
                        <WiWindDeg style={{ fontSize: '2rem' }}/>
                        <span className='weather-daily__text'>{getWindDirection(dailyWeather)}</span>
                    </div>
                    <div className="weather-daily__wind weather-daily--block">
                        <WiRaindrop style={{ fontSize: '2.2rem' }}/>
                        <span className='weather-daily__text'>{dailyWeather.rain || 0} mm</span>
                    </div>
                    <div className="weather-daily__wind weather-daily--block">
                        <WiDaySunnyOvercast style={{ fontSize: '2.2rem' }}/>
                        <span className='weather-daily__text'>{dailyWeather.uvi}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherDaily;