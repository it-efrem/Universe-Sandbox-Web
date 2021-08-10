import {VIEW_MODE} from "../engine/store";

export const selectCursorType = (mode: VIEW_MODE) => {
    switch (mode) {
        case VIEW_MODE.WATCH:
            return 'default';
        case VIEW_MODE.ADDITIONAL:
            return 'add';
    }
}
