import { Home, AddAlt } from "@carbon/icons-react";

import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { SideNav, SideNavItems, SideNavLink } from "@carbon/react";

export default function SideMenu({ open }) {
  const navigate = useNavigate();
  const { language } = useParams();

  return (
    <SideNav expanded={open} isRail aria-label="side-navigation">
      <SideNavItems>
        <SideNavLink
          renderIcon={Home}
          onClick={() => navigate(`/${language}/home`)}
        >
          Home
        </SideNavLink>
        <SideNavLink
          renderIcon={AddAlt}
          onClick={() => navigate(`/${language}/more`)}
        >
          More
        </SideNavLink>
      </SideNavItems>
    </SideNav>
  );
}
