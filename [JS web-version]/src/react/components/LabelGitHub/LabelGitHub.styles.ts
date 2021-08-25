import styled from "styled-components";

export const StyledLabelGitHub = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;

    position: absolute;
    top: 2px;
    left: 2px;

    color: white;
    background: rgba(36, 36, 36, 0.2);
    padding: 2px 4px;
    text-decoration: none;
    font-size: 12px;
    
    &:hover {
        color: white;
        background: rgba(36, 36, 36, 0.4);
    }  
`;


export const StyledLabelGitHuIcon = styled.div`
    margin-right: 4px;
    
    svg {
        fill: currentColor;
    }
`;
