import {useGravity} from "./gravity.hooks";
import {useCanvas} from "./canvas.hook";
import {useDraw} from "./drow.hook";
import {useEngine} from "./engine.hook";

function Canvas() {
    const {canvasRef} = useCanvas();
    useGravity(canvasRef);
    useDraw(canvasRef);
    useEngine(canvasRef);

    return (
        <canvas ref={canvasRef}></canvas>
    );
}

export default Canvas;
