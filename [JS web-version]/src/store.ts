export const store = {
    engine: {
        targetFPS: 60,
        targetPPS: 1,

        lastFPS: 0,
        lastPPS: 0,
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
        scale: 50,
        isMouseDown: false,

        drawForceLines: false,

        drawGrid: true,
        gridCount: 10,

        mode: 'WATCH' // 'WATCH', 'ADDITIONAL'
    },
    nextObjects: [
        // {
        //     y: 0,
        //     x: 0,
        //     vX: 0,
        //     vY: 0,
        //     mass: 1000000
        // },
        // {
        //     y: -0,
        //     x: -10000,
        //     vX: 0,
        //     vY: 25.75,
        //     mass: 1000
        // },
        // {
        //     y: 0,
        //     x: -20000,
        //     vX: 0,
        //     vY: 18.2,
        //     mass: 1000
        // },
    ] as IGravityObject[],
    lastObjects: [] as IGravityObject[],
    drawObjects: [] as IGravityObject[],
}

export const orbitSpeed = () => {

}

function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

for (let i = 0; i < 2000; i++) {
    store.nextObjects.push({
        x: Math.max(Math.random() * 500000, 0),
        y: Math.max(Math.random() * 500000, 0),
        mass: Math.max(Math.random() * 10000, 1000),
        vX: random(-25, 25),
        vY: random(-25, 25),
    })
}

export interface IGravityObject {
    x: number, // km
    y: number, // km
    vX: number, // km/s
    vY: number, // km/s
    mass: number,  // kg
}
