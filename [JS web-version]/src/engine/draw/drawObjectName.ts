import {EngineStoreType, IDrawObject} from "../types";

const font = "12px arial";

export const drawObjectName = (store: EngineStoreType, ctx: CanvasRenderingContext2D, objectName: string, object: IDrawObject) => {
    ctx.save();
    ctx.font = font;
    ctx.fillText(objectName, object.x_canvas + object.radius_canvas / 1.3, object.y_canvas - object.radius_canvas / 1.3);
    ctx.restore()
}
