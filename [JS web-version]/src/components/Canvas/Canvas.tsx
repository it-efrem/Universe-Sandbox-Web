import {useGravity} from "./gravity.hooks";
import {useCanvas} from "./canvas.hook";
import {useDraw} from "./drow.hook";

function Canvas() {
    const {canvasRef} = useCanvas();
    useGravity(canvasRef);
    useDraw(canvasRef);

    return (
        <canvas ref={canvasRef}></canvas>
    );
}

export default Canvas;
