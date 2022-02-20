import React from "react";
import { StyledApp, StyledCanvas } from "src/components/App/App.styles";
import { UEngine } from "src/UEngine";

// todo UEngine:
//  - change names to "free" and "3"

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
