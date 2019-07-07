import React from "react";
import { storiesOf } from "@storybook/react";

import Results from "./results";
import demoQuestion from "../../../content/gesundheit/babys";
import { mockGameController } from "../../stories/controller";

const ctrl = () =>
  mockGameController({
    user: {
      name: "Du",
      location: "05113",
      score: [true, false, false, true],
    },
    opponent: {
      name: "Gegner",
      location: "04011",
      score: [true, true, true, false],
    },
    history: [
      {
        category: "gesundheit",
        question: demoQuestion,
        answers: {
          self: "04011",
        },
        link: "https://www1.wdr.de/index.html",
      },
      {
        category: "gesundheit",
        question: demoQuestion,
        answers: {
          self: "04011",
        },
        link: "https://www1.wdr.de/index.html",
      },
      {
        category: "gesundheit",
        question: demoQuestion,
        answers: {
          self: "04011",
        },
        link: "https://www1.wdr.de/index.html",
      },
      {
        category: "gesundheit",
        question: demoQuestion,
        answers: {
          self: "04011",
        },
        link: "https://www1.wdr.de/index.html",
      },
    ],
  });

storiesOf("Templates / Results", module).add("default", () => (
  <Results {...ctrl()} />
));
