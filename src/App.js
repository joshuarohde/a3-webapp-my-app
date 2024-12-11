import React, { useState, useEffect } from 'react';
import './App.css';

// Import images from the src/media folder
import WinterDay from './media/WinterDay.jpg';
import WinterNight from './media/WinterNight.jpg';
import SummerDay from './media/SummerDay.jpg';
import SummerNight from './media/SummerNight.jpg';
import SpringDay from './media/SpringDay.jpg';
import SpringNight from './media/SpringNight.jpg';
import FallDay from './media/FallDay.jpg';
import FallNight from './media/FallNight.jpg';
import snow from './media/snow.gif';
import rain from './media/rain.gif';

function App() {
  const [season, setSeason] = useState('Winter');
  const [timeOfDay, setTimeOfDay] = useState('Day');
  const [condition, setCondition] = useState('clear'); // 'clear', 'snow', or 'rain'
  const [temperature, setTemperature] = useState(null);

  const getSeason = (month) => {
    if (month === 11 || month === 0 || month === 1) {
      return 'Winter';
    } else if (month >= 2 && month <= 4) {
      return 'Spring';
    } else if (month >= 5 && month <= 7) {
      return 'Summer';
    } else if (month >= 8 && month <= 10) {
      return 'Fall';
    } else {
      return 'Winter'; // Fallback in case something unexpected occurs
    }
  };
  

  const getTimeOfDay = (hour) => {
    return hour >= 6 && hour < 18 ? 'Day' : 'Night';
  };

  // Function to get the background image based on season and time of day
  const getBackgroundImage = () => {
    if (season === 'Winter' && timeOfDay === 'Day') {
      return WinterDay;
    } else if (season === 'Winter' && timeOfDay === 'Night') {
      return WinterNight;
    } else if (season === 'Summer' && timeOfDay === 'Day') {
      return SummerDay;
    } else if (season === 'Summer' && timeOfDay === 'Night') {
      return SummerNight;
    } else if (season === 'Spring' && timeOfDay === 'Day') {
      return SpringDay;
    } else if (season === 'Spring' && timeOfDay === 'Night') {
      return SpringNight;
    } else if (season === 'Fall' && timeOfDay === 'Day') {
      return FallDay;
    } else if (season === 'Fall' && timeOfDay === 'Night') {
      return FallNight;
    } else {
      return WinterDay; // Default image if none match
    }
  };

  // Function to get the overlay image based on the weather condition
  const getOverlayImage = () => {
    if (condition === 'snow') {
      return snow;
    } else if (condition === 'rain') {
      return rain;
    } else {
      return ''; // No overlay if clear
    }
  };

  // Fetch weather data for Regina, Saskatchewan
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=50.4452&longitude=-104.6189&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m'
      );
      const data = await response.json();

      // Extract current weather data
      const { temperature, weathercode } = data.current_weather;
      const date = new Date();

      // Set the temperature
      setTemperature(temperature);

      // Automatically set season based on current month
      setSeason(getSeason(date.getMonth()));

      // Automatically set time of day based on the current hour
      setTimeOfDay(getTimeOfDay(date.getHours()));

      // Set the condition based on weather code (adjust as needed)
      if (weathercode === 71 || weathercode === 73) {
        setCondition('snow');
      } else if (weathercode === 61 || weathercode === 63) {
        setCondition('rain');
      } else {
        setCondition('clear');
      }
    } catch (error) {
      console.error('Error fetching the weather data: ', error);
    }
  };

  // Apply the background dynamically to the body element
  useEffect(() => {
    const backgroundImage = getBackgroundImage();

    document.body.style.backgroundImage = `url(${backgroundImage})`;


  }, [season, timeOfDay]); // Run whenever season or timeOfDay changes

  useEffect(() => {
    const overlayImage = getOverlayImage();
    if (overlayImage) {
      document.body.style.backgroundImage = `url(${overlayImage}), url(${getBackgroundImage()})`;
      document.body.style.backgroundBlendMode = 'screen'; // For blending the background with the overlay
    } else {
      document.body.style.backgroundImage = `url(${getBackgroundImage()})`; // Reset if clear
    }
  }, [condition]); // Run whenever condition changes

  // Fetch weather data on component mount
  useEffect(() => {
    fetchWeatherData();
  }, []); // Run once when the component mounts

  return (
    <div className="App">
      <h2></h2>
      <h1>{temperature ? `${temperature}°C` : 'Loading...'}</h1>
    </div>
  );
}

export default App;
