import React from "react";
import {engineStore, VIEW_MODE} from "../../engine/store";
import {useReactStore} from "../../reducer/hooks";
import {
    collideChangeAction,
    forceLinesChangeAction,
    fragmentsChangeAction,
    gridChangeAction,
    labelsChangeAction,
    modeChangeAction,
    setTargetTimeSpeedAction,
    statsUpdateAction,
    tidalForcesChangeAction
} from "../../reducer/actions";

export const useMenu = () => {
    const {dispatch} = useReactStore();

    React.useEffect(() => {
        // Data updater
        const intervalId = setInterval(() => {
            dispatch(statsUpdateAction({
                lastFPS: engineStore.stats.lastFPS,
                lastPPS: engineStore.stats.lastPPS,
                lastTimeSpeed: engineStore.settings.targetTimeSpeed,
                objectsCount: Object.keys(engineStore.drawObjects).length,
            }));
        }, 333)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    const handleClickWatchMode = () => {
        dispatch(modeChangeAction(VIEW_MODE.WATCH))
    }

    const handleClickAdditionalMode = () => {
        dispatch(modeChangeAction(VIEW_MODE.ADDITIONAL))
    }

    const handleClickIsGrid = () => {
        dispatch(gridChangeAction(!engineStore.settings.isGrid));
    }

    const handleClickIsLabels = () => {
        dispatch(labelsChangeAction(!engineStore.settings.isLabels));
    }

    const handleClickIsForces = () => {
        dispatch(forceLinesChangeAction(!engineStore.settings.isForceLines));
    }

    const handleClickIsTridals = () => {
        dispatch(tidalForcesChangeAction(!engineStore.settings.isTidalForces));
    }

    const handleClickIsFragments = () => {
        dispatch(fragmentsChangeAction(!engineStore.settings.isFragments));
    }

    const handleClickIsCollide = () => {
        dispatch(collideChangeAction(!engineStore.settings.isCollide));
    }

    const handleInputTargetTimeSpeed = (value: string) => {
        const targetTimeSpeedNumber = Number(value) || 1;
        dispatch(setTargetTimeSpeedAction(targetTimeSpeedNumber));
    }

    return {
        handleClickWatchMode,
        handleClickAdditionalMode,
        handleClickIsGrid,
        handleClickIsLabels,
        handleClickIsForces,
        handleClickIsTridals,
        handleClickIsFragments,
        handleClickIsCollide,
        handleInputTargetTimeSpeed
    };
}
