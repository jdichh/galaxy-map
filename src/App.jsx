import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

const App = () => {
  const FOV = 75;
  const NEAR_CLIP = 0.1;
  const FAR_CLIP = 300;
  const CAM_POSTIION = [0, 10, 30];

  useEffect(() => {
    if (!WebGL.isWebGLAvailable()) {
      const warning = WebGL.getWebGLErrorMessage();
      document.getElementById("container").appendChild(warning);
    }
  });

  return (
    <>
      <div id="canvas-container">
        <Canvas
          camera={{
            position: CAM_POSTIION,
            fov: FOV,
            near: NEAR_CLIP,
            far: FAR_CLIP
          }}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.5,
            dpr: Math.min(window.devicePixelRatio, 2)
          }}
          style={{ background: "#060606" }}
        ></Canvas>
      </div>
    </>
  );
};

export default App;
