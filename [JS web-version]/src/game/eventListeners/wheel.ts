import {VIEW_MODE} from "../../engine/types";
import {engine} from "../../index";
import {setCreationObjectMass} from "../objects/setCreationObjectMass";

export const wheelEventListener = (e: WheelEvent) => {
    e.preventDefault();

    if (!engine.store.canvas.isMouseDown) {
        engine.store.canvas.scale *= e.deltaY > 0 ? 1.1 : 0.9

        if (engine.store.canvas.scale < 1) {
            engine.store.canvas.scale = 1
        }
    }

    switch (engine.store.settings.viewMode) {
        case VIEW_MODE.ADDITIONAL : {
            setCreationObjectMass(e.deltaY)
            break;
        }
    }
}
