var endsLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: function(feature) {
        return styles[feature.get('type')];
    }
});

var taxiEndsLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: function(feature) {
        var type = feature.get('type');
        if (type === "car") type = "taxi";
        return styles[type];
    }
});

var carTravelLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: function(feature) {
        return styles[feature.getGeometry().getType()];
    }
});

var taxiTravelLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: function(feature) {
        return styles[feature.getGeometry().getType()];
    }
});

var styles = {
    'car': new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            src: './images/car.png'
        })
    }),
    'taxi': new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            src: './images/taxi.png'
        })
    }),
    'goal': new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0, 1],
            src: './images/goal.png'
        })
    }),
    'LineString': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 162, 0, 1)',
            width: 7
        })
    }),
};

function getGEOJSON (type, geometry) { 
    return {
        'type': type,
        'geometry': geometry
    };
}

function calculateTravel (selectedCoords, type) {
    //"http://localhost:3000/travel/car/45.05201,7.583055/45.067107,7.568893"
    var point1 = selectedCoords[0][1] + "," + selectedCoords[0][0];
    var point2 = selectedCoords[1][1] + "," + selectedCoords[1][0];
    var uri = "http://localhost:3000/travel/" + type + "/" + point1 + "/" + point2;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        var me = this;
        var currentType = type;
        if (me.readyState == 4 && me.status == 200) {
            const travel = JSON.parse(me.responseText);
            console.log(travel);
            if (travel != null) {
                if (travel.paths.length > 0) {
                    // get route's geometry from the provider
                    const geom = travel.paths[0].points;
                    //convert GEOJSON to Feature object
                    var mapTravel = (new ol.format.GeoJSON({ featureProjection: 'EPSG:3857' })).readFeature(getGEOJSON("Feature", geom));
                    //add feature to the layer
                    if (currentType === 'car') 
                        carTravelLayer.getSource().addFeature(mapTravel);
                    else if (currentType === 'taxi')
                        taxiTravelLayer.getSource().addFeature(mapTravel);
                    //center on the route feature
                    var extent = ol.proj.transformExtent(travel.paths[0].bbox, 'EPSG:4326', 'EPSG:3857');
                    map.getView().fit(extent);
                    
                    setupDescriptions(currentType, travel);
                    getPOI(extent);
                }
            }
        }
    };
    xhttp.open("GET", uri, true);
    xhttp.send();
}

function createTravelEnds (type, coords) {
    
    if(type === 'taxi' || type === 'car') {
        endsLayer.getSource().clear();
        taxiEndsLayer.getSource().clear();
        carTravelLayer.getSource().clear();
        taxiTravelLayer.getSource().clear();
    }

    var feature = new ol.Feature({
        type: type,
        geometry: new ol.geom.Point(coords)
    });
    endsLayer.getSource().addFeature(feature);
    taxiEndsLayer.getSource().addFeature(feature);

}

var POI = [];
function getPOI (extent) {
    turin.getSource().forEachFeatureInExtent(extent, function (feature) {
        if(hasTaxiLane(feature)) {
            console.log("id: " + feature.getId(), feature.getProperties());
        }
    });
}

function setupDescriptions (type, obj) {
    var p = obj.paths[0];
    document.getElementById(type + "-description").innerHTML = 'Distance: ' + (p.distance / 1000) + ' km. <br /> Travel time: ' + (p.time / 1000) + 'sec.' ;
}