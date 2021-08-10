import React from "react";
import "./Menu.css";
import {store} from "../../store";
import {useMenu} from "./Menu.hooks";
import {Button} from "../Button/Button";

function Menu() {
    const {
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
    } = useMenu();

    return (
        <div className="Menu_container">
            <div className="Menu_container_part">
                <div className="Menu_container_item">
                    {
                        store.engine.isPause ?
                            <Button isActive={store.engine.isPause} icon={<i className="fas fa-play"/>}/> :
                            <Button isActive={store.engine.isPause} icon={<i className="fas fa-pause"/>}/>
                    }
                    <div className="Menu_text">{store.universe.currentTimeStamp} s</div>
                </div>

                <div className="Menu_container_item">
                    <div className="Menu_text">{store.engine.lastSecPerSec} sec/sec</div>
                    <div className="Menu_text">{store.engine.targetSpeedSecPerSec}</div>
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
