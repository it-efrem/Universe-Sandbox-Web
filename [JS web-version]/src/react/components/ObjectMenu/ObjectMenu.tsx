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
                            <i className="fas fa-times-circle"/>
                        </StyledObjectMenuClose>
                    </StyledObjectMenuTop>
                    <StyledObjectMenuRow>
                        <StyledObjectMenuLabel>
                            <StyledObjectMenuLabelMass>
                                <i className="fas fa-weight-hanging"/>
                            </StyledObjectMenuLabelMass>
                        </StyledObjectMenuLabel>
                        <StyledObjectMenuValue>
                            <InputNumber value={objectInfo.mass}
                                         onChange={handleChangeObjectMass}/>
                        </StyledObjectMenuValue>
                    </StyledObjectMenuRow>
                    <StyledObjectMenuRow>
                        <StyledObjectMenuLabel><i className="fas fa-circle-notch"/></StyledObjectMenuLabel>
                        <StyledObjectMenuValue>{objectInfo.radius}</StyledObjectMenuValue>
                    </StyledObjectMenuRow>
                    <StyledObjectMenuRow>
                        <StyledObjectMenuLabel><i className="fas fa-tachometer-alt"/></StyledObjectMenuLabel>
                        <StyledObjectMenuValue>{objectInfo.speed}</StyledObjectMenuValue>
                    </StyledObjectMenuRow>
                    <StyledObjectMenuRow>
                        <StyledObjectMenuLabel>
                            <i className="fas fa-map-marked-alt"/>
                            Coordinates
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
