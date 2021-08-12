import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Menu from "../Menu/Menu";
import {LabelGitHub} from "../LabelGitHub/LabelGitHub";
import {initReducer} from "../../reducer/hooks";
import {ReactStoreContext} from "../../reducer/context";
import {ObjectMenu} from "../ObjectMenu/ObjectMenu";
import Canvas from "../Canvas/Canvas";

import '../../styles/reset.css';
import './App.css';

// TODO: Рисовать гравитационную искривляющуюся сетку
// TODO: Возможность ускорения и замедления
// todo возможности:
//  - центрировать на самом тяжелом объекте
//  - центрировать на самом центре масс

// todo: fullscreen button

function App() {
    const reducer = initReducer();

    return (
        <ReactStoreContext.Provider value={reducer}>
            <div className="App">
                <Canvas/>

                <ObjectMenu/>
                <Menu/>

                <LabelGitHub/>
            </div>
        </ReactStoreContext.Provider>
    );
}

export default App;