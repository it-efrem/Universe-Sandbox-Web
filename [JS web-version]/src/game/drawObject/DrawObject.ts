import {GravityObject} from "../gravityObject/GravityObject";
import {EngineStoreType, IPoint2D} from "../../engine/types";
import {GravityObjectRadius} from "../gravityObject/GravityObject.types";
import {DrawObjectStyles} from "./DrawObject.styles";

export class DrawObject {
    public canvasCoordinates: IPoint2D;
    public object: GravityObject;

    private store: EngineStoreType;
    private ctx: CanvasRenderingContext2D;
    private canvasRadius: GravityObjectRadius;
    private physicsToDrawTimeRelation: number;
    private name: string;

    constructor(store: EngineStoreType, ctx: CanvasRenderingContext2D, physicsToDrawTimeRelation: number, name: string,
                object: GravityObject, lastObject: GravityObject) {
        this.store = store;
        this.ctx = ctx;
        this.physicsToDrawTimeRelation = physicsToDrawTimeRelation;
        this.name = name;
        this.object = object;

        this.canvasRadius = {
            surface: object.radius.surface / store.canvas.scale,
            water: object.radius.water / store.canvas.scale,
            atmosphere: object.radius.atmosphere / store.canvas.scale,
        }

        const lastObject_x = lastObject?.coordinates?.x || 0;
        const lastObject_y = lastObject?.coordinates?.y || 0;

        const diffX = (object.coordinates.x - lastObject_x) / physicsToDrawTimeRelation;
        const diffY = (object.coordinates.y - lastObject_y) / physicsToDrawTimeRelation;
        const newX = lastObject_x + diffX;
        const newY = lastObject_y + diffY;

        this.canvasCoordinates = {
            x: (newX - this.store.canvas.offsetX + (this.store.canvas.centerX * this.store.canvas.scale)) /
                this.store.canvas.scale,
            y: (newY - this.store.canvas.offsetY + (this.store.canvas.centerY * this.store.canvas.scale)) /
                this.store.canvas.scale,
        };
    }

    public drawObject() {
        this.drawWater();
        this.drawSurface();
        this.drawAtmosphere();
    }

    public drawLabel() {
        this.ctx.save();
        this.ctx.font = DrawObjectStyles.label.font;
        this.ctx.fillStyle = DrawObjectStyles.label.fillStyle;
        this.ctx.fillText(this.name,
            this.canvasCoordinates.x + this.canvasRadius.atmosphere / 1.25 + DrawObjectStyles.activeObject.offset,
            this.canvasCoordinates.y - this.canvasRadius.atmosphere / 1.25 - DrawObjectStyles.activeObject.offset);
        this.ctx.restore();
    }

    public drawForceLines() {
        this.ctx.save();
        this.ctx.strokeStyle = DrawObjectStyles.forceLines.strokeStyle;

        const lineToX = (this.canvasCoordinates.x +
            this.object.vectorMove.x *
            this.store.canvas.vectorsScale /
            this.store.canvas.scale);

        const lineToY = (this.canvasCoordinates.y +
            this.object.vectorMove.y *
            this.store.canvas.vectorsScale /
            this.store.canvas.scale);

        const line = new Path2D();
        line.moveTo(this.canvasCoordinates.x, this.canvasCoordinates.y);
        line.lineTo(lineToX, lineToY);
        this.ctx.stroke(line)
        this.ctx.restore();
    }

    public drawActiveObjectStroke() {
        this.ctx.save();
        this.ctx.strokeStyle = DrawObjectStyles.activeObject.strokeStyle;
        this.ctx.lineWidth = DrawObjectStyles.activeObject.lineWidth;
        const circle = new Path2D();

        circle.arc(
            this.canvasCoordinates.x, this.canvasCoordinates.y,
            this.canvasRadius.atmosphere + DrawObjectStyles.activeObject.offset,
            0,
            Math.PI * 2,
            true
        );
        this.ctx.stroke(circle);
        this.ctx.restore();
    }

    private drawSurface() {
        this.ctx.save();
        this.ctx.fillStyle = DrawObjectStyles.surface.fillStyle;
        this.ctx.strokeStyle = DrawObjectStyles.surface.strokeStyle;

        const core = new Path2D();
        const scaledValues = this.object.coreForm.map(
            arr => arr.map(v => (v * this.canvasRadius.surface * 2) - this.canvasRadius.surface));

        scaledValues.forEach((lines) => {
            const startX = lines[0] + this.canvasCoordinates.x;
            const startY = lines[1] + this.canvasCoordinates.y;

            const cp1x = lines[2] + this.canvasCoordinates.x;
            const cp1y = lines[3] + this.canvasCoordinates.y;
            const cp2x = lines[4] + this.canvasCoordinates.x;
            const cp2y = lines[5] + this.canvasCoordinates.y;
            const x = lines[6] + this.canvasCoordinates.x;
            const y = lines[7] + this.canvasCoordinates.y;

            core.moveTo(startX, startY);
            core.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        })

        this.ctx.fill(core);

        const rect = new Path2D();

        rect.moveTo(scaledValues[0][0] + this.canvasCoordinates.x, scaledValues[0][1] + this.canvasCoordinates.y)
        rect.lineTo(scaledValues[1][0] + this.canvasCoordinates.x, scaledValues[1][1] + this.canvasCoordinates.y)
        rect.lineTo(scaledValues[2][0] + this.canvasCoordinates.x, scaledValues[2][1] + this.canvasCoordinates.y)
        rect.lineTo(scaledValues[3][0] + this.canvasCoordinates.x, scaledValues[3][1] + this.canvasCoordinates.y)
        rect.lineTo(scaledValues[0][0] + this.canvasCoordinates.x, scaledValues[0][1] + this.canvasCoordinates.y)

        this.ctx.stroke(rect);
        this.ctx.fill(rect);
        this.ctx.restore();
    }

    private drawWater() {
        this.ctx.save();
        this.ctx.fillStyle = DrawObjectStyles.water.fillStyle;
        this.ctx.strokeStyle = DrawObjectStyles.water.strokeStyle;

        const circle = new Path2D();

        circle.arc(
            this.canvasCoordinates.x,
            this.canvasCoordinates.y,
            this.canvasRadius.water,
            0,
            Math.PI * 2,
            true
        );

        this.ctx.stroke(circle);
        this.ctx.fill(circle);
        this.ctx.restore();
    }

    private drawAtmosphere() {
        this.ctx.save();
        this.ctx.fillStyle = DrawObjectStyles.atmosphere.fillStyle;
        this.ctx.strokeStyle = DrawObjectStyles.atmosphere.strokeStyle;

        const circle = new Path2D();

        circle.arc(
            this.canvasCoordinates.x,
            this.canvasCoordinates.y,
            this.canvasRadius.atmosphere,
            0,
            Math.PI * 2,
            true
        );

        this.ctx.stroke(circle);
        this.ctx.fill(circle);
        this.ctx.restore();
    }
}
