import React from "react";
import {IAction} from "./actions";
import {store} from "./store";

interface IReactContext {
    dispatch: React.Dispatch<IAction>;
    state: typeof store;
}

export const ReactStoreContext = React.createContext<IReactContext>({
    state: store,
    dispatch: (action: IAction) => {
    }
})
