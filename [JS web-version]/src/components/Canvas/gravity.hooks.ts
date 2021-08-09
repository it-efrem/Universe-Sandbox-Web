import React from "react";
import {store} from "../../store";
import {measureFrequency} from "../../utils/measureFrequency";
import {getDiameter} from "../../utils/other";

const moveByVector = (totalDistance: number, a_pos: number, b_pos: number, a_mass: number, b_mass: number) => {
    const sign = Math.sign(a_pos - b_pos);
    const distance = Math.max(a_pos, b_pos) - Math.min(a_pos, b_pos);
    const distanceRelation = Math.abs(totalDistance / distance);

    const gravityForce = store.universe.gravityConst * ((a_mass * b_mass) / Math.pow(totalDistance, 2)) / distanceRelation;

    const a_vector = gravityForce / a_mass * -sign;
    const b_vector = gravityForce / b_mass * sign;

    return [
        a_vector,
        b_vector,
    ]
}

const detectCollision = (totalDistance: number, a_radius: number, b_radius: number) => {
    return totalDistance < a_radius || totalDistance < b_radius
}

export const useGravity = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    const measurePPS = measureFrequency((lastPPS: number) => {
        store.engine.lastPPS = lastPPS
    })

    const gravity = () => {
        measurePPS();

        store.lastObjects = [...store.nextObjects];
        store.drawObjects = store.lastObjects;

        for (let a = 0; a < store.nextObjects.length; a++) {
            for (let b = a + 1; b < store.nextObjects.length; b++) {
                const objectA = store.nextObjects[a];
                const objectB = store.nextObjects[b];

                //todo: refactoring
                if (objectA.isGravity && objectB.isGravity && objectA.mass && objectB.mass) {
                    const x_pos = Math.abs(objectA.x - objectB.x);
                    const y_pos = Math.abs(objectA.y - objectB.y);

                    const totalDistance = Math.sqrt(
                        Math.pow(x_pos, 2) +
                        Math.pow(y_pos, 2)
                    )

                    const [
                        a_x_vector,
                        b_x_vector,
                    ] = moveByVector(totalDistance, objectA.x, objectB.x, objectA.mass, objectB.mass);

                    const [
                        a_y_vector,
                        b_y_vector,
                    ] = moveByVector(totalDistance, objectA.y, objectB.y, objectA.mass, objectB.mass);

                    objectA.vX += a_x_vector
                    objectA.vY += a_y_vector

                    objectB.vX += b_x_vector
                    objectB.vY += b_y_vector

                    const isCollision = store.engine.isCollide && detectCollision(totalDistance, getDiameter(objectA.mass), getDiameter(objectB.mass))

                    if (isCollision) {
                        const totalMass = objectA.mass + objectB.mass;
                        const xForce = (objectA.vX * objectA.mass + objectB.vX * objectB.mass) / totalMass;
                        const yForce = (objectA.vY * objectA.mass + objectB.vY * objectB.mass) / totalMass;

                        objectA.mass = totalMass;
                        objectA.vX = xForce;
                        objectA.vY = yForce;

                        // todo: починить мерж, сейчас при меже большой объект может резко скокнуть на место легкого
                        // todo: пофиксить костыль с массой
                        objectB.mass = 0;
                    }
                }
            }
        }

        // todo: optimize
        store.nextObjects = store.nextObjects
            .filter((obj) => obj.mass > 0)
            .map(object => {

                if (object.isGravity) {
                    object.x = object.x + object.vX;
                    object.y = object.y + object.vY;
                }

                return object
            })

        // setTimeout(gravity, store.engine.targetPPS);
        requestAnimationFrame(gravity);
    }

    React.useEffect(() => {
        gravity()
    }, [canvasRef])
}
