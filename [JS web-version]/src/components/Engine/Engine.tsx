import {useGravity} from "./gravity.hooks";
import {useCanvas} from "./canvas.hook";
import {useDraw} from "./drow.hook";
import {useEngine} from "./engine.hook";
import {useReactStore} from "../../reducer/reducer.hooks";
import {selectCursorType} from "../../reducer/selectors";
import "./Canvas.css";

function Engine() {
    const {canvasRef} = useCanvas();
    const {state} = useReactStore();

    useEngine(canvasRef);
    useGravity(canvasRef);
    useDraw(canvasRef);

    const cursorType = selectCursorType(state.menu.mode);

    const canvasClassName = `Canvas_cursor__${cursorType}`;

    return (
        <canvas ref={canvasRef}
                className={canvasClassName}
        />
    );
}

export default Engine;
