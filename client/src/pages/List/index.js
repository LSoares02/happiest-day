import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../hooks/globalState";

import { Header } from "../../components/Header";
import { NavigationIcons } from "../../components/Navigation";

import Grid from "@mui/material/Grid";

import BasicSelect from "../../components/Filter";
import { getAllGifts } from "../../helpers/apiCalls";

import { giftImages } from "../../helpers/misc";

import "./style.scss";

export default function List() {
  const [gifts, setGifts] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    document.querySelector("body").scrollTo(0, 0);
  }, []);

  useEffect(() => {
    saveGifts();
  }, []);

  async function saveGifts() {
    console.log("Getting gifts...");
    setGifts(await getAllGifts());
    console.log("Got gifts!");
  }

  return (
    <div className="content">
      <div id="listContent">
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
            Nos ajude a encher nossa casa de amor!
          </h2>
          <h3>
            <p>
              Veja abaixo algumas sugestões de presentes que separamos. Para
              mantermos o controle de itens, pedimos que selecione o que deseja
              presentear.
            </p>
          </h3>
        </div>
        <div
          style={{
            width: "100%",
            padding: "1rem",
            position: "sticky",
            top: "5rem",
            backgroundColor: "white",
            zIndex: 3,
          }}
        >
          <BasicSelect category={category} setCategory={setCategory} />
        </div>
        <Grid container style={{ padding: "1rem" }} spacing={2}>
          {gifts
            .filter((gift) => {
              if (category === "all") return true;
              else {
                return gift.doc.category === category;
              }
            })
            .map((gift, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                key={`grid-item-${index}`}
              >
                <div className="listItem" key={`list-item-${index}`}>
                  {gift.doc.name}
                  <img
                    src={
                      giftImages.find((img) => img.name === gift.doc.name)?.img
                    }
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      opacity: "25%",
                      filter: "grayscale(80%)",
                    }}
                  />
                </div>
              </Grid>
            ))}
        </Grid>
      </div>
      <NavigationIcons />
    </div>
  );
}
