import React from "react";
import {engineStore} from "../../engineStore";

export const useCanvas = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    const fullScreenListener = () => {
        engineStore.canvas.width = window.innerWidth - 20;
        engineStore.canvas.height = window.innerHeight - 20;

        engineStore.canvas.centerX = window.innerWidth / 2;
        engineStore.canvas.centerY = window.innerHeight / 2;

        canvasRef.current?.setAttribute('width', `${engineStore.canvas.width}px`)
        canvasRef.current?.setAttribute('height', `${engineStore.canvas.height}px`)
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
