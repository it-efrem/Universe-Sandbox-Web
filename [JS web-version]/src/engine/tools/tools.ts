export const gravityWithTimeSpeed = (lastPPS: number, gravityConst: number, targetTimeSpeed: number) => {
    const _lastPPS = Math.max(lastPPS, 1);

    // todo: понять почему возникает такая необходимость
    const magicConst = 10;
    return magicConst * gravityConst * targetTimeSpeed / _lastPPS;
}

export const moveByVector = (lastPPS: number, gravityConst: number, targetTimeSpeed: number, totalDistance: number, a_pos: number, b_pos: number, a_mass: number, b_mass: number) => {
    const sign = Math.sign(a_pos - b_pos);
    const distance = Math.max(a_pos, b_pos) - Math.min(a_pos, b_pos);
    const distanceRelation = Math.abs(totalDistance / distance);

    const timeSpeed = gravityWithTimeSpeed(lastPPS, gravityConst, targetTimeSpeed);
    const gravityForce = timeSpeed * ((a_mass * b_mass) / Math.pow(totalDistance, 2)) / distanceRelation;

    const a_vector = gravityForce / a_mass * -sign;
    const b_vector = gravityForce / b_mass * sign;

    return [
        a_vector,
        b_vector,
    ]
}
