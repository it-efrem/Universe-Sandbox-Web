import React from "react";

import InfoPanel from "../InfoPanel/InfoPanel";
import Canvas from '../Canvas/Canvas';

import './App.css';

// TODO: Рисовать гравитационную искривляющуюся сетку
// TODO: Возможность ускорения и замедления

function App() {
    return (
        <div className="App">
            <InfoPanel/>
            <Canvas/>
        </div>
    );
}

export default App;
