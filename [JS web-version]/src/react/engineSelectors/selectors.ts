import {engine} from "../../index";

// todo: внутри реакт апа использовать только селекторы
export const selectEngineNextObjectById = (id: string) => {
    return engine.store.nextObjects[id];
}
