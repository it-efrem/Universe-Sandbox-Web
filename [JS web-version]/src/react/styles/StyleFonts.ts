import {createGlobalStyle} from 'styled-components';

// @ts-ignore
import RobotoEOT from './fonts/roboto-regular.eot';
// @ts-ignore
import RobotoWoff from './fonts/roboto-regular.woff';
// @ts-ignore
import RobotoWoff2 from './fonts/roboto-regular.woff2';
// @ts-ignore
import RobotoTTF from './fonts/roboto-regular.ttf';

export const StyleFonts = createGlobalStyle`
    @font-face {
        font-family: "Roboto";
        src: url(${RobotoTTF}) format("truetype"),
        url(${RobotoEOT}) format("embedded-opentype"),
        url(${RobotoWoff}) format("woff"),
        url(${RobotoWoff2}) format("woff2");
    }
`;
