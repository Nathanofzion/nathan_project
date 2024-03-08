// import React, { Suspense, useEffect, useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

// const Cube = () => {
//   const cube = useGLTF("/cube2.glb");

//   return (
//     <mesh>
//       <ambientLight intensity={0.5} />
//       <hemisphereLight intensity={0.5} groundColor="black" />
//       <spotLight position={[-20, 50, 10]} intensity={10} />
//       <pointLight intensity={1} />
//       <primitive
//         object={cube.scene}
//         scale={1}
//         camera={{
//           fov: 55,
//           position: [-4, 3, 6],
//         }}
//       />
//     </mesh>
//   );
// };

// const CubeCanvas = () => {
//   return (
//     <Canvas
//       frameloop="demand"
//       gl={{ preserveDrawingBuffer: true }}
//       camera={{ fov: 55, position: [3, 3, 3] }}
//     >
//       <Suspense>
//         <OrbitControls />
//         <Cube />
//       </Suspense>

//       <Preload all />
//     </Canvas>
//   );
// };

// export default CubeCanvas;

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  RoundedBox,
  Environment,
  MeshTransmissionMaterial,
} from "@react-three/drei";

const Cube = () => {
  const cube = useGLTF("/zig3-logo-new.glb");

  return (
    <mesh>
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={1} groundColor="black" />
      <spotLight position={[-20, 50, 10]} intensity={10} />
      <pointLight intensity={1} />
      <primitive
        object={cube.scene}
        scale={1}
        camera={{
          fov: 55,
          position: [-4, 3, 6],
        }}
      />
      {/* <mesh>
        <MeshTransmissionMaterial
          transmission={1}
          opacity={0.5}
          thickness={0.01}
          transparent={true}
        />
      </mesh> */}
    </mesh>
  );
};

const CubeCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: 55, position: [3, 3, 3] }}
      // environment={{
      //   background: false, // Disable global background
      //   files: "/kloofendal_48d_partly_cloudy_puresky_4k.hdr",
      //   intensity: 1, // Adjust the intensity as needed
      // }}
    >
      <Suspense>
        <OrbitControls />
        <Cube />
        {/* <RoundedBox scale={2.1}>
          <MeshTransmissionMaterial
            transmission={1}
            opacity={0.5}
            thickness={0.1}
            transparent={true}
          />
        </RoundedBox> */}
        {/* <Environment files="/kloofendal_48d_partly_cloudy_puresky_4k.hdr" /> */}
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default CubeCanvas;
