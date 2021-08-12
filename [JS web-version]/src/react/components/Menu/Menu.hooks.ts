import React from "react";
import {VIEW_MODE} from "../../../engine/types";
import {useReactStore} from "../../reducer/hooks";
import {
    collideChangeAction,
    forceLinesChangeAction,
    fragmentsChangeAction,
    gridChangeAction,
    labelsChangeAction, menuUpdateAction,
    modeChangeAction,
    pauseChangeAction,
    setTargetTimeSpeedAction,
    statsUpdateAction,
    tidalForcesChangeAction
} from "../../reducer/actions";
import {engine} from "../../../index";

export const useMenu = () => {
    const {dispatch} = useReactStore();

    React.useEffect(() => {
        dispatch(menuUpdateAction(engine.store.settings))

        // Data updater
        const intervalId = setInterval(() => {
            dispatch(statsUpdateAction({
                lastFPS: engine.store.stats.lastFPS,
                lastPPS: engine.store.stats.lastPPS,
                lastTimeSpeed: engine.store.settings.targetTimeSpeed,
                objectsCount: Object.keys(engine.store.nextObjects).length,
            }));
        }, 333)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    const handleClickPause = () => {
        dispatch(pauseChangeAction(!engine.store.settings.isPause))
    }

    const handleClickWatchMode = () => {
        dispatch(modeChangeAction(VIEW_MODE.WATCH))
    }

    const handleClickAdditionalMode = () => {
        dispatch(modeChangeAction(VIEW_MODE.ADDITIONAL))
    }

    const handleClickIsGrid = () => {
        dispatch(gridChangeAction(!engine.store.settings.isGrid));
    }

    const handleClickIsLabels = () => {
        dispatch(labelsChangeAction(!engine.store.settings.isLabels));
    }

    const handleClickIsForces = () => {
        dispatch(forceLinesChangeAction(!engine.store.settings.isForceLines));
    }

    const handleClickIsTridals = () => {
        dispatch(tidalForcesChangeAction(!engine.store.settings.isTidalForces));
    }

    const handleClickIsFragments = () => {
        dispatch(fragmentsChangeAction(!engine.store.settings.isFragments));
    }

    const handleClickIsCollide = () => {
        dispatch(collideChangeAction(!engine.store.settings.isCollide));
    }

    const handleInputTargetTimeSpeed = (value: number) => {
        const targetTimeSpeedNumber = Math.max(value, 1);
        dispatch(setTargetTimeSpeedAction(targetTimeSpeedNumber));
    }

    return {
        handleClickPause,
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
