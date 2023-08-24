import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { parameters } from "./utils/parameters";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import BackgroundStars from "./components/BackgroundStars";
import WebGL from "three/addons/capabilities/WebGL.js";
import Galaxy from "./components/Galaxy";

const App = () => {
  const FOV = 25;
  const NEAR_CLIP = 0.1;
  const FAR_CLIP = 300;
  const CAM_POSTIION = [30, 80, 40];

  const BG_COLOR = "#000000";

  const textureLoader = new TextureLoader();
  const shape = textureLoader.load("/particle.png");
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
            far: FAR_CLIP,
          }}
          gl={{
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.3,
            dpr: Math.min(window.devicePixelRatio, 2),
          }}
          style={{ background: BG_COLOR }}
        >
          <BackgroundStars parameters={parameters} shape={shape} />
          <Galaxy parameters={parameters} shape={shape} />
        </Canvas>
      </div>
    </>
  );
};

export default App;