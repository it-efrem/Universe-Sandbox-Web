import React from "react";
import ReactDOM from "react-dom";
import App from "./react/components/App/App";

import {Engine} from "./engine/engine";
import {StyleGlobalReset} from "./react/styles/StyleGlobalReset";
import {StyleFonts} from "./react/styles/StyleFonts";
import "./react/styles/icons.styles.scss";

export const engine = new Engine({
    debounceListenersTime: 100
});

ReactDOM.render(
    <React.StrictMode>
        <StyleGlobalReset/>
        <StyleFonts/>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
