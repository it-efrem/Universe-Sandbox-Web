export const getPositionOnUniverse = (x_canvas: number, y_canvas: number, storeCanvas: any) => {
    return [
        (x_canvas - storeCanvas.centerX) * storeCanvas.scale + storeCanvas.offsetX,
        (y_canvas - storeCanvas.centerY) * storeCanvas.scale + storeCanvas.offsetY,
    ]
}

export const getPositionOnCanvasByZero = (x_canvas: number, y_canvas: number, storeCanvas: any) => {
    return [
        (x_canvas - storeCanvas.clickX),
        (y_canvas - storeCanvas.clickY),
    ]
}

export const getRandomName = () => {
    const letters = Math.random().toString(36).substr(2, 3).toUpperCase()
    const numbers = Math.random().toString(10).substr(2, 3).toUpperCase()

    return `${letters}-${numbers}`;
}

export const getVectorLength = (x: number, y: number) => {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

const normalizeNumberRegExp = new RegExp(/([.]*[0]*)$/);
export const normalizeNumber = (num: number, toFixed = 2) => {
    return Number(num.toFixed(toFixed).replace(normalizeNumberRegExp, ''))
}

export const detectUniverseCollision = (totalDistance: number, a_radius: number, b_radius: number) => {
    return totalDistance <= a_radius || totalDistance <= b_radius
}

export const detectCanvasCollision = (a_x: number, a_y: number, a_radius: number, b_x: number, b_y: number, b_radius: number) => {
    const x = Math.max(a_x, b_x) - Math.min(a_x, b_x);
    const y = Math.max(a_y, b_y) - Math.min(a_y, b_y);

    const distance = getVectorLength(x, y);
    const isCollision = detectUniverseCollision(distance, a_radius, b_radius);

    return isCollision;
}

export function getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
