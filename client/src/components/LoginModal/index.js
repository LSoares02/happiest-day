import React, { useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";

import { useGlobalState } from "../../hooks/globalState";

const style = {
  position: "absolute",
  textAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  minHeight: "30%",
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  p: 4,
};

export default function LoginModal() {
  const {
    user,
    setUser,
    profile,
    setProfile,
    loginModalOpen,
    setLoginModalOpen,
  } = useGlobalState();

  const handleClose = () => setLoginModalOpen(false);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <Modal
      id="loginModal"
      open={loginModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {profile ? (
          <>
            <h3>Seja muito bem-vindo(a) {profile.name}!</h3>
            <div style={{ width: "100%", padding: "1rem" }}>
              <img
                src={profile.picture}
                alt="user image"
                style={{ objectFit: "contain", borderRadius: "100%" }}
              />
            </div>
            <p style={{ width: "100%" }}>
              Estamos muito felizes por ter você aqui conosco! 🥰
            </p>
            <Stack direction="row" spacing={2} style={{ marginTop: "1rem" }}>
              <Button
                onClick={() => {
                  logOut();
                }}
              >
                Encerrar sessão
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setLoginModalOpen(false);
                }}
              >
                Voltar para lista
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <h3>Faça login para salvar o item escolhido!</h3>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                endIcon={<GoogleIcon />}
                onClick={() => {
                  login();
                }}
              >
                Login com Google
              </Button>
            </div>
            <p>(Apenas seu email será salvo)</p>
          </>
        )}
      </Box>
    </Modal>
  );
}
