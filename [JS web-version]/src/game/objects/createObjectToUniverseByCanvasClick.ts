import {getPositionOnUniverse, getRandomName} from "../../utils/other";
import {engine} from "../../index";

export const createObjectToUniverseByCanvasClick = (x_canvas: number, y_canvas: number) => {
    const [x_universe, y_universe] = getPositionOnUniverse(x_canvas, y_canvas, engine.store.canvas);
    const objectName = getRandomName();

    engine.store.creationObjectId = objectName;
    engine.store.activeObjectId = objectName;

    engine.store.nextObjects[objectName] = ({
        x: x_universe,
        y: y_universe,
        vX: 0,
        vY: 0,
        mass: 100,
        isGravity: false,
    });
};
