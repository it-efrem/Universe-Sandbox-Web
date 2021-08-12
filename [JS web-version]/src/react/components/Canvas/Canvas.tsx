import {useCanvas} from "./Canvas.hook";
import {useReactStore} from "../../reducer/hooks";
import "./Canvas.css";
import {VIEW_MODE} from "../../../engine/types";

// todo: re-renders
function Canvas() {
    const {canvasRef} = useCanvas();
    const {state} = useReactStore();

    const cursorType = VIEW_MODE[state.menu.viewMode];
    const canvasClassName = `Canvas_cursor__${cursorType}`;

    return (
        <canvas ref={canvasRef}
                className={canvasClassName}
        />
    );
}

export default Canvas;
