export const measureFrequency = (resolve: (lastFPS: number) => void) => {
    let lastTimestamp = Date.now();
    let lastCount = 0;

    return () => {
        if (Date.now() % lastTimestamp >= 1000) {
            lastTimestamp = Date.now();
            resolve(++lastCount)
            lastCount = 0;
        } else {
            ++lastCount;
        }
    }
}
