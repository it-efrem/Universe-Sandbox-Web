import React from "react";
import {store, VIEW_MODE} from "../../store";
import {getPositionOnCanvasByZero, getPositionOnUniverse} from "../../utils/other";

export const useEngine = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    // todo: для обозначения объектов нужно использовать уникальные id, чтобы при коллизиях ничего не сбивалось
    const additionalObjIdRef = React.useRef<number | undefined>(undefined);

    const mousedown = (e: MouseEvent) => {
        e.preventDefault();

        if (e.which === 1) {
            store.canvas.isMouseDown = true;
            store.canvas.clickX = e.x
            store.canvas.clickY = e.y
        }

        switch (store.view.mode) {
            case VIEW_MODE.ADDITIONAL: {
                const [x, y] = getPositionOnUniverse(e, store.canvas);

                additionalObjIdRef.current = store.nextObjects.push({
                    x,
                    y,
                    vX: 0,
                    vY: 0,
                    mass: 1000,
                    isGravity: false,
                })
                additionalObjIdRef.current--;

                break;
            }
        }
    }

    const mouseup = (e: MouseEvent) => {
        e.preventDefault();

        if (e.which === 1) {
            store.canvas.isMouseDown = false;
            store.canvas.lastX = store.canvas.offsetX;
            store.canvas.lastY = store.canvas.offsetY;
        }

        switch (store.view.mode) {
            case VIEW_MODE.ADDITIONAL: {
                if (additionalObjIdRef.current !== undefined) {
                    const nextObject = store.nextObjects[additionalObjIdRef.current];

                    if (nextObject) {
                        nextObject.isGravity = true
                    }
                }
            }
        }

        additionalObjIdRef.current = undefined
    }

    const mousemove = (e: MouseEvent) => {
        e.preventDefault();

        switch (store.view.mode) {
            case VIEW_MODE.WATCH: {
                if (e.which === 1 && store.canvas.isMouseDown) {
                    store.canvas.offsetX = store.canvas.lastX + ((store.canvas.clickX - e.x) * store.canvas.scale);
                    store.canvas.offsetY = store.canvas.lastY + ((store.canvas.clickY - e.y) * store.canvas.scale);
                }

                break;
            }

            case VIEW_MODE.ADDITIONAL : {
                if (additionalObjIdRef.current !== undefined) {
                    const nextObject = store.nextObjects[additionalObjIdRef.current];

                    if (nextObject) {
                        const [vX, vY] = getPositionOnCanvasByZero(e, store.canvas);

                        nextObject.vX = vX * store.canvas.scale / store.canvas.vectorsScale;
                        nextObject.vY = vY * store.canvas.scale / store.canvas.vectorsScale;
                    }
                }

                break;
            }
        }
    }

    const wheel = (e: WheelEvent) => {
        e.preventDefault();

        if (!store.canvas.isMouseDown) {
            store.canvas.scale *= e.deltaY > 0 ? 1.1 : 0.9

            if (store.canvas.scale < 1) {
                store.canvas.scale = 1
            }
        }

        switch (store.view.mode) {
            case VIEW_MODE.ADDITIONAL : {
                if (additionalObjIdRef.current !== undefined) {
                    const nextObject = store.nextObjects[additionalObjIdRef.current];

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
