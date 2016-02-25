

var map = L.map('map').setView([30.5, -91], 7);

var streets = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
	maxZoom: 20,
	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var base = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
	type: 'sat',
	ext: 'jpg',
	attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency',
	subdomains: '1234'
}).addTo(map);

var radar = L.tileLayer.wms("http://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WmsServer", {
    layers: '1',
    format: 'image/png',
    transparent: true,
    attribution: "NOAA/NOS/OCS nowCOAST and NOAA/NWS/NCEP/OPC",
    opacity: 0.25
}).addTo(map);

var one_hr_precip = L.tileLayer.wms("http://nowcoast.noaa.gov/arcgis/services/nowcoast/analysis_meteohydro_sfc_rtma_time/MapServer/WMSServer", {
    layers: '21',
    format: 'image/png',
    transparent: true,
    attribution: "NOAA/NOS/OCS nowCOAST and NOAA/NWS/NCEP/OPC",
		opacity: 0.25
}).addTo(map);

var flash_flood = L.tileLayer.wms("http://nowcoast.noaa.gov/arcgis/services/nowcoast/wwa_meteoceanhydro_shortduration_hazards_watches_time/MapServer/WMSServer?request=GetCapabilities&service=WMS", {
	layers: '0',
	format: 'image/png',
	transparent: true,
	attribution: "NOAA NOWCoast",
	opacity: 0.25
}).addTo(map);

//Control.Layers code to provide control of basemap
//Remember curly braces means you are creating an object
var baseLayers = {
      "Satellite": base,
      "Streets": streets
};

var overlays = { 
	"Radar": radar,
	"1-Hour Precipitation": one_hr_precip,
	"Flash Flood Watches": flash_flood
};

L.control.layers(baseLayers, overlays).addTo(map);
