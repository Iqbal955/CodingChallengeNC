import React, { Component } from "react";
import { getFastRoutes, absoluteFastestRoute, getDistance } from "./utils";
//Rather than having the data stored as a global variable, I have it stored in a state.
//This is because I want to be able to change the data and re-render the component.

export class App extends Component {
  state = {
    devicePoints: [
      { coordinates: [0, 0] },
      { coordinates: [100, 100] },
      { coordinates: [15, 10] },
      { coordinates: [18, 18] },
      { coordinates: [13, 13] },
      { coordinates: [25, 99] },
    ],
    networkstations: [
      { coordinates: [0, 0], reach: 9, speed: 0 },
      { coordinates: [20, 20], reach: 6, speed: 0 },
      { coordinates: [10, 0], reach: 12, speed: 0 },
      { coordinates: [5, 5], reach: 13, speed: 0 },
      { coordinates: [99, 25], reach: 2, speed: 0 },
    ],
    absoluteFastestRoute: [],
  };

  render() {
    // Deconstructing the state
    const { devicePoints, networkstations } = this.state;
    // from our utils lib, i call getFastRoutes and pass in our two states.
    const fastRoutes = getFastRoutes(networkstations, devicePoints);
    // fastRoutes is now an object, and if we map it, we get an array of objects, and we can display all data stored in this variable.
    //  console.log("I AM COMING FROM APP.JS:::", fastRoutes);
    return (
      <div>
        {Object.keys(fastRoutes).map((key) => (
          <div>
            <h1>The fastest route is:</h1>
            <h5>
              The fastest route for device: [
              {fastRoutes[key].device.coordinates[0]},
              {fastRoutes[key].device.coordinates[1]}] is network: [
              {fastRoutes[key].network.coordinates[0]},
              {fastRoutes[key].network.coordinates[1]}] with the speed of{" "}
              {fastRoutes[key].network.speed}mb/s
            </h5>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
