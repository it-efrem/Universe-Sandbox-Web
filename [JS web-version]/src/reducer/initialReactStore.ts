import {engineStore, VIEW_MODE} from "../engineStore";

export const initialReactStore = {
    stats: {
        lastFPS: 0,
        lastPPS: 0,
        lastTimeSpeed: 0,
        objectsCount: 0,
    },
    menu: {
        targetTimeSpeed: 0,

        mode: VIEW_MODE.WATCH,
        isGrid: engineStore.settings.isGrid,
        isLabels: engineStore.settings.isLabels,
        isForceLines: engineStore.settings.isForceLines,
        isTidalForces: engineStore.settings.isTidalForces,
        isFragments: engineStore.settings.isFragments,
        isCollide: engineStore.settings.isCollide,
    },
};
