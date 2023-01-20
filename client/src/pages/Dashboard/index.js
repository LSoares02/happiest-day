import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useGlobalState } from "../../hooks/globalState";
import texts from "../../helpers/languagesConfig";
import { useParams } from "react-router-dom";
import { Column, Theme, Grid, Tab, TabList, Tabs } from "@carbon/react";

import "./style.scss";
import "./responsive.scss";
import Table from "../../components/Table";

export default function Dashboard({ match }) {
  const { language } = useParams();
  const { lightMode } = useGlobalState();

  return (
    <Theme theme={lightMode ? "white" : "g100"}>
      <Header />
      <div className="content">
        <Grid narrow>
          <Column sm={4} md={8} lg={16} xlg={16}>
            <h1 style={{ paddingTop: "10px", paddingBottom: "10px" }}>Home</h1>
          </Column>
          <Column
            sm={4}
            md={8}
            lg={16}
            xlg={16}
            style={{ marginBottom: "0px" }}
          >
            <Tabs>
              <TabList contained>
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
              </TabList>
            </Tabs>
          </Column>
          <Column sm={4} md={8} lg={16} xlg={16}>
            <Table />
          </Column>
        </Grid>
      </div>
    </Theme>
  );
}
