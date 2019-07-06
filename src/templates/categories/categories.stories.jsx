import React from "react";
import { storiesOf } from "@storybook/react";

import Categories from "./categories.jsx";

storiesOf("Templates /Categories", module)
    .add("default", () => <Categories choosing />)
    .add("PlayerTwo", () => <Categories />);
