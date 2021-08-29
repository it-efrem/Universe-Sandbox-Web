import {createGlobalStyle} from 'styled-components';

// @ts-ignore
import RobotoEOT from './fonts/roboto-regular.eot';
// @ts-ignore
import RobotoWoff from './fonts/roboto-regular.woff';
// @ts-ignore
import RobotoWoff2 from './fonts/roboto-regular.woff2';
// @ts-ignore
import RobotoTTF from './fonts/roboto-regular.ttf';

// @ts-ignore
import FontAwesomeRegularEOT from '@fortawesome/fontawesome-free/webfonts/fa-regular-400.eot';
// @ts-ignore
import FontAwesomeRegularWoff2 from '@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2';
// @ts-ignore
import FontAwesomeRegularWoff from '@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff';
// @ts-ignore
import FontAwesomeRegularTTF from '@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf';

// @ts-ignore
import FontAwesomeSolidEOT from '@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot';
// @ts-ignore
import FontAwesomeSolidWoff2 from '@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2';
// @ts-ignore
import FontAwesomeSolidWoff from '@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff';
// @ts-ignore
import FontAwesomeSolidTTF from '@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf';

import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/regular.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";

export const StyleFonts = createGlobalStyle`
    @font-face {
        font-family: "Roboto";
        src: url(${RobotoTTF}) format("truetype"),
        url(${RobotoEOT}) format("embedded-opentype"),
        url(${RobotoWoff}) format("woff"),
        url(${RobotoWoff2}) format("woff2");
    }
    
    @font-face {
        font-family: "Font Awesome 5 Free";
        font-style: normal;
        font-weight: 400;
        font-display: block;
        src: url(${FontAwesomeRegularEOT});
        src: url(${FontAwesomeRegularEOT}) format("embedded-opentype"),
        url(${FontAwesomeRegularWoff2}) format("woff2"),
        url(${FontAwesomeRegularWoff}) format("woff"),
        url(${FontAwesomeRegularTTF}) format("truetype")
    }
        
    @font-face {
        font-family: "Font Awesome 5 Free";
        font-style: normal;
        font-weight: 900;
        font-display: block;
        src: url(${FontAwesomeSolidEOT});
        src: url(${FontAwesomeSolidEOT}) format("embedded-opentype"),
        url(${FontAwesomeSolidWoff2}) format("woff2"),
        url(${FontAwesomeSolidWoff}) format("woff"),
        url(${FontAwesomeSolidTTF}) format("truetype")
    }
`;
