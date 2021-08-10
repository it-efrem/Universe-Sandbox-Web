import {useGravity} from "./gravity.hooks";
import {useCanvas} from "./canvas.hook";
import {useDraw} from "./drow.hook";
import {useEngine} from "./engine.hook";
import "./Canvas.css";
import {useContext} from "../../reducer/reducer.hooks";
import {selectCursorType} from "../../reducer/selectors";

function Canvas() {
    const {canvasRef} = useCanvas();
    const {state} = useContext();

    useGravity(canvasRef);
    useDraw(canvasRef);
    useEngine(canvasRef);

    const cursorType = selectCursorType(state.mode);

    const canvasClassName = `Canvas_cursor__${cursorType}`;

    return (
        <canvas ref={canvasRef}
                className={canvasClassName}
        />
    );
}

export default Canvas;
