import React, { Suspense } from 'react'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import CanvasLoader from '../Loader'

const Earth = () => {

  const earth = useGLTF('./inc4.gltf')

  return (
    
    <mesh>
      <hemisphereLight 
        intensity={2.5}
        color="white"
        groundColor="black"
      />
      <spotLight 
        position={[0, 60, 10]}
        angle={0.3}
        penumbra={0.5}
        intensity={3000} 
        castShadow
        shadow-mapSize={2048}
        shadow-bias={-0.0001}
      />
      <pointLight 
        position={[0, -40, 0]} 
        intensity={1200} 
        color="white" 
        castShadow
      />
      <primitive 
        object={earth.scene} 
        scale={1.6} 
        position={[0, 0.1, 0]} 
        rotation-x={Math.PI / 4} 
        rotation-y={1} 
        rotation-z={0.4}
      >
        <meshStandardMaterial 
          emissive="white" 
          emissiveIntensity={1.5} 
          color="blue"
        />
      </primitive>
      <EffectComposer>
        <Bloom 
          intensity={1.2}
          luminanceThreshold={0.8}
          luminanceSmoothing={1.2}
        />
      </EffectComposer>
    </mesh>
    
  )
}

const IncCanvas = () => {

  return (
    <Canvas
    shadows
    frameloop='demand'
    gl={{preserveDrawingBuffer: true}}
    camera={{
      fov: 45, 
      near: 0.1, 
      far: 200, 
      position: [-4, 3, 6]
    }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
        autoRotate={true}
        enableZoom={false}
        maxPolarAngle={Math.PI/2}
        minPolarAngle={Math.PI/2}
        />
        <Earth isMobile={''}/>
      </Suspense>
    </Canvas>
  )
}

export default IncCanvas