import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("regina"); // Default city matches the key in cityCoordinates
  const [temp, setTemp] = useState(null);

  // Fetch weather data when the city changes
  useEffect(() => {
    const cityCoordinates = {
      regina: { latitude: 50.4452, longitude: -104.6189 },
      saskatoon: { latitude: 52.1579, longitude: -106.6702 },
      princeAlbert: { latitude: 53.2033, longitude: -105.7531 },
      moosejaw: { latitude: 50.3934, longitude: -105.5519 },
      yorkton: { latitude: 51.2139, longitude: -102.4628 },
      swiftcurrent: { latitude: 50.2851, longitude: -107.7972 },
      northbattleford: { latitude: 52.7575, longitude: -108.2866 },
      estevan: { latitude: 49.1394, longitude: -102.9868 },
      weyburn: { latitude: 49.6638, longitude: -103.8511 },
      lloydminster: { latitude: 53.2776, longitude: -110.0055 },
      martensville: { latitude: 52.2895, longitude: -106.6666 },
      meadowlake: { latitude: 54.1301, longitude: -108.4348 },
      melfort: { latitude: 52.8561, longitude: -104.6108 },
      humboldt: { latitude: 52.2014, longitude: -105.1234 },
      warman: { latitude: 52.3215, longitude: -106.5842 },
    };

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityCoordinates[city].latitude}&longitude=${cityCoordinates[city].longitude}&current_weather=true`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const temperature = data.current_weather.temperature;
        setTemp(temperature);
      })
      .catch((error) => console.error(`Error fetching ${city} weather data:`, error));
  }, [city]); // Dependency array ensures this runs only when `city` changes

  return (
    <div className="App">
      <h1>Weather App</h1>
      <p>City: {city}</p>
      <p>Temperature: {temp !== null ? `${temp}°C` : "Loading..."}</p>
      <div id="buttons">
        <button onClick={() => setCity("regina")}>Show Regina Weather</button>
        <button onClick={() => setCity("saskatoon")}>Show Saskatoon Weather</button>
        <button onClick={() => setCity("princeAlbert")}>Show Prince Albert Weather</button>
        <button onClick={() => setCity("moosejaw")}>Show Moose Jaw Weather</button>
        <button onClick={() => setCity("yorkton")}>Show Yorkton Weather</button>
        <button onClick={() => setCity("swiftcurrent")}>Show Swift Current Weather</button>
        <button onClick={() => setCity("northbattleford")}>Show North Battleford Weather</button>
        <button onClick={() => setCity("estevan")}>Show Estevan Weather</button>
        <button onClick={() => setCity("weyburn")}>Show Weyburn Weather</button>
        <button onClick={() => setCity("lloydminster")}>Show Lloydminster Weather</button>
        <button onClick={() => setCity("martensville")}>Show Martensville Weather</button>
        <button onClick={() => setCity("meadowlake")}>Show Meadow Lake Weather</button>
        <button onClick={() => setCity("melfort")}>Show Melfort Weather</button>
        <button onClick={() => setCity("humboldt")}>Show Humboldt Weather</button>
        <button onClick={() => setCity("warman")}>Show Warman Weather</button>
      </div>
    </div>
  );
}

export default App;
