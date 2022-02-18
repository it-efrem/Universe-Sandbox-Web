import { Store } from "src/UEngine/store";
import { OrbitControls } from "src/UEngine/utils/OrbitControls";
import * as Three from "three";
import { Settings } from "./settings";

export class UEngine {
  private readonly renderer: Three.WebGLRenderer;
  private readonly scene: Three.Scene;
  private readonly camera: Three.PerspectiveCamera;
  private readonly controls: OrbitControls;
  private readonly store: Store;
  private readonly settings: Settings;

  public static checkWebGLAvailable() {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  }

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new Three.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.scene = new Three.Scene();
    this.camera = new Three.PerspectiveCamera(
      70,
      canvas.clientWidth / canvas.clientHeight,
      0.01,
      Number.MAX_SAFE_INTEGER
    );
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.listenToKeyEvents(document.body);
    this.camera.position.set(50, 50, 300);

    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    window.addEventListener("resize", this.canvasResize.bind(this));

    this.store = new Store();
    this.settings = new Settings(this.scene, this.controls);

    // todo: if dev
    if (typeof window.__THREE_DEVTOOLS__ !== "undefined") {
      window.__THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent("observe", { detail: this.scene })
      );
      window.__THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent("observe", { detail: this.renderer })
      );
    }
  }

  public start() {
    this.store.isStarted = true;
    this.render();
  }

  public stop() {
    this.store.isStarted = false;
  }

  public addObject() {}

  private canvasResize() {
    const canvas = this.renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;

    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  }

  private render() {
    if (!this.store.isStarted) {
      return;
    }

    this.controls.update();
    this.settings.grid.render();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

// const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
// const material = new Three.MeshPhongMaterial({ color: "#000" });
//
// const mesh = new Three.Mesh(geometry, material);
// mesh.position.set(0, 0, 0);
// scene.add(mesh);
//
// const color = "#f0f";
// const intensity = 30;
// const light = new Three.DirectionalLight(color, intensity);
// light.position.set(10, 10, 10);
// scene.add(light);
//
// renderer.render(scene, camera);
