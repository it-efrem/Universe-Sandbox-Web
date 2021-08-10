import {engineStore, EngineStoreType} from "./store";

const listeners = [] as EngineListenerType[];

export type EngineListenerType = (engineStore: EngineStoreType) => void

export const addEngineListener = (cb: EngineListenerType): number => {
    const length = listeners.push(cb)
    return length - 1;
}

export const removeEngineListener = (index: number) => {
    delete listeners[index];
}


const debounceTime = 100;
let lastCallTime = 0;

export const triggerListeners = () => {
    if (Date.now() >= lastCallTime + debounceTime) {
        listeners.forEach(listener => {
            if (typeof listener === "function") {
                listener(engineStore)
            }
        })
        lastCallTime = Date.now();
    }
}
