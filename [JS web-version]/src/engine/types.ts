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
        vectorsScale: number,
    },
    activeObjectId: string | undefined,
    creationObjectId: string | undefined,
    nextObjects: GravityObjectsType,
    lastObjects: GravityObjectsType,
};

export type EngineListenerType = (engineStore: EngineStoreType) => void

export enum VIEW_MODE {
    WATCH,
    ADDITIONAL,
}

export interface IGravityObject {
    x: number, // km
    y: number, // km
    vX: number, // km/s
    vY: number, // km/s
    mass: number,  // kg
    isGravity: boolean, // todo: is simulated
}

export type GravityObjectsType = Record<string, IGravityObject>;

export interface IDrawObject extends IGravityObject {
    x_canvas: number,
    y_canvas: number,
    radius_canvas: number,
}
