import throttle from "lodash/throttle";

export type UIListener = () => void;

export enum UIListenerType {
  CLICK = "click",
  DOUBLE_CLICK = "dblclick",
}

export class UI {
  private throttleTimeout = 300;
  private canvas: HTMLCanvasElement;
  private listenersClick: UIListener[];
  private listenersDoubleClick: UIListener[];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.listenersClick = [];
    this.listenersDoubleClick = [];

    // todo: destructors
    this.canvas.addEventListener("click", this.handleCanvasClick);
    this.canvas.addEventListener("dblclick", this.handleCanvasDoubleClick);
  }

  private handleCanvasClick = throttle(() => {}, this.throttleTimeout);
  private handleCanvasDoubleClick = throttle(() => {}, this.throttleTimeout);

  public addEventListener(type: UIListenerType, callback: UIListener) {
    switch (type) {
      case UIListenerType.CLICK:
        this.listenersClick.push(callback);
        break;
      case UIListenerType.DOUBLE_CLICK:
        this.listenersDoubleClick.push(callback);
        break;
      default:
        throw new Error("unknown UIListenerType");
    }
  }
}
