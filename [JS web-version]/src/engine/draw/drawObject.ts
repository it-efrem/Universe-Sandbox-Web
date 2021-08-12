import {EngineStoreType, IDrawObject, IGravityObject} from "../types";

const activeObjectStrokeStyle = "rgba(222 ,0, 14, 0.5)";

export const drawObject = (store: EngineStoreType, ctx: CanvasRenderingContext2D, objectName: string, object: IDrawObject) => {
    // Circle object
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    const circle = new Path2D();

    circle.arc(object.x_canvas, object.y_canvas, object.radius_canvas, 0, Math.PI * 2, true);
    ctx.fill(circle);
    ctx.restore()

    // Selected
    if (objectName === store.activeObjectId) {
        ctx.save();
        ctx.strokeStyle = activeObjectStrokeStyle;
        const circle = new Path2D();

        circle.arc(object.x_canvas, object.y_canvas, object.radius_canvas + 2, 0, Math.PI * 2, true);
        ctx.stroke(circle);
        ctx.restore()
    }
}
