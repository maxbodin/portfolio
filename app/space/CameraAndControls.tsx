import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type CreateControlsParams = {
   camera: THREE.PerspectiveCamera;
   domElement: HTMLElement;
   minDistance?: number;
   maxDistance?: number;
};

/**
 * Creates and configures OrbitControls for intuitive panning.
 */
export function createOrbitControls({
                                       camera,
                                       domElement,
                                       minDistance = 1,
                                       maxDistance = 40,
                                    }: CreateControlsParams): OrbitControls {
   const controls = new OrbitControls(camera, domElement)

   // -- Mouse Controls for "Grabbing" --
   controls.mouseButtons.LEFT = THREE.MOUSE.PAN   // Left-click to pan/drag
   controls.mouseButtons.MIDDLE = THREE.MOUSE.DOLLY // Middle-click/scroll wheel to zoom
   controls.mouseButtons.RIGHT = THREE.MOUSE.PAN  // Right-click also pans

   // -- Touch Controls --
   controls.touches.ONE = THREE.TOUCH.PAN
   controls.touches.TWO = THREE.TOUCH.DOLLY_PAN

   // -- General Settings --
   controls.enablePan = true
   controls.enableZoom = true
   controls.enableRotate = false // Rotation is disabled
   controls.screenSpacePanning = true

   // -- Physics & Feel --
   controls.minDistance = minDistance
   controls.maxDistance = maxDistance
   controls.zoomSpeed = 1.5
   controls.panSpeed = 1
   controls.enableDamping = true
   controls.dampingFactor = 0.05

   return controls
}