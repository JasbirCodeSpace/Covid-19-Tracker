import React from "react";
import { showDataOnMap } from "./util";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
function Map({ countries, casesType, center, zoom }) {
  console.log(countries);
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href=" https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
