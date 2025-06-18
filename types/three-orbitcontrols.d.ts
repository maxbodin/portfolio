declare module 'three/examples/jsm/controls/OrbitControls' {
  import * as THREE from 'three'

  export class OrbitControls {
    enablePan: boolean;
    enableZoom: boolean;
    enableRotate: boolean;
    minDistance: number;
    maxDistance: number;
    zoomSpeed: number;
    panSpeed: number;
    enableDamping: boolean;
    dampingFactor: number;
    touches: {
      ONE: THREE.TOUCH;
      TWO: THREE.TOUCH;
    };
    mouseButtons: {
      LEFT: THREE.MOUSE;
      MIDDLE: THREE.MOUSE;
      RIGHT: THREE.MOUSE;
    };

    constructor(camera: THREE.Camera, domElement: HTMLElement);

    update(): void;
    dispose(): void;
  }
}
