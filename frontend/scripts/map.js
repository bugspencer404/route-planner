var coordTracker = [];
var overlay = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'images/overlay.png'
    })
});

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        //overlay,
        turin,
        carTravelLayer,
        endsLayer        
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([7.685177, 45.071071]),
        zoom: 13
    })
});

/// Map 4 taxi
var mapTaxi = new ol.Map({
    target: 'maptaxi',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        //overlay,
        turin,
        taxiTravelLayer,
        taxiEndsLayer        
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([7.685177, 45.071071]),
        zoom: 13
    })
});

function mapSingleClick(evt) {
    var featureType = "car";

    // convert coordinate to EPSG-4326
    var coordinates = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
    coordTracker.push(coordinates);

    if (coordTracker.length == 2) {
        calculateTravel(coordTracker, "car");
        calculateTravel(coordTracker, "taxi");
        
        coordTracker = [];
        featureType = "goal";
    }

    createTravelEnds(featureType, evt.coordinate);
}

map.on('singleclick', mapSingleClick);
//mapTaxi.on('singleclick', mapSingleClick);

map.on('moveend', function(e) {
    mapTaxi.getView().setZoom(map.getView().getZoom());
    mapTaxi.getView().setCenter(map.getView().getCenter());    
});

mapTaxi.on('moveend', function(e) {
    map.getView().setZoom(mapTaxi.getView().getZoom());
    map.getView().setCenter(mapTaxi.getView().getCenter());    
});

map.getViewport().addEventListener("click", function(e) {
    // only for debug
    /*map.forEachFeatureAtPixel(map.getEventPixel(e), function (feature, layer) {
        console.log(feature.getProperties());
    });*/
});