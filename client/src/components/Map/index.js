import React from "react";

export default function Map({ address }) {
  return (
    <iframe
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      frameborder="0"
      referrerpolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API}q=${address}`}
      allowfullscreen
    ></iframe>
  );
}
