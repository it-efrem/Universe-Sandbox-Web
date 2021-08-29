import React from "react";
import {useObjectMenu} from "./ObjectMenu.hook";
import {InputNumber} from "../InputNumber/InputNumber";
import {
    StyledObjectMenuClose,
    StyledObjectMenuContainer,
    StyledObjectMenuLabel,
    StyledObjectMenuLabelMass,
    StyledObjectMenuRow,
    StyledObjectMenuTop,
    StyledObjectMenuValue,
    StyledObjectMenuWrapper
} from "./ObjectMenu.styles";
import {StyledIcon} from "../SvgIcon/SvgIcon";
import timesCircleSvg from "../../styles/icons/times-circle-solid.svg";
import weightSvg from "../../styles/icons/weight-hanging-solid.svg";
import circleNotchSvg from "../../styles/icons/circle-notch-solid.svg";
import tachometerSvg from "../../styles/icons/tachometer-alt-solid.svg";
import mapSvg from "../../styles/icons/map-marker-alt-solid.svg";

export const ObjectMenu = () => {
    const {isVisible, objectInfo, handleClickCloseMenu, handleChangeObjectMass} = useObjectMenu();

    return React.useMemo(() => {
        if (!isVisible || !objectInfo) {
            return null;
        }

        return (
            <StyledObjectMenuWrapper>
                <StyledObjectMenuContainer>
                    <StyledObjectMenuTop>
                        <div>{objectInfo.id}</div>
                        <StyledObjectMenuClose
                            onClick={handleClickCloseMenu}>
                            <StyledIcon src={timesCircleSvg}/>
                        </StyledObjectMenuClose>
                    </StyledObjectMenuTop>
                    <StyledObjectMenuRow>
                        <StyledObjectMenuLabel>
                            <StyledObjectMenuLabelMass>
                                <StyledIcon src={weightSvg}/>
                            </StyledObjectMenuLabelMass>
                        </StyledObjectMenuLabel>
                        <StyledObjectMenuValue>
                            <InputNumber value={objectInfo.mass}
                                         onChange={handleChangeObjectMass}/>
                        </StyledObjectMenuValue>
                    </StyledObjectMenuRow>
                    <StyledObjectMenuRow>
                        <StyledObjectMenuLabel><StyledIcon src={circleNotchSvg}/></StyledObjectMenuLabel>
                        <StyledObjectMenuValue>{objectInfo.radius}</StyledObjectMenuValue>
                    </StyledObjectMenuRow>
                    <StyledObjectMenuRow>
                        <StyledObjectMenuLabel><StyledIcon src={tachometerSvg}/></StyledObjectMenuLabel>
                        <StyledObjectMenuValue>{objectInfo.speed}</StyledObjectMenuValue>
                    </StyledObjectMenuRow>
                    <StyledObjectMenuRow>
                        <StyledObjectMenuLabel>
                            <StyledObjectMenuLabel>
                                <StyledIcon src={mapSvg}/>
                            </StyledObjectMenuLabel>
                            <StyledObjectMenuValue>Coordinates</StyledObjectMenuValue>
                        </StyledObjectMenuLabel>
                    </StyledObjectMenuRow>
                    <StyledObjectMenuRow>
                        <StyledObjectMenuLabel>x</StyledObjectMenuLabel>
                        <StyledObjectMenuValue>{objectInfo.x}</StyledObjectMenuValue>
                    </StyledObjectMenuRow>
                    <StyledObjectMenuRow>
                        <StyledObjectMenuLabel>y</StyledObjectMenuLabel>
                        <StyledObjectMenuValue>{objectInfo.y}</StyledObjectMenuValue>
                    </StyledObjectMenuRow>
                </StyledObjectMenuContainer>
            </StyledObjectMenuWrapper>
        )
    }, [isVisible, objectInfo]);
}
