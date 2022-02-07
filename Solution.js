
//Getting the devices and the networks. We will use the coordinates to calculate the distance..

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
var noData = [];

function getFastestRoute(networkstations, devicePoints) {
  // this function needs the device points, and the network stations
  // we need to get the reach of the network station.

  // here we are converting the networkstations to a flat array. This is so we do not end with objects such as {coordinates: [Object, Object]}
  networkstations.flatMap((network) =>
    devicePoints.flatMap((device) => {
      var distanceToNetWorkStation = getDistance(
        network?.coordinates,
        device?.coordinates
      );
      // we will now calculate the speed.
      const speed = calculateSpeed(network.reach, distanceToNetWorkStation);
      // we are pushing all of the calculated data to the fastestRoute object.
      fastestRoute.push({
        network: { ...network, speed },
        device,
      });
    })
  );

  noData = fastestRoute.filter((route) => route.network.speed < 0);
  fastestRoute = fastestRoute
    .filter((route) => route.network.speed > 0)

    .sort((a, b) => b.speed < a.speed);
  console.log(fastestRoute);

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

  noData.map((data) =>
    console.log(
      `No route found for device: [${data.device.coordinates[0]},${data.device.coordinates[1]}]`
    )
  );

  absoluteFastestRoute(fastest);
}
// speed calculated by the reach of the network station and the distance to the network station.
function calculateSpeed(reach, distance) {
  return distance > reach ? 0 : Math.pow(reach - distance, 2);
}

function getDistance(networkCord, deviceCord) {
  //this will get the distance between the device and the network station.
  // it will return the distance to the network.
  //the distance is calculated by network point sqrt of x network point -y ^ 2 + device point x -y ^ 2

  var distance = Math.sqrt(
    Math.pow(networkCord[0] - deviceCord[0], 2) +
      Math.pow(networkCord[1] - deviceCord[1], 2)
  );

  return distance;
}

function absoluteFastestRoute(fastest) {
  fastestData = fastest[0];
  if (fastest.length > 0) {
    console.log(
      `... And the absolute fastest speed is that for device: [${fastestData.device.coordinates[0]},${fastestData.device.coordinates[1]}] is network: [${fastestData.network.coordinates[0]}, ${fastestData.network.coordinates[1]}] with the speed of ${fastestData.network.speed}mb/s`
    );
  } else {
    console.log(
      `No route found for device: [${fastestData.device.coordinates[0]},${fastestData.device.coordinates[1]}]`
    );
  }
}

getFastestRoute(networkstations, devicePoints);
