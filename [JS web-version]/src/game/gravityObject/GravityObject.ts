import {IPoint2D} from "../../engine/types";
import {
    GravityObjectComposition,
    GravityObjectCompositionType,
    GravityObjectCoreFormType,
    GravityObjectRadius
} from "./GravityObject.types";

export interface IGravityObject {
    coordinates: IPoint2D,
    vectorMove: IPoint2D,
    composition: GravityObjectCompositionType,
    coreForm: GravityObjectCoreFormType,
    rotationVector: number,
    rotationCurrent: number,
    isSimulated: boolean,
}

export class GravityObject implements IGravityObject {
    public coordinates: IPoint2D;
    public vectorMove: IPoint2D;
    public composition: GravityObjectCompositionType;
    public coreForm: GravityObjectCoreFormType;
    public rotationVector: number;
    public rotationCurrent: number;
    public isSimulated: boolean;
    public isShouldBeRemoved = false;

    private massCache: number | undefined;
    private radiusCache: GravityObjectRadius | undefined;

    constructor(props: IGravityObject) {
        this.coordinates = props.coordinates;
        this.vectorMove = props.vectorMove;
        this.composition = props.composition;
        this.coreForm = props.coreForm;
        this.isSimulated = props.isSimulated;
        this.rotationVector = props.rotationVector;
        this.rotationCurrent = 0;

        // TODO typings:
        // Object.entries(props).forEach(([key, value]) => {
        //     // @ts-ignore
        //     this[key] = value
        // })
    }

    public get radius() {
        if (this.radiusCache === undefined) {
            this.radiusCache = {
                surface: Math.sqrt(
                    this.composition[GravityObjectComposition.IRON] +
                    this.composition[GravityObjectComposition.SILICATES]
                ) * 10,
                water: this.composition[GravityObjectComposition.WATER] > 0 ? (
                    Math.sqrt(
                        this.composition[GravityObjectComposition.IRON] +
                        this.composition[GravityObjectComposition.SILICATES] +
                        this.composition[GravityObjectComposition.WATER] * 0.9
                    ) * 10
                ) : 0,
                atmosphere: Math.sqrt(
                    this.composition[GravityObjectComposition.IRON] +
                    this.composition[GravityObjectComposition.SILICATES] +
                    this.composition[GravityObjectComposition.WATER] * 0.1 +
                    this.composition[GravityObjectComposition.HYDROGEN]
                ) * 10
            }
        }

        return this.radiusCache;
    }

    public get mass() {
        if (this.massCache === undefined) {
            this.massCache = Object
                .values(GravityObjectComposition)
                .reduce((acc, compositionType) => acc + this.composition[compositionType], 0)
        }

        return this.massCache;
    }

    public resetCache() {
        this.radiusCache = undefined;
        this.massCache = undefined;
    }

    // todo: merge coreForm
    public mergeWith(smallObject: GravityObject) {
        const totalMass = this.mass + smallObject.mass;
        const xForce = (this.vectorMove.x * this.mass + smallObject.vectorMove.x * smallObject.mass) / totalMass;
        const yForce = (this.vectorMove.y * this.mass + smallObject.vectorMove.y * smallObject.mass) / totalMass;

        this.composition = {
            [GravityObjectComposition.HYDROGEN]: this.composition[GravityObjectComposition.HYDROGEN] +
            smallObject.composition[GravityObjectComposition.HYDROGEN],
            [GravityObjectComposition.WATER]: this.composition[GravityObjectComposition.WATER] +
            smallObject.composition[GravityObjectComposition.WATER],
            [GravityObjectComposition.SILICATES]: this.composition[GravityObjectComposition.SILICATES] +
            smallObject.composition[GravityObjectComposition.SILICATES],
            [GravityObjectComposition.IRON]: this.composition[GravityObjectComposition.IRON] +
            smallObject.composition[GravityObjectComposition.IRON],
        };
        this.vectorMove.x = xForce;
        this.vectorMove.y = yForce;
    }

    public remove() {
        this.isSimulated = false;
        this.isShouldBeRemoved = true;
    }
}
