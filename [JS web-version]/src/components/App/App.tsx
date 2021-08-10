import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Menu from "../Menu/Menu";
import Canvas from '../Canvas/Canvas';

import {LabelGitHub} from "../LabelGitHub/LabelGitHub";
import {initReducer} from "../../reducer/reducer.hooks";
import {ReactContext} from "../../reducer/context";

import './App.css';

// TODO: Рисовать гравитационную искривляющуюся сетку
// TODO: Возможность ускорения и замедления
// todo возможности:
//  - центрировать на самом тяжелом объекте
//  - центрировать на самом центре масс

function App() {
    const reducer = initReducer();

    return (
        <ReactContext.Provider value={reducer}>
            <div className="App">
                <LabelGitHub/>
                <Menu/>
                <Canvas/>
            </div>
        </ReactContext.Provider>
    );
}

export default App;
