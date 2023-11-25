import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  RoundedBox,
  Environment,
  MeshTransmissionMaterial,
  AccumulativeShadows,
  RandomizedLight,
  CameraControls,
  Text,
} from "@react-three/drei";
import { useRef, useState } from "react";

function Earth(props) {
  const ref = useRef();
  const { nodes, materials } = useGLTF("/earth-transformed.glb");
  useFrame((state, delta) => {
    ref.current.position.y = Math.sin(state.clock.elapsedTime / 1.5) / 10;
    ref.current.rotation.y += delta / 15;
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        ref={ref}
        geometry={nodes.Object_4.geometry}
        material={materials["Scene_-_Root"]}
        scale={1.128}
      />
    </group>
  );
}

function TextMesh({
  text,
  position,
  size,
  color,
  rotation,
  perspectiveScale,
  animate,
}) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (animate) {
      ref.current.rotation.x += delta * 0.1; // Adjust the speed as needed
      ref.current.rotation.y += delta * 0.1;
      ref.current.rotation.z += delta * 0.1;

      // Move the text along the Y-axis
      ref.current.position.x += delta * 0.1; // Adjust the speed as needed

      // Optionally, you can remove the text when it's out of view
      if (ref.current.position.y > 5) {
        ref.current.visible = false;
      }
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <Text
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        scale={perspectiveScale}
        depthTest={false}
      >
        {text}
      </Text>
    </group>
  );
}

export default function Viewer() {
  const [animateText, setAnimateText] = useState(false);

  const startAnimation = () => {
    setAnimateText(true);
  };
  return (
    <>
      <button onClick={startAnimation}>Start Animation</button>
      <Canvas shadows camera={{ position: [5, 2, 0], fov: 55 }}>
        <group position={[0, 0.5, 0]}>
          <RoundedBox castShadow scale={2.1}>
            <MeshTransmissionMaterial
              backside
              backsideThickness={-1}
              thickness={0.2}
              anisotropicBlur={0.02}
            />
          </RoundedBox>
          <Earth scale={0.7} position={[0, 0, 0]} />

          {/* Text on the top */}
          <TextMesh
            text="Zi"
            position={[0, 1, 0.2]}
            size={2}
            color={"#111"}
            rotation={[-Math.PI / 2, 0, 0]}
            perspectiveScale={[1, 1, 1]} // Adjust the scale for perspective
            animate={animateText}
          />

          {/* Text on one side */}
          <TextMesh
            text="g"
            position={[0.1, 0.2, 1]}
            size={2}
            color={"#111"}
            rotation={[0, 0, 0]}
            perspectiveScale={[1, 1, 1]} // Adjust the scale for perspective
            animate={animateText}
          />

          {/* Text on the other side */}
          <TextMesh
            text="3"
            position={[1, -0.2, 0]}
            size={2}
            color={"#111"}
            rotation={[0, -Math.PI / 2, 0]}
            perspectiveScale={[-1, 1, 1]} // Adjust the scale for perspective
            animate={animateText}
          />
        </group>
        <Environment
          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
          background
          blur={1}
        />
        <AccumulativeShadows
          color="lightblue"
          position={[0, -1, 0]}
          frames={100}
          opacity={0.75}
        >
          <RandomizedLight radius={10} position={[-5, 5, 2]} />
        </AccumulativeShadows>
        <CameraControls />
      </Canvas>
    </>
  );
}
