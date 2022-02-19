import * as Three from "three";
import { SpaceObject } from "./spaceObject";

export class SpaceObjects {
  private scene: Three.Scene;
  private objects: SpaceObject[] = [];

  constructor(scene: Three.Scene) {
    this.scene = scene;
  }

  public getObjects() {
    return this.objects;
  }

  public add(spaceObject: SpaceObject) {
    this.objects.push(spaceObject);
    this.scene.add(spaceObject.body);
  }

  public remove() {
    // todo: remove
  }
}
