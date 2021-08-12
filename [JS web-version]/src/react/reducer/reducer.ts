import {IAction, TYPE_ACTION} from "./actions";
import {ReactStoreType} from "./store";
import {engine} from "../../index";

export const reducer = (reactStore: ReactStoreType, action: IAction) => {
    switch (action.type) {
        case TYPE_ACTION.MODE: {
            reactStore.menu.viewMode = action.payload;
            engine.store.settings.viewMode = action.payload;
            break;
        }

        case TYPE_ACTION.PAUSE: {
            reactStore.menu.isPause = action.payload;
            engine.store.settings.isPause = action.payload;
            break;
        }

        case TYPE_ACTION.STATS: {
            reactStore.stats = action.payload;
            break;
        }

        case TYPE_ACTION.MENU: {
            reactStore.menu = action.payload;
            break;
        }

        case TYPE_ACTION.TARGET_TIME_SPEED: {
            reactStore.menu.targetTimeSpeed = action.payload;
            engine.store.settings.targetTimeSpeed = action.payload;
            break;
        }

        case TYPE_ACTION.IS_GRID: {
            reactStore.menu.isGrid = action.payload;
            engine.store.settings.isGrid = action.payload;
            break;
        }

        case TYPE_ACTION.IS_LABELS: {
            reactStore.menu.isLabels = action.payload;
            engine.store.settings.isLabels = action.payload;
            break;
        }

        case TYPE_ACTION.IS_FORCE_LINES: {
            reactStore.menu.isForceLines = action.payload;
            engine.store.settings.isForceLines = action.payload;
            break;
        }

        case TYPE_ACTION.IS_TIDAL_FORCES: {
            reactStore.menu.isTidalForces = action.payload;
            engine.store.settings.isTidalForces = action.payload;
            break;
        }

        case TYPE_ACTION.IS_FRAGMENTS: {
            reactStore.menu.isFragments = action.payload;
            engine.store.settings.isFragments = action.payload;
            break;
        }

        case TYPE_ACTION.IS_COLLIDE: {
            reactStore.menu.isCollide = action.payload;
            engine.store.settings.isCollide = action.payload;
            break;
        }
    }

    return {
        ...reactStore,
    }
}
