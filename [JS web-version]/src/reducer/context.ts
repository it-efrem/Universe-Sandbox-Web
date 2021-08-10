import React from "react";
import {IAction} from "./actions";
import {initialState} from "./initialState";

interface IReactContext {
    dispatch: React.Dispatch<IAction>;
    state: typeof initialState;
}

export const ReactContext = React.createContext<IReactContext>({
    state: initialState,
    dispatch: (action: IAction) => {
    }
})
