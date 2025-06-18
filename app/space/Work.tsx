'use client'
import * as THREE from 'three'
import { WorkDetails } from '@/interfaces/workDetails'

type CreateWorkObjectParams = {
  position: [number, number, number];
  details: WorkDetails;
  onClick: (details: WorkDetails) => void;
};

/**
 * Creates a new THREE.Mesh for a work item.
 * This is a factory function, not a React component.
 */
export function createWorkObject({ position, details, onClick }: CreateWorkObjectParams): THREE.Mesh {
  const textureLoader = new THREE.TextureLoader();
  // Use 'image_path' from the new unified WorkDetails type
  const texture = textureLoader.load(details.image_path)

  const geometry = new THREE.BoxGeometry(1.5, 1, 0.05);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);

  // Store the callback and details in userData to be accessed by the raycaster.
  mesh.userData = {
    onClick: () => onClick(details),
    details: details
  };

  return mesh;
}