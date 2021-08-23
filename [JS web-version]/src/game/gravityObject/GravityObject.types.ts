import {GravityObject} from "./GravityObject";

export type GravityObjectByNameType = {[name: string]: GravityObject};

export enum GravityObjectComposition {
    HYDROGEN = 'HYDROGEN',
    WATER = 'WATER',
    SILICATES = 'SILICATES',
    IRON = 'IRON',
}

export type GravityObjectCompositionType = {
    [GravityObjectComposition.HYDROGEN]: number,   // kg
    [GravityObjectComposition.WATER]: number,      // kg
    [GravityObjectComposition.SILICATES]: number,  // kg
    [GravityObjectComposition.IRON]: number,       // kg
}

export type BezierCurveType = [number, number, number, number, number, number, number, number];

export type GravityObjectCoreFormType = [BezierCurveType, BezierCurveType, BezierCurveType, BezierCurveType];

export type GravityObjectRadius = {
    surface: number;
    water: number;
    atmosphere: number;
};
