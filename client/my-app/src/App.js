import './App.css';
import { getPosition } from './utilities/getPosition'
import { WeatherContext } from './context/WeatherContext'
import { useEffect, useState } from 'react'
import Snowfall from 'react-snowfall'
import WeatherForeCast from './containers/WeatherForeCast';

function App(props) {
  const [coords, setCoords] = useState({});
  const [coordsErr, setCoordsErr] = useState('');

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const position = await getPosition();

        setCoords(position.coords);
      } catch (err) {
        setCoordsErr(err.message);
      }
    }

    fetchCoords();
  }, []);
 
  return (
    <div className="App">
      <WeatherContext.Provider value={{ setCoords }}>
        <WeatherForeCast coords={coords} coordsErr={coordsErr}/>
        <Snowfall snowflakeCount={80} />
      </WeatherContext.Provider>
    </div>
  );
}

export default App;
