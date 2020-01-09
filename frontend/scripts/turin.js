var turinStyles = {
  'LineString': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'rgba(127, 98, 191, 1.0)',
        width: 2
      })
  }),
  'TaxyLineString': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgba(155, 50, 168, 1.0)',
      width: 5
    })
  }),
  'FilteredLineString': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'transparent',
      width: 0
    })
  })
};

var turinStyleFunction = function(feature) {
  var tStyle = turinStyles[feature.getGeometry().getType()];
  if(hasTaxiLane(feature)) {
    tStyle = turinStyles["TaxyLineString"];
  }
  else if (isNotValidRoad(feature)) {
    tStyle = turinStyles["FilteredLineString"];
  }
  return tStyle;
};
  
var turin = new ol.layer.Vector({
  source: new ol.source.Vector({
    projection : 'EPSG:4326',
    url: '/turin/map.osm',
    format: new ol.format.OSMXML()
  }),
  style: turinStyleFunction
});

function hasTaxiLane (feature) {
  var taxiAccess = feature.get('taxi'); //only taxi
  var psvAccess = feature.get('psv'); //generic public service vehicle
  if(taxiAccess === 'yes' || 
    taxiAccess === 'designated' || //opposite_lane
    taxiAccess === 'opposite_lane' ||
    psvAccess === 'yes' || 
    psvAccess === 'designated' ||
    psvAccess === 'opposite_lane') {
      return true;
  }
  return false;
}

function isNotValidRoad (feature) {
  // in order to keep the road network clearer
  var highway = feature.get('highway'); 
  var barrier = feature.get('barrier'); 
  var landuse = feature.get('landuse');
  var railway = feature.get('railway');
  var waterway = feature.get('waterway');
  
  if(highway !== 'footway' 
    && barrier !== 'gate' 
    && barrier !== 'wall'
    && barrier !== 'city_wall' 
    && barrier !== 'fence' 
    && landuse !== 'railway'
    && railway !== 'rail'
    && waterway !== 'river') {
      return false;
  }
  return true;
}