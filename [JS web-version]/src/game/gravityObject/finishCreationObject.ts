import {engine} from "../../index";

export const finishCreationObject = () => {
    if (engine.store.creationObjectId) {
        const nextObject = engine.store.nextObjects[engine.store.creationObjectId];

        if (nextObject) {
            nextObject.isSimulated = true;
            engine.store.creationObjectId = undefined;
        }
    }
}
