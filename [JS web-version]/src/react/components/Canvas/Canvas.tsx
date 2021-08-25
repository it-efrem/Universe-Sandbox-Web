import {useCanvas} from "./Canvas.hook";
import {useReactStore} from "../../reducer/hooks";
import {canvasCursorTypesMap, StyledCanvasCursor} from "./Canvas.styles";

// todo: re-renders
function Canvas() {
    const {canvasRef} = useCanvas();
    const {state} = useReactStore();

    const cursor = canvasCursorTypesMap[state.menu.viewMode];

    return (
        <StyledCanvasCursor cursor={cursor}>
            <canvas ref={canvasRef}/>
        </StyledCanvasCursor>
    );
}

export default Canvas;
