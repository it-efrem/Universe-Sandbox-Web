import {measureFrequency} from "../utils/measureFrequency";
import {detectCanvasCollision, detectUniverseCollision, getVectorLength} from "../utils/other";
import {moveByVector} from "./tools/tools";
import {EngineListenerType, EngineStoreType, VIEW_MODE} from "./types";
import {drawGrid} from "./draw/drawGrid";
import {DrawObject} from "../game/drawObject/DrawObject";
import {SolarSystemSample} from "../game/samples/solar-system";
import {engine} from "../index";

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
                targetTimeSpeed: 1000000,
                isPause: false,

                isLabels: true,
                isGrid: true,
                isForceLines: true,

                isCollide: true,
                isFragments: true,
                isTidalForces: true,

                isFollowTheObject: false,
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
                scale: 900000,
                isMouseDown: false,

                gridCount: 10,
            },
            vectorScaleFactor: 100,
            activeObjectId: undefined,
            creationObjectId: undefined,
            nextObjects: SolarSystemSample,
            lastObjects: {},
        }
    }

    public setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    public addCanvasListener<K extends keyof HTMLElementEventMap>(type: K,
                                                                  listener: (this: HTMLCanvasElement,
                                                                             ev: HTMLElementEventMap[K]) => any,
                                                                  options?: boolean | AddEventListenerOptions): void {
        this.canvas?.addEventListener(type, listener, options);
    }

    public removeCanvasListener<K extends keyof HTMLElementEventMap>(type: K,
                                                                     listener: (this: HTMLCanvasElement,
                                                                                ev: HTMLElementEventMap[K]) => any,
                                                                     options?: boolean | AddEventListenerOptions): void {
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

            this.ctx.save();
            this.ctx.fillStyle = "rgba(20, 20, 20, 0.9)";
            this.ctx.fillRect(0, 0, this.store.canvas.width, this.store.canvas.height);
            this.ctx.restore();

            const lastFPS = this.store.stats.lastFPS || this.store.settings.targetFPS;
            const lastPPS = this.store.stats.lastPPS || lastFPS;
            const physicsToDrawTimeRelation = Math.max(lastFPS / lastPPS, 1);

            this.store.canvas.coordinates.zeroX =
                (-this.store.canvas.offsetX + (this.store.canvas.centerX * this.store.canvas.scale)) /
                this.store.canvas.scale;
            this.store.canvas.coordinates.zeroY =
                (-this.store.canvas.offsetY + (this.store.canvas.centerY * this.store.canvas.scale)) /
                this.store.canvas.scale;

            if (this.store.settings.isGrid) {
                drawGrid(this.store, this.ctx, 1);
                drawGrid(this.store, this.ctx, 10);
            }

            const activeObject = this.store.nextObjects[engine.store.activeObjectId || ''];
            if (this.store.settings.isFollowTheObject && activeObject) {
                this.store.canvas.offsetX = activeObject.coordinates.x;
                this.store.canvas.offsetY = activeObject.coordinates.y;
            }

            Object.entries(this.store.nextObjects)
                .forEach(([objectId, nextObject]) => {
                    const lastObject = this.store.lastObjects[objectId];

                    if (nextObject) {
                        // todo: Можно ли оптимизировать так: чтобы не создавать объект каждый раз?
                        const drawObject = new DrawObject(this.store,
                            this.ctx,
                            physicsToDrawTimeRelation,
                            objectId,
                            nextObject,
                            lastObject);

                        drawObject.drawObject();

                        if (this.store.settings.isLabels) {
                            drawObject.drawLabel();
                        }

                        if (this.store.settings.isForceLines || !nextObject.isSimulated) {
                            drawObject.drawForceLines();
                        }

                        if (this.store.activeObjectId === objectId) {
                            drawObject.drawActiveObjectStroke()
                        }
                    }
                })
        }

        if (!this.isStopped) {
            const coefficient = Math.max(1, this.store.settings.targetFPS / this.store.stats.lastFPS);
            const timeout = 1000 / this.store.settings.targetFPS / coefficient;

            // todo: or use RAF?
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
        if (this.store.stats.lastPPS > 0) {
            // todo: optimisation
            this.store.lastObjects = {...this.store.nextObjects};
            const nextObjectsArr = Object.entries(this.store.nextObjects);

            if (!this.store.settings.isPause) {
                this.store.universe.currentTimeStamp += this.store.settings.targetTimeSpeed / this.store.stats.lastPPS;
                for (let a = 0; a < nextObjectsArr.length; a++) {
                    const [nameA, objectA] = nextObjectsArr[a];
                    objectA.resetCache();

                    for (let b = a + 1; b < nextObjectsArr.length; b++) {
                        const [nameB, objectB] = nextObjectsArr[b];

                        //todo: refactoring
                        if (objectA.isSimulated && objectB.isSimulated && objectA.mass && objectB.mass) {
                            const x_pos = Math.abs(objectA.coordinates.x - objectB.coordinates.x);
                            const y_pos = Math.abs(objectA.coordinates.y - objectB.coordinates.y);

                            const totalDistance = getVectorLength(x_pos, y_pos);
                            const lastPPS = this.store.stats.lastPPS;
                            const gravityConst = this.store.universe.gravityConst;
                            const targetTimeSpeed = this.store.settings.targetTimeSpeed;

                            const [
                                a_x_vector,
                                b_x_vector,
                            ] = moveByVector(lastPPS,
                                gravityConst,
                                targetTimeSpeed,
                                totalDistance,
                                objectA.coordinates.x,
                                objectB.coordinates.x,
                                objectA.mass,
                                objectB.mass);

                            const [
                                a_y_vector,
                                b_y_vector,
                            ] = moveByVector(lastPPS,
                                gravityConst,
                                targetTimeSpeed,
                                totalDistance,
                                objectA.coordinates.y,
                                objectB.coordinates.y,
                                objectA.mass,
                                objectB.mass);

                            objectA.vectorMove.x += a_x_vector
                            objectA.vectorMove.y += a_y_vector

                            objectB.vectorMove.x += b_x_vector
                            objectB.vectorMove.y += b_y_vector

                            const isCollision = this.store.settings.isCollide &&
                                detectUniverseCollision(totalDistance,
                                    objectA.radius.atmosphere,
                                    objectB.radius.atmosphere)

                            if (isCollision) {
                                const [bigObject, smallObject] = objectA.mass > objectB.mass ?
                                    [objectA, objectB] :
                                    [objectB, objectA];

                                bigObject.mergeWith(smallObject);
                                smallObject.remove();
                            }
                        }
                    }
                }
            }

            // todo: optimize
            // todo: удалять все объекты, которые не должны симулироваться и если ЛКМ поднята
            this.store.nextObjects = Object.fromEntries(
                nextObjectsArr
                    .filter(([id, object]) => !object.isShouldBeRemoved)
                    .map(([id, object]) => {

                        // detect menu active object
                        if (this.store.canvas.isMouseDown) {
                            const universe_x = (this.store.canvas.clickX - this.store.canvas.centerX) *
                                this.store.canvas.scale +
                                this.store.canvas.offsetX;
                            const universe_y = (this.store.canvas.clickY - this.store.canvas.centerY) *
                                this.store.canvas.scale +
                                this.store.canvas.offsetY;

                            if (detectCanvasCollision(
                                universe_x,
                                universe_y,
                                20 * this.store.canvas.scale,
                                object.coordinates.x,
                                object.coordinates.y,
                                object.radius.atmosphere)) {
                                this.store.activeObjectId = id;
                                if (!this.store.creationObjectId) {
                                    this.store.settings.isFollowTheObject = true;
                                }
                            }
                        }

                        if (!this.store.settings.isPause && object.isSimulated) {
                            const lastPPS = Math.max(this.store.stats.lastPPS, 1);

                            object.coordinates.x =
                                object.coordinates.x +
                                object.vectorMove.x *
                                this.store.settings.targetTimeSpeed /
                                lastPPS;
                            object.coordinates.y =
                                object.coordinates.y +
                                object.vectorMove.y *
                                this.store.settings.targetTimeSpeed /
                                lastPPS;
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
