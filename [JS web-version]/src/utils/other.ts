// todo: поправить расчет объема, нужно учитывать плотность

export const getDiameter = (mass: number) => {
    return Math.sqrt(mass) * Math.PI * 20
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

export const getRandomName = () => {
    const letters = Math.random().toString(36).substr(2, 3).toUpperCase()
    const numbers = Math.random().toString(10).substr(2, 3).toUpperCase()

    return `${letters}-${numbers}`;
}
