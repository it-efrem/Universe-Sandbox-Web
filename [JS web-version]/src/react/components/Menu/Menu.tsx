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
import {StyledIcon} from "../SvgIcon/SvgIcon";
import playSvg from "../../styles/icons/play-solid.svg";
import pauseSvg from "../../styles/icons/pause-solid.svg";
import moveSvg from "../../styles/icons/hand-rock-solid.svg";
import plusSvg from "../../styles/icons/plus-solid.svg";
import borderSvg from "../../styles/icons/border-all-solid.svg";
import tagsSvg from "../../styles/icons/tags-solid.svg";
import arrowLeftSvg from "../../styles/icons/long-arrow-alt-left-solid.svg";
import waterSvg from "../../styles/icons/water-solid.svg";
import shapedSvg from "../../styles/icons/shapes-solid.svg";
import circleSvg from "../../styles/icons/circle-solid.svg";

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
                            <Button isActive={engine.store.settings.isPause} icon={<StyledIcon src={playSvg}/>}/> :
                            <Button isActive={engine.store.settings.isPause} icon={<StyledIcon src={pauseSvg}/>}/>
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
                            icon={<StyledIcon src={moveSvg}/>}>Move</Button>
                    <Button isActive={isAdditional}
                            onClick={handleClickAdditionalMode}
                            icon={<StyledIcon src={plusSvg}/>}>
                        Add obj.
                    </Button>
                    <Button isActive={isGrid}
                            onClick={handleClickIsGrid}
                            icon={<StyledIcon src={borderSvg}/>}>Grid</Button>
                    <Button isActive={isLabels}
                            onClick={handleClickIsLabels}
                            icon={<StyledIcon src={tagsSvg}/>}>Labels</Button>
                    <Button isActive={isForceLines}
                            onClick={handleClickIsForces}
                            icon={<StyledIcon src={arrowLeftSvg}/>}>Forces</Button>
                    <Button isActive={isTidalForces}
                            onClick={handleClickIsTridals}
                            icon={<StyledIcon src={waterSvg}/>}>Tidals</Button>
                    <Button isActive={isFragments}
                            onClick={handleClickIsFragments}
                            icon={<StyledIcon src={shapedSvg}/>}>Fragments</Button>
                    <Button isActive={isCollide}
                            onClick={handleClickIsCollide}
                            icon={<StyledIcon src={circleSvg}/>}>Collide</Button>
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
