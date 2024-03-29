import React from "react";
import { storiesOf } from "@storybook/react";

import { mockGameController } from '../../stories/controller';
import MatchMaking from "./matchMaking.jsx";

const ctrl = (opponent) => mockGameController({
  user: { name: "Du", location: "05113" },
  opponent,
});

storiesOf("Templates / MatchMaking", module)
  .add("waiting", () => <MatchMaking {...ctrl()} />)
  .add("found", () => <MatchMaking {...ctrl({ name: "Gegner", location: "04011" })} />);
