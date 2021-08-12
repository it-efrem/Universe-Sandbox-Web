import {Engine} from "./engine/engine";
import React from "react";
import ReactDOM from "react-dom";
import App from "./react/components/App/App";

export const engine = new Engine({
    debounceListenersTime: 100
});

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
