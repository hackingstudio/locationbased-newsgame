import React from "react";
import { storiesOf } from "@storybook/react";

import Categories from "./categories.jsx";
import { mockGameController } from '../../stories/controller';

const ctrl = (category) => mockGameController({
  user: { name: "Du", location: "05113" },
  opponent: { name: "Gegner", location: "04011" },
  category,
});

storiesOf("Templates /Categories", module)
  .add("default", () => <Categories {...ctrl()} />)
  .add("PlayerTwo", () => <Categories choosing={false} {...ctrl()} />)
  .add("selected", () => <Categories {...ctrl("gesundheit")} />);
