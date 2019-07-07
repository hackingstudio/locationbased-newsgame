import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/styles";

import useGameController, { Step, GameController } from "../hooks/controller";
import Landing from "../templates/landing/landing";
import MatchMaking from "../templates/matchMaking/matchMaking";
import Category from "../templates/categories/categories";
import Battle from "../templates/battle/battle";
import Answer from "../templates/answer/answer";
import Result from "../templates/results/results";
import { theme, backgroundColor } from "../components/theme";
import { Container } from "@material-ui/core";

import "./index.css";

interface IndexPageProps {}

const renderStep = (step: Step): React.FC<ReturnType<GameController>> => {
  switch (step) {
    case Step.onboarding:
      return Landing;
    case Step.opponents:
      return MatchMaking;
    case Step.category:
      return Category;
    case Step.question:
      return Battle;
    case Step.result:
      return Answer;
    case Step.endOfGame:
      return Result;
    default:
      return () => <h1>Not found</h1>;
  }
};

const localStorageKey = "GAME_STATE";
let prevState;
try {
  prevState = JSON.parse(window.localStorage.getItem(localStorageKey) || "");
  if (!prevState) {
    prevState = undefined;
  }
} catch (e) {}

const IndexPage: React.SFC<IndexPageProps> = () => {
  const state = useGameController(prevState);
  const { step } = state;

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      return;
    }
    window.localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [step]);

  const Page = renderStep(step);
  return (
    <div
      id="wrapper"
      style={{ backgroundColor, padding: "3rem", minHeight: "100vh" }}
    >
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <Page {...state} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default IndexPage;
