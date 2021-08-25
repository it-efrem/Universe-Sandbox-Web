import styled from "styled-components";

export const StyledInputNumberButtons = styled.div`
    display: none;

    position: absolute;
    left: -20px;
    bottom: 1.5em;
    background: #242424;
    padding: 4px 2px;
    
    button {
        background: #3d3d3d;
        border: 1px solid #929292;
        color: #929292;
        text-align: center;
        margin: 0 2px;
        border-radius: 2px;
        min-height: 2em;
        height: 2em;
        width: 3em;
        font-size: 12px;
        
        &:hover {
            cursor: pointer;
            background: #929292;
            border: 1px solid #929292;
            color: #3d3d3d;
        }
    }
`;

export const StyledInputNumberInput = styled.div`
    input {
        max-width: 60px;
        padding: 3px 6px;
        margin: 0;
        height: 1em;
        background: #242424;
        border: 1px solid #242424;
        color: #929292;
    }
`;

export const StyledInputNumberContainer = styled.div`
    position: relative;
    width: 150px;
    
    &:hover & ${StyledInputNumberButtons} {
        display: flex;
    }
    
    &:hover & ${StyledInputNumberInput} {
        input {
            border: 1px solid #929292;
            background: #3d3d3d;
        }
    }
`;
