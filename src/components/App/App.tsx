import React from "react";
import { StyledApp, StyledCanvas } from "src/components/App/App.styles";
import { UEngine } from "src/UEngine";

// todo UEngine:
//  - object adding/removing
//  - gravity
//  - git object - raycast
//  - click object adding
//  - click object adding (set vector + size)
//  - planet textures
//  - sun light
//  - change names to "free" and "3"
//  - scale line
//  - Controls:
//    - smooth move
//    - speed move by scale
//    - Q + E

// todo UI:
//  - Game menu
//   - pause
//   - object info by click
//   - object change properties
//   - simulation speed target/current
//   - view grid
//   - view labels
//   - view vectors + tracks
//  - General menu screen
//   - settings
//   - new simulation
//   - chose simulation

export const App: React.FC = () => {
  const engine = React.useRef<UEngine>();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (canvasRef?.current) {
      const isWebGLAvailable = UEngine.checkWebGLAvailable();

      if (isWebGLAvailable) {
        engine.current = new UEngine(canvasRef.current);
        engine.current.start();
      } else {
        // todo: render error
      }
    }
  }, [canvasRef]);

  return (
    <StyledApp>
      <StyledCanvas ref={canvasRef} />
    </StyledApp>
  );
};
