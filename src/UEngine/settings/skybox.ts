import nx from "src/UEngine/files/textures/skybox/nx.jpg";
import ny from "src/UEngine/files/textures/skybox/ny.jpg";
import nz from "src/UEngine/files/textures/skybox/nz.jpg";
import px from "src/UEngine/files/textures/skybox/px.jpg";
import py from "src/UEngine/files/textures/skybox/py.jpg";
import pz from "src/UEngine/files/textures/skybox/pz.jpg";
import * as Three from "three";
import { OrbitControls } from "../utils/OrbitControls";
import { Scene } from "./scene";

export class Skybox extends Scene {
  constructor(scene: Three.Scene, controls: OrbitControls) {
    super(scene, controls);
  }

  public show() {
    this.scene.background = new Three.CubeTextureLoader().load([
      px.src,
      nx.src,
      py.src,
      ny.src,
      pz.src,
      nz.src,
    ]);
  }

  public hide() {
    this.scene.background = null;
  }
}
