import {VIEW_MODE} from "../../engine/types";
import {getPositionOnUniverse, getRandomName} from "../../utils/other";
import {engine} from "../../index";
import {createObjectToUniverseByCanvasClick} from "../objects/createObjectToUniverseByCanvasClick";

export const mouseDownEventListener = (e: MouseEvent) => {
    e.preventDefault();

    if (e.which === 1) {
        engine.store.canvas.isMouseDown = true;
        engine.store.canvas.clickX = e.x
        engine.store.canvas.clickY = e.y
    }

    switch (engine.store.settings.viewMode) {
        case VIEW_MODE.ADDITIONAL: {
            createObjectToUniverseByCanvasClick(e.x, e.y);
            break;
        }
    }
}
