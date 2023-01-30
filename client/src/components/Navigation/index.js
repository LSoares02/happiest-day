import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

import gift from "./icons/gift.svg";
import heart from "./icons/heart.svg";
import home from "./icons/home.svg";

export function NavigationIcons() {
  const navigate = useNavigate();

  const iconsArray = [
    { icon: home, path: "/home" },
    { icon: heart, path: "/about" },
    { icon: gift, path: "/list" },
  ];

  return (
    <div id="navigation">
      {iconsArray.map((icon, index) => (
        <div
          key={index}
          onClick={() => {
            document
              .querySelector("body")
              .scrollTo({ top: 0, behavior: "smooth" });
            navigate(icon.path);
          }}
        >
          <img
            src={icon.icon}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              fill: "white",
            }}
          />
        </div>
      ))}
    </div>
  );
}
