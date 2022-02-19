import * as Three from "three";
import { SpaceObjects } from "../objects";

export class Store {
  private scene: Three.Scene;
  public isStarted = false;
  public objects: SpaceObjects;

  constructor(scene: Three.Scene) {
    this.scene = scene;
    this.objects = new SpaceObjects(this.scene);
  }
}
