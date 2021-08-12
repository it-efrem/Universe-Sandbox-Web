import {VIEW_MODE} from "../../engine/types";
import {engine} from "../../index";
import {finishCreationObject} from "../objects/finishCreationObject";

export const mouseUpEventListener = (e: MouseEvent) => {
    e.preventDefault();

    if (e.which === 1) {
        engine.store.canvas.isMouseDown = false;
        engine.store.canvas.lastX = engine.store.canvas.offsetX;
        engine.store.canvas.lastY = engine.store.canvas.offsetY;
    }

    switch (engine.store.settings.viewMode) {
        case VIEW_MODE.ADDITIONAL: {
            finishCreationObject();
        }
    }
}
