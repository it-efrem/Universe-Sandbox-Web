import React from "react";
import {IAction} from "./actions";
import {initialReactStore} from "./initialReactStore";

interface IReactContext {
    dispatch: React.Dispatch<IAction>;
    state: typeof initialReactStore;
}

export const ReactStoreContext = React.createContext<IReactContext>({
    state: initialReactStore,
    dispatch: (action: IAction) => {
    }
})
