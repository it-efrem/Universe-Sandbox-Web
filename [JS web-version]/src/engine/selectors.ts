import {engineStore} from "./store";

export const selectEngineNextObjectById = (id: string) => {
    return engineStore.nextObjects[id];
}
