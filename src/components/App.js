import React from "react";
import Thumbs from "./Thumbs";
import Info from "./Info";
import Search from "./Search";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      weather: "",
      images: [],
      image: {}
    };

    this.fetchWeather = this.fetchWeather.bind(this);
    this.fetchPhotos = this.fetchPhotos.bind(this);
    this.receiveImage = this.receiveImage.bind(this);
    this.receiveLocation = this.receiveLocation.bind(this);
  }

  fetchWeather(location) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=777c23f5bbd5f5d4147b6bc37ff8db50`
    )
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        this.fetchPhotos(body.weather[0].description);
        this.setState({ weather: body.weather[0].description });
      });
  }

  fetchPhotos(weather) {
    fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${weather}&client_id=d7ab4c73aab34ac3669753c9065df8434e7cf8bdf9cdaf9022eba3aae46d4a07`
    )
      .then(function(response) {
        return response.json();
      })
      .then(body => {
        this.setState({ images: body.results });
        this.receiveImage(this.state.images[0]);
        //console.log(body);
      });
  }

  componentDidMount() {
    this.fetchWeather("london");
  }

  receiveImage(image) {
    console.log(image);
    this.setState({
      image: image
    });
  }

  receiveLocation(location) {
    console.log(this.state.weather + location);
    this.fetchWeather(location);
  }

  render() {
    const imageExists = !!this.state.image.urls;

    return (
      <main className="content">
        <header className="header">
          <h1 className="title">
            <i>Meteor</i>
            <i>opolis</i>
          </h1>
        </header>

        <figure className="photo" id="photo">
          {imageExists ? <img src={this.state.image.urls.regular} /> : null}
        </figure>

        {imageExists ? (
          <Info image={this.state.image} weather={this.state.weather} />
        ) : null}
        <Thumbs images={this.state.images} receiveImage={this.receiveImage} />
        <Search receiveLocation={this.receiveLocation} />
      </main>
    );
  }
}

export default App;
