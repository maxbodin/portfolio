"use client";

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createWorkObject } from './Work'
import { createOrbitControls } from './CameraAndControls'
import { WorkDetails } from '@/interfaces/workDetails'

const works: WorkDetails[] = [
  {
    image_path: '/path/to/image1.jpg',
    title: 'Work 1',
    description: 'Description of Work 1',
    date: '2025-06-18',
    skills: []
  },
  {
    image_path: '/path/to/image2.jpg',
    title: 'Work 2',
    description: 'Description of Work 2',
    date: '2025-06-18',
    skills: []
  },
  {
    image_path: '/path/to/image3.jpg',
    title: 'Work 3',
    description: 'Description of Work 3',
    date: '2025-06-18',
    skills: []
  },
];

const WorkGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, and Renderer Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 2. Controls
    const controls = createOrbitControls({ camera, domElement: renderer.domElement });

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // 4. Create and Add Work Objects
    const workMeshes = works.map((work, index) => {
      // Center the works horizontally
      const xPos = index * 2 - (works.length - 1);
      const position: [number, number, number] = [xPos, 0, 0];
      const workObject = createWorkObject({
        position,
        details: work,
        onClick: (details) => {
          console.log('Clicked on:', details.title);
        },
      });
      scene.add(workObject);
      return workObject;
    });

    // 5. Click Handling with Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onCanvasClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(workMeshes);

      if (intersects.length > 0) {
        // Trigger the onClick function stored in the intersected object's userData
        intersects[0].object.userData.onClick?.();
      }
    };
    renderer.domElement.addEventListener('click', onCanvasClick);

    // 6. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update(); // Necessary for OrbitControls damping
      renderer.render(scene, camera);
    };
    animate();

    // 7. Handle Window Resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 8. Cleanup on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', onCanvasClick);

      controls.dispose();

      workMeshes.forEach(mesh => {
        mesh.geometry.dispose();
        if (mesh.material instanceof THREE.Material) {
          mesh.material?.dispose();
          mesh.material.dispose();
        }
      });

      scene.clear();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-screen h-screen bg-primary" />;
};

export default WorkGallery;