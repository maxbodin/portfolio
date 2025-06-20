'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { createWorkObject } from './Work'
import { createOrbitControls } from './CameraAndControls'
import { WorkDetails } from '@/interfaces/workDetails'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CategorySlider } from '@/components/custom/categorySlider'

// Import data
import { projectsItems } from '@/data/projects'
import { formationsCertificationsItems } from '@/data/formCertif'
import { experiencesItems } from '@/data/experiences'
import { eventsItems } from '@/data/events'
import { troisDItems } from '@/data/troisD'

const categories = ['All', 'Projects', 'Formations', 'Experiences', 'Events', '3D']

// Filter out any items that have no image_path.
// This prevents the "Error loading image" for items with empty paths.
// Sort items by categories.
const allWorks: (WorkDetails & { category: string })[] = [
   ...projectsItems.map(item => ({ ...item, category: 'Projects' })),
   ...formationsCertificationsItems.map(item => ({ ...item, category: 'Formations' })),
   ...experiencesItems.map(item => ({ ...item, category: 'Experiences' })),
   ...eventsItems.map(item => ({ ...item, category: 'Events' })),
   ...troisDItems.map(item => ({ ...item, category: '3D' })),
].filter(work => work.image_path && work.image_path.trim() !== '')

const WorkGallery: React.FC = () => {
   const containerRef = useRef<HTMLDivElement>(null)
   const isInitialized = useRef(false)
   const workMeshesRef = useRef<THREE.Mesh[]>([])

   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const [selectedWork, setSelectedWork] = useState<WorkDetails | null>(null)
   const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0)

   // GSAP animation effect for filtering.
   useEffect(() => {
      const selectedCategory = categories[activeCategoryIndex]
      const meshes = workMeshesRef.current

      const activeColor = new THREE.Color(0xffffff)
      const inactiveColor = new THREE.Color(0x666666)

      meshes.forEach(mesh => {
         const workCategory = mesh.userData.details.category
         const isActive = (selectedCategory === 'All' || workCategory === selectedCategory)

         // Animate scale.
         gsap.to(mesh.scale, {
            x: isActive ? 1 : 0.2,
            y: isActive ? 1 : 0.2,
            z: isActive ? 1 : 0.2,
            duration: 0.5,
            ease: 'power3.out',
         })

         // Animate color.
         gsap.to((mesh.material as THREE.MeshBasicMaterial).color, {
            r: isActive ? activeColor.r : inactiveColor.r,
            g: isActive ? activeColor.g : inactiveColor.g,
            b: isActive ? activeColor.b : inactiveColor.b,
            duration: 0.5,
            ease: 'power3.out',
         })
      })
   }, [activeCategoryIndex])

   useEffect(() => {
      if (!containerRef.current || isInitialized.current) return
      isInitialized.current = true
      const container = containerRef.current

      const scene = new THREE.Scene()
      scene.background = new THREE.Color('rgb(233, 233, 233)')
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 32

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      container.appendChild(renderer.domElement)

      const controls = createOrbitControls({ camera, domElement: renderer.domElement })

      // This algorithm ensures objects are spaced out to prevent overlapping.
      const workPositions: THREE.Vector3[] = []
      const minDistance = 5.0                        // Minimum distance between the centers of two objects.
      const placementArea = { x: 35, y: 30, z: 25 }  // The size of the random volume.

      for (let i = 0; i < allWorks.length; i++) {
         let candidatePos = new THREE.Vector3()

         for (let j = 0; j < 50; j++) {
            candidatePos.set(
               THREE.MathUtils.randFloatSpread(placementArea.x),
               THREE.MathUtils.randFloatSpread(placementArea.y),
               THREE.MathUtils.randFloatSpread(placementArea.z))
            if (!workPositions.some(p => p.distanceTo(candidatePos) < minDistance)) {
               break
            }
         }

         workPositions.push(candidatePos)
      }

     // Create objects using the filtered list and calculated positions.
      const meshPromises = allWorks.map((work, index) => {
         const position = workPositions[index]
         return createWorkObject({
            position: [position.x, position.y, position.z],
            details: work,
            onClick: (details) => {
               setSelectedWork(details)
               setIsModalOpen(true)
            },
         })
      })

      Promise.all(meshPromises)
         .then((createdMeshes) => {
            workMeshesRef.current = createdMeshes

            // Initial entrance animation.
            createdMeshes.forEach(mesh => {
               mesh.scale.set(0, 0, 0) // Start at scale 0.
               scene.add(mesh)
            })

            gsap.to(createdMeshes.map(m => m.scale), {
               x: 1, y: 1, z: 1,
               duration: 0.8,
               stagger: 0.03,
               ease: 'power3.out',
               delay: 0.2,
            })
         })
         .catch(console.error)

      const raycaster = new THREE.Raycaster()
      const mouse = new THREE.Vector2()
      const onCanvasClick = (event: MouseEvent) => {
         const rect = renderer.domElement.getBoundingClientRect()
         mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
         mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
         raycaster.setFromCamera(mouse, camera)
         const intersects = raycaster.intersectObjects(workMeshesRef.current)

         if (intersects.length > 0 && intersects[0].object instanceof THREE.Mesh) {
            // Click only if the object is full size, not allowing clicking on object not in selected category.
            if (intersects[0].object.scale.x > 0.5) {
               intersects[0].object.userData.onClick?.()
            }
         }
      }
      renderer.domElement.addEventListener('click', onCanvasClick)

      let animationFrameId: number
      const animate = () => {
         animationFrameId = requestAnimationFrame(animate)
         controls.update()
         renderer.render(scene, camera)
      }
      animate()

     //  Handle Window Resizing.
      const handleResize = () => {
         camera.aspect = window.innerWidth / window.innerHeight
         camera.updateProjectionMatrix()
         renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', handleResize)

     // Cleanup on component unmount.
      return () => {
         cancelAnimationFrame(animationFrameId)
         window.removeEventListener('resize', handleResize)
         renderer.domElement.removeEventListener('click', onCanvasClick)
         controls.dispose()

         workMeshesRef.current.forEach((mesh) => {
            // Kill any active GSAP animations on this mesh.
            gsap.killTweensOf(mesh.scale)
            if (mesh.material) gsap.killTweensOf((mesh.material as THREE.MeshBasicMaterial).color)

            mesh.geometry.dispose()
            mesh.userData.texture?.dispose()
            if (mesh.userData.videoElement) {
               const v = mesh.userData.videoElement as HTMLVideoElement
               v.pause()
               v.removeAttribute('src')
               v.load()
               if (v.parentElement) v.parentElement.removeChild(v)
            }
            if (mesh.userData.gifImageElement) {
               const i = mesh.userData.gifImageElement as HTMLImageElement
               if (i.parentElement) i.parentElement.removeChild(i)
            }
            if (mesh.userData.gifIntervalId) {
               clearInterval(mesh.userData.gifIntervalId)
            }
            if (mesh.material instanceof THREE.Material) mesh.material.dispose()
         })

         workMeshesRef.current = []

        scene.clear();
        renderer.dispose();
         if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
         isInitialized.current = false
      }
   }, [])

   return (
      <div className="relative w-screen h-screen">
         <div ref={containerRef} className="absolute top-0 left-0 w-full h-full cursor-grab active:cursor-grabbing" />
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg lg:max-w-2xl px-8 z-10">
            <CategorySlider
               labels={categories}
               value={[activeCategoryIndex]}
               onValueChange={(value) => setActiveCategoryIndex(value[0])}
               max={categories.length - 1}
               step={1}
            />
         </div>

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
                           <video src={selectedWork.image_path} controls autoPlay loop muted playsInline
                                  className="w-full rounded-md" />
                        ) : (
                           <img src={selectedWork.image_path} alt={selectedWork.title} className="w-full rounded-md" />
                        )}
                     </div>
                  </>
               )}
            </DialogContent>
         </Dialog>
      </div>
   )
}

export default WorkGallery