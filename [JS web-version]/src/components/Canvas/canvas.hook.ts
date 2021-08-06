import React from "react";
import {store} from "../../store";

export const useCanvas = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    const fullScreenListener = () => {
        store.canvas.width = window.innerWidth - 20;
        store.canvas.height = window.innerHeight - 20;

        store.canvas.centerX = window.innerWidth / 2;
        store.canvas.centerY = window.innerHeight / 2;

        canvasRef.current?.setAttribute('width', `${store.canvas.width}px`)
        canvasRef.current?.setAttribute('height', `${store.canvas.height}px`)
    }

    React.useEffect(() => {
        fullScreenListener()
        window.addEventListener('resize', fullScreenListener)

        return () => {
            window.removeEventListener('resize', fullScreenListener)
        }
    }, [])

    return {canvasRef}
}
