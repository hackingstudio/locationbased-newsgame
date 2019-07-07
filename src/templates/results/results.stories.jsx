import React from "react";
import { storiesOf } from "@storybook/react";

import Results from "./results";
import qArbeit from "../../../content/arbeit-wirtschaft/beamte";
import qBildung from "../../../content/bildung/anteil_jugendliche";
import qGesundheit from "../../../content/gesundheit/babys";
import qUmwelt from "../../../content/umwelt/kuehe";
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
        category: "arbeit-wirtschaft",
        question: qArbeit,
        answers: {
          self: "04011",
        },
        result: {
          winner: "04011",
        },
      },
      {
        category: "bildung",
        question: qBildung,
        answers: {
          self: "04011",
        },
        result: {
          winner: "04011",
        },
      },
      {
        category: "gesundheit",
        question: qGesundheit,
        answers: {
          self: "04011",
        },
        result: {
          winner: "04011",
        },
      },
      {
        category: "umwelt",
        question: qUmwelt,
        answers: {
          self: "04011",
        },
        result: {
          winner: "04011",
        },
      },
    ],
  });

storiesOf("Templates / Results", module).add("default", () => (
  <Results {...ctrl()} />
));
