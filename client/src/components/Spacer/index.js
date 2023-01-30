import "./style.scss";
import rose from "../../imgs/rose.png";
import { NavigationIcons } from "../Navigation";
import { useEffect, useState } from "react";

export function Spacer({ size }) {
  return <div id="spacer" style={{ height: size }}></div>;
}
