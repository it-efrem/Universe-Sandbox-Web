// todo: поправить расчет объема, нужно учитывать плотность
import {store} from "../store";

export const getDiameter = (mass: number) => {
    return Math.sqrt(mass) * Math.PI
}

export const getPositionOnUniverse = (e: MouseEvent, storeCanvas: any) => {
    return [
        (e.x - storeCanvas.centerX) * storeCanvas.scale + storeCanvas.offsetX,
        (e.y - storeCanvas.centerY) * storeCanvas.scale + storeCanvas.offsetY,
    ]
}

export const getPositionOnCanvasByZero = (e: MouseEvent, storeCanvas: any) => {
    return [
        (e.x - storeCanvas.clickX),
        (e.y - storeCanvas.clickY),
    ]
}
