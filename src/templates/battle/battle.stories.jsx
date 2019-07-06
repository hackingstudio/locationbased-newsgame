import React from "react";
import { storiesOf } from "@storybook/react";

import Battle from "./battle.jsx";

const question =
    "Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.";

const subQuestion =
    "Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.";

storiesOf("Templates / Battle", module)
    .add("PlayerOne", () => (
        <Battle
            user={{ name: "Christine", location: "05113", score: [true, true, false] }}
            opponent={{ name: "Jannes", location: "04011", score: [false, true, false] }}
            question={question}
            subQuestion={subQuestion}
        />
    ))
    .add("PlayerTwo", () => (
        <Battle
            user={{ name: "Jannes", location: "04011", score: [true, true, false] }}
            opponent={{ name: "Christine", location: "05113", score: [false, true, false] }}
            question={question}
            subQuestion={subQuestion}
        />
    ));
