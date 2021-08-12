import React from "react";
import {engine} from "../../../index";
import {resizeEventListener} from "../../../game/eventListeners/resize";
import {mouseDownEventListener} from "../../../game/eventListeners/mouseDown";
import {mouseMoveEventListener} from "../../../game/eventListeners/mouseMove";
import {mouseUpEventListener} from "../../../game/eventListeners/mouseUp";
import {wheelEventListener} from "../../../game/eventListeners/wheel";

export const useCanvas = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        if (canvasRef.current) {
            engine.setCanvas(canvasRef.current)

            resizeEventListener()

            window.addEventListener('resize', resizeEventListener)

            engine.addCanvasListener('mousedown', mouseDownEventListener)
            engine.addCanvasListener('mousemove', mouseMoveEventListener)
            engine.addCanvasListener('mouseup', mouseUpEventListener)
            engine.addCanvasListener('wheel', wheelEventListener)

            engine.run();

            return () => {
                window.addEventListener('resize', resizeEventListener)

                engine.removeCanvasListener('mousedown', mouseDownEventListener)
                engine.removeCanvasListener('mousemove', mouseMoveEventListener)
                engine.removeCanvasListener('mouseup', mouseUpEventListener)
                engine.removeCanvasListener('wheel', wheelEventListener)

                engine.stop();
            }
        }
    }, [canvasRef])

    return {canvasRef}
}
