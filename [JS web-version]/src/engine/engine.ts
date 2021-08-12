import {measureFrequency} from "../utils/measureFrequency";
import {detectCanvasCollision, detectUniverseCollision, getRadius, getVectorLength} from "../utils/other";
import {moveByVector} from "./tools/tools";
import {EngineListenerType, EngineStoreType, GravityObjectsType, VIEW_MODE} from "./types";
import {drawObjectName} from "./draw/drawObjectName";
import {drawObject} from "./draw/drawObject";
import {drawForceLine} from "./draw/drawForceLine";
import {drawGrid} from "./draw/drawGrid";

export class Engine {
    public canvas: HTMLCanvasElement | null;
    public ctx: CanvasRenderingContext2D;
    public store: EngineStoreType;
    private storeListeners: EngineListenerType[];
    private isStopped: boolean;

    private debounceListenersTime = 0;
    private lastListenersCallTime = 0;
    private measureFPS = measureFrequency((lastFPS: number) => {
        this.store.stats.lastFPS = lastFPS
    })
    private measurePPS = measureFrequency((lastPPS: number) => {
        this.store.stats.lastPPS = lastPPS
    })

    constructor(props: {
        debounceListenersTime: number
    }) {
        this.debounceListenersTime = props.debounceListenersTime;

        this.canvas = null;
        // @ts-ignore
        this.ctx = null;
        this.storeListeners = [];
        this.isStopped = false;
        this.store = {
            stats: {
                // todo:
                // lastTimeSpeed: 100,
                lastFPS: 0,
                lastPPS: 0,
            },
            universe: {
                currentTimeStamp: 0,
                gravityConst: 6.67,
            },
            settings: {
                targetFPS: 60,

                viewMode: VIEW_MODE.WATCH as VIEW_MODE,

                // todo: учитывать фактическое максимальное время
                targetTimeSpeed: 100,
                isPause: false,

                isLabels: true,
                isGrid: true,
                isForceLines: true,

                isCollide: true,
                isFragments: true,
                isTidalForces: true,
            },
            canvas: {
                width: 0,
                height: 0,
                centerX: 0,
                centerY: 0,

                coordinates: {
                    zeroX: 0,
                    zeroY: 0,
                },

                offsetX: 0,
                offsetY: 0,
                lastX: 0,
                lastY: 0,
                clickX: 0,
                clickY: 0,
                scale: 1000,
                isMouseDown: false,

                gridCount: 10,
                vectorsScale: 100,
            },
            activeObjectId: undefined,
            creationObjectId: undefined,
            nextObjects: {
                'Earth': {
                    y: 0,
                    x: 0,
                    vX: 0,
                    vY: 0,
                    mass: 6600, // 10(18)
                    isGravity: true,
                },
                'Moon': {
                    y: -0,
                    x: -406000,
                    vX: 0,
                    vY: 1.02,
                    mass: 81.2,
                    isGravity: true,
                },
            } as GravityObjectsType,
            lastObjects: {} as GravityObjectsType,
        }
    }

    public setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    public addCanvasListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void {
        this.canvas?.addEventListener(type, listener, options);
    }

    public removeCanvasListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void {
        this.canvas?.removeEventListener(type, listener, options);
    }

    public addStoreListener(cb: EngineListenerType): number {
        const length = this.storeListeners.push(cb)
        return length - 1;
    }

    public removeStoreListener(index: number) {
        delete this.storeListeners[index];
    }

    public triggerListeners() {
        if (Date.now() >= this.lastListenersCallTime + this.debounceListenersTime) {
            this.storeListeners.forEach(listener => {
                listener(this.store)
            })
            this.lastListenersCallTime = Date.now();
        }
    }

    public run() {
        this.update();
        this.draw();
    }

    public stop() {
        this.isStopped = true
    }

    private draw() {
        this.measureFPS();

        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.store.canvas.width, this.store.canvas.height);

            const lastFPS = this.store.stats.lastFPS || this.store.settings.targetFPS;
            const lastPPS = this.store.stats.lastPPS || lastFPS;
            const physicsToDrawTimeRelation = Math.max(lastFPS / lastPPS, 1);

            this.store.canvas.coordinates.zeroX = (-this.store.canvas.offsetX + (this.store.canvas.centerX * this.store.canvas.scale)) / this.store.canvas.scale;
            this.store.canvas.coordinates.zeroY = (-this.store.canvas.offsetY + (this.store.canvas.centerY * this.store.canvas.scale)) / this.store.canvas.scale;

            if (this.store.settings.isGrid) {
                drawGrid(this.store, this.ctx, 1);
                drawGrid(this.store, this.ctx, 10);
            }

