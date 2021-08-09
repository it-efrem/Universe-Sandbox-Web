import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Menu from "../Menu/Menu";
import Canvas from '../Canvas/Canvas';

import './App.css';

// TODO: Рисовать гравитационную искривляющуюся сетку
// TODO: Возможность ускорения и замедления
// todo возможности:
//  - центрировать на самом тяжелом объекте
//  - центрировать на самом центре масс

function App() {
    return (
        <div className="App">
            <Menu/>
            <Canvas/>
        </div>
    );
}

export default App;
