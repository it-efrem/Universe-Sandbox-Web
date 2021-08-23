import {engine} from "../../index";
import {GravityObjectComposition} from "./GravityObject.types";

export const setCreationObjectMass = (deltaY: number) => {
    if (engine.store.creationObjectId !== undefined) {
        const object = engine.store.nextObjects[engine.store.creationObjectId];

        if (object) {
            object.composition[GravityObjectComposition.IRON] *= 1 + deltaY / 1000
        }
    }
}
