import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../hooks/globalState";
import {
  Header,
  HeaderGlobalAction,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  Theme,
} from "@carbon/react";
import { Fade } from "@carbon/icons-react";
import { Close, Menu, Asleep, Light } from "@carbon/icons-react";
import SideMenu from "../SideNav";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import "./style.scss";
import { getRoute } from "../../helpers/misc";

export default function HeaderIcc() {
  const { language } = useParams();
  const { lightMode, setLightMode, languageIcons } = useGlobalState();

  const location = useLocation();
  const navigate = useNavigate();

  const [openSidePanel, setOpenSidePanel] = useState(false);

  return (
    <Header aria-label="IS Boilerplate">
      <HeaderGlobalAction
        className="navMenu"
        onClick={() => setOpenSidePanel(!openSidePanel)}
      >
        {openSidePanel ? <Close /> : <Menu />}
      </HeaderGlobalAction>
      <HeaderName href={`/${language}/home`} prefix="Innovation Studio">
        Boilerplate
      </HeaderName>
      <HeaderNavigation aria-label="navigation-bar">
        <HeaderMenuItem onClick={() => navigate(`/${language}/home`)}>
          Home
        </HeaderMenuItem>
        <HeaderMenuItem onClick={() => navigate(`/${language}/more`)}>
          More
        </HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderNavigation aria-label="language-bar">
          <HeaderMenu
            aria-label="language"
            menuLinkName={languageIcons[language]}
          >
            {Object.entries(languageIcons).map(([key, value], index) => (
              <HeaderMenuItem
                key={index}
                onClick={() => {
                  navigate(
                    getRoute(
                      location.pathname.includes("home")
                        ? "/:language/home"
                        : "/:language/more",
                      key
                    )
                  );
                }}
              >
                {value}
                {` ${key.toUpperCase()}`}
              </HeaderMenuItem>
            ))}
          </HeaderMenu>
        </HeaderNavigation>
        <HeaderGlobalAction
          aria-label="Theme"
          onClick={() => {
            setLightMode(!lightMode);
          }}
        >
          {lightMode ? <Asleep /> : <Light />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <SideMenu open={openSidePanel} />
    </Header>
  );
}
