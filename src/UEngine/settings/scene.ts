import * as Three from "three";
import { OrbitControls } from "../utils/OrbitControls";

export class Scene {
  protected scene: Three.Scene;
  protected controls: OrbitControls;

  constructor(scene: Three.Scene, controls: OrbitControls) {
    this.scene = scene;
    this.controls = controls;
  }
}
