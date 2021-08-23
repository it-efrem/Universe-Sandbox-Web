import {EngineStoreType} from "../types";

// todo: refactoring
// todo: сетка пропадает, если переместиться в сторону
export const drawGrid = (store: EngineStoreType, ctx: CanvasRenderingContext2D, step: number) => {
    const xArr = [];
    const yArr = [];

    const scaleOrder = Math.trunc(store.canvas.scale).toString().length;
    const minDistance = Math.pow(10, scaleOrder) * step;
    const count = Math.pow(store.canvas.gridCount, 2);
    const opacity = minDistance / store.canvas.scale / 10

    for (let i = count / -2; i <= count / 2; i++) {
        yArr.push(
            store.canvas.coordinates.zeroX - (minDistance * i) * 10 / store.canvas.scale,
        )
    }

    for (let i = count / -2; i <= count / 2; i++) {
        xArr.push(
            store.canvas.coordinates.zeroY - (minDistance * i) * 10 / store.canvas.scale,
        )
    }

    ctx.strokeStyle = `rgba(50, 50, 50, ${opacity})`;
    ctx.save();

    yArr.forEach(x => {
        const yStart = 0;
        const yEnd = store.canvas.height;

        const line = new Path2D();
        line.moveTo(x, yStart);
        line.lineTo(x, yEnd);
        ctx.stroke(line)

    })

    xArr.forEach(y => {
        const xStart = 0;
        const xEnd = store.canvas.width;

        const line = new Path2D();
        line.moveTo(xStart, y);
        line.lineTo(xEnd, y);
        ctx.stroke(line)
    })

    ctx.restore();
}
