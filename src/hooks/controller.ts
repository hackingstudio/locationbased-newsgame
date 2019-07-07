import { useReducer, useMemo, useCallback } from "react";
import { Action, createActions } from "./actions";
import { Category, categories } from "../assets/categories";
import questions, { Question } from "../assets/questions";
import { fetchValues, DataMissingError } from "./datenguide";
import { GraphQLRequest } from "apollo-link";
import locations from '../assets/locations.json';

export interface User {
  name: string,
  location: string,
  score?: boolean[],
}

export interface QuestionMeta {
  query: GraphQLRequest,
  content: Question,
}

export interface Result {
  lowYear: number,
  winner: string,
  stats: Record<string, number>,
}

export interface HistoryEntry {
  category: Category,
  question: QuestionMeta,
  answers: {
    self?: string,
    opponent?: string,
  },
  result: Result,
}

export interface GameState {
  step: Step,
  user: User | null,
  opponent: User | null,
  category: Category | "",
  question: QuestionMeta | null,
  round: number,
  answers: {
    self?: string,
    opponent?: string,
  }
  result: Result | null,
  history: HistoryEntry[],
}

export enum Step {
  onboarding, // asks user for name and city
  opponents,  // searching for opponent
  category,   // choosing a category
  question,   // answering a question
  result,     // seeing who won
  endOfGame,  // final result
}

const nextStepMap = {
  [Step.onboarding]: Step.opponents as Step.opponents,
  [Step.opponents]: Step.category as Step.category,
  [Step.category]: Step.question as Step.question,
  [Step.question]: Step.result as Step.result,
}

const MAX_ROUND = 4;

const gameReducer = (state: GameState, action: Action) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log("prevState:", state);
    console.log("action:", action);
  }
  switch (action.type) {
    case "SET_USER":
      if (state.step !== Step.onboarding) {
        return state;
      }
      return {
        ...state,
        user: action.payload,
      }
    case "SET_OPPONENT":
      if (state.step !== Step.opponents) {
        return state;
      }
      return {
        ...state,
        opponent: action.payload,
      }
    case "SET_CATEGORY":
      if (state.step !== Step.category) {
        return state;
      }
      return {
        ...state,
        category: action.payload,
      };
    case "SET_QUESTION":
      if (![Step.category, Step.question].includes(state.step)) {
        return state;
      }
      return {
        ...state,
        question: action.payload,
      };
    case "SET_ANSWER":
      if (state.step !== Step.question) {
        return state;
      }
      return {
        ...state,
        answers: {
          self: action.payload,
        },
      }
    case "SET_RESULT":
      if (state.step !== Step.question) {
        return state;
      }
      return {
        ...state,
        result: action.payload,
        history: state.history.concat({
          category: state.category,
          answers: state.answers,
          question: state.question,
          result: action.payload,
        } as HistoryEntry),
      }
    case "ADD_POINTS": {
      const { user, answers, result } = state;
      if (state.step !== Step.result || !user || !answers || !result) {
        return state;
      }
      const { score = [] } = user;
      if (score.length > state.round) {
        return state;
      }
      const gotPoint = answers.self === result.winner;
      return {
        ...state,
        user: {
          ...user,
          score: score.concat(gotPoint),
        }
      }
    }
    case "START_GAME":
      return {
        ...state,
        ...initialGameState,
        user: {
          ...state.user,
          score: [],
        },
        step: Step.opponents,
      }
    case "START_ROUND":
      if (state.round >= MAX_ROUND - 1) {
        return {
          ...state,
          step: Step.endOfGame,
        }
      }
      return {
        ...state,
        ...initialRoundState,
        step: Step.category,
        round: state.round + 1,
      }
    case "NEXT_STEP": {
      if (!(state.step in nextStepMap)) {
        return state;
      }
      return {
        ...state,
        step: nextStepMap[state.step],
      }
    }
    case "RESET":
      return initialState;
  }
}

export const initialRoundState = {
  category: "" as "",
  question: null,
  answers: {} as {
    self?: string,
    opponent?: string,
  },
  result: null,
}

export const initialGameState = {
  opponent: null,
  round: -1,
  history: [],
  ...initialRoundState,
}

export const initialState: GameState = {
  step: Step.onboarding,
  user: null,
  ...initialGameState,
}

export type GameController = typeof useGameController;

const useGameController = (restoreState?: GameState) => {
  const [state, dispatch] = useReducer(gameReducer, restoreState || initialState);
  const { category, question, user, opponent, answers: { self: userAnswer } } = state;

  const {
    setOpponent,
    setQuestion,
    setResult,
    ...actions
  } = useMemo(() => createActions(dispatch), [dispatch]);

  const randomCategory = useCallback(() => {
    const catNum = Math.floor(Math.random() * Object.keys(categories).length);
    const cat = Object.keys(categories)[catNum] as Category;
    actions.setCategory(cat);
  }, [actions.setCategory]);

  const findOpponent = useCallback(() => {
    if (!user) {
      return;
    }

    const locIndex = Math.floor(Math.random() * locations.length - 1);
    const { id } = locations.filter(loc => loc.id !== user.location)[locIndex];
    setOpponent("Bot", id);
  }, [setOpponent, user]);

  const findQuestion = useCallback(async () => {
    if (!user || !opponent) {
      return;
    }
    const list = questions[category];
    let i = 0;
    while (true) {
      if (i > 5) {
        throw new Error("Unable to find question!");
      }
      try {
        const index = Math.floor(Math.random() * list.length);
        const question = list[index];
        await fetchValues(question.query, [user.location, opponent.location]);
        setQuestion(question);
        return;
      } catch (e) {
        console.error(e);
        if (!(e instanceof DataMissingError)) {
          throw e;
        }
      }
      i++;
    }
  }, [category, setQuestion]);

  const calculateResult = useCallback(async () => {
    if (!question || !user || !opponent || !userAnswer) {
      return;
    }
    const { lowYear, stats } = await fetchValues(question.query, [user.location, opponent.location]);
    if (stats.length < 2) {
      throw new Error(`Not enough data!`);
    }
    const winner = stats.sort((a, b) => b.value - a.value)[0].id;
    setResult({
      lowYear,
      winner,
      stats: stats.reduce((agg, { id, value }) => (agg[id] = value, agg), {}),
    });
  }, [question, user, opponent, userAnswer]);

  return {
    ...actions,
    findOpponent,
    findQuestion,
    calculateResult,
    randomCategory,
    ...state,
  };
}

export default useGameController;
