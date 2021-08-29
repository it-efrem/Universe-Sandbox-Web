import {createGlobalStyle} from 'styled-components';

export const StyleGlobalReset = createGlobalStyle`
    body {
        margin: 0;
    }
    
    * {
        user-select: none;
        font-family: "Roboto", sans-serif;
    }
`;
