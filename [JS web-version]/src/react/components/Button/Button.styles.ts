import styled, {css} from "styled-components";

export const StyledButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 50px;
    cursor: pointer;
`;

interface StyledButtonIconProps {
    isActive?: boolean;
}

export const StyledButtonIcon = styled.div<StyledButtonIconProps>`
    width: 33px;
    height: 33px;
    background: #3d3d3d;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4px;
    
    ${({isActive}) => isActive && css`
        background: #929292 !important;
        color: #242424;
    `}
`;

export const StyledButtonText = styled.div`
    text-align: center;
    font-size: 12px;
`;
