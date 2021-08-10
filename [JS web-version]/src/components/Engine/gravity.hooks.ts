import React from "react";
import {engineStore} from "../../engineStore";
import {measureFrequency} from "../../utils/measureFrequency";
import {getDiameter} from "../../utils/other";

const gravityWithTimeSpeed = () => {
    const lastPPS = Math.max(engineStore.stats.lastPPS, 1);

    // todo: понять почему возникает такая необходимость
    const magicConst = 10;
    return magicConst * engineStore.universe.gravityConst * engineStore.settings.targetTimeSpeed / lastPPS;
}

const moveByVector = (totalDistance: number, a_pos: number, b_pos: number, a_mass: number, b_mass: number) => {
    const sign = Math.sign(a_pos - b_pos);
    const distance = Math.max(a_pos, b_pos) - Math.min(a_pos, b_pos);
    const distanceRelation = Math.abs(totalDistance / distance);

    const gravityForce = gravityWithTimeSpeed() * ((a_mass * b_mass) / Math.pow(totalDistance, 2)) / distanceRelation;

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
        engineStore.stats.lastPPS = lastPPS
    })

    const gravity = () => {
        measurePPS();

        // todo: чтобы не было резких скачков - нужно дождаться определения lastPPS
        //  но в первую секунду пауза, нужно вешать загрузочный экран
        //  или придумать как пофиксить это
        if (engineStore.stats.lastPPS) {
            engineStore.universe.currentTimeStamp += engineStore.settings.targetTimeSpeed / engineStore.stats.lastPPS;

            // todo: optimisation
            engineStore.lastObjects = {...engineStore.nextObjects};
            engineStore.drawObjects = {...engineStore.lastObjects};
            const nextObjectsArr = Object.entries(engineStore.nextObjects);

            for (let a = 0; a < nextObjectsArr.length; a++) {
                for (let b = a + 1; b < nextObjectsArr.length; b++) {
                    const [nameA, objectA] = nextObjectsArr[a];
                    const [nameB, objectB] = nextObjectsArr[b];

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

                        const isCollision = engineStore.settings.isCollide && detectCollision(totalDistance, getDiameter(objectA.mass), getDiameter(objectB.mass))

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
            engineStore.nextObjects = Object.fromEntries(
                nextObjectsArr
                    .filter(([name, object]) => object.mass > 0)
                    .map(([name, object]) => {

                        if (object.isGravity) {
                            const lastPPS = Math.max(engineStore.stats.lastPPS, 1);

                            object.x = object.x + object.vX * engineStore.settings.targetTimeSpeed / lastPPS;
                            object.y = object.y + object.vY * engineStore.settings.targetTimeSpeed / lastPPS;
                        }

                        return [name, object]
                    })
            )
        }

        requestAnimationFrame(gravity);
    }

    React.useEffect(() => {
        gravity()
    }, [canvasRef])
}
