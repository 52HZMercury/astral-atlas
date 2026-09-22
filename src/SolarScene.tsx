import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Component,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { planets } from "./data";

function Controls({ reset }: { reset: number }) {
  const { camera, gl, invalidate } = useThree();
  useEffect(() => {
    camera.position.set(0, 10.8, 13.5);
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = 0.15;
    controls.maxPolarAngle = Math.PI / 2.1;
    const redraw = () => invalidate();
    controls.addEventListener("change", redraw);
    controls.update();
    invalidate();
    return () => {
      controls.removeEventListener("change", redraw);
      controls.dispose();
    };
  }, [camera, gl, invalidate, reset]);
  return null;
}
function Scene({
  selected,
  onSelect,
  running,
}: {
  selected: number;
  onSelect: (i: number) => void;
  running: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const starPositions = useMemo(() => {
    const points = new Float32Array(750);
    for (let i = 0; i < points.length; i++) {
      const seed = Math.sin(i * 127.1 + 43.7) * 43758.5453;
      points[i] = (seed - Math.floor(seed) - 0.5) * 50;
    }
    return points;
  }, []);
  useFrame((_, delta) => {
    if (group.current && running)
      group.current.rotation.y += Math.min(delta, 0.04) * 0.025;
  });
  return (
    <>
      <ambientLight intensity={1.4} />
      <pointLight position={[0, 2, 0]} intensity={65} decay={1.2} />
      <directionalLight position={[-5, 8, 5]} intensity={2} />
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#b0bbc9"
          size={0.023}
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>
      <group ref={group} rotation={[0, -0.3, -0.12]}>
        <mesh>
          <sphereGeometry args={[0.52, 40, 32]} />
          <meshBasicMaterial color="#f1b66b" />
        </mesh>
        {planets.map((p, i) => {
          const radius = 1.1 + i * 0.73,
            angle = i * 2.38 + 0.4;
          const size = [0.085, 0.13, 0.15, 0.105, 0.33, 0.29, 0.21, 0.2][i];
          return (
            <group key={p.en}>
              <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[radius - 0.012, radius + 0.012, 180]} />
                <meshBasicMaterial
                  color={selected === i ? "#ad7051" : "#43576b"}
                  transparent
                  opacity={selected === i ? 0.9 : 0.75}
                  side={THREE.DoubleSide}
                />
              </mesh>
              <group
                position={[
                  Math.cos(angle) * radius,
                  0,
                  Math.sin(angle) * radius,
                ]}
              >
                <mesh
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(i);
                  }}
                >
                  <sphereGeometry args={[size, 32, 24]} />
                  <meshStandardMaterial color={p.color} roughness={0.9} />
                </mesh>
                {i === 5 && (
                  <mesh rotation={[Math.PI / 2.6, 0, 0.2]}>
                    <ringGeometry args={[size * 1.4, size * 2.15, 80]} />
                    <meshStandardMaterial
                      color="#b6a07c"
                      side={THREE.DoubleSide}
                      transparent
                      opacity={0.65}
                    />
                  </mesh>
                )}
                {selected === i && (
                  <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[size + 0.13, size + 0.15, 64]} />
                    <meshBasicMaterial
                      color="#e06236"
                      side={THREE.DoubleSide}
                    />
                  </mesh>
                )}
              </group>
            </group>
          );
        })}
      </group>
    </>
  );
}
function FlatSolar({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flat-solar">
      <div className="flat-sun" />
      {planets.map((p, i) => (
        <div
          key={p.en}
          className="flat-orbit"
          style={{ width: `${19 + i * 10}%`, height: `${19 + i * 10}%` }}
        >
          <button
            aria-label={`选择${p.name}`}
            aria-pressed={selected === i}
            onClick={() => onSelect(i)}
            style={{
              background: p.color,
              top: `${50 + Math.sin(i * 2.38) * 50}%`,
              left: `${50 + Math.cos(i * 2.38) * 50}%`,
            }}
          />
        </div>
      ))}
      <span className="flat-note">二维轨道示意 · 可使用下方控件选择天体</span>
    </div>
  );
}
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
export default function SolarScene({
  selected,
  onSelect,
  reset,
  running,
  onFallback,
}: {
  selected: number;
  onSelect: (i: number) => void;
  reset: number;
  running: boolean;
  onFallback: (fallback: boolean) => void;
}) {
  const [available, setAvailable] = useState(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2");
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  });
  useEffect(() => onFallback(!available), [available, onFallback]);
  const fallback = <FlatSolar selected={selected} onSelect={onSelect} />;
  if (!available) return fallback;
  return (
    <SceneBoundary fallback={fallback} onFailure={() => setAvailable(false)}>
      <Canvas
        frameloop={running ? "always" : "demand"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 10.8, 13.5], fov: 44 }}
        fallback={fallback}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            () => setAvailable(false),
            { once: true },
          );
        }}
      >
        <Controls reset={reset} />
        <Scene selected={selected} onSelect={onSelect} running={running} />
      </Canvas>
    </SceneBoundary>
  );
}
