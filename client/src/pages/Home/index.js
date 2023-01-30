import React, { useEffect } from "react";
import { Timer } from "../../components/Countdown";
import { Spacer } from "../../components/Spacer";
import { Header } from "../../components/Header";

import { useGlobalState } from "../../hooks/globalState";

import home from "../../imgs/home.jpg";
import calendar from "../../imgs/calendar.png";
import monogram from "../../imgs/monogram.svg";
import flowers1 from "../../imgs/flowers1.svg";
import parish from "../../imgs/parish.jpg";
import mariah from "../../imgs/mariah.jpg";
import "./style.scss";
import Map from "../../components/Map";
import { NavigationIcons } from "../../components/Navigation";

export default function Home() {
  useEffect(() => {
    document.querySelector("body").scrollTo(0, 0);
  }, []);

  return (
    <div className="content">
      <div id="homeImgContainer">
        <img
          src={home}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            opacity: "25%",
            filter: "grayscale(80%)",
            zIndex: 1,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "relative",
            height: "15vmin",
            width: "15vmin",
          }}
        >
          <img
            src={monogram}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <div id="homeContent">
        <Header />
        <div>
          <div id="timerDiv">
            <img
              src={calendar}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                // height: "100",
                width: "100%",
                objectFit: "cover",
                opacity: "50%",
                filter: "blur(1px)",
              }}
            />
            <div style={{ position: "relative" }}>
              <Timer />
            </div>
          </div>
          <div id="parish">
            <p>
              A cerimônia se realizará no dia{" "}
              <b style={{ fontWeight: "bold" }}>13 de Maio</b> na paróquia São
              Domingos, <b style={{ fontWeight: "bold" }}>às 16:30</b>
            </p>
            <div style={{ width: "60%", height: "100%" }}>
              <Map address={`Parish+St.+Dominic+"The+Preacher"+-+Osasco`} />
            </div>
            <img
              src={parish}
              style={{ width: "40%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <Spacer size={"3rem"} />
          <div id="buffet">
            <p>Em seguida, os convidados são esperados no Espaço Mariah</p>
            <img
              src={mariah}
              style={{ width: "40%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ width: "60%", height: "100%" }}>
              <Map address={`Espaço+Mariah`} />
            </div>
          </div>
          <Spacer size={"3rem"} />
        </div>
      </div>
      <NavigationIcons />
    </div>
  );
}
