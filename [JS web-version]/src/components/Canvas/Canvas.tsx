import {useCanvas, useDraw, useGravity} from "./hooks";

function Canvas() {
    const {canvasRef} = useCanvas();
    useGravity(canvasRef);
    useDraw(canvasRef);

    return (
        <canvas ref={canvasRef}></canvas>
    );
}

export default Canvas;
