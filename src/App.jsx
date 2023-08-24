import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { parameters } from "./utils/parameters";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls, Stats } from "@react-three/drei";
import * as THREE from "three";
import BackgroundStars from "./components/BackgroundStars";
import WebGL from "three/addons/capabilities/WebGL.js";

const App = () => {
  const FOV = 75;
  const NEAR_CLIP = 0.1;
  const FAR_CLIP = 300;
  const CAM_POSTIION = [0, 10, 30];
  
  const BG_COLOR = "#000000"

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
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.5,
            dpr: Math.min(window.devicePixelRatio, 2),
          }}
          style={{ background: BG_COLOR }}
        >
          <BackgroundStars parameters={parameters} shape={shape} />
          <OrbitControls />
        </Canvas>
        <Stats />
      </div>
    </>
  );
};

export default App;
