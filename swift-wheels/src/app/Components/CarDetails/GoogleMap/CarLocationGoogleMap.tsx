"use client";

//hooks
import React from "react";

//react-google-maps
import { GoogleMap, MarkerF, LoadScript } from "@react-google-maps/api";

//types
import * as carLocationGoogleMapTypes from "../../../utilities/types/carLocationGoogleMap.types";

//constants
import {
    googleMapContainerStyle,
    googleMapDefaultOptions,
} from "@/app/utilities/constants/constans";

export default function CarLocationGoogleMap({
    center,
}: {
    center: carLocationGoogleMapTypes.center;
}) {
    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
        >
            <GoogleMap
                mapContainerStyle={googleMapContainerStyle}
                center={center}
                zoom={14}
                options={googleMapDefaultOptions}
            >
                {center && <MarkerF position={center} />}
            </GoogleMap>
        </LoadScript>
    );
}
