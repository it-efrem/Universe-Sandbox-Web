import React from "react";
import {store, VIEW_MODE} from "../../store";
import {useContext} from "../../reducer/reducer.hooks";

// TODO: пауза, текущее время, скорость перемотки
export const useMenu = () => {
    const {state, dispatch} = useContext();

    // todo: Вынести это в context
    const [lastFPS, setLastFPS] = React.useState(0);
    const [lastPPS, setLastPPS] = React.useState(0);
    const [objectsCount, setObjectsCount] = React.useState(0);
    const [isWatch, setIsWatch] = React.useState(false);
    const [isAdditional, setIsAdditional] = React.useState(false);
    const [isGrid, setIsGrid] = React.useState(false);
    const [isLabels, setIsLabels] = React.useState(false);
    const [isForceLines, setIsForceLines] = React.useState(false);
    const [isTidalForces, setIsTidalForces] = React.useState(false);
    const [isFragments, setIsFragments] = React.useState(false);
    const [isCollide, setIsCollide] = React.useState(false);

    React.useEffect(() => {
        setIsWatch(store.view.mode == VIEW_MODE.WATCH);
        setIsAdditional(store.view.mode == VIEW_MODE.ADDITIONAL);
        setIsGrid(store.view.isGrid);
        setIsLabels(store.view.isLabels);
        setIsForceLines(store.view.isForceLines);
        setIsTidalForces(store.engine.isTidalForces);
        setIsFragments(store.engine.isFragments);
        setIsCollide(store.engine.isCollide);

        // Data updater
        const intervalId = setInterval(() => {
            setLastFPS(store.engine.lastFPS)
            setLastPPS(store.engine.lastPPS)
            setObjectsCount(store.drawObjects.length)
        }, 333)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    const handleClickWatchMode = () => {
        dispatch({
            type: 'MODE',
            payload: VIEW_MODE.WATCH
        })
        store.view.mode = VIEW_MODE.WATCH;

        setIsWatch(true);
        setIsAdditional(false);
    }

    const handleClickAdditionalMode = () => {
        dispatch({
            type: 'MODE',
            payload: VIEW_MODE.ADDITIONAL
        })
        store.view.mode = VIEW_MODE.ADDITIONAL;

        setIsWatch(false);
        setIsAdditional(true);
    }

    const handleClickIsGrid = () => {
        store.view.isGrid = !store.view.isGrid;
        setIsGrid(store.view.isGrid);
    }

    const handleClickIsLabels = () => {
        store.view.isLabels = !store.view.isLabels;
        setIsLabels(store.view.isLabels);
    }

    const handleClickIsForces = () => {
        store.view.isForceLines = !store.view.isForceLines;
        setIsForceLines(store.view.isForceLines);
    }

    const handleClickIsTridals = () => {
        store.engine.isTidalForces = !store.engine.isTidalForces;
        setIsTidalForces(store.engine.isTidalForces);
    }

    const handleClickIsFragments = () => {
        store.engine.isFragments = !store.engine.isFragments;
        setIsFragments(store.engine.isFragments);
    }

    const handleClickIsCollide = () => {
        store.engine.isCollide = !store.engine.isCollide;
        setIsCollide(store.engine.isCollide);
    }

    return {
        lastFPS,
        lastPPS,
        objectsCount,
        isWatch,
        isAdditional,
        isGrid,
        isLabels,
        isForceLines,
        isTidalForces,
        isFragments,
        isCollide,
        handleClickWatchMode,
        handleClickAdditionalMode,
        handleClickIsGrid,
        handleClickIsLabels,
        handleClickIsForces,
        handleClickIsTridals,
        handleClickIsFragments,
        handleClickIsCollide
    }
}
