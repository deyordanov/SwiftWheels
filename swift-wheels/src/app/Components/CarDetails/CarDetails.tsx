"use client";

// CarDetails.js
import React, { useState, useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";
import Gallery from "./Gallery/Gallery"; // Adjust the import path as necessary
import { MyGoogleMap } from "./GoogleMap/GoogleMap"; // Adjust the import path as necessary

const car = {
  type: "SUV",
  make: "Toyota",
  name: "Land Cruiser 200",
  model: "200",
  price: "148.000$",
  stars: 5,
  image: "/images/carSlider/LC200.png",
  km: "140 000km",
  transmission: "Automatic",
  condition: "Used",
  year: "2020",
  color: "Metallic",
  "fuel type": "Diesel",
  "engine size": "5L",
  doors: "4",
  cylinders: "8",
  horsepower: "654HP",
  "drive type": "4x4",
};

const CarDetails = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const address = "Heidestraße 62 10557 Berlin Germany";
  useEffect(() => {
    const geocodeAddress = async (addressToGeocode: any) => {
      const apiKey = "AIzaSyCX4ooaADM6NMv45VpfWJm0UXC-F9p2Aew";
      const url = new URL(`https://maps.googleapis.com/maps/api/geocode/json`);
      const params = new URLSearchParams({
        address: addressToGeocode,
        key: apiKey,
      });
      url.search = params.toString();

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results[0]) {
          const { lat, lng } = data.results[0].geometry.location;
          setCenter({ lat, lng });
        } else {
          console.error("No results for the address:", addressToGeocode);
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    };

    if (address) {
      geocodeAddress(address);
    }
  }, [address]);

  return (
    <div className="container flex flex-col items-center mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="text-center my-8">
        <h1 className="h1 mb-2">{car.name}</h1>
        <h2 className="text-5xl font-extrabold text-accent-default my-4">
          {car.price}
        </h2>
        <button className="flex items-center mb-6 mx-auto">
          <AiOutlineStar className="text-xl mr-2" />
          Add to favorites
        </button>
      </div>
      <div className="max-w-4xl mx-auto mb-14">
        <Gallery />
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-inner w-[80%]">
        <ul className="divide-y divide-gray-200 text-2xl">
          {Object.entries(car)
            .filter(
              ([key]) =>
                !["image", "info", "name", "price", "stars"].includes(key)
            )
            .map(([key, value]) => (
              <li key={key} className="py-4 flex justify-between items-center">
                <span className="font-semibold capitalize">
                  {key.replace(/_/g, " ")}:
                </span>
                <span className="font-normal text-gray-700">{value}</span>
              </li>
            ))}
        </ul>
      </div>
      <div className="w-full h-[500px] my-8 flex justify-center">
        <MyGoogleMap center={center} />
      </div>
    </div>
  );
};

export default CarDetails;
