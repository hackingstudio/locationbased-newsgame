import { useMemo } from "react";
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
    const actions = useMemo(() => createActions(action("action")), [])

    return {
        ...actions,
        findQuestion: action("findQuestion"),
        calculateResult: (...args) => Promise.resolve(action("calculateResult")(...args)),
        ...mockState(state),
    }
}
