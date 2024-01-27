import { Suspense, useState, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  FirstPersonControls,
  OrbitControls,
  PerspectiveCamera,
  Sphere,
  useProgress,
} from "@react-three/drei";
import "./App.css";
import { TextureLoader } from "three";
import sunTexture from "./assets/sun.jpeg";
import mercuryTexture from "./assets/mercury.jpeg";
import venusTexture from "./assets/venus.jpeg";
import earthTexture from "./assets/earth.jpeg";
import marsTexture from "./assets/mars.jpeg";
import jupiterTexture from "./assets/jupiter.jpeg";
import saturnTexture from "./assets/saturn.jpeg";
import uranusTexture from "./assets/uranus.jpeg";
import neptuneTexture from "./assets/neptune.jpeg";

import Planet from "./Planet";

const Sun = () => {
  const colorMap = useLoader(TextureLoader, sunTexture);
  const sun = useRef();

  useFrame(() => {
    sun.current.rotation.y += 0.005;
  });
  return (
    <Sphere args={[2.5]} ref={sun}>
      <meshStandardMaterial map={colorMap} />
    </Sphere>
  );
};

function App() {
  const planets = [
    {
      key: 1,
      distance: 7.8,
      radius: 0.383,
      texture: mercuryTexture,
      rotationSpeed: 0.0171,
      angularVelocity: 0.241,
    },
    {
      key: 2,
      distance: 14.4,
      radius: 0.949,
      texture: venusTexture,
      rotationSpeed: -0.516,
      angularVelocity: 0.615,
    },
    {
      key: 3,
      distance: 20,
      radius: 1,
      texture: earthTexture,
      rotationSpeed: 1,
      angularVelocity: 1,
    },
    {
      key: 4,
      distance: 30.4,
      radius: 0.532,
      texture: marsTexture,
      rotationSpeed: 0.971,
      angularVelocity: 0.531,
    },
    {
      key: 5,
      distance: 104,
      radius: 11.21,
      texture: jupiterTexture,
      rotationSpeed: 2.44,
      angularVelocity: 0.285,
    },
    {
      key: 6,
      distance: 191.6,
      radius: 9.45,
      texture: saturnTexture,
      rotationSpeed: 2.33,
      angularVelocity: 0.156,
    },
    {
      key: 7,
      distance: 384.4,
      radius: 4.01,
      texture: uranusTexture,
      rotationSpeed: -1.39,
      angularVelocity: 0.081,
    },
    {
      key: 8,
      distance: 601,
      radius: 3.88,
      texture: neptuneTexture,
      rotationSpeed: 1.49,
      angularVelocity: 0.036,
    },
  ];

  return (
    <>
      <Canvas camera={{ position: [0, 10, 10], near: 0.1, far: 1500 }}>
        <color args={["#000000"]} attach="background" />

        <Suspense fallback={null}>
          <Sun />
          {planets.map((planet) => (
            <Planet
              key={planet.key}
              distance={planet.distance}
              radius={planet.radius}
              texture={planet.texture}
              rotationSpeed={planet.rotationSpeed}
              angularVelocity={planet.angularVelocity}
            />
          ))}

          <ambientLight position={[3, 2, 0]} intensity="3" />
          <OrbitControls enableDamping={true} />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
