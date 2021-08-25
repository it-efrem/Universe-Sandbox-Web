import React from "react";
import moment from "moment";

import {VIEW_MODE} from "../../../engine/types";
import {useMenu} from "./Menu.hooks";
import {Button} from "../Button/Button";
import {useReactStore} from "../../reducer/hooks";

import {normalizeNumber} from "../../../utils/other";
import {engine} from "../../../index";
import {InputNumber} from "../InputNumber/InputNumber";
import {StyledMenuContainer, StyledMenuContainerItem, StyledMenuContainerPart, StyledMenuText} from "./Menu.styles";

// todo: re-renders
export const Menu = () => {
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
                viewMode,
                isGrid,
                isLabels,
                isForceLines,
                isTidalForces,
                isFragments,
                isCollide,
            }
        }
    } = useReactStore();

    const isWatch = viewMode === VIEW_MODE.WATCH;
    const isAdditional = viewMode === VIEW_MODE.ADDITIONAL;
    const currentTimeStr = moment.unix(engine.store.universe.currentTimeStamp).format("YYYY-MM-DD HH:mm:ss")
    const currentTimeSpeedStr = React.useMemo(() => {
        const duration = moment.duration(engine.store.settings.targetTimeSpeed * 1000);

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
    }, [engine.store.settings.targetTimeSpeed]);

    return (
        <StyledMenuContainer>
            <StyledMenuContainerPart>
                <StyledMenuContainerItem onClick={handleClickPause}>
                    {
                        engine.store.settings.isPause ?
                            <Button isActive={engine.store.settings.isPause} icon={<i className="fas fa-play"/>}/> :
                            <Button isActive={engine.store.settings.isPause} icon={<i className="fas fa-pause"/>}/>
                    }
                    <StyledMenuText>{currentTimeStr}</StyledMenuText>
                </StyledMenuContainerItem>

                <StyledMenuContainerItem>
                    <StyledMenuText>{currentTimeSpeedStr}/sec</StyledMenuText>
                    <StyledMenuText>
                        <InputNumber value={engine.store.settings.targetTimeSpeed}
                                     onChange={handleInputTargetTimeSpeed}/>
                    </StyledMenuText>
                </StyledMenuContainerItem>
            </StyledMenuContainerPart>

            <StyledMenuContainerPart>
                <StyledMenuContainerItem>
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
                </StyledMenuContainerItem>
            </StyledMenuContainerPart>

            <StyledMenuContainerPart>
                <StyledMenuContainerItem>
                    <Button icon={objectsCount}>
                        Objects
                    </Button>
                    <Button icon={lastFPS}>
                        FPS
                    </Button>
                    <Button icon={lastPPS}>
                        PPS
                    </Button>
                </StyledMenuContainerItem>
            </StyledMenuContainerPart>
        </StyledMenuContainer>
    );
}
