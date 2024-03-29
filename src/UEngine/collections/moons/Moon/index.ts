import * as Three from "three";
import { SpaceObject } from "../../../objects/spaceObject";
import { SpaceSphere, SpaceSphereTextures } from "../../../objects/spaceSphere";
import bumpMap from "./files/bumpMap.jpg";
import surfaceMap from "./files/surfaceMap.jpg";

export class Moon extends SpaceObject {
  constructor(position: Three.Vector3, moveVector?: Three.Vector3) {
    const name = "Moon";
    const radiusSurface = 1737;
    const mass = 7.34;

    const surface = new SpaceSphere({
      radius: radiusSurface,
      textures: new SpaceSphereTextures({
        map: surfaceMap.src,
        bumpMap: bumpMap.src,
      }),
    });

    super({ name, surface, position, mass, moveVector });

    this.surface.material.bumpScale = radiusSurface / 40;
  }
}
