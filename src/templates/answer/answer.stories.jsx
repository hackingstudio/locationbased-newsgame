import React from "react";
import { storiesOf } from "@storybook/react";

import Answer from "./answer.jsx";
import demoQuestion from '../../../content/gesundheit/babys';
import { mockGameController } from '../../stories/controller';

const ctrl = () => mockGameController({
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
  category: "gesundheit",
  question: demoQuestion,
  answers: {
    self: "04011",
  },
  result: {
    lowYear: 2016,
    winner: "04011",
    stats: {
      "05113": 33,
      "04011": 56,
    },
  }
});

storiesOf("Templates / Answer", module)
  .add("default", () => <Answer {...ctrl()} />);
