import {IAction, TYPE_ACTION} from "./actions";
import {engineStore} from "../engine/store";

export const reducer = (reactStore: any, action: IAction) => {
    switch (action.type) {
        case TYPE_ACTION.MODE: {
            reactStore.menu.mode = action.payload;
            engineStore.settings.viewMode = action.payload;
            break;
        }

        case TYPE_ACTION.STATS: {
            reactStore.stats = action.payload;
            break;
        }

        case TYPE_ACTION.TARGET_TIME_SPEED: {
            reactStore.menu.targetTimeSpeed = action.payload;
            engineStore.settings.targetTimeSpeed = action.payload;
            break;
        }

        case TYPE_ACTION.IS_GRID: {
            reactStore.menu.isGrid = action.payload;
            engineStore.settings.isGrid = action.payload;
            break;
        }

        case TYPE_ACTION.IS_LABELS: {
            reactStore.menu.isLabels = action.payload;
            engineStore.settings.isLabels = action.payload;
            break;
        }

        case TYPE_ACTION.IS_FORCE_LINES: {
            reactStore.menu.isForceLines = action.payload;
            engineStore.settings.isForceLines = action.payload;
            break;
        }

        case TYPE_ACTION.IS_TIDAL_FORCES: {
            reactStore.menu.isTidalForces = action.payload;
            engineStore.settings.isTidalForces = action.payload;
            break;
        }

        case TYPE_ACTION.IS_FRAGMENTS: {
            reactStore.menu.isFragments = action.payload;
            engineStore.settings.isFragments = action.payload;
            break;
        }

        case TYPE_ACTION.IS_COLLIDE: {
            reactStore.menu.isCollide = action.payload;
            engineStore.settings.isCollide = action.payload;
            break;
        }
    }

    return {
        ...reactStore,
    }
}
