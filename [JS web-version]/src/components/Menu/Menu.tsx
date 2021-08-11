import React from "react";
import moment from "moment";

import {engineStore, VIEW_MODE} from "../../engine/store";
import {useMenu} from "./Menu.hooks";
import {Button} from "../Button/Button";
import {useReactStore} from "../../reducer/hooks";

import "./Menu.css";
import {normalizeNumber} from "../../utils/other";

// todo: re-renders
function Menu() {
    const {
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
    } = useMenu();
    const {
        state: {
            stats: {
                lastFPS,
                lastPPS,
                objectsCount,
            },
            menu: {
                mode,
                isGrid,
                isLabels,
                isForceLines,
                isTidalForces,
                isFragments,
                isCollide,
            }
        }
    } = useReactStore();

    const isWatch = mode === VIEW_MODE.WATCH;
    const isAdditional = mode === VIEW_MODE.ADDITIONAL;
    const currentTimeStr = moment.unix(engineStore.universe.currentTimeStamp).format("YYYY-MM-DD HH:mm:ss")
    const currentTimeSpeedStr = React.useMemo(() => {
        const duration = moment.duration(engineStore.settings.targetTimeSpeed * 1000);

        const ss = duration.asSeconds();
        const mm = duration.asMinutes();
        const HH = duration.asHours();

        const DD = duration.asDays();
        const MM = duration.asMonths();
        const YY = duration.asYears();

        const timeMap = [
            [YY, 'years'],
            [MM, 'months'],
            [DD, 'days'],
            [HH, 'hours'],
            [mm, 'min'],
            [ss, 'sec'],
        ]

        const maxMeasure = timeMap.filter(([value]) => value >= 1)[0] as [number, string];

        return `${normalizeNumber(maxMeasure[0])} ${maxMeasure[1]}`;
    }, [engineStore.settings.targetTimeSpeed]);

    return (
        <div className="Menu_container">
            <div className="Menu_container_part">
                <div className="Menu_container_item"
                     onClick={handleClickPause}>
                    {
                        engineStore.settings.isPause ?
                            <Button isActive={engineStore.settings.isPause} icon={<i className="fas fa-play"/>}/> :
                            <Button isActive={engineStore.settings.isPause} icon={<i className="fas fa-pause"/>}/>
                    }
                    <div className="Menu_text">{currentTimeStr}</div>
                </div>

                <div className="Menu_container_item">
                    <div className="Menu_text">{currentTimeSpeedStr}/sec</div>
                    <div className="Menu_text">
                        <input type="text"
                               className="Menu_input"
                               value={engineStore.settings.targetTimeSpeed}
                               onChange={(e) => handleInputTargetTimeSpeed(e.target.value)}/>
                    </div>
                    <Button icon={<i className="fas fa-fast-backward"/>}/>
                    <Button icon={<i className="fas fa-fast-forward"/>}/>
                </div>
            </div>

            <div className="Menu_container_part">
                <div className="Menu_container_item">
                    <Button isActive={isWatch}
                            onClick={handleClickWatchMode}
                            icon={<i className="fas fa-hand-rock"/>}>Move</Button>
                    <Button isActive={isAdditional}
                            onClick={handleClickAdditionalMode}
                            icon={<i className="fas fa-plus"/>}>
                        Add obj.
                    </Button>
                    <Button isActive={isGrid}
                            onClick={handleClickIsGrid}
                            icon={<i className="fas fa-border-all"/>}>Grid</Button>
                    <Button isActive={isLabels}
                            onClick={handleClickIsLabels}
                            icon={<i className="fas fa-tags"/>}>Labels</Button>
                    <Button isActive={isForceLines}
                            onClick={handleClickIsForces}
                            icon={<i className="fas fa-long-arrow-alt-left"/>}>Forces</Button>
                    <Button isActive={isTidalForces}
                            onClick={handleClickIsTridals}
                            icon={<i className="fas fa-water"/>}>Tidals</Button>
                    <Button isActive={isFragments}
                            onClick={handleClickIsFragments}
                            icon={<i className="fas fa-shapes"/>}>Fragments</Button>
                    <Button isActive={isCollide}
                            onClick={handleClickIsCollide}
                            icon={<i className="far fa-circle"/>}>Collide</Button>
                </div>
            </div>

            <div className="Menu_container_part">
                <div className="Menu_container_item">
                    <Button icon={objectsCount}>
                        Objects
                    </Button>
                    <Button icon={lastFPS}>
                        FPS
                    </Button>
                    <Button icon={lastPPS}>
                        PPS
                    </Button>
                </div>
            </div>

            {/*<div onClick={() => {*/}
            {/*    store.canvas.drawForceLines = !store.canvas.drawForceLines*/}
            {/*}}>*/}
            {/*    <button>{store.canvas.drawForceLines ? 'hide lines' : 'show lines'}</button>*/}
            {/*</div>*/}

            {/*<div>Mode: {mode}</div>*/}
            {/*<div onClick={() => {*/}
            {/*    store.canvas.mode = 'WATCH'*/}
            {/*}}>*/}
            {/*    <button>WATCH</button>*/}
            {/*</div>*/}
            {/*<div onClick={() => {*/}
            {/*    store.canvas.mode = 'ADDITIONAL'*/}
            {/*}}>*/}
            {/*    <button>ADDITIONAL</button>*/}
            {/*</div>*/}
        </div>
    );
}

export default Menu;
