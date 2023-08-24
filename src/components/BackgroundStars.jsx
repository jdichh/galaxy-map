import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { parameters } from "../utils/parameters.js";

function BackgroundStars({ shape }) {
  const { scene } = useThree();
  let starsRef = useRef();
  let starsGeometry = useRef();
  let starsMaterial = useRef();

  useEffect(() => {
    starsGeometry.current = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(parameters.bgStarCount * 3);
    const starsColors = new Float32Array(parameters.bgStarCount * 3);

    for (let j = 0; j < parameters.bgStarCount; j++) {
      starsPositions[j * 3 + 0] = (Math.random() - 0.5) * 100;
      starsPositions[j * 3 + 1] = (Math.random() - 0.5) * 100;
      starsPositions[j * 3 + 2] = (Math.random() - 0.5) * 100;

      const randomColor = new THREE.Color();
      randomColor.r = Math.random() * parameters.bgStarColorMax + parameters.bgStarColorMin;
      randomColor.g = Math.random() * parameters.bgStarColorMax + parameters.bgStarColorMin;
      randomColor.b = Math.random() * parameters.bgStarColorMax + parameters.bgStarColorMin;
      randomColor.toArray(starsColors, j * 3);
    }

    starsGeometry.current.setAttribute("position", new THREE.BufferAttribute(starsPositions, 3));
    starsGeometry.current.setAttribute("color", new THREE.BufferAttribute(starsColors, 3));

    starsMaterial.current = new THREE.PointsMaterial({
      size: parameters.bgStarSize,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      alphaMap: shape,
    });

    starsRef.current = new THREE.Points(
      starsGeometry.current,
      starsMaterial.current
    );
    scene.add(starsRef.current);

    return () => {
      starsGeometry.dispose();
      starsMaterial.dispose();
      scene.remove(starsRef.current);
    };
  }, [shape, scene]);

  return null;
}

export default BackgroundStars;
