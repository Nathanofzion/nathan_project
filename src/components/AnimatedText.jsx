import React from "react";
import { useSpring, animated } from "react-spring";
import { Text } from "@react-three/drei";

function AnimatedText({
  text,
  position,
  size,
  color,
  rotation,
  perspectiveScale,
  visible,
}) {
  const props = useSpring({
    opacity: visible ? 1 : 0,
    position: visible ? [0, 1, 0.2] : [0, -10, 0],
  });

  return (
    <animated.group
      position={position}
      rotation={rotation}
      scale={props.position}
    >
      <animated.div style={{ opacity: props.opacity }}>
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
      </animated.div>
    </animated.group>
  );
}

export default AnimatedText;
