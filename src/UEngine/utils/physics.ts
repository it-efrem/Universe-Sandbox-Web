export const gravityWithTimeSpeed = (
  gravityConst: number,
  targetTimeSpeed: number
) => {
  // todo: adaptive PPS
  // const lastPPS = 240;
  // const _lastPPS = Math.max(lastPPS, 1);

  const scaleFactor = 10;
  return scaleFactor * gravityConst * targetTimeSpeed;
};

export const moveByVector = (
  gravityConst: number,
  targetTimeSpeed: number,
  totalDistance: number,
  a_pos: number,
  b_pos: number,
  a_mass: number,
  b_mass: number
) => {
  const sign = Math.sign(a_pos - b_pos);
  const vectorDistance = Math.max(a_pos, b_pos) - Math.min(a_pos, b_pos);

  if (vectorDistance < 1) {
    return [0, 0];
  }

  const distanceRelation = Math.abs(totalDistance / vectorDistance);

  const timeSpeed = gravityWithTimeSpeed(gravityConst, targetTimeSpeed);
  const gravityForce =
    (timeSpeed * ((a_mass * b_mass) / Math.pow(totalDistance, 2))) /
    distanceRelation;

  const totalMass = a_mass + b_mass;
  const aMassRelation = b_mass / totalMass;
  const bMassRelation = a_mass / totalMass;
  const a_vector = gravityForce * aMassRelation * -sign;
  const b_vector = gravityForce * bMassRelation * sign;

  return [a_vector, b_vector];
};
