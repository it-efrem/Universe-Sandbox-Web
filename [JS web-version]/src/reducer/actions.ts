import {VIEW_MODE} from "../engine/store";

export enum TYPE_ACTION {
    MODE,
    STATS,
    TARGET_TIME_SPEED,
    IS_GRID,
    IS_LABELS,
    IS_FORCE_LINES,
    IS_TIDAL_FORCES,
    IS_FRAGMENTS,
    IS_COLLIDE,
}

export interface IAction {
    type: TYPE_ACTION;
    payload?: any;
}

export const statsUpdateAction = (payload: {
    lastFPS: number,
    lastPPS: number,
    lastTimeSpeed: number,
    objectsCount: number,
}) => ({
    type: TYPE_ACTION.STATS,
    payload,
})

export const modeChangeAction = (payload: VIEW_MODE) => ({
    type: TYPE_ACTION.MODE,
    payload,
})

export const setTargetTimeSpeedAction = (payload: number) => ({
    type: TYPE_ACTION.TARGET_TIME_SPEED,
    payload,
})

export const gridChangeAction = (payload: boolean) => ({
    type: TYPE_ACTION.IS_GRID,
    payload,
})

export const labelsChangeAction = (payload: boolean) => ({
    type: TYPE_ACTION.IS_LABELS,
    payload,
})

export const forceLinesChangeAction = (payload: boolean) => ({
    type: TYPE_ACTION.IS_FORCE_LINES,
    payload,
})

export const tidalForcesChangeAction = (payload: boolean) => ({
    type: TYPE_ACTION.IS_TIDAL_FORCES,
    payload,
})

export const fragmentsChangeAction = (payload: boolean) => ({
    type: TYPE_ACTION.IS_FRAGMENTS,
    payload,
})

export const collideChangeAction = (payload: boolean) => ({
    type: TYPE_ACTION.IS_COLLIDE,
    payload,
})
