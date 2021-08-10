import React from "react";
import {reducer} from "./reducer";
import {initialState} from "./initialState";
import {ReactContext} from "./context";

// TODO: Оптимизировать, вероятно сейчас много не нужных ререндеров

export const initReducer = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return {state, dispatch};
};

export const useContext = () => React.useContext(ReactContext);
