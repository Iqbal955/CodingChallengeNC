import React, { Component } from "react";

export class MainCode extends Component {
  render() {
    var devicePoints = [
      { coordinates: [0, 0] },
      { coordinates: [100, 100] },
      { coordinates: [15, 10] },
      { coordinates: [18, 18] },
      { coordinates: [13, 13] },
      { coordinates: [25, 99] },
    ];

    var networkstations = [
      { coordinates: [0, 0], reach: 9, speed: 0 },
      { coordinates: [20, 20], reach: 6, speed: 0 },
      { coordinates: [10, 0], reach: 12, speed: 0 },
      { coordinates: [5, 5], reach: 13, speed: 0 },
      { coordinates: [99, 25], reach: 2, speed: 0 },
    ];

    var fastestRoute = [];

    const diffInDistance = (a, b) =>
      Math.sqrt(Math.pow(a[0], 2) + Math.pow(b[0], 2));
    function getFastestRoute(networkstations, devicePoints) {
      //now that we have the distance let's get the fastest route!
      //we will get the speed of the fastest route.
      //the speed is calculated by the reach - distance ^ 2
      // this function needs the device points, and the network stations
      // we need to get the reach of the network station.

      const useLength =
        networkstations.length > devicePoints.length
          ? networkstations.length
          : devicePoints.length;

      networkstations.flatMap((network) =>
        devicePoints.flatMap((device) => {
          var distanceToNetWorkStation = getDistance(
            network?.coordinates,
            device?.coordinates
          );

          const speed = calculateSpeed(network.reach, distanceToNetWorkStation);

          fastestRoute.push({
            network: { ...network, speed },
            device,
          });
        })
      );

      fastestRoute = fastestRoute
        .filter((route) => route.network.speed > 0)
        .sort((a, b) => b.speed < a.speed);

      const fastest = fastestRoute.map((value) => {
        let fastest = {};

        console.log(
          `The fastest route for device: [${value.device.coordinates[0]},${value.device.coordinates[1]}]  is network: [${value.network.coordinates[0]}, ${value.network.coordinates[1]}] with the speed of ${value.network.speed}mb/s`
        );

        if (fastest.network?.speed === undefined) {
          return (fastest = value);
        } else if (fastest.network?.speed < value.network?.speed) {
          return (fastest = value);
        } else {
          return;
        }
      });
      // absoluteFastestRoute(fastest);
    }

    function calculateSpeed(reach, distance) {
      return distance > reach ? 0 : Math.pow(reach - distance, 2);
    }

    function getDistance(networkCord, deviceCord) {
      //this is the function that will be called in the main function.
      //this will get the distance between the device and the network station.
      // it will return the distance to the network.
      //the distance is calculated by network point x network point -y ^ 2 + device point x -y ^ 2

      var distance = Math.sqrt(
        Math.pow(networkCord[0] - deviceCord[0], 2) +
          Math.pow(networkCord[1] - deviceCord[1], 2)
      );

      return distance;
    }

    function absoluteFastestRoute(fastest) {
      var fastestData = fastest[0];
      if (fastest.length > 0) {
        return (
          <div>
            <h1>The fastest route is:</h1>
            <h2>
              The fastest route for device: [{fastestData.device.coordinates[0]}
              ,{fastestData.device.coordinates[1]}] is network: [
              {fastestData.network.coordinates[0]},
              {fastestData.network.coordinates[1]}] with the speed of{" "}
              {fastestData.network.speed}mb/s
            </h2>
          </div>
        );
        console.log(
          `... And the absolute fastest speed is that for device: [${fastestData.device.coordinates[0]},${fastestData.device.coordinates[1]}] is network: [${fastestData.network.coordinates[0]}, ${fastestData.network.coordinates[1]}] with the speed of ${fastestData.network.speed}mb/s`
        );
      } else {
        console.log(
          `No route found for device: [${fastestData.device.coordinates[0]},${fastestData.device.coordinates[1]}]`
        );
      }
    }
    const showData = () => {
      getFastestRoute(networkstations, devicePoints);
    };

    return (
      <div>
        <button onClick={showData}>Show the results!</button>
      </div>
    );
  }
}

export default MainCode;
