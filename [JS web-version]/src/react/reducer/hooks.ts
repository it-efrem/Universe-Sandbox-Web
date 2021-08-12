import React from "react";
import {reducer} from "./reducer";
import {store} from "./store";
import {ReactStoreContext} from "./context";

// TODO: Оптимизировать, вероятно сейчас много не нужных ререндеров
export const initReducer = () => {
    const [state, dispatch] = React.useReducer(reducer, store);
    return {state, dispatch};
};

export const useReactStore = () => React.useContext(ReactStoreContext);
