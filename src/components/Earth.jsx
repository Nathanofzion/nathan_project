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
import { useRef, useState, useEffect } from "react";
import { TextureLoader } from "three";
import logo from "../assets/logo.png";

function Earth(props) {
  const ref = useRef();
  const [animationFinished, setAnimationFinished] = useState(false);
  const { startFading } = props;

  const { nodes, materials } = useGLTF("/earth-transformed.glb");

  useFrame((state, delta) => {
    if (!animationFinished) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime / 1.5) / 10;
      ref.current.rotation.y += delta / 15;

      // Check if the animation has finished (adjust the condition as needed)
      if (
        startFading &&
        state.clock.elapsedTime > /* Adjust the duration of the animation */ 5
      ) {
        setAnimationFinished(true);
      }
    } else {
      // If animation has finished, hide the Earth model
      ref.current.visible = false;
    }
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

function ImageMesh({
  imageUrl,
  position,
  size,
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
      ref.current.position.x += delta; // Adjust the speed as needed

      // Optionally, you can remove the text when it's out of view
      if (ref.current.position.y > 5) {
        ref.current.visible = false;
      }
    }
  });

  const texture = new TextureLoader().load(imageUrl);

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
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
      ref.current.rotation.x += delta * 0.01;
      ref.current.rotation.y += delta * 0.1;
      ref.current.rotation.z += delta * 0.1;

      ref.current.position.x += delta;

      if (ref.current.position.y > 5) {
        ref.current.visible = false;
      }
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <Text
        // font={trebuchetBoldFont}
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
  const [startFading, setStartFading] = useState(false);

  const startAnimation = () => {
    setAnimateText(true);

    setTimeout(() => {
      setStartFading(true);
    }, 5000);
  };
  return (
    <div
      style={{
        display: "block",
        width: "100%",
        height: "calc(100vh - 2rem)",
        overflow: "hidden",
      }}
    >
      <button onClick={startAnimation}>Start Animation</button>
      <Canvas camera={{ position: [5, 2, 0], fov: 55 }}>
        <group position={[0, 0.5, 0]}>
          <RoundedBox scale={2.1}>
            <MeshTransmissionMaterial
              backside
              backsideThickness={-1}
              thickness={0.2}
              anisotropicBlur={0.02}
            />
          </RoundedBox>
          <Earth scale={0.7} position={[0, 0, 0]} startFading={startFading} />

          {/* Text on the top */}
          <ImageMesh
            imageUrl={logo} // replace with your image path
            position={[0, 1, 0.2]}
            size={4}
            rotation={[-Math.PI / 2, 0, 0]}
            perspectiveScale={[1, 1, 1]}
            animate={animateText}
          />

          {/* Text on one side */}
          <TextMesh
            text="g"
            position={[0.1, 0.2, 1]}
            size={2}
            color={"#2A2A2C"}
            rotation={[0, 0, 0]}
            perspectiveScale={[1, 1, 1]} // Adjust the scale for perspective
            animate={animateText}
          />

          {/* Text on the other side */}
          <TextMesh
            text="3"
            position={[1, -0.2, 0]}
            size={2}
            color={"#2A2A2C"}
            rotation={[0, -Math.PI / 2, 0]}
            perspectiveScale={[-1, 1, 1]} // Adjust the scale for perspective
            animate={animateText}
          />
        </group>
        <Environment
          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr"
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
    </div>
  );
}
