import React, { useEffect, useState } from "react";
import { Timer } from "../../components/Countdown";
import { Header } from "../../components/Header";
import { Viwer } from "../../components/ImageViwer";
import { NavigationIcons } from "../../components/Navigation";

import { useGlobalState } from "../../hooks/globalState";

import bricks from "../../imgs/preWedding/bricks.jpg";
import deck from "../../imgs/preWedding/deck.jpg";
import deck2 from "../../imgs/preWedding/deck2.jpg";
import deck3 from "../../imgs/preWedding/deck3.jpg";
import flowers from "../../imgs/preWedding/flowers.jpg";
import flowers2 from "../../imgs/preWedding/flowers2.jpg";
import forest from "../../imgs/preWedding/forest.jpg";
import forest2 from "../../imgs/preWedding/forest2.jpg";
import forest3 from "../../imgs/preWedding/forest3.jpg";
import forest4 from "../../imgs/preWedding/forest4.jpg";
import lumber from "../../imgs/preWedding/lumber.jpg";
import lumber2 from "../../imgs/preWedding/lumber2.jpg";
import sunflowers from "../../imgs/preWedding/sunflowers.jpg";
import sunflowers2 from "../../imgs/preWedding/sunflowers2.jpg";
import umbrellas from "../../imgs/preWedding/umbrellas.jpg";
import umbrellas2 from "../../imgs/preWedding/umbrellas2.jpg";

import "./style.scss";

export default function About() {
  const photoArray = [
    bricks,
    deck,
    deck2,
    deck3,
    flowers,
    flowers2,
    forest,
    forest2,
    forest3,
    forest4,
    lumber,
    lumber2,
    sunflowers,
    sunflowers2,
    umbrellas,
    umbrellas2,
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    document.querySelector("body").scrollTo(0, 0);
  }, []);

  return (
    <div className="content">
      <div id="aboutContent">
        <Header />
        <div id="smallText">
          <h2
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "justify",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              marginBottom: "2rem",
            }}
          >
            Essa ?? uma velha hist??ria de uma flor e um beija-flor...
          </h2>
          <h3>
            <p>...mas que nem ?? t??o velha assim!</p>
            <p>
              S??o 6 anos de um amor que j?? parece muito antigo, mas cujas
              prim??cias culminar??o neste grande dia!
            </p>
            <p>
              Da divisa entre S??o Paulo e Minas Gerais para o mundo, envelhecido
              entre instrumentos musicais, videogames, sonhos de terras
              distantes e muitos hamb??rgueres, trouxemos nosso amor at?? aqui,
              com muita gra??a de Deus!
            </p>
            <p>
              E agora, apresentando-o com orgulho, contamos com voc?? para estar
              ao nosso lado nesse novo cap??tulo que estamos escrevendo.
            </p>
          </h3>
        </div>
        <div id="photoGrid">
          {photoArray.map((photo, index) => (
            <div
              className="photoSquare"
              onClick={() => {
                setCurrentImage(index);
                setIsViewerOpen(true);
              }}
            >
              <img
                key={`photo-${index}`}
                src={photo}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <Viwer
        images={photoArray}
        isViewerOpen={isViewerOpen}
        setIsViewerOpen={setIsViewerOpen}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />
      <NavigationIcons />
    </div>
  );
}
