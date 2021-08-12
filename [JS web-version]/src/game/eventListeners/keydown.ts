import {engine} from "../../index";

export const keyDownListener = (e: KeyboardEvent) => {
    switch (e.code) {
        case 'Space':
            engine.store.settings.isPause = !engine.store.settings.isPause;
            break
    }
}
