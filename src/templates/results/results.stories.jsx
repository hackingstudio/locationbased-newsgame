import React from "react";
import { storiesOf } from "@storybook/react";

import Results from "./results";

const question =
  "Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.";

const subQuestion =
  "Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.";

storiesOf("Templates / Results", module).add("default", () => (
  <Results
    user={{ name: "Du", location: "04011", score: [true, true, true] }}
    opponent={{
      name: "Opponent",
      location: "04012",
      score: [true, true, false],
    }}
    question={question}
    subQuestion={subQuestion}
  />
));
