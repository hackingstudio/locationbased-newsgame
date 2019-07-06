import React from "react";
import { storiesOf } from "@storybook/react";

import Battle from "./battle.jsx";

const question =
    "Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.";

storiesOf("Templates / Battle", module)
    .add("PlayerOne", () => <Battle ownCity="Essen" opponentCity="Bremen" question={question} />)
    .add("PlayerTwo", () => <Battle ownCity="Bremen" opponentCity="Essen" question={question} />);
