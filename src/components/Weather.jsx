// import React from 'react';
// import './weather.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// // import search_icon from '../assets/search_icon.png'
// const Weather = () => {
//   return (
//       <div className='weather'>
//          <h1>weather</h1>
//       <div className="searcch-bar">
//         <input type="text" placeholder='Search' />
//         {/* <img src={search_icon} alt="" /> */}
//         <FontAwesomeIcon icon={faMagnifyingGlass} />
//       </div>
//     </div>
//   )
// }

// export default Weather
import React, { useEffect, useRef, useState } from 'react';
import './weather.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import clear from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzel_icon from '../assets/drizzel.png'
import humidity from '../assets/humidity.png'
import snow_icon from '../assets/rain.png'
import wind_icon from '../assets/wind.png'
import rain_icon from '../assets/wind.png'

const Weather = () => {
        const [weatherData, setweatherData] = useState(false);

        const inputRef = useRef();

        const allIcons = {
          "01d":clear,
          "01n":clear,
          "02d":cloud_icon,
          "02n":cloud_icon,
          "03d":cloud_icon,
          "03n":cloud_icon,
          "04d":drizzel_icon,
          "04n":drizzel_icon,
          "09d":rain_icon,
          "09n":rain_icon,
          "10d":rain_icon,
          "10n":rain_icon,
          "13d":snow_icon,
          "13n":snow_icon,
        }
  const search = async (city)=>{
    if (city =="") {
        alert("enter city name ");
        return;
    }
    try {
        const  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }
        console.log(data);
        const icon = allIcons[data.weather[0].icon] || clear;
        setweatherData({
          humidity:data.main.humidity,
          windSpeed:data.wind.speed,
          temeprature : Math.floor(data.main.temp),
          location:data.name,
          icon: icon
        })
    } catch (error) {
      setweatherData(false);
      console.error("error in fetching the data");
    }
  }
    useEffect(()=>{
      search("jaunpur");
    },[]);
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        search(inputRef.current.value); // Trigger search on Enter key
      }
    };

  return (
    <div className="weather">
      {/* <h1>Weather</h1> */}
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" onKeyDown={handleKeyDown}  />
        <FontAwesomeIcon icon={faMagnifyingGlass} 
         style={{ width : '20px' ,height :'20px', padding:'15px' ,borderRadius:'50%' ,background :'#ebfffc' , cursor:'pointer'}}
         onClick={() => search(inputRef.current.value)}
         onkeypre/>
      </div>
      {weatherData?<>
        <img src={weatherData.icon} alt="" className='weather-icon' />

<p className='temperature'>{weatherData.temeprature}°c </p>

<p className='location'>{weatherData.location}</p>
<div className="weather-data">
    <div className="col">
      <img className="imag" src={humidity} alt="" />
      <div>
        <p> {weatherData.humidity} %</p>
        <span>Humidity</span>
      </div>
    </div>
    <div className="col">
      <img className="imag" src={wind_icon} alt="" />
      <div>
        <p>{weatherData.windSpeed} km/h</p>
        <span>Wind Speed</span>
      </div>
    </div>
  </div>
      </>:<></>}
      

      </div>
  );
};

export default Weather;
