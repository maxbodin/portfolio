'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { createWorkObject } from './Work'
import { createOrbitControls } from './CameraAndControls'
import { WorkDetails } from '@/interfaces/workDetails'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CategorySlider } from '@/components/custom/categorySlider'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Github, LinkIcon, Loader2, LocateFixed } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getSkillColor, Skill } from '@/functions/getSkillColor'

// Import data
import { projectsItems } from '@/data/projects'
import { formationsCertificationsItems } from '@/data/formCertif'
import { experiencesItems } from '@/data/experiences'
import { eventsItems } from '@/data/events'
import { troisDItems } from '@/data/troisD'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const categories = ['All', 'Projects', 'Formations', 'Experiences', 'Events', '3D']

// Filter out any items that have no image_path.
// This prevents the "Error loading image" for items with empty paths.
// Sort items by categories.
const allWorks: (WorkDetails)[] = [
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

   // Refs for camera and controls to access them outside useEffect (flyto).
   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
   const controlsRef = useRef<OrbitControls | null>(null)

   const currentlyHovered = useRef<THREE.Mesh | null>(null);

   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const [selectedWork, setSelectedWork] = useState<(WorkDetails) | null>(null)
   const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0)

   const [searchTerm, setSearchTerm] = useState<string>('')
   const [isRecenterAnimating, setIsRecenterAnimating] = useState<boolean>(false);

   useEffect(() => {
      const selectedCategory = categories[activeCategoryIndex]
      const lowerCaseSearchTerm = searchTerm.toLowerCase()

      const activeColor = new THREE.Color(0xffffff)
      const inactiveColor = new THREE.Color(0x666666)

      workMeshesRef.current.forEach(mesh => {
         const details = mesh.userData.details as WorkDetails

         // Category must match.
         const isCategoryMatch = (selectedCategory === 'All' || details.category === selectedCategory)

         // Search term must match.
         const isSearchMatch = lowerCaseSearchTerm === '' ||
            details.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            details.description.toLowerCase().includes(lowerCaseSearchTerm) ||
            details.image_path.toLowerCase().includes(lowerCaseSearchTerm) ||
            details.link?.toLowerCase().includes(lowerCaseSearchTerm) ||
            details.date?.toLowerCase().includes(lowerCaseSearchTerm) ||
            details.github?.toLowerCase().includes(lowerCaseSearchTerm) ||
            details.skills.some((skill: Skill) => skill.toLowerCase().includes(lowerCaseSearchTerm))

         const isActive = isCategoryMatch && isSearchMatch

         gsap.to(mesh.scale, {
            x: isActive ? 1 : 0.2,
            y: isActive ? 1 : 0.2,
            z: isActive ? 1 : 0.2,
            duration: 0.5,
            ease: 'power3.out',
         })
         gsap.to((mesh.material as THREE.MeshBasicMaterial).color, {
            r: isActive ? activeColor.r : inactiveColor.r,
            g: isActive ? activeColor.g : inactiveColor.g,
            b: isActive ? activeColor.b : inactiveColor.b,
            duration: 0.5,
            ease: 'power3.out',
         })
      })
   }, [activeCategoryIndex, searchTerm])

   // Camera recenter function.
   const handleRecenter = () => {
      if (cameraRef.current && controlsRef.current && !isRecenterAnimating) {
         gsap.to(cameraRef.current.position, {
            x: 0, y: 0, z: cameraRef.current.position.z,
            duration: 0.5,
            ease: 'power3.inOut',
            onStart: () => {
               setIsRecenterAnimating(true); // Disable button on start.
            },
            onComplete: () => {
               setIsRecenterAnimating(false); // Re-enable button on complete.
            }
         });

         gsap.to(controlsRef.current.target, {
            x: 0, y: 0, z: 0,
            duration: 0.5,
            ease: 'power3.inOut',
         });
      }
   };

   useEffect(() => {
      if (!containerRef.current || isInitialized.current) return
      isInitialized.current = true
      const container = containerRef.current

      const scene = new THREE.Scene()
      // Set initial background color to white.
      scene.background = new THREE.Color(0xffffff)

      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      cameraRef.current = camera
      // Set initial camera position for zoom-out effect.
      camera.position.z = 5

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      container.appendChild(renderer.domElement)

      const controls = createOrbitControls({ camera, domElement: renderer.domElement })
      controlsRef.current = controls

      // Animate Camera Zoom-out from z=5 to z=30.
      gsap.to(camera.position, {
         z: 40,
         duration: 2,
         ease: 'power2.inOut',
         delay: 2
      })

      // Animate Background Color from white to grey.
      const targetBgColor = new THREE.Color('rgb(233, 233, 233)')
      gsap.to(scene.background, {
         r: targetBgColor.r,
         g: targetBgColor.g,
         b: targetBgColor.b,
         duration: 2.5,
         ease: 'power3.inOut',
      })

      // This algorithm ensures objects are spaced out to prevent overlapping.
      const workPositions: THREE.Vector3[] = []
      const minDistance = 5.0                        // Minimum distance between the centers of two objects.
      const placementArea = { x: 40, y: 30, z: 20 }  // The size of the random volume.

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
               duration: 2,
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

         // Click only if the object is full size, not allowing clicking on object not in selected category.
         if (intersects.length > 0 && intersects[0].object instanceof THREE.Mesh && intersects[0].object.scale.x > 0.5) {
            intersects[0].object.userData.onClick?.()
         }
      }
      renderer.domElement.addEventListener('click', onCanvasClick)

      // Hover effect logic.
      const onMouseMove = (event: MouseEvent) => {
         const rect = renderer.domElement.getBoundingClientRect();
         mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
         mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
         raycaster.setFromCamera(mouse, camera);
         const intersects = raycaster.intersectObjects(workMeshesRef.current);

         // If we are intersecting something.
         if (intersects.length > 0) {
            const firstIntersect = intersects[0].object as THREE.Mesh;

            // If it's an active (not greyed out) item.
            if (firstIntersect.scale.x > 0.5) {
               // If it's a NEW item we are hovering.
               if (currentlyHovered.current !== firstIntersect) {
                  // Animate the PREVIOUS item back to normal, if there was one.
                  if (currentlyHovered.current) {
                     gsap.to(currentlyHovered.current.scale, { x: 1, y: 1, z: 1, duration: 0.2, ease: 'power2.out' });
                  }

                  // Set the new hovered item.
                  currentlyHovered.current = firstIntersect;
                  gsap.to(firstIntersect.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.1, ease: 'power2.out' });
               }
               // Change cursor to pointer.
               renderer.domElement.style.cursor = 'pointer';
            }
         } else { // If we are not intersecting anything.
            // Animate the previously hovered item back to normal.
            if (currentlyHovered.current) {
               gsap.to(currentlyHovered.current.scale, { x: 1, y: 1, z: 1, duration: 0.2, ease: 'power2.out' });
               currentlyHovered.current = null;
            }
            // Reset cursor.
            renderer.domElement.style.cursor = 'grab';
         }
      };
      renderer.domElement.addEventListener('mousemove', onMouseMove);

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
         renderer.domElement.removeEventListener('mousemove', onMouseMove);
         renderer.domElement.removeEventListener('click', onCanvasClick)
         controls.dispose()

         // Kill entry animations on cleanup.
         gsap.killTweensOf(camera.position);
         gsap.killTweensOf(scene.background);

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

         <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleRecenter} disabled={isRecenterAnimating}>
               {isRecenterAnimating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
               ) : (
                  <LocateFixed className="h-4 w-4" />
               )}
            </Button>
         </div>

         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-full max-w-lg lg:max-w-2xl px-8 z-10">
            <Input
               type="text"
               placeholder="Search..."
               className="w-full"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                        <DialogDescription
                           className="pt-2 text-xs sm:text-sm">{selectedWork.description}</DialogDescription>
                     </DialogHeader>
                     <div className="py-4">
                        {selectedWork.image_path.endsWith('.mp4') || selectedWork.image_path.endsWith('.webm') ? (
                           <video src={selectedWork.image_path} controls autoPlay loop muted playsInline
                                  className="w-full rounded-md" />
                        ) : (
                           <img src={selectedWork.image_path} alt={selectedWork.title}
                                className="w-full rounded-md" />
                        )}
                     </div>

                     {selectedWork.skills && selectedWork.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 border-t pt-4">
                           {selectedWork.skills.map((skill, index) => (
                              <Badge className="p-1 px-2 text-center" key={index} variant="outline"
                                     style={{ color: getSkillColor(skill as Skill) }}>
                                 {skill}
                              </Badge>
                           ))}
                        </div>
                     )}

                     {('date' in selectedWork || selectedWork.link || selectedWork.github) &&
                        (<div
                           className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                           {'date' in selectedWork &&
                              <p className="py-2 text-xs text-gray-600 text-justify">{selectedWork.date}</p>}
                           <div className="flex items-center gap-4">
                              {selectedWork.link && (
                                 <a href={selectedWork.link} target="_blank" rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors flex items-center gap-1">
                                    <LinkIcon className="h-4 w-4" /> Link
                                 </a>
                              )}
                              {selectedWork.github && (
                                 <a href={selectedWork.github} target="_blank" rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors flex items-center gap-1">
                                    <Github className="h-4 w-4" /> GitHub
                                 </a>
                              )}
                           </div>
                        </div>)
                     }
                  </>
               )}
            </DialogContent>
         </Dialog>
      </div>
   )
}

export default WorkGallery