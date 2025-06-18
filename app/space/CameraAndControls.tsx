import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type CreateControlsParams = {
   camera: THREE.PerspectiveCamera;
   domElement: HTMLElement;
   minDistance?: number;
   maxDistance?: number;
};

/**
 * Creates and configures OrbitControls.
 */
export function createOrbitControls({
                                       camera,
                                       domElement,
                                       minDistance = 1,
                                       maxDistance = 10,
                                    }: CreateControlsParams): OrbitControls {
   const controls = new OrbitControls(camera, domElement);
   controls.enablePan = true;
   controls.enableZoom = true;
   controls.enableRotate = false;
   controls.minDistance = minDistance;
   controls.maxDistance = maxDistance;
   controls.zoomSpeed = 0.5;
   controls.panSpeed = 1;
   controls.enableDamping = true;
   controls.dampingFactor = 0.1;

   return controls;
}