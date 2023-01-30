import "./style.scss";
import names from "../../imgs/GL.png";

export function Header() {
  return (
    <div id="header">
      <img src={names} style={{ height: "65%", width: "auto" }} />
    </div>
  );
}
