import {VIEW_MODE} from "../engineStore";

export const selectCursorType = (mode: VIEW_MODE) => {
    switch (mode) {
        case VIEW_MODE.WATCH:
            return 'default';
        case VIEW_MODE.ADDITIONAL:
            return 'add';
    }
}
