import React from "react";

const store = {
    nextObjects: [
        // {
        //     x: 0,
        //     y: 0,
        //     mass: 10
        // },
        // {
        //     x: 800,
        //     y: 0,
        //     mass: 75
        // },
        // {
        //     x: 900,
        //     y: 100,
        //     mass: 75
        // },
        // {
        //     x: 800,
        //     y: 300,
        //     mass: 150
        // },
    ] as IGravityObject[],
    lastObjects: [] as IGravityObject[],
    drawObjects: [] as IGravityObject[],
}

for (let i = 0; i < 200; i++) {
    store.nextObjects.push({
        x: Math.max(Math.random() * 1000, 0),
        y: Math.max(Math.random() * 1000, 0),
        mass: Math.max(Math.random() * 10, 5),
        vX: 0,
        vY: 0,
    })
}

export const useCanvas = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    const fullScreenListener = () => {
        canvasRef.current?.setAttribute('width', `${window.innerWidth - 20}px`)
        canvasRef.current?.setAttribute('height', `${window.innerHeight - 20}px`)
    }

    React.useEffect(() => {
        fullScreenListener()
        window.addEventListener('resize', fullScreenListener)

        return () => {
            window.removeEventListener('resize', fullScreenListener)
        }
    }, [])

    return {canvasRef}
}

const targetFPS = 60;
const drawTime = 1000 / targetFPS;
const physicsTime = 1000 / targetFPS;
const physicsToDrawTimeRelation = physicsTime / drawTime;

interface IGravityObject {
    x: number,
    y: number,
    vX: number,
    vY: number,
    mass: number,
}

export const useDraw = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    const draw = () => {
        // console.log('store', store)

        if (canvasRef?.current?.getContext) {
            const ctx = canvasRef?.current?.getContext("2d");

            if (ctx) {
                ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

                for (let noIdx = 0; noIdx < store.nextObjects.length; noIdx++) {
                    const nextObject = store.nextObjects[noIdx];
                    const lastObject = store.lastObjects[noIdx];
                    const drawObject = store.drawObjects[noIdx] || lastObject;

                    if (nextObject && lastObject) {
                        const diffX = (nextObject.x - lastObject.x) / physicsToDrawTimeRelation;
                        const diffY = (nextObject.y - lastObject.y) / physicsToDrawTimeRelation;
                        const newX = drawObject.x + diffX;
                        const newY = drawObject.y + diffY;

                        store.drawObjects[noIdx] = {
                            ...drawObject,
                            x: newX,
                            y: newY
                        }
                    }
                }

                store.drawObjects.forEach((object) => {
                    const circle = new Path2D();
                    circle.arc(object.x, object.y, Math.sqrt(object.mass), 0, Math.PI * 2, true);
                    ctx.fill(circle);
                })
            }
        }

        setTimeout(draw, drawTime)
    }

    React.useEffect(() => {
        draw()
    }, [canvasRef])
}

const moveByVector = (totalDistance: number, a_pos: number, b_pos: number, a_mass: number, b_mass: number) => {
    const sign = a_pos - b_pos < 0 ? 1 : -1;
    const distance = a_pos - b_pos;
    const distanceRelation = Math.abs(totalDistance / distance);

    if (distance < -1 || distance > 1) {
        const gravityForce = ((a_mass * b_mass) / Math.sqrt(Math.abs(totalDistance))) / distanceRelation / 100;

        const a_vector = (gravityForce / (a_mass / b_mass)) * sign / 10;
        const b_vector = (gravityForce / (b_mass / a_mass)) * -sign / 10;

        const new_a_pos = a_pos + a_vector;
        const new_b_pos = b_pos + b_vector;

        return [
            new_a_pos,
            new_b_pos,
            a_vector,
            b_vector,
        ]
    } else {
        return [
            a_pos,
            b_pos,
            0,
        ]
    }
}

const detectCollision = (totalDistance: number, a_radius: number, b_radius: number) => {
    return totalDistance < a_radius || totalDistance < b_radius
}

export const useGravity = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    const gravity = () => {
        // console.log('gravity')

        store.lastObjects = [...store.nextObjects];
        store.drawObjects = store.lastObjects;

        console.log('count:', store.lastObjects.length)

        for (let a = 0; a < store.nextObjects.length; a++) {
            for (let b = a + 1; b < store.nextObjects.length; b++) {
                const objectA = store.nextObjects[a];
                const objectB = store.nextObjects[b];

                const totalDistance = Math.sqrt(
                    Math.pow(objectA.x - objectB.x, 2) +
                    Math.pow(objectA.y - objectB.y, 2)
                )

                const [
                    a_x_pos,
                    b_x_pos,
                    a_x_vector,
                    b_x_vector,
                ] = moveByVector(totalDistance, objectA.x, objectB.x, objectA.mass, objectB.mass);

                const [
                    a_y_pos,
                    b_y_pos,
                    a_y_vector,
                    b_y_vector,
                ] = moveByVector(totalDistance, objectA.y, objectB.y, objectA.mass, objectB.mass);

                const isCollision = detectCollision(totalDistance, Math.sqrt(objectA.mass), Math.sqrt(objectB.mass))

                if (!isCollision) {
                    store.nextObjects[a] = {
                        ...objectA,
                        x: a_x_pos,
                        y: a_y_pos,
                        vX: a_x_vector,
                        vY: a_y_vector,
                    };
                    store.nextObjects[b] = {
                        ...objectB,
                        x: b_x_pos,
                        y: b_y_pos,
                        vX: b_x_vector,
                        vY: b_y_vector,
                    };
                } else {
                    store.nextObjects[a] = {
                        ...objectA,
                        x: a_x_pos,
                        y: a_y_pos,
                        vX: a_x_vector,
                        vY: a_y_vector,
                        mass: store.nextObjects[a].mass + store.nextObjects[b].mass
                    };
                    store.nextObjects[b] = {
                        ...objectB,
                        mass: 0
                    };
                }
            }
        }

        store.nextObjects = store.nextObjects.filter((obj) => obj.mass > 0)
        console.log('store.nextObjects', store.nextObjects)

        setTimeout(gravity, physicsTime);
    }

    React.useEffect(() => {
        gravity()
    }, [canvasRef])
}
