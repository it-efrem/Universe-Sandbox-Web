import {createGlobalStyle} from 'styled-components';

export const StyleGlobalReset = createGlobalStyle`
    body {
        margin: 0;
        font-family: "Inter-Black", sans-serif;
    }
    
    * {
        user-select: none;
    }
`;
