import * as Three from "three";
import { SpaceObject } from "../../../objects/spaceObject";
import { SpaceSphere, SpaceSphereTextures } from "../../../objects/spaceSphere";
import atmosphereMap from "./files/atmosphere.jpg";
import atmosphereSpecular from "./files/atmosphereSpecular.jpg";
import bumpMap from "./files/bumpMap.jpg";
import specularMap from "./files/specularMap.jpg";
import surfaceMap from "./files/surface.jpg";

export class Earth extends SpaceObject {
  constructor(position: Three.Vector3, moveVector?: Three.Vector3) {
    const name = "Earth";
    const radiusSurface = 6371;
    const radiusAtmosphere = radiusSurface + 100;
    const mass = 597.22;

    const surface = new SpaceSphere({
      radius: radiusSurface,
      textures: new SpaceSphereTextures({
        map: surfaceMap.src,
        bumpMap: bumpMap.src,
        specularMap: specularMap.src,
      }),
    });
    const atmosphere = new SpaceSphere({
      radius: radiusAtmosphere,
      textures: new SpaceSphereTextures({
        map: atmosphereMap.src,
        specularMap: atmosphereSpecular.src,
      }),
    });

    super({ name, surface, position, mass, moveVector });

    this.surface.material.bumpScale = radiusSurface / 40;
  }
}
