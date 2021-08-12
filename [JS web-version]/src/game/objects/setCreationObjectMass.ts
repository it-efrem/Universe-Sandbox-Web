import {engine} from "../../index";

export const setCreationObjectMass = (deltaY: number) => {
    if (engine.store.activeObjectId !== undefined) {
        const nextObject = engine.store.nextObjects[engine.store.activeObjectId];

        if (nextObject) {
            nextObject.mass *= deltaY < 0 ? 1.3 : 0.8
        }
    }
}
