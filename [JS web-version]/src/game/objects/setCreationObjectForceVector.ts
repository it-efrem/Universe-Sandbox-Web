import {engine} from "../../index";
import {getPositionOnCanvasByZero} from "../../utils/other";

export const setCreationObjectForceVector = (x_canvas: number, y_canvas: number) => {
    if (engine.store.creationObjectId !== undefined) {
        const nextObject = engine.store.nextObjects[engine.store.creationObjectId];

        if (nextObject) {
            const [vX, vY] = getPositionOnCanvasByZero(x_canvas, y_canvas, engine.store.canvas);

            nextObject.vX = vX * engine.store.canvas.scale / engine.store.canvas.vectorsScale;
            nextObject.vY = vY * engine.store.canvas.scale / engine.store.canvas.vectorsScale;
        }
    }
}
