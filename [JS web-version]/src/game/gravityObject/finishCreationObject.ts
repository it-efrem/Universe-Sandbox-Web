import {engine} from "../../index";

export const finishCreationObject = () => {
    if (engine.store.creationObjectId) {
        const nextObject = engine.store.nextObjects[engine.store.creationObjectId];

        if (nextObject) {
            nextObject.isSimulated = true;

            // TODO: КостыльЮ устанавливающий максимальную скорость для созданного объекта
            //  Чтобы при большом масштабе и высоких скоростях перемотки объекты моментально не улетали из поля видимости
            const maxSpeed = 200;
            const vectorMoveX = nextObject.vectorMove.x
            const vectorMoveY = nextObject.vectorMove.y;

            if (Math.abs(vectorMoveX) > maxSpeed) {
                nextObject.vectorMove.x = Math.sqrt(Math.abs(vectorMoveX)) * Math.sign(vectorMoveX);
            }
            if (Math.abs(vectorMoveY) > maxSpeed) {
                nextObject.vectorMove.y = Math.sqrt(Math.abs(vectorMoveY)) * Math.sign(vectorMoveY);
            }

            engine.store.creationObjectId = undefined;
        }

        engine.store.settings.isFollowTheObject = false;
    }
}
