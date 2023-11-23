import * as THREE from "three";
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
import { useRef } from "react";

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

function TextMesh({ text, position, size, color, rotation, perspectiveScale }) {
  return (
    <group position={position} rotation={rotation}>
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
  return (
    <Canvas
      shadows
      camera={{ position: [5, 2, 0], fov: 55 }}
      background={null}
      alpha={0.1}
    >
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
          thickness={200}
        />

        {/* Text on one side */}
        <TextMesh
          text="g"
          position={[0.1, 0.2, 1]}
          size={2}
          color={"#111"}
          rotation={[0, 0, 0]}
          perspectiveScale={[1, 1, 1]} // Adjust the scale for perspective
          thickness={200}
        />

        {/* Text on the other side */}
        <TextMesh
          text="3"
          position={[1, -0.2, 0]}
          size={2}
          color={"#111"}
          rotation={[0, -Math.PI / 2, 0]}
          perspectiveScale={[-1, 1, 1]} // Adjust the scale for perspective
          thickness={200}
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
  );
}
// import React, { useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { useGLTF, Environment, Text } from "@react-three/drei";
// import { useSpring, animated } from "react-spring";
// import AnimatedText from "../components/AnimatedText";

// function Earth({ visible }) {
//   const { nodes, materials } = useGLTF("/earth-transformed.glb");

//   return (
//     <animated.group visible={visible} dispose={null}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.Object_4.geometry}
//         material={materials["Scene_-_Root"]}
//         scale={1.128}
//       />
//     </animated.group>
//   );
// }

// export default function Viewer() {
//   const [animationActive, setAnimationActive] = useState(true);

//   const handleButtonClick = () => {
//     setAnimationActive(!animationActive);
//   };

//   return (
//     <div>
//       <button onClick={handleButtonClick}>Toggle Animation</button>
//       <Canvas
//         shadows
//         camera={{ position: [5, 2, 0], fov: 55 }}
//         background={null}
//         alpha={0.1}
//       >
//         <group position={[0, 0.5, 0]}>
//           <Earth visible={animationActive} />
//           <AnimatedText
//             text="Zi"
//             position={[0, 1, 0.2]}
//             size={2}
//             color="#111"
//             rotation={[-Math.PI / 2, 0, 0]}
//             perspectiveScale={[1, 1, 1]}
//             visible={animationActive}
//           />
//         </group>
//         <Environment
//           files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
//           background
//           blur={1}
//         />
//       </Canvas>
//     </div>
//   );
// }
