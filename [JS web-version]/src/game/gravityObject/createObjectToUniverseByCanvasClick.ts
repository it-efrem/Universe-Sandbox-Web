import {getPositionOnUniverse, getRandom, getRandomName} from "../../utils/other";
import {engine} from "../../index";
import {GravityObject} from "./GravityObject";
import {GravityObjectComposition} from "./GravityObject.types";
import {createRandomObject} from "./createRandomObject";

export const createObjectToUniverseByCanvasClick = (x_canvas: number, y_canvas: number) => {
    const [x_universe, y_universe] = getPositionOnUniverse(x_canvas, y_canvas, engine.store.canvas);
    const objectName = getRandomName();

    engine.store.creationObjectId = objectName;
    engine.store.activeObjectId = objectName;
    engine.store.settings.isFollowTheObject = false;

    engine.store.nextObjects[objectName] = new GravityObject({
        coordinates: {
            x: x_universe,
            y: y_universe,
        },
        vectorMove: {
            x: 0,
            y: 0,
        },
        composition: {
            [GravityObjectComposition.HYDROGEN]: 0,
            [GravityObjectComposition.WATER]: 0,
            [GravityObjectComposition.SILICATES]: 0,
            [GravityObjectComposition.IRON]: 100,
        },
        coreForm: createRandomObject(),
        rotationVector: getRandom(-1, 1),
        rotationCurrent: 0,
        isSimulated: false,
    });
};
