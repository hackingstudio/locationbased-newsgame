import React from "react";
import { storiesOf } from "@storybook/react";

import Answer from "./answer.jsx";

const answer =
    "Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.";

const subAnswer =
    "Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.";

storiesOf("Templates / Answer", module)
    .add("PlayerOne", () => (
        <Answer
            user={{ name: "Christine", location: "05113", score: [true, true, false] }}
            opponent={{ name: "Jannes", location: "04011", score: [false, true, false] }}
            answer={answer}
            subAnswer={subAnswer}
        />
    ))
    .add("PlayerTwo", () => (
        <Answer
            user={{ name: "Jannes", location: "04011", score: [true, true, false] }}
            opponent={{ name: "Christine", location: "05113", score: [false, true, false] }}
            answer={answer}
            subAnswer={subAnswer}
        />
    ));
