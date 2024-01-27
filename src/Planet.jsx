import { useFrame, useLoader } from "@react-three/fiber";
import { Line, Ring, Sphere } from "@react-three/drei";
import { MathUtils, TextureLoader } from "three";
import React, { useRef } from "react";
import { Vector3, BufferGeometry } from "three";

const Path = ({ radius }) => {
  const segments = 64;
  const linePositions = [];

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = radius * Math.cos(theta);
    const z = radius * Math.sin(theta);

    linePositions.push([x, 0, z]);
  }

  return <Line points={linePositions} color="white" dashed={true} />;
};


const Planet = ({
  distance,
  radius,
  texture,
  rotationSpeed,
  angularVelocity,
}) => {
  const planet = useRef();
  const ring = useRef();
  let angle = 0;
  let angleInRadians;
  let newPositionX;
  let newPositionZ;

  const randomAngle = Math.random() * 2 * Math.PI;
  const initialPositionX = distance * Math.sin(randomAngle);
  const initialPositionZ = distance * Math.cos(randomAngle);
  const colorMap = useLoader(TextureLoader, texture);
  useFrame(() => {
    angle += angularVelocity / 5;
    angleInRadians = angle * (Math.PI / 180);
    newPositionX =
      initialPositionX * Math.cos(angleInRadians) +
      initialPositionZ * Math.sin(angleInRadians);
    newPositionZ =
      initialPositionX * -Math.sin(angleInRadians) +
      initialPositionZ * Math.cos(angleInRadians);
    planet.current.position.x = newPositionX;
    planet.current.position.z = newPositionZ;
    planet.current.rotation.y += rotationSpeed / 20;
  });
  return (
    <>
      <Sphere
        ref={planet}
        position={[initialPositionX, 0, initialPositionZ]}
        args={[2 * radius]}
      >
        <meshStandardMaterial map={colorMap} />
        
      </Sphere>
      <Path radius={distance} />
    </>
  );
};

export default Planet;
