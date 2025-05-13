import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {
  
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)


  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = 'YOUR_API_KEY'
  const difKelvin = 273.15 // Para lograr tener grados Celsius debemos restar este numero a los grados Kelvin

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
      const data = await response.json()
      console.log(data)
      setWeatherData(data)
      
    } catch (error) {
      console.error('Ha habido un error:', error) 
    }  
  }

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchWeatherData()
    }

    return (
    <div className="container">
      <h1>Aplicación del Clima</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder="Ingrese una ciudad"
        value={city}
        onChange={handleCityChange}
        />
        <button type="submit">Buscar</button>
      </form>

      {weatherData && (

        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>País: {weatherData.sys.country}</p>
          <p>Temperatura: {Math.floor(weatherData.main.temp - difKelvin)}°C</p>
          <p>Descripción: {weatherData.weather[0].description}</p>
          <img 
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
            alt={weatherData.weather[0].description} 
          />
          <p>Humedad: {weatherData.main.humidity}%</p>
          <p>Viento: {weatherData.wind.speed} m/s</p>
        </div>

      )}

    </div>
  )
}
