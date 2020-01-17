# Route-planner

Route planning with NodeJS web app.

## Technologies

NodeJS,
Express,
Nodemon,
Openlayers,
GraphHopper.

## Functioning

This web app has 2 maps, the first one displays the best route planning provided by GraphHopper in case of a car driver, the second one always displays the best route planning, but only after get the Taxi permissions (use of the bus lanes).

## Component diagram

```plantuml
@startuml

package "Customized GraphHopper" {
  [CarFlagEncoder]
  [TaxyFlagEncoder]
  cloud {
    [Some Dijkstra, I guess]
  }
}

node "Route-planner" {
  [Backend]
  [Car map]
  [Taxi map]
}

[CarFlagEncoder] <--> [Some Dijkstra, I guess] : "Generate travel for Car!"
[TaxyFlagEncoder] <--> [Some Dijkstra, I guess] : "Generate travel for Taxi!"

[Car map] <--> [Backend] : "Give me the best path for a Car!"
[Taxi map] <--> [Backend] : "Give me the best path for a Taxi!"

[Backend] <--> [CarFlagEncoder] : "It's a Car!"
[Backend] <--> [TaxyFlagEncoder] : "It's a Taxi!"

@enduml
```
