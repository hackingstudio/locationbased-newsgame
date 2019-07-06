import React, { useEffect } from "react";
import useGameController, { Step, GameController } from "../hooks/controller";
import Landing from "../templates/landing/landing";
import MatchMaking from "../templates/matchMaking/matchMaking";
import Category from "../templates/categories/categories";

interface IndexPageProps {}

const renderStep = (step: Step): React.FC<ReturnType<GameController>> => {
  switch (step) {
    case Step.onboarding:
      return Landing;
    case Step.opponents:
      return MatchMaking;
    case Step.category:
      return Category;
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
  return <Page {...state} />;
};

export default IndexPage;
