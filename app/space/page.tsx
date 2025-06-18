"use client";

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { createWorkObject } from './Work'
import { createOrbitControls } from './CameraAndControls'
import { WorkDetails } from '@/interfaces/workDetails'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

// Import data
import { projectsItems } from '@/data/projects'
import { formationsCertificationsItems } from '@/data/formCertif'
import { experiencesItems } from '@/data/experiences'
import { eventsItems } from '@/data/events'
import { troisDItems } from '@/data/troisD'

// Filter out any items that have no image_path.
// This prevents the "Error loading image" for items with empty paths.
const worksWithImages = [
  ...projectsItems, ...formationsCertificationsItems, ...experiencesItems, ...eventsItems, ...troisDItems
].filter(work => work.image_path && work.image_path.trim() !== '');

const WorkGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedWork, setSelectedWork] = useState<WorkDetails | null>(null);

  useEffect(() => {
    if (!containerRef.current || isInitialized.current) return;
    isInitialized.current = true;

    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('rgb(233, 233, 233)');
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const controls = createOrbitControls({ camera, domElement: renderer.domElement });

    // This algorithm ensures objects are spaced out to prevent overlapping.
    const workPositions: THREE.Vector3[] = [];
    const minDistance = 4.0;                              // Minimum distance between the centers of two objects.
    const placementArea = { x: 15, y: 10, z: 15 };        // The size of the random volume.
    const maxAttempts = 50;                               // Max tries to find a valid spot for an object.

    for (let i = 0; i < worksWithImages.length; i++) {
      let positionIsValid = false;
      let attempts = 0;
      let candidatePos = new THREE.Vector3();

      while (!positionIsValid && attempts < maxAttempts) {
        attempts++;
        candidatePos.set(
           THREE.MathUtils.randFloatSpread(placementArea.x),
           THREE.MathUtils.randFloatSpread(placementArea.y),
           THREE.MathUtils.randFloatSpread(placementArea.z)
        );

        // Check distance to all previously placed objects.
        let isTooClose = false;
        for (const existingPos of workPositions) {
          if (candidatePos.distanceTo(existingPos) < minDistance) {
            isTooClose = true;
            break;
          }
        }

        if (!isTooClose) {
          positionIsValid = true;
        }
      }

      // Add the position (even if it failed to find a perfect spot after max attempts).
      workPositions.push(candidatePos);
    }

    // Create objects using the filtered list and calculated positions.
    const workMeshes: THREE.Mesh[] = [];
    const meshPromises = worksWithImages.map((work, index) => {
      const position = workPositions[index];
      return createWorkObject({
        position: [position.x, position.y, position.z],
        details: work,
        onClick: (details) => {
          setSelectedWork(details);
          setIsModalOpen(true);
        },
      });
    });

    Promise.all(meshPromises)
       .then((createdMeshes) => {
         workMeshes.push(...createdMeshes);
         createdMeshes.forEach((mesh) => scene.add(mesh));
       })
       .catch(console.error);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onCanvasClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(workMeshes);

      if (intersects.length > 0) {
        intersects[0].object.userData.onClick?.();
      }
    };
    renderer.domElement.addEventListener('click', onCanvasClick);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    //  Handle Window Resizing.
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount.
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', onCanvasClick);
      controls.dispose();

      workMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.userData.texture?.dispose();

        if (mesh.userData.videoElement) {
          const videoEl = mesh.userData.videoElement as HTMLVideoElement;
          videoEl.pause();
          videoEl.removeAttribute('src');
          videoEl.load();
          if (videoEl.parentElement === document.body) {
            document.body.removeChild(videoEl);
          }
        }

        if (mesh.material instanceof THREE.Material) {
          mesh.material.dispose();
        }
      });

      scene.clear();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      isInitialized.current = false;
    };
  }, []);

  return (
     <>
       <div ref={containerRef} className="w-screen h-screen cursor-grab active:cursor-grabbing" />
       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
         <DialogContent className="sm:max-w-[625px]">
           {selectedWork && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedWork.title}</DialogTitle>
                  <DialogDescription className="pt-2">{selectedWork.description}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  {selectedWork.image_path.endsWith('.mp4') || selectedWork.image_path.endsWith('.webm') ? (
                     <video src={selectedWork.image_path} controls autoPlay loop muted playsInline className="w-full rounded-md" />
                  ) : (
                     <img src={selectedWork.image_path} alt={selectedWork.title} className="w-full rounded-md" />
                  )}
                </div>
              </>
           )}
         </DialogContent>
       </Dialog>
     </>
  );
};

export default WorkGallery;