# Route-planner

Route planning with NodeJS web app.

![Route Planning](/frontend/images/image.png)
![Route Planning 2](/frontend/images/image2.png)

## Technologies

NodeJS,
Express,
Nodemon,
Openlayers,
GraphHopper.

## Functioning

This web app has 2 maps, the first one displays the best route planning provided by GraphHopper in case of a car driver, the second one always displays the best route planning, but only after get the Taxi permissions (use of the bus lanes).

## Component diagram

![Route Planner Diagram](/frontend/images/route-planner-diagram.png)

## GraphHopper

Available the GraphHopper extension to add the "taxi" vehicle type, in the "utils" folder.
The opensource software is available [here](https://github.com/graphhopper/graphhopper.git).

- Overwrite the patch
- Look at the config file for the configurations
- Compile with Maven
- Launch the file "graphhopper.sh" from the terminal using a *.pbf file from [Geofabrik](http://www.geofabrik.de/).
