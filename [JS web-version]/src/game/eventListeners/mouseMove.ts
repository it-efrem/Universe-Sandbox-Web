import {VIEW_MODE} from "../../engine/types";
import {engine} from "../../index";
import {setCreationObjectForceVector} from "../objects/setCreationObjectForceVector";

export const mouseMoveEventListener = (e: MouseEvent) => {
    e.preventDefault();

    switch (engine.store.settings.viewMode) {
        case VIEW_MODE.WATCH: {
            if (e.which === 1 && engine.store.canvas.isMouseDown) {
                engine.store.canvas.offsetX = engine.store.canvas.lastX + ((engine.store.canvas.clickX - e.x) * engine.store.canvas.scale);
                engine.store.canvas.offsetY = engine.store.canvas.lastY + ((engine.store.canvas.clickY - e.y) * engine.store.canvas.scale);
            }

            break;
        }

        case VIEW_MODE.ADDITIONAL : {
            setCreationObjectForceVector(e.x, e.y);
            break;
        }
    }
}
