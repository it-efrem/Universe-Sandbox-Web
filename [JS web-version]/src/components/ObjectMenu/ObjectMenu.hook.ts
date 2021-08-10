import React from "react";
import {addEngineListener, removeEngineListener} from "../../engine/listener";
import {getRadius, getVectorLength, normalizeNumber} from "../../utils/other";
import {engineStore} from "../../engine/store";

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
        const listenerIdx = addEngineListener((engineStore) => {
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
            } catch {
                setObjectInfo(undefined)
            }
        });

        return () => {
            removeEngineListener(listenerIdx)
        }
    }, []);

    const handleClickCloseMenu = () => {
        engineStore.activeObjectId = undefined;
    }

    const isVisible = Boolean(objectInfo);

    return {
        isVisible, objectInfo, handleClickCloseMenu
    }
}
