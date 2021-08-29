import React from "react";

import {Menu} from "../Menu/Menu";
import {LabelGitHub} from "../LabelGitHub/LabelGitHub";
import {initReducer} from "../../reducer/hooks";
import {ReactStoreContext} from "../../reducer/context";
import {ObjectMenu} from "../ObjectMenu/ObjectMenu";
import Canvas from "../Canvas/Canvas";

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
            <Canvas/>

            <ObjectMenu/>
            <Menu/>

            <LabelGitHub/>
        </ReactStoreContext.Provider>
    );
}

export default App;
