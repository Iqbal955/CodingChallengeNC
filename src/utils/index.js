const diffInDistance = (a, b) =>
  Math.sqrt(Math.pow(a[0], 2) + Math.pow(b[0], 2));

export function getDistance(networkCord, deviceCord) {
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

const calculateSpeed = (reach, distance) => {
  return distance > reach ? 0 : Math.pow(reach - distance, 2);
};

export function getFastRoutes(networkstations, devicePoints) {
  const routes = [];
  networkstations.flatMap((network) =>
    devicePoints.flatMap((device) => {
      var distanceToNetWorkStation = getDistance(
        network?.coordinates,
        device?.coordinates
      );

      const speed = calculateSpeed(network.reach, distanceToNetWorkStation);

      routes.push({
        network: { ...network, speed },
        device,
      });
    })
  );

  const fastRoute = routes
    .filter((route) => route.network.speed > 0)
    .sort((a, b) => b.speed < a.speed);

  return fastRoute;
}

export function absoluteFastestRoute(fastRoute) {
  const fastest = fastRoute.map((value) => {
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

  const fastestData = fastest[0];
  if (fastest.length > 0) {
    // return (
    //   <div>
    //     <h1>The fastest route is:</h1>
    //     <h2>
    //       The fastest route for device: [{fastestData.device.coordinates[0]},
    //       {fastestData.device.coordinates[1]}] is network: [
    //       {fastestData.network.coordinates[0]},
    //       {fastestData.network.coordinates[1]}] with the speed of{" "}
    //       {fastestData.network.speed}mb/s
    //     </h2>
    //   </div>
    // );
    // console.log(
    //   `... And the absolute fastest speed is that for device: [${fastestData.device.coordinates[0]},${fastestData.device.coordinates[1]}] is network: [${fastestData.network.coordinates[0]}, ${fastestData.network.coordinates[1]}] with the speed of ${fastestData.network.speed}mb/s`
    // );
    return `... And the absolute fastest speed is that for device: [${fastestData.device.coordinates[0]},${fastestData.device.coordinates[1]}] is network: [${fastestData.network.coordinates[0]}, ${fastestData.network.coordinates[1]}] with the speed of ${fastestData.network.speed}mb/s`;
  } else {
    // console.log(
    //   `No route found for device: [${fastestData.device.coordinates[0]},${fastestData.device.coordinates[1]}]`
    // );
    return `No route found for device: [${fastestData.device.coordinates[0]},${fastestData.device.coordinates[1]}]`;
  }
}
