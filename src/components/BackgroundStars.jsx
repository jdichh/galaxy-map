import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function BackgroundStars({ parameters, shape }) {
  const { scene } = useThree();
  const starsRef = useRef();
  const starsGeometryRef = useRef();
  const starsMaterialRef = useRef();

  useEffect(() => {
    starsGeometryRef.current = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(parameters.bgStarCount * 3);
    const starsColors = new Float32Array(parameters.bgStarCount * 3);

    for (let j = 0; j < parameters.bgStarCount; j++) {
      starsPositions[j * 3 + 0] = (Math.random() - 0.5) * 100;
      starsPositions[j * 3 + 1] = (Math.random() - 0.5) * 100;
      starsPositions[j * 3 + 2] = (Math.random() - 0.5) * 100;

      const randomColor = new THREE.Color();
      randomColor.r =
        Math.random() * parameters.bgStarColorMax + parameters.bgStarColorMin;
      randomColor.g =
        Math.random() * parameters.bgStarColorMax + parameters.bgStarColorMin;
      randomColor.b =
        Math.random() * parameters.bgStarColorMax + parameters.bgStarColorMin;
      randomColor.toArray(starsColors, j * 3);
    }

    starsGeometryRef.current.setAttribute(
      "position",
      new THREE.BufferAttribute(starsPositions, 3)
    );
    starsGeometryRef.current.setAttribute(
      "color",
      new THREE.BufferAttribute(starsColors, 3)
    );

    starsMaterialRef.current = new THREE.PointsMaterial({
      size: parameters.bgStarSize,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      alphaMap: shape,
    });

    starsRef.current = new THREE.Points(
      starsGeometryRef.current,
      starsMaterialRef.current
    );
    scene.add(starsRef.current);

    return () => {
      starsGeometryRef.dispose();
      starsMaterialRef.dispose();
      scene.remove(starsRef.current);
    };
  }, [shape, scene]);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0001;
      starsRef.current.rotation.y += 0.00025;
    }
  });

  return null;
}

export default BackgroundStars;
