import {engine} from "../../index";

export const finishCreationObject = () => {
    if (engine.store.creationObjectId) {
        const nextObject = engine.store.nextObjects[engine.store.creationObjectId];

        if (nextObject) {
            nextObject.isGravity = true;
            engine.store.creationObjectId = undefined;
        }
    }
}