            Object.entries(this.store.nextObjects)
                .forEach(([objectName, nextObject]) => {
                    const lastObject = this.store.lastObjects[objectName];

                    if (nextObject && lastObject) {
                        const diffX = (nextObject.x - lastObject.x) / physicsToDrawTimeRelation;
                        const diffY = (nextObject.y - lastObject.y) / physicsToDrawTimeRelation;
                        const newX = lastObject.x + diffX;
                        const newY = lastObject.y + diffY;

                        const x_canvas = (newX - this.store.canvas.offsetX + (this.store.canvas.centerX * this.store.canvas.scale)) / this.store.canvas.scale;
                        const y_canvas = (newY - this.store.canvas.offsetY + (this.store.canvas.centerY * this.store.canvas.scale)) / this.store.canvas.scale;
                        const radius_canvas = getRadius(nextObject.mass) / this.store.canvas.scale;

                        const draw_object = {
                            ...nextObject,
                            x: newX,
                            y: newY,
                            x_canvas,
                            y_canvas,
                            radius_canvas,
                        }

                        drawObject(this.store, this.ctx, objectName, draw_object);

                        if (this.store.settings.isLabels) {
                            drawObjectName(this.store, this.ctx, objectName, draw_object);
                        }
                        if (this.store.settings.isForceLines || !draw_object.isGravity) {
                            drawForceLine(this.store, this.ctx, objectName, draw_object);
                        }
                    }
                })
        }

        if (!this.isStopped) {
            // todo: or use RAF?
            const coefficient = Math.max(1, this.store.settings.targetFPS / this.store.stats.lastFPS);
            const timeout = 1000 / this.store.settings.targetFPS / coefficient;
            setTimeout(this.draw.bind(this), timeout)
        }
    }

    // todo: work in browser idle
    // todo: web workers?
    private update() {
        this.measurePPS();

        // todo: чтобы не было резких скачков - нужно дождаться определения lastPPS
        //  но в первую секунду пауза, нужно вешать загрузочный экран
        //  или придумать как пофиксить это
        if (!this.store.settings.isPause && this.store.stats.lastPPS > 0) {
            this.store.universe.currentTimeStamp += this.store.settings.targetTimeSpeed / this.store.stats.lastPPS;

            // todo: optimisation
            this.store.lastObjects = {...this.store.nextObjects};
            const nextObjectsArr = Object.entries(this.store.nextObjects);

            for (let a = 0; a < nextObjectsArr.length; a++) {
                for (let b = a + 1; b < nextObjectsArr.length; b++) {
                    const [nameA, objectA] = nextObjectsArr[a];
                    const [nameB, objectB] = nextObjectsArr[b];

                    //todo: refactoring
                    if (objectA.isGravity && objectB.isGravity && objectA.mass && objectB.mass) {
                        const x_pos = Math.abs(objectA.x - objectB.x);
                        const y_pos = Math.abs(objectA.y - objectB.y);

                        const totalDistance = getVectorLength(x_pos, y_pos);
                        const lastPPS = this.store.stats.lastPPS;
                        const gravityConst = this.store.universe.gravityConst;
                        const targetTimeSpeed = this.store.settings.targetTimeSpeed;

                        const [
                            a_x_vector,
                            b_x_vector,
                        ] = moveByVector(lastPPS, gravityConst, targetTimeSpeed, totalDistance, objectA.x, objectB.x, objectA.mass, objectB.mass);

                        const [
                            a_y_vector,
                            b_y_vector,
                        ] = moveByVector(lastPPS, gravityConst, targetTimeSpeed, totalDistance, objectA.y, objectB.y, objectA.mass, objectB.mass);

                        objectA.vX += a_x_vector
                        objectA.vY += a_y_vector

                        objectB.vX += b_x_vector
                        objectB.vY += b_y_vector

                        const isCollision = this.store.settings.isCollide && detectUniverseCollision(totalDistance, getRadius(objectA.mass), getRadius(objectB.mass))

                        if (isCollision) {
                            const totalMass = objectA.mass + objectB.mass;
                            const xForce = (objectA.vX * objectA.mass + objectB.vX * objectB.mass) / totalMass;
                            const yForce = (objectA.vY * objectA.mass + objectB.vY * objectB.mass) / totalMass;

                            objectA.mass = totalMass;
                            objectA.vX = xForce;
                            objectA.vY = yForce;

                            // todo: починить мерж, сейчас при меже большой объект может резко скокнуть на место легкого
                            // todo: пофиксить костыль с массой
                            objectB.mass = 0;
                        }
                    }
                }
            }

            // todo: optimize
            // todo: удалять все объекты, которые не должны симулироваться и если ЛКМ поднята
            this.store.nextObjects = Object.fromEntries(
                nextObjectsArr
                    .filter(([id, object]) => object.mass > 0)
                    .map(([id, object]) => {

                        // detect active object
                        if (this.store.canvas.isMouseDown) {
                            const universe_x = (this.store.canvas.clickX - this.store.canvas.centerX) * this.store.canvas.scale + this.store.canvas.offsetX;
                            const universe_y = (this.store.canvas.clickY - this.store.canvas.centerY) * this.store.canvas.scale + this.store.canvas.offsetY;

                            if (detectCanvasCollision(universe_x, universe_y, 1, object.x, object.y, getRadius(object.mass))) {
                                this.store.activeObjectId = id;
                            }
                        }

                        if (object.isGravity) {
                            const lastPPS = Math.max(this.store.stats.lastPPS, 1);

                            object.x = object.x + object.vX * this.store.settings.targetTimeSpeed / lastPPS;
                            object.y = object.y + object.vY * this.store.settings.targetTimeSpeed / lastPPS;
                        }

                        return [id, object]
                    })
            )
        }

        if (!this.isStopped) {
            // todo: or use RAF?
            this.triggerListeners()
            requestAnimationFrame(this.update.bind(this))
        }
    }
}
