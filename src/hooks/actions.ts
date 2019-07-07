import { User, QuestionMeta, Result } from './controller';
import { Category } from '../assets/categories';

interface ResetAction {
  type: "RESET",
}
interface SetUserAction {
  type: "SET_USER",
  payload: User,
}
interface SetOpponentAction {
  type: "SET_OPPONENT",
  payload: User,
}
interface NextStepAction {
  type: "NEXT_STEP",
}
interface StartRoundAction {
  type: "START_ROUND",
}
interface StartGameAction {
  type: "START_GAME",
}
interface SetCategoryAction {
  type: "SET_CATEGORY",
  payload: Category,
}
interface SetQuestionAction {
  type: "SET_QUESTION",
  payload: QuestionMeta,
}
interface SetAnswerAction {
  type: "SET_ANSWER",
  payload: string,
}
interface SetResultAction {
  type: "SET_RESULT",
  payload: Result,
}
interface AddPointsAction {
  type: "ADD_POINTS",
  payload: boolean,
}

export type Action =
  | ResetAction
  | NextStepAction
  | StartGameAction
  | StartRoundAction
  | SetUserAction
  | SetOpponentAction
  | SetCategoryAction
  | SetQuestionAction
  | SetAnswerAction
  | SetResultAction
  | AddPointsAction;

export const createActions = (dispatch: (action: Action) => void) => {
  const resetData = () => dispatch({ type: "RESET" });

  const setUser = (name: string, location: string) => {
    dispatch({
      type: "SET_USER",
      payload: { name, location },
    });
  };

  const setOpponent = (name: string, location: string) => {
    dispatch({
      type: "SET_OPPONENT",
      payload: { name, location },
    });
  }

  const setCategory = (category: Category) => {
    dispatch({
      type: "SET_CATEGORY",
      payload: category,
    });
  }

  const setQuestion = (question: QuestionMeta) => {
    dispatch({
      type: "SET_QUESTION",
      payload: question,
    });
  }

  const setAnswer = (answer: string) => {
    dispatch({
      type: "SET_ANSWER",
      payload: answer,
    })
  }

  const setResult = (result: Result) => {
    dispatch({
      type: "SET_RESULT",
      payload: result,
    })
  }

  const addPoints = (won: boolean) => {
    dispatch({
      type: "ADD_POINTS",
      payload: won,
    });
  }

  const nextStep = () => dispatch({ type: "NEXT_STEP" });
  const startRound = () => dispatch({ type: "START_ROUND" });
  const startGame = () => dispatch({ type: "START_GAME" });

  return {
    resetData,
    nextStep,
    startGame,
    startRound,
    setCategory,
    setUser,
    setOpponent,
    setQuestion,
    setAnswer,
    setResult,
    addPoints,
  }
};
