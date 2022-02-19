import * as Three from "three";
import { OrbitControls } from "../utils/OrbitControls";
import { Grid } from "./grid";
import { Scene } from "./scene";
import { Skybox } from "./skybox";

export class Settings extends Scene {
  public grid: Grid;
  public skybox: Skybox;

  constructor(scene: Three.Scene, controls: OrbitControls) {
    super(scene, controls);

    this.grid = new Grid(this.scene, this.controls);
    this.skybox = new Skybox(this.scene, this.controls);

    // todo: move to ui
    // this.grid.show();
    this.skybox.show();
  }
}
