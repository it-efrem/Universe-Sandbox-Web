import {EngineStoreType, IDrawObject} from "../types";

const forceLineStrikeStyle = "#ff0000";

export const drawForceLine = (store: EngineStoreType, ctx: CanvasRenderingContext2D, objectName: string, object: IDrawObject) => {
    ctx.save();
    ctx.strokeStyle = forceLineStrikeStyle;

    const lineToX = (object.x_canvas + object.vX * store.canvas.vectorsScale / store.canvas.scale)
    const lineToY = (object.y_canvas + object.vY * store.canvas.vectorsScale / store.canvas.scale)

    const line = new Path2D();
    line.moveTo(object.x_canvas, object.y_canvas);
    line.lineTo(lineToX, lineToY);
    ctx.stroke(line)
    ctx.restore();
}
