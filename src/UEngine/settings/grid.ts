import throttle from "lodash/throttle";
import * as Three from "three";
import { OrbitControls } from "../utils/OrbitControls";
import { Scene } from "./scene";

// todo: fix, camera distance
export class Grid extends Scene {
  private smallGrid?: Three.GridHelper;
  private bigGrid?: Three.GridHelper;
  private isVisible = false;

  public colorSmallGrid = 130;
  public colorBigGrid = 130;

  constructor(scene: Three.Scene, controls: OrbitControls) {
    super(scene, controls);
  }

  private createGrid() {
    // todo: position from focus object
    const cameraVectorLength = Math.max(
      1,
      this.controls.camera.position.length()
    );
    const vectorLengthFactor = Math.log10(cameraVectorLength);

    const sizeFactor = 1 + Math.ceil(vectorLengthFactor);
    const opacity = 1 - (Math.abs(vectorLengthFactor) % 1);
    const size = 10 * Math.pow(10, sizeFactor);

    const smallGridColor = Math.round(this.colorSmallGrid * opacity);
    const smallGridColorStr = `rgb(${smallGridColor},${smallGridColor},${smallGridColor})`;
    const bigGridColorStr = `rgb(${this.colorBigGrid},${this.colorBigGrid},${this.colorBigGrid})`;

    this.smallGrid = new Three.GridHelper(
      size,
      1000,
      smallGridColorStr,
      smallGridColorStr
    );
    this.bigGrid = new Three.GridHelper(
      size,
      100,
      bigGridColorStr,
      bigGridColorStr
    );

    this.scene.add(this.smallGrid);
    this.scene.add(this.bigGrid);
  }

  private removeGrid() {
    if (this.smallGrid) {
      this.scene.remove(this.smallGrid);
      this.smallGrid = undefined;
    }

    if (this.bigGrid) {
      this.scene.remove(this.bigGrid);
      this.bigGrid = undefined;
    }
  }

  public hide() {
    if (this.isVisible) {
      this.isVisible = false;
      this.removeGrid();
    }
  }

  public show() {
    if (!this.isVisible) {
      this.isVisible = true;
      this.createGrid();
    }
  }

  public render = throttle(() => {
    this.controls.target = this.scene.children[1].position;
    // todo: from object radius
    this.controls.minDistance = 10000;

    if (this.isVisible) {
      this.removeGrid();
      this.createGrid();
    }
  }, 300);
}
