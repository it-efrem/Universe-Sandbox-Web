import * as Three from "three";
import { SpaceSphere } from "./spaceSphere";

export type SpaceObjectType = {
  surface: SpaceSphere;
  atmosphere?: SpaceSphere;
  position: Three.Vector3;
  mass: number;
};

export class SpaceObject {
  protected surface: SpaceSphere;
  protected atmosphere?: SpaceSphere;
  protected mass: number;

  public body: Three.Group;

  constructor({ surface, atmosphere, position, mass }: SpaceObjectType) {
    this.surface = surface;
    this.atmosphere = atmosphere;
    this.mass = mass;

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
