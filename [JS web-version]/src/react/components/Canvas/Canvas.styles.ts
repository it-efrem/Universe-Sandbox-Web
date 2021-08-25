import styled from "styled-components";
import {VIEW_MODE} from "../../../engine/types";

export const canvasCursorTypesMap = {
    [VIEW_MODE.WATCH]: 'default',
    [VIEW_MODE.ADDITIONAL]: 'copy',
}

interface StyledCanvasCursorProps {
    cursor: string;
}

export const StyledCanvasCursor = styled.div<StyledCanvasCursorProps>`
    cursor: ${({cursor}) => `${cursor}`}
`;
