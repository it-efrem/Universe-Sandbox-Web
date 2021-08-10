import {IAction} from "./actions";

export const reducer = (state: any, action: IAction) => {
    switch (action.type) {
        case 'MODE': {
            return {
                ...state,
                mode: action.payload,
            }
        }
    }
}
