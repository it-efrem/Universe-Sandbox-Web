import React from "react";
import {engineStore, VIEW_MODE} from "../../engine/store";
import {getPositionOnCanvasByZero, getPositionOnUniverse, getRandomName} from "../../utils/other";

export const useEngine = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    // todo: для обозначения объектов нужно использовать уникальные id, чтобы при коллизиях ничего не сбивалось
    const additionalObjNameRef = React.useRef<string | undefined>(undefined);

    const mousedown = (e: MouseEvent) => {
        e.preventDefault();

        if (e.which === 1) {
            engineStore.canvas.isMouseDown = true;
            engineStore.canvas.clickX = e.x
            engineStore.canvas.clickY = e.y
        }

        switch (engineStore.settings.viewMode) {
            case VIEW_MODE.ADDITIONAL: {
                const [x, y] = getPositionOnUniverse(e, engineStore.canvas);
                const objectName = getRandomName();

                additionalObjNameRef.current = objectName;

                engineStore.nextObjects[objectName] = ({
                    x,
                    y,
                    vX: 0,
                    vY: 0,
                    mass: 100,
                    isGravity: false,
                });

                break;
            }
        }
    }

    const mouseup = (e: MouseEvent) => {
        e.preventDefault();

        if (e.which === 1) {
            engineStore.canvas.isMouseDown = false;
            engineStore.canvas.lastX = engineStore.canvas.offsetX;
            engineStore.canvas.lastY = engineStore.canvas.offsetY;
        }

        switch (engineStore.settings.viewMode) {
            case VIEW_MODE.ADDITIONAL: {
                if (additionalObjNameRef.current !== undefined) {
                    const nextObject = engineStore.nextObjects[additionalObjNameRef.current];

                    if (nextObject) {
                        nextObject.isGravity = true
                    }
                }
            }
        }

        additionalObjNameRef.current = undefined
    }

    const mousemove = (e: MouseEvent) => {
        e.preventDefault();

        switch (engineStore.settings.viewMode) {
            case VIEW_MODE.WATCH: {
                if (e.which === 1 && engineStore.canvas.isMouseDown) {
                    engineStore.canvas.offsetX = engineStore.canvas.lastX + ((engineStore.canvas.clickX - e.x) * engineStore.canvas.scale);
                    engineStore.canvas.offsetY = engineStore.canvas.lastY + ((engineStore.canvas.clickY - e.y) * engineStore.canvas.scale);
                }

                break;
            }

            case VIEW_MODE.ADDITIONAL : {
                if (additionalObjNameRef.current !== undefined) {
                    const nextObject = engineStore.nextObjects[additionalObjNameRef.current];

                    if (nextObject) {
                        const [vX, vY] = getPositionOnCanvasByZero(e, engineStore.canvas);

                        nextObject.vX = vX * engineStore.canvas.scale / engineStore.canvas.vectorsScale;
                        nextObject.vY = vY * engineStore.canvas.scale / engineStore.canvas.vectorsScale;
                    }
                }

                break;
            }
        }
    }

    const wheel = (e: WheelEvent) => {
        e.preventDefault();

        if (!engineStore.canvas.isMouseDown) {
            engineStore.canvas.scale *= e.deltaY > 0 ? 1.1 : 0.9

            if (engineStore.canvas.scale < 1) {
                engineStore.canvas.scale = 1
            }
        }

        switch (engineStore.settings.viewMode) {
            case VIEW_MODE.ADDITIONAL : {
                if (additionalObjNameRef.current !== undefined) {
                    const nextObject = engineStore.nextObjects[additionalObjNameRef.current];

                    if (nextObject) {
                        nextObject.mass *= e.deltaY < 0 ? 1.3 : 0.8
                    }
                }

                break;
            }
        }
    }

    React.useEffect(() => {
        document.oncontextmenu = () => false;

        canvasRef.current?.addEventListener('mousedown', mousedown)
        canvasRef.current?.addEventListener('mouseup', mouseup)
        canvasRef.current?.addEventListener('mousemove', mousemove)
        canvasRef.current?.addEventListener('wheel', wheel)

        return () => {
            canvasRef.current?.removeEventListener('mousedown', mousedown)
            canvasRef.current?.removeEventListener('mouseup', mouseup)
            canvasRef.current?.removeEventListener('mousemove', mousemove)
            canvasRef.current?.removeEventListener('wheel', wheel)
        }
    }, [canvasRef])
}
