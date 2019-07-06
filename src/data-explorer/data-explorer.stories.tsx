import React from "react";
import { storiesOf } from "@storybook/react";
import DataExplorer from "./data-explorer";

storiesOf("Data Explorer", module)
  .add("default", () => <DataExplorer />)
  .add("with values", () => (
    <DataExplorer defaultID="STR007" defaultFilter="WZ08RS: WZ08_D" />
  ));
