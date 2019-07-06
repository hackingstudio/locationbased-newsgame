import React from "react";
import { storiesOf } from "@storybook/react";

import Results from "./results";

storiesOf("Templates / Results", module).add("default", () =>
<Results user={{ name: "Du", location: "04011" }} opponent={{ name: "Opponent", location: "04012"}} />);
