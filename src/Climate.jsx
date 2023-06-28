import React, { useState } from 'react'
import { useEffect } from 'react'
import { getClimate } from './Services/weatherService'

function Climate() {
    const [dataLocation, setDataLocation] = useState([]);
    const [dataCurrent, setDataCurrent] = useState([]);
    const [dataCondition, setDataCondition] = useState([]);
    const [locationSearch, setLocationSearch] = useState("");
    const [showData, setShowData] = useState([]);
  
    useEffect(() => {
      const searchClimate = async () => {
        if (locationSearch !== "") {
          try {
            const responseData = await getClimate(locationSearch);
            setDataLocation(responseData.location);
            setDataCurrent(responseData.current);
            setDataCondition(responseData.current.condition);
          } catch (e) {
            console.log(e);
          }
        }
      };
      searchClimate();
    }, [locationSearch]);
  
    const search = () => {
      if (locationSearch !== "") {
        setShowData(
          <div className="weather-card">
            <h2>{dataLocation.name}</h2>
            <h3>{dataLocation.region}, {dataLocation.country}</h3>
            <p>Temperature: {dataCurrent.temp_c} ºC</p>
            <p>Condition: {dataCondition.text}</p>
            <img className="condition-icon" src={dataCondition.icon} alt="Current weather" />
          </div>
        );
      }
    };
  
    return (
      <div id="app">
        <h1>Weather App</h1>
        <div className="input-container">
          <input
            id="city-input"
            type="text"
            placeholder="Enter city"
            value={locationSearch}
            onChange={(event) => setLocationSearch(event.target.value)}
          />
          <button id="search-button" onClick={search}>
            Search
          </button>
        </div>
        {showData}
      </div>
    );
  }

export default Climate