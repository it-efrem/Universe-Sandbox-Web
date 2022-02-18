import * as Three from "three";

export class Objects {
  private objects: Three.Object3D[] = [];

  public getObjects() {
    return this.objects;
  }

  public add(object3D: Three.Object3D) {
    return this.objects.push(object3D);
  }

  public remove() {}
}
