import React, { Component } from "react";
import "isomorphic-fetch";

//api key
//This app gets name of city from user and searches for that city using the weather API , it then sends that Information back to the user
const API_KEY = "91ecd92662f90c08311cc16e01c3c594";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.getWeather = this.getWeather.bind(this);
    this.getCity = this.getCity.bind(this);
    this.getCountry = this.getCountry.bind(this);

    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,

      description: undefined,
      searchState: "none",
    };
  }

  getCity(event) {
    this.setState({
      city: event.target.value,
    });
  }

  getCountry(event) {
    this.setState({
      country: event.target.value,
    });
  }

  //function gets values from user and then use api to update states
  getWeather = async (e) => {
    e.preventDefault();
    const city = this.state.city;
    const country = this.state.country;

    let weatherResult = document.getElementById("weatherResult");
    let errorDiv = document.getElementById("error");
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();
    console.log(data);

    if (data.message === "city not found") {
      weatherResult.style.display = "none";
      errorDiv.style.display = "block";
    } else {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,

        description: data.weather[0].description,
      });

      weatherResult.style.display = "block";
      errorDiv.style.display = "none";
    }
  };

  componentDidMount() {
    let weatherResult = document.getElementById("weatherResult");
    let errorDiv = document.getElementById("error");
    weatherResult.style.display = "none";
    errorDiv.style.display = "none";
  }
  render() {
    return (
      <div id="weather">
        <h1>Weather App</h1>
        <form onSubmit={this.getWeather} id="input">
          <label>City:</label>
          <input type="text" name="city" onChange={this.getCity} />
          <label>Country:</label>
          <input type="text" name="country" onChange={this.getCountry} />
          <button>Get Weather</button>
        </form>

        <div id="weatherResult">
          <h2 id="city">City: {this.state.city}</h2>
          <h2 id="country">Country: {this.state.country}</h2>
          <h2 id="temperature">Temperature: {this.state.temperature} °C</h2>
          <h2 id="description">Description: {this.state.description}</h2>
        </div>

        <div id="error">
          <h2>Location not found</h2>
          <h3>Please try again.</h3>
        </div>
      </div>
    );
  }
}

export default App;
