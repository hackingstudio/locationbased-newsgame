import { createActions } from "../hooks/actions";
import { action } from "@storybook/addon-actions";
import { GameState, initialState, GameController } from "../hooks/controller";

export const mockState = (state: Partial<GameState>): GameState => {
  return {
    ...initialState,
    ...state,
  }
}

export const mockGameController: GameController = (state: Partial<GameState> = {}) => {
  const actions = createActions(action("action"));

  return {
    ...actions,
    findOpponent: action("findOpponent"),
    findQuestion: (...args) => Promise.resolve(action("findQuestion")(...args)),
    calculateResult: (...args) => Promise.resolve(action("calculateResult")(...args)),
    randomCategory: action("randomCategory"),
    ...mockState(state),
  }
}
