"use client";

// MyGoogleMap.js
import React from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultOption = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

export const MyGoogleMap = ({
  center,
}: {
  center: {
    lat: number;
    lng: number;
  };
}) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCX4ooaADM6NMv45VpfWJm0UXC-F9p2Aew">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={defaultOption}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};
