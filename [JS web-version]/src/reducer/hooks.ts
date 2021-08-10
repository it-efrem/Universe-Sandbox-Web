import React from "react";
import {reducer} from "./reducer";
import {initialReactStore} from "./initialReactStore";
import {ReactStoreContext} from "./context";

// TODO: Оптимизировать, вероятно сейчас много не нужных ререндеров

export const initReducer = () => {
    const [state, dispatch] = React.useReducer(reducer, initialReactStore);
    return {state, dispatch};
};

export const useReactStore = () => React.useContext(ReactStoreContext);
