export enum VIEW_MODE {
    WATCH,
    ADDITIONAL,
}

export const engineStore = {
    stats: {
        targetFPS: 60,
        targetPPS: 1, // Deprecated

        // todo:
        // lastTimeSpeed: 100,
        lastFPS: 0,
        lastPPS: 0,
    },
    universe: {
        currentTimeStamp: 0,
        gravityConst: 6.67,
    },
    settings: {
        viewMode: VIEW_MODE.WATCH as VIEW_MODE,

        // todo: учитывать фактическое максимальное время
        targetTimeSpeed: 100,
        isPause: false,

        isLabels: true,
        isGrid: true,
        isForceLines: true,

        isCollide: true,
        isFragments: true,
        isTidalForces: true,
    },
    canvas: {
        width: 0,
        height: 0,
        centerX: 0,
        centerY: 0,

        coordinates: {
            zeroX: 0,
            zeroY: 0,
        },

        offsetX: 0,
        offsetY: 0,
        lastX: 0,
        lastY: 0,
        clickX: 0,
        clickY: 0,
        scale: 1000,
        isMouseDown: false,

        gridCount: 10,
        vectorsScale: 100,
    },
    activeObjectId: undefined as string | undefined,
    nextObjects: {
        'Earth': {
            y: 0,
            x: 0,
            vX: 0,
            vY: 0,
            mass: 6600, // 10(18)
            isGravity: true,
        },
        'Moon': {
            y: -0,
            x: -406000,
            vX: 0,
            vY: 1.02,
            mass: 81.2,
            isGravity: true,
        },
    } as ObjectsType,
    lastObjects: {} as ObjectsType,
    drawObjects: {} as ObjectsType,
}

export type EngineStoreType = typeof engineStore;

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// for (let i = 0; i < 1000; i++) {
//     store.nextObjects.push({
//         x: Math.max(Math.random() * 100000, 0),
//         y: Math.max(Math.random() * 100000, 0),
//         mass: Math.max(Math.random() * 1000, 100),
//         isGravity: true,
//         vX: -15,
//         vY: -15,
//         // vX: random(-25, 25),
//         // vY: random(-25, 25),
//     })
// }

export type ObjectsType = Record<string, IGravityObject>;

export interface IGravityObject {
    x: number, // km
    y: number, // km
    vX: number, // km/s
    vY: number, // km/s
    mass: number,  // kg
    isGravity: boolean, // todo: is simulated
}
