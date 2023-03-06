import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../hooks/globalState";

import { Header } from "../../components/Header";
import { NavigationIcons } from "../../components/Navigation";

import Grid from "@mui/material/Grid";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import GoogleIcon from "@mui/icons-material/Google";
import { green, grey } from "@mui/material/colors";

import BasicSelect from "../../components/Filter";
import LoginModal from "../../components/LoginModal";

import { getAllGifts, updateGifter } from "../../helpers/apiCalls";

import { giftImages } from "../../helpers/misc";

import "./style.scss";

export default function List() {
  const { user, profile, setLoginModalOpen, loading, setLoading } =
    useGlobalState();

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
      <Backdrop id="loading" sx={{ color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <LoginModal />
      <div id="listContent">
        <Header />
        <div id="giftsText">
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
            <p style={{ marginTop: "1rem" }}>
              Caso não seja possível levar o presente no dia, por gentileza
              envie para um dos nossos endereços:
            </p>
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "1rem",
              }}
            >
              Avenida Cásper Líbero, 318 - Vila Osasco, Osasco
            </p>
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "1rem",
              }}
            >
              Rua dos Inconfidentes, 413 - Santo Antônio, Osasco
            </p>
            <p style={{ marginTop: "1rem" }}>
              Veja seus itens anteriormente selecionados fazendo login:
            </p>
          </h3>
        </div>
        <div
          style={{
            padding: "2rem",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            endIcon={<GoogleIcon />}
            onClick={() => setLoginModalOpen(true)}
          >
            Login com Google
          </Button>
        </div>
        <div
          id="filterContainer"
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
                <div
                  className="listItem"
                  key={`list-item-${index}`}
                  onClick={async () => {
                    if (
                      gift.doc.gifter.length < gift.doc.qtt ||
                      gift.doc.gifter.includes(profile.email)
                    )
                      if (!user || !profile) {
                        setLoginModalOpen(true);
                      } else {
                        if (!gift.doc.gifter.includes(profile.email))
                          gift.doc.gifter.push(profile.email);
                        else {
                          const index = gift.doc.gifter.indexOf(profile.email);
                          gift.doc.gifter.splice(index, 1);
                        }
                        setLoading(true);
                        await updateGifter(gift);
                        setLoading(false);
                      }
                  }}
                >
                  {/* Chosen  */}
                  {gift.doc.gifter.includes(profile?.email) && (
                    <div
                      style={{
                        position: "absolute",
                        right: "-40%",
                        bottom: "-190px",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <VerifiedRoundedIcon
                        sx={{ color: green[500], fontSize: 40 }}
                      />
                    </div>
                  )}
                  {/* Product Image */}
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
                  {/* Name */}
                  <h3>{gift.doc.name}</h3>
                  {/* Taken */}
                  {!gift.doc.gifter.includes(profile?.email) &&
                    gift.doc.gifter.length >= gift.doc.qtt && (
                      <div
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          opacity: "20%",
                          backgroundColor: "black",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            right: "-40%",
                            bottom: "-190px",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <DoNotDisturbOnIcon
                            sx={{ color: grey[500], fontSize: 40 }}
                          />
                        </div>
                      </div>
                    )}
                </div>
              </Grid>
            ))}
        </Grid>
      </div>
      <NavigationIcons />
    </div>
  );
}
