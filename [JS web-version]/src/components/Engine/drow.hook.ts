import React from "react";
import {engineStore} from "../../engineStore";
import {measureFrequency} from "../../utils/measureFrequency";
import {getDiameter} from "../../utils/other";

export const useDraw = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    const measureFPS = measureFrequency((lastFPS: number) => {
        engineStore.stats.lastFPS = lastFPS
    })

    const draw = () => {
        measureFPS();

        if (canvasRef?.current?.getContext) {
            const ctx = canvasRef?.current?.getContext("2d");

            if (ctx) {
                const lastFPS = engineStore.stats.lastFPS || engineStore.stats.targetFPS;
                // todo: завязка на послений fps подлагивает, с константой работало норм, понять причину
                const physicsToDrawTimeRelation = engineStore.stats.targetPPS / lastFPS;

                ctx.clearRect(0, 0, engineStore.canvas.width, engineStore.canvas.height);

                engineStore.canvas.coordinates.zeroX = (-engineStore.canvas.offsetX + (engineStore.canvas.centerX * engineStore.canvas.scale)) / engineStore.canvas.scale;
                engineStore.canvas.coordinates.zeroY = (-engineStore.canvas.offsetY + (engineStore.canvas.centerY * engineStore.canvas.scale)) / engineStore.canvas.scale;

                // todo: refactoring
                // todo: сетка пропадает, если переместиться в сторону
                if (engineStore.settings.isGrid) {
                    const linesRender = (step: number) => {
                        const xArr = [];
                        const yArr = [];

                        const scaleOrder = Math.trunc(engineStore.canvas.scale).toString().length;
                        const minDistance = Math.pow(10, scaleOrder) * step;
                        const count = Math.pow(engineStore.canvas.gridCount, 2);
                        const opacity = minDistance / engineStore.canvas.scale / 10

                        for (let i = count / -2; i <= count / 2; i++) {
                            yArr.push(
                                engineStore.canvas.coordinates.zeroX - (minDistance * i) * 10 / engineStore.canvas.scale,
                            )
                        }

                        for (let i = count / -2; i <= count / 2; i++) {
                            xArr.push(
                                engineStore.canvas.coordinates.zeroY - (minDistance * i) * 10 / engineStore.canvas.scale,
                            )
                        }

                        ctx.strokeStyle = `rgba(208, 208, 208, ${opacity})`;
                        ctx.save();

                        yArr.forEach(x => {
                            const yStart = 0;
                            const yEnd = engineStore.canvas.height;

                            const line = new Path2D();
                            line.moveTo(x, yStart);
                            line.lineTo(x, yEnd);
                            ctx.stroke(line)

                        })

                        xArr.forEach(y => {
                            const xStart = 0;
                            const xEnd = engineStore.canvas.width;

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

                const nextObjectsKeys = Object.keys(engineStore.nextObjects);

                nextObjectsKeys.forEach((objectName) => {
                    const nextObject = engineStore.nextObjects[objectName];
                    const lastObject = engineStore.lastObjects[objectName];
                    const drawObject = engineStore.drawObjects[objectName] || lastObject;

                    if (nextObject && lastObject) {
                        const diffX = (nextObject.x - lastObject.x) / physicsToDrawTimeRelation;
                        const diffY = (nextObject.y - lastObject.y) / physicsToDrawTimeRelation;
                        const newX = drawObject.x + diffX;
                        const newY = drawObject.y + diffY;

                        engineStore.drawObjects[objectName] = {
                            ...drawObject,
                            x: newX,
                            y: newY
                        }
                    }
                })

                Object.entries(engineStore.drawObjects).forEach(([name, object]) => {
                    // todo: копипаста
                    const xPos = (object.x - engineStore.canvas.offsetX + (engineStore.canvas.centerX * engineStore.canvas.scale)) / engineStore.canvas.scale;
                    const yPos = (object.y - engineStore.canvas.offsetY + (engineStore.canvas.centerY * engineStore.canvas.scale)) / engineStore.canvas.scale;
                    const size = getDiameter(object.mass) / engineStore.canvas.scale;

                    if (engineStore.settings.isForceLines || !object.isGravity) {
                        ctx.save();
                        ctx.strokeStyle = "#ff0000";

                        const lineToX = (xPos + object.vX * engineStore.canvas.vectorsScale / engineStore.canvas.scale)
                        const lineToY = (yPos + object.vY * engineStore.canvas.vectorsScale / engineStore.canvas.scale)

                        const line = new Path2D();
                        line.moveTo(xPos, yPos);
                        line.lineTo(lineToX, lineToY);
                        ctx.stroke(line)
                        ctx.restore();
                    }

                    if (engineStore.settings.isLabels) {
                        ctx.save();
                        ctx.font = "12px arial";
                        ctx.fillText(name, xPos + size / 1.3, yPos - size / 1.3);
                        ctx.restore()
                    }

                    ctx.save();
                    ctx.fillStyle = "rgba(0,0,0,0.5)";
                    const circle = new Path2D();

                    circle.arc(xPos, yPos, size, 0, Math.PI * 2, true);
                    ctx.fill(circle);
                    ctx.restore()
                })
            }
        }

        setTimeout(draw, 1000 / engineStore.stats.targetFPS)
    }

    React.useEffect(() => {
        draw()
    }, [canvasRef])
}
