import './App.css';
import { useState, useEffect } from "react";
import validator from 'validator';
import SeasonAndTimeComponent from "./SeasonAndTimeComponent";

function App() {
  const [city, setCity] = useState("regina"); // Default city matches the key in cityCoordinates
  const [temp, setTemp] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true); // State to toggle between Celsius and Fahrenheit

  // Mapping for display names
  const cityDisplayNames = {
    regina: "Regina",
    saskatoon: "Saskatoon",
    princeAlbert: "Prince Albert",
    moosejaw: "Moose Jaw",
    yorkton: "Yorkton",
    swiftcurrent: "Swift Current",
    northbattleford: "North Battleford",
    estevan: "Estevan",
    weyburn: "Weyburn",
    lloydminster: "Lloydminster",
    martensville: "Martensville",
    meadowlake: "Meadow Lake",
    melfort: "Melfort",
    humboldt: "Humboldt",
    warman: "Warman",
  };

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
  
    const fetchWeather = () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityCoordinates[city].latitude}&longitude=${cityCoordinates[city].longitude}&current_weather=true`;
  
      fetch(url)
        .then((response) => response.json())
        .then((data) =>
          validator.isNumeric(data?.current_weather?.temperature?.toString())
            ? setTemp(data.current_weather.temperature)
            : console.error("Invalid temperature received:", data.current_weather.temperature)
        )
        .catch((error) =>
          console.error(`Error fetching ${city} weather data:`, error)
        );
    };
  
    // Initial fetch and interval setup
    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // 5 minutes
  
    // Cleanup interval on unmount or dependency change
    return () => clearInterval(interval);
  }, [city]); // Dependency on the city
  const convertTemp = (temperature) => Math.round((temperature * 9) / 5 + 32);

  return (
    <div className="App">
      <div id="top">
        
        {/* City Name shown below */}
        <h2>{cityDisplayNames[city]}</h2>
        {/* Temperature shown below */}
        <h1>
          {temp !== null
            ? isCelsius
              ? `${Math.round(temp)}°C`
              : `${Math.round((temp * 9) / 5 + 32)}°F`
            : "Loading..."}
        </h1>
        
      </div>
<div id="desktop-grid">
  <div>
    <SeasonAndTimeComponent /> {/* Dynamically sets background for what time a day and season it is */}
  </div>
  <div>
      <h3>Saskatchewan Temperatures</h3>

      <div id="buttons">
        {Object.keys(cityDisplayNames).map((key) => (
          <button key={key} onClick={() => setCity(key)}>
            {cityDisplayNames[key]}
          </button>
        ))}
      </div>

      <div id="switcher">
        <button onClick={() => setIsCelsius(!isCelsius)}>
          Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
        </button>
      </div>
  </div>
</div>
</div>
  );
}

export default App;
