import React from "react";
import {getRadius, getVectorLength, normalizeNumber} from "../../../utils/other";
import {engine} from "../../../index";

export type ObjectInfoType = {
    id: string
    x: number,
    y: number,
    mass: number,
    speed: number,
    radius: number,
}

export const useObjectMenu = () => {
    const [objectInfo, setObjectInfo] = React.useState<ObjectInfoType | undefined>();

    React.useEffect(() => {
        const listenerIdx = engine.addStoreListener((engineStore) => {
            const {activeObjectId} = engineStore;

            try {
                if (!activeObjectId) {
                    throw new Error();
                }

                const object = engineStore.nextObjects[activeObjectId];

                if (!object) {
                    throw new Error();
                }

                setObjectInfo({
                    id: activeObjectId,
                    x: normalizeNumber(object.x),
                    y: normalizeNumber(object.y),
                    mass: normalizeNumber(object.mass),
                    speed: normalizeNumber(getVectorLength(object.vX, object.vY)),
                    radius: normalizeNumber(getRadius(object.mass)),
                })
            } catch (e) {
                setObjectInfo(undefined)
            }
        });

        return () => {
            engine.removeStoreListener(listenerIdx)
        }
    }, []);

    const handleChangeObjectMass = (value: number) => {
        if (engine.store.activeObjectId) {
            engine.store.nextObjects[engine.store.activeObjectId].mass = value;
        }
    }

    const handleClickCloseMenu = () => {
        engine.store.activeObjectId = undefined;
    }

    const isVisible = Boolean(objectInfo);

    return {
        isVisible, objectInfo, handleClickCloseMenu, handleChangeObjectMass
    }
}
