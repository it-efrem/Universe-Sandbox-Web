import {VIEW_MODE} from "../../engine/types";

export const store = {
    stats: {
        lastFPS: 0,
        lastPPS: 0,
        lastTimeSpeed: 0,
        objectsCount: 0,
    },
    menu: {
        targetTimeSpeed: 0,

        mode: VIEW_MODE.WATCH,
        isPause: false,
        isGrid: false,
        isLabels: false,
        isForceLines: false,
        isTidalForces: false,
        isFragments: false,
        isCollide: false,
    },
};

export type ReactStoreType = typeof store;
