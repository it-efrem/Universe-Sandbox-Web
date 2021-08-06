import React from "react";
import {store} from "../../store";
import {measureFrequency} from "../../utils/measureFrequency";
import {getDiameter, getPositionOnCanvas} from "../../utils/other";

// todo возможности:
//  - центрировать на самом тяжелом объекте
//  - центрировать на самом центре масс

export const useDraw = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    const measureFPS = measureFrequency((lastFPS: number) => {
        store.engine.lastFPS = lastFPS
    })

    const draw = () => {
        measureFPS();

        if (canvasRef?.current?.getContext) {
            const ctx = canvasRef?.current?.getContext("2d");

            if (ctx) {
                const lastFPS = store.engine.lastFPS || store.engine.targetFPS;
                // todo: завязка на послений fps подлагивает, с константой работало норм, понять причину
                const physicsToDrawTimeRelation = store.engine.targetPPS / lastFPS;

                ctx.clearRect(0, 0, store.canvas.width, store.canvas.height);

                store.canvas.coordinates.zeroX = (-store.canvas.offsetX + (store.canvas.centerX * store.canvas.scale)) / store.canvas.scale;
                store.canvas.coordinates.zeroY = (-store.canvas.offsetY + (store.canvas.centerY * store.canvas.scale)) / store.canvas.scale;

                // todo: refactoring
                // todo: сетка пропадает, если переместиться в сторону
                if (store.canvas.drawGrid) {
                    const linesRender = (step: number) => {
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

                        ctx.strokeStyle = `rgba(208, 208, 208, ${opacity})`;
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

                    linesRender(1);
                    linesRender(10);
                }

                for (let noIdx = 0; noIdx < store.nextObjects.length; noIdx++) {
                    const nextObject = store.nextObjects[noIdx];
                    const lastObject = store.lastObjects[noIdx];
                    const drawObject = store.drawObjects[noIdx] || lastObject;

                    if (nextObject && lastObject) {
                        const diffX = (nextObject.x - lastObject.x) / physicsToDrawTimeRelation;
                        const diffY = (nextObject.y - lastObject.y) / physicsToDrawTimeRelation;
                        const newX = drawObject.x + diffX;
                        const newY = drawObject.y + diffY;

                        store.drawObjects[noIdx] = {
                            ...drawObject,
                            x: newX,
                            y: newY
                        }
                    }
                }

                store.drawObjects.forEach((object) => {
                    // todo: клопипаста
                    const xPos = (object.x - store.canvas.offsetX + (store.canvas.centerX * store.canvas.scale)) / store.canvas.scale;
                    const yPos = (object.y - store.canvas.offsetY + (store.canvas.centerY * store.canvas.scale)) / store.canvas.scale;
                    const size = getDiameter(object.mass) / store.canvas.scale;

                    if (store.canvas.drawForceLines) {
                        const lineToX = xPos + object.vX;
                        const lineToY = yPos + object.vY;

                        ctx.strokeStyle = "#ff0000";
                        ctx.save();

                        const line = new Path2D();
                        line.moveTo(xPos, yPos);
                        line.lineTo(lineToX, lineToY);
                        ctx.stroke(line)
                        ctx.restore();
                    }

                    ctx.save();
                    const circle = new Path2D();

                    circle.arc(xPos, yPos, size, 0, Math.PI * 2, true);
                    ctx.fill(circle);
                    ctx.restore()
                })
            }
        }

        setTimeout(draw, 1000 / store.engine.targetFPS)
    }

    const mousedown = (e: MouseEvent) => {
        switch (store.canvas.mode) {
            case 'WATCH': {
                store.canvas.isMouseDown = true;
                store.canvas.clickX = e.x
                store.canvas.clickY = e.y

                break;
            }
            case 'ADDITIONAL': {
                const [x, y] = getPositionOnCanvas(e, store.canvas);

                store.nextObjects.push({
                    x,
                    y,
                    vX: 0,
                    vY: 0,
                    mass: 1000
                })
            }
        }
    }

    const mouseup = (e: MouseEvent) => {
        switch (store.canvas.mode) {
            case 'WATCH': {
                store.canvas.isMouseDown = false;
                store.canvas.lastX = store.canvas.offsetX;
                store.canvas.lastY = store.canvas.offsetY;

                break;
            }
        }
    }

    const mousemove = (e: MouseEvent) => {
        switch (store.canvas.mode) {
            case 'WATCH': {
                if (store.canvas.isMouseDown) {
                    store.canvas.offsetX = store.canvas.lastX + ((store.canvas.clickX - e.x) * store.canvas.scale);
                    store.canvas.offsetY = store.canvas.lastY + ((store.canvas.clickY - e.y) * store.canvas.scale);

                    break;
                }
            }
        }
    }

    const wheel = (e: WheelEvent) => {
        store.canvas.scale *= e.deltaY > 0 ? 1.1 : 0.9

        if (store.canvas.scale < 1) {
            store.canvas.scale = 1
        }
    }

    React.useEffect(() => {
        draw()

        // todo: Унести отсюда?
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
