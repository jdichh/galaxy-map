import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function interpolateColor(color1, color2, factor) {
    const r = color1.r + (color2.r - color1.r) * factor;
    const g = color1.g + (color2.g - color1.g) * factor;
    const b = color1.b + (color2.b - color1.b) * factor;
  
    return new THREE.Color(r, g, b);
}

function Galaxy({ parameters, shape }) {
  const { scene } = useThree();
  const galaxyRef = useRef();
  const galaxyGeometryRef = useRef();
  const galaxyMaterialRef = useRef();

  useEffect(() => {
    galaxyGeometryRef.current = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.galaxyStarCount * 3);
    const colors = new Float32Array(parameters.galaxyStarCount * 3);

    const color1 = new THREE.Color('#585858');
    const color2 = new THREE.Color('#170030');

    for (let i = 0; i < parameters.galaxyStarCount; i++) {
      const x = Math.random() * parameters.galaxyRadius;
      const branchAngle =
        ((i % parameters.galaxyBranches) / parameters.galaxyBranches) *
        2 *
        Math.PI;
      const spinAngle = x * parameters.galaxyRandomnessPattern;

      const randomX =
        Math.pow(Math.random(), parameters.galaxyRandomnessMultiplier) *
        (Math.random() < 0.5 ? 1 : -1);
      const randomY =
        Math.pow(Math.random(), parameters.galaxyRandomnessMultiplier) *
        (Math.random() < 0.5 ? 1 : -1);
      const randomZ =
        Math.pow(Math.random(), parameters.galaxyRandomnessMultiplier) *
        (Math.random() < 0.5 ? 1 : -1);

      positions[i * 3] = Math.sin(branchAngle + spinAngle) * x + randomX;
      positions[i * 3 + 1] = randomY;
      positions[i * 3 + 2] = Math.cos(branchAngle + spinAngle) * x + randomZ;

      const factor = Math.pow((positions[i * 3] / parameters.galaxyRadius + 1) / 2, 0.5);
      const mixedColor = interpolateColor(color1, color2, factor);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    galaxyGeometryRef.current.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    galaxyGeometryRef.current.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    galaxyMaterialRef.current = new THREE.PointsMaterial({
      size: parameters.bgStarSize,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      transparent: true,
      alphaMap: shape,
    });

    galaxyRef.current = new THREE.Points(
      galaxyGeometryRef.current,
      galaxyMaterialRef.current
    );
    scene.add(galaxyRef.current);

    return () => {
      galaxyGeometryRef.current.dispose();
      galaxyMaterialRef.current.dispose();
      scene.remove(galaxyRef.current);
    };
  }, [parameters, shape, scene]);

  useFrame(() => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y -= 0.00025;
    }
  });

  return null;
}

export default Galaxy;
