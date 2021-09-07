import styled from "styled-components";
import {
    StyledInputNumberButtons,
    StyledInputNumberContainer,
    StyledInputNumberInput
} from "../InputNumber/InputNumber.styles";

export const StyledObjectMenuWrapper = styled.div`
    position: absolute;
    top: 50%;
    right: 2px;
    width: 175px;
    opacity: 0.9;
    transform: translateY(-50%);
`;

export const StyledObjectMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    background: #242424;
    color: #929292;
    
    :last-child {
        padding-bottom: 5px;
    }
`;

export const StyledObjectMenuTop = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 18px;
    margin-bottom: 5px;
    background: #3d3d3d;
    font-size: 16px;
    `;

export const StyledObjectMenuClose = styled.div`
    &:hover {
        cursor: pointer;
        color: #b7b7b7;
    }
`;

export const StyledObjectMenuRow = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 5px 18px;
`;

export const StyledObjectMenuLabel = styled.div`
    min-width: 24px;
    font-size: 12px;
    
    i {
        min-width: 24px;
    }
`;

export const StyledObjectMenuLabelMass = styled.div`
    min-width: 18px;
`;

export const StyledObjectMenuValue = styled.div`
    font-size: 12px;
    
    & ${StyledInputNumberContainer} {
        width: 130px;
    }
    
    & ${StyledInputNumberButtons} {
        width: 160px;
        left: -42px;
    }
    
    & ${StyledInputNumberInput} {
        width: 100px;
        
         input {
            font-size: 12px;
        }
    }
`;
