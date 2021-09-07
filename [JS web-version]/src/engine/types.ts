import { GravityObjectByNameType } from "../game/gravityObject/GravityObject.types";

export type EngineStoreType = {
    stats: {
        // todo:
        // lastTimeSpeed: 100,
        lastFPS: number,
        lastPPS: number,
    },
    universe: {
        currentTimeStamp: number,
        gravityConst: number,
    },
    settings: {
        targetFPS: number,

        viewMode: VIEW_MODE,

        targetTimeSpeed: number,
        isPause: boolean,

        isLabels: boolean,
        isGrid: boolean,
        isForceLines: boolean,

        isCollide: boolean,
        isFragments: boolean,
        isTidalForces: boolean,

        isFollowTheObject: boolean,
    },
    canvas: {
        width: number,
        height: number,
        centerX: number,
        centerY: number,

        coordinates: {
            zeroX: number,
            zeroY: number,
        },

        offsetX: number,
        offsetY: number,
        lastX: number,
        lastY: number,
        clickX: number,
        clickY: number,
        scale: number,
        isMouseDown: boolean,

        gridCount: number,
    },
    vectorScaleFactor: number,
    activeObjectId: string | undefined,
    creationObjectId: string | undefined,
    nextObjects: GravityObjectByNameType,
    lastObjects: GravityObjectByNameType,
};

export interface IPoint2D {
    x: number,
    y: number,
}

export type EngineListenerType = (engineStore: EngineStoreType) => void

export enum VIEW_MODE {
    WATCH,
    ADDITIONAL,
}
