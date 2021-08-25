import styled from "styled-components";

export const StyledMenuContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    background: #242424;
    color: #929292;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
`;

export const StyledMenuText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 150px;
`;

export const StyledMenuContainerPart = styled.div`
    display: flex;
`;

export const StyledMenuContainerItem = styled.div`
    display: flex;
    
    + .Menu_container_item {
        margin-left: 1em;
    }
    
    > div + div {
        margin-left: 1em;
    }
`;
