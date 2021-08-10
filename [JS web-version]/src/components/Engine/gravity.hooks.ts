import React from "react";
import {engineStore} from "../../engine/store";
import {measureFrequency} from "../../utils/measureFrequency";
import {detectCanvasCollision, detectUniverseCollision, getRadius, getVectorLength} from "../../utils/other";
import {triggerListeners} from "../../engine/listener";

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

                        const totalDistance = getVectorLength(x_pos, y_pos);

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

                        const isCollision = engineStore.settings.isCollide && detectUniverseCollision(totalDistance, getRadius(objectA.mass), getRadius(objectB.mass))

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
            // todo: удалять все объекты, которые не должны симулироваться и если ЛКМ поднята
            engineStore.nextObjects = Object.fromEntries(
                nextObjectsArr
                    .filter(([id, object]) => object.mass > 0)
                    .map(([id, object]) => {

                        // detect active object
                        if (engineStore.canvas.isMouseDown) {
                            const universe_x = (engineStore.canvas.clickX - engineStore.canvas.centerX) * engineStore.canvas.scale + engineStore.canvas.offsetX;
                            const universe_y = (engineStore.canvas.clickY - engineStore.canvas.centerY) * engineStore.canvas.scale + engineStore.canvas.offsetY;

                            if (detectCanvasCollision(universe_x, universe_y, 1, object.x, object.y, getRadius(object.mass))) {
                                engineStore.activeObjectId = id;
                            }
                        }

                        if (object.isGravity) {
                            const lastPPS = Math.max(engineStore.stats.lastPPS, 1);

                            object.x = object.x + object.vX * engineStore.settings.targetTimeSpeed / lastPPS;
                            object.y = object.y + object.vY * engineStore.settings.targetTimeSpeed / lastPPS;
                        }

                        return [id, object]
                    })
            )
        }

        triggerListeners()
        requestAnimationFrame(gravity);
    }

    React.useEffect(() => {
        gravity()
    }, [canvasRef])
}
