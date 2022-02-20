import * as Three from "three";
import { SpaceSphere } from "./spaceSphere";

export type SpaceObjectType = {
  name: string;
  mass: number;
  isGravity?: boolean;
  surface: SpaceSphere;
  atmosphere?: SpaceSphere;
  position: Three.Vector3;
  moveVector?: Three.Vector3;
};

export class SpaceObject {
  protected surface: SpaceSphere;
  protected atmosphere?: SpaceSphere;

  public name: string;
  public mass: number;
  public isGravity: boolean;
  public body: Three.Group;
  public moveVector: Three.Vector3;

  constructor({
    name,
    surface,
    isGravity = true,
    atmosphere,
    position,
    mass,
    moveVector = new Three.Vector3(0, 0, 0),
  }: SpaceObjectType) {
    this.name = name;
    this.surface = surface;
    this.isGravity = isGravity;
    this.atmosphere = atmosphere;
    this.mass = mass;
    this.moveVector = moveVector;

    this.body = new Three.Group();
    this.body.position.add(position);

    this.body.add(this.surface.mesh);

    if (this.atmosphere) {
      this.atmosphere.material.side = Three.DoubleSide;
      this.atmosphere.material.opacity = 0.4;
      this.atmosphere.material.transparent = true;
      this.atmosphere.material.depthWrite = false;

      this.body.add(this.atmosphere.mesh);
    }
  }
}
