import {engine} from "../../index";

export const resizeEventListener = () => {
    engine.store.canvas.width = window.innerWidth;
    engine.store.canvas.height = window.innerHeight - 20;

    engine.store.canvas.centerX = window.innerWidth / 2;
    engine.store.canvas.centerY = window.innerHeight / 2;

    engine.canvas?.setAttribute('width', `${engine.store.canvas.width}px`)
    engine.canvas?.setAttribute('height', `${engine.store.canvas.height}px`)
}
