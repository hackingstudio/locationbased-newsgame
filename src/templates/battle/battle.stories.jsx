import React from "react";
import { storiesOf } from "@storybook/react";

import Battle from "./battle.jsx";

import demoQuestion from '../../../content/gesundheit/babys';
import { mockGameController } from '../../stories/controller';

const ctrl = (answer) => mockGameController({
  user: { name: "Du", location: "05113" },
  opponent: { name: "Gegner", location: "04011" },
  category: "gesundheit",
  question: demoQuestion,
  answers: {
    self: answer,
  },
});

storiesOf("Templates / Battle", module)
  .add("default", () => <Battle {...ctrl()} />)
  .add("selected", () => <Battle {...ctrl("04011")} />)
