import * as Three from "three";

export class Raycast {
  private scene: Three.Scene;
  private camera: Three.Camera;
  private domElement: HTMLCanvasElement;
  private pointer: Three.Vector2;
  private raycaster: Three.Raycaster;
  private listeners: Function[] = [];

  constructor(
    scene: Three.Scene,
    camera: Three.Camera,
    domElement: HTMLCanvasElement
  ) {
    this.scene = scene;
    this.camera = camera;
    this.pointer = new Three.Vector2();
    this.raycaster = new Three.Raycaster();

    this.domElement = domElement;
    // todo: add remove
    this.domElement.addEventListener(
      "mousemove",
      this.onPointerMove.bind(this)
    );
  }

  public addListener() {}

  public onPointerMove(event: MouseEvent) {
    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  public getObjects() {
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const intersects = this.raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {
      //
      this.listeners.forEach((listener) => listener(intersects));
    }
  }
}
