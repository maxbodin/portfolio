'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { createWorkObject, isVideo } from './Work'
import { createOrbitControls } from './CameraAndControls'
import { WorkDetails } from '@/interfaces/workDetails'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CategorySlider } from '@/components/custom/categorySlider'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Github, LinkIcon, Loader2, LocateFixed } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getSkillColor, Skill } from '@/functions/getSkillColor'
import { Progress } from '@/components/ui/progress'

// Import data
import { projectsItems } from '@/data/projects'
import { experiencesItems } from '@/data/experiences'
import { eventsItems } from '@/data/events'
import { troisDItems } from '@/data/troisD'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { educationItems } from '@/data/education'
import { certificationsItems } from '@/data/certifications'

const LOD_CONFIG = {
   HIGH_RES_DISTANCE: 10,  // Distance to load high-res video.
   LOW_RES_DISTANCE: 50,   // Distance to load low-res video.
}

const categories = ['All', 'Projects', 'Education', 'Certifications', 'Experiences', 'Events', '3D', 'Art/Design']

// Filter out any items that have no main_image_path or no images in images_path.
// Sort items by categories.
const allWorks: (WorkDetails)[] = [
   ...projectsItems.map(item => ({ ...item, category: 'Projects' })),
   ...educationItems.map(item => ({ ...item, category: 'Education' })),
   ...certificationsItems.map(item => ({ ...item, category: 'Certifications' })),
   ...experiencesItems.map(item => ({ ...item, category: 'Experiences' })),
   ...eventsItems.map(item => ({ ...item, category: 'Events' })),
   ...troisDItems.map(item => ({ ...item, category: '3D' })),
].filter(work => work.main_image_path && work.main_image_path.trim() !== '' || (work.images_path && work.images_path?.length > 0))

const textureLoader = new THREE.TextureLoader()
const fallbackTexturePath = '/images/wip.jpg'

const WorkGallery: React.FC = () => {
   const containerRef = useRef<HTMLDivElement>(null)
   const isInitialized = useRef(false)
   const workMeshesRef = useRef<THREE.Mesh[]>([])

   // Refs for camera and controls to access them outside useEffect (flyto).
   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
   const controlsRef = useRef<OrbitControls | null>(null)
   const sceneRef = useRef<THREE.Scene | null>(null)
   const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

   const currentlyHovered = useRef<THREE.Mesh | null>(null)

   const videoManagerRef = useRef(new Map<string, HTMLVideoElement>())
   const isLODEnabledRef = useRef<boolean>(false)

   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const [selectedWork, setSelectedWork] = useState<(WorkDetails) | null>(null)
   const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0)

   const [searchTerm, setSearchTerm] = useState<string>('')
   const [isRecenterAnimating, setIsRecenterAnimating] = useState<boolean>(false)

   // State for loading progress and scene readiness.
   const [loadingProgress, setLoadingProgress] = useState<number>(0)
   const [isSceneReady, setIsSceneReady] = useState<boolean>(false)

   useEffect(() => {
      if (!isSceneReady) return // Don't apply filters until the scene is ready.

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
            details.main_image_path?.toLowerCase().includes(lowerCaseSearchTerm) ||
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
   }, [activeCategoryIndex, searchTerm, isSceneReady])

   // Camera recenter function.
   const handleRecenter = () => {
      if (cameraRef.current && controlsRef.current && !isRecenterAnimating) {
         gsap.to(cameraRef.current.position, {
            x: 0, y: 0, z: cameraRef.current.position.z,
            duration: 0.5,
            ease: 'power3.inOut',
            onStart: () => {
               setIsRecenterAnimating(true) // Disable button on start.
            },
            onComplete: () => {
               setIsRecenterAnimating(false) // Re-enable button on complete.
            },
         })

         gsap.to(controlsRef.current.target, {
            x: 0, y: 0, z: 0,
            duration: 0.5,
            ease: 'power3.inOut',
         })
      }
   }

   /**
    *
    */
   const loadResourceForMesh = useCallback((mesh: THREE.Mesh, targetState: 'high' | 'low' | 'thumbnail') => {
      const details = mesh.userData.details as WorkDetails

      let path: string
      let isPathVideo: boolean
      let finalState: 'high' | 'low' | 'thumbnail'

      // TODO : Fix by implementing images_path [] exploitation.
      if (!details.main_image_path) return

      if (targetState === 'high') {
         path = details.main_image_path
         isPathVideo = isVideo(path)
         finalState = 'high'
      } else if (targetState === 'low') {
         if (details.low_quality_path) {
            path = details.low_quality_path
            isPathVideo = true
            finalState = 'low'
         } else {
            path = details.main_image_path
            isPathVideo = isVideo(path)
            finalState = 'high'
         }
      } else { // thumbnail.
         if (details.thumbnail_path) {
            path = details.thumbnail_path
         } else if (!isVideo(details.main_image_path)) {
            path = details.main_image_path
         } else {
            path = fallbackTexturePath
         }
         isPathVideo = false
         finalState = 'thumbnail'
      }

      if (mesh.userData.lodState === finalState) {
         return
      }

      mesh.userData.isLoading = true

      const oldTexture = mesh.userData.activeTexture
      const oldVideo = mesh.userData.activeVideoElement

      const applyNewTexture = (newTexture: THREE.Texture, newVideo: HTMLVideoElement | null, loadedState: typeof finalState | 'failed') => {
         if (!mesh.material) {
            newTexture.dispose()
            if (newVideo) newVideo.parentElement?.removeChild(newVideo)
            return
         }

         (mesh.material as THREE.MeshBasicMaterial).map = newTexture;
         (mesh.material as THREE.MeshBasicMaterial).needsUpdate = true

         mesh.userData.activeTexture = newTexture
         mesh.userData.activeVideoElement = newVideo
         mesh.userData.lodState = loadedState
         mesh.userData.isLoading = false

         if (oldTexture && oldTexture.uuid !== newTexture.uuid) oldTexture.dispose()
         if (oldVideo) {
            oldVideo.pause()
            oldVideo.src = ''
            oldVideo.parentElement?.removeChild(oldVideo)
            videoManagerRef.current.delete(mesh.uuid)
         }
      }

      const onError = (e: any) => {
         console.error(`Failed to load resource: ${path}`, e)
         textureLoader.load(fallbackTexturePath, (fallbackTexture) => {
            applyNewTexture(fallbackTexture, null, 'failed')
         })
      }

      if (isPathVideo) {
         const video = document.createElement('video')
         video.src = path
         video.crossOrigin = 'anonymous'
         video.loop = true
         video.muted = true
         video.playsInline = true
         video.style.position = 'fixed'
         video.style.top = '-9999px'
         document.body.appendChild(video)
         videoManagerRef.current.set(mesh.uuid, video)

         const videoTexture = new THREE.VideoTexture(video)
         applyNewTexture(videoTexture, video, finalState)

         video.preload = 'auto'
         // Start loading and play.
         video.load()
         const playPromise = video.play()
         if (playPromise !== undefined) {
            playPromise.catch(error => {
               console.error(`Error playing video ${path}:`, error)
            })
         }
      } else {
         textureLoader.load(path, (texture) => applyNewTexture(texture, null, finalState), undefined, onError)
      }
   }, [])

   /**
    *
    */
   const updateLODs = useCallback((camera: THREE.PerspectiveCamera, meshes: THREE.Mesh[]) => {
      if (!isLODEnabledRef.current) return

      const cameraPosition = camera.position
      meshes.forEach(mesh => {
         if (!mesh.userData.isLODVideo || mesh.userData.isLoading || mesh.userData.lodState === 'failed') {
            return
         }

         const distance = mesh.position.distanceTo(cameraPosition)
         let targetState: 'high' | 'low' | 'thumbnail' = 'thumbnail'

         if (distance < LOD_CONFIG.HIGH_RES_DISTANCE) {
            targetState = 'high'
         } else if (distance < LOD_CONFIG.LOW_RES_DISTANCE) {
            targetState = 'low'
         }

         if (targetState !== mesh.userData.lodState) {
            loadResourceForMesh(mesh, targetState)
         }
      })
   }, [loadResourceForMesh])

   // Setting up the scene.
   useEffect(() => {
      if (!containerRef.current || isInitialized.current) return
      isInitialized.current = true
      const container = containerRef.current

      const scene = new THREE.Scene()
      sceneRef.current = scene

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
      rendererRef.current = renderer

      const controls = createOrbitControls({ camera, domElement: renderer.domElement })
      controlsRef.current = controls

      const workPositions: THREE.Vector3[] = []
      const minDistance = 5.0                        // Minimum distance between the centers of two objects.
      const placementArea = { x: 50, y: 30, z: 10 }  // The size of the random volume.

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
      let loadedCount = 0
      const meshPromises = allWorks.map((work, index) => {
         const position = workPositions[index]
         return createWorkObject({
            position: [position.x, position.y, position.z],
            details: work,
            onClick: (details) => {
               setSelectedWork(details)
               setIsModalOpen(true)
            },
         }).then(mesh => {
            // Update progress after each item is processed.
            loadedCount++
            setLoadingProgress((loadedCount / allWorks.length) * 100)
            return mesh
         })
      })

      Promise.all(meshPromises)
         .then((createdMeshes) => {
            workMeshesRef.current = createdMeshes
            // Add all meshes to the scene at once.
            createdMeshes.forEach(mesh => {
               scene.add(mesh)
            })

            // Signal that the scene is ready.
            setIsSceneReady(true)
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
         if (intersects.length > 0 && intersects[0].object.scale.x > 0.5) {
            intersects[0].object.userData.onClick?.()
         }
      }
      renderer.domElement.addEventListener('click', onCanvasClick)

      // Hover effect logic.
      const onMouseMove = (event: MouseEvent) => {
         const rect = renderer.domElement.getBoundingClientRect()
         mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
         mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
         raycaster.setFromCamera(mouse, camera)
         const intersects = raycaster.intersectObjects(workMeshesRef.current)

         // If we are intersecting something.
         if (intersects.length > 0 && (intersects[0].object as THREE.Mesh).scale.x > 0.5) {
            const firstIntersect = intersects[0].object as THREE.Mesh

            // Change cursor to pointer.
            renderer.domElement.style.cursor = 'pointer'

            // If it's a NEW item we are hovering.
            if (currentlyHovered.current !== firstIntersect) {
               // Animate the PREVIOUS item back to normal, if there was one.
               if (currentlyHovered.current) {
                  gsap.to(currentlyHovered.current.scale, { x: 1, y: 1, z: 1, duration: 0.2, ease: 'power2.out' })
               }

               // Set the new hovered item.
               currentlyHovered.current = firstIntersect
               gsap.to(firstIntersect.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 0.1, ease: 'power2.out' })
            }
         } else { // If we are not intersecting anything.
            // Reset cursor.
            renderer.domElement.style.cursor = 'grab'

            // Animate the previously hovered item back to normal.
            if (currentlyHovered.current) {
               gsap.to(currentlyHovered.current.scale, { x: 1, y: 1, z: 1, duration: 0.2, ease: 'power2.out' })
               currentlyHovered.current = null
            }
         }
      }
      renderer.domElement.addEventListener('mousemove', onMouseMove)

      //  Handle Window Resizing.
      const handleResize = () => {
         if (!cameraRef.current || !rendererRef.current) return

         cameraRef.current.aspect = window.innerWidth / window.innerHeight
         cameraRef.current.updateProjectionMatrix()
         rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', handleResize)

      // Cleanup on component unmount.
      return () => {
         window.removeEventListener('resize', handleResize)
         renderer.domElement.removeEventListener('mousemove', onMouseMove)
         renderer.domElement.removeEventListener('click', onCanvasClick)

         if (controlsRef.current) controlsRef.current.dispose()
         controls.dispose()

         // Kill entry animations on cleanup.
         gsap.killTweensOf(camera.position)
         gsap.globalTimeline.clear()

         videoManagerRef.current.forEach(video => {
            video.pause()
            video.removeAttribute('src')
            video.parentElement?.removeChild(video)
         })
         videoManagerRef.current.clear()

         if (scene.background) gsap.killTweensOf(scene.background)
         workMeshesRef.current.forEach((mesh) => {
            // Kill any active GSAP animations on this mesh.
            gsap.killTweensOf(mesh.scale)
            if (mesh.material) gsap.killTweensOf((mesh.material as THREE.MeshBasicMaterial).color)

            mesh.geometry.dispose()
            if (mesh.userData.activeTexture) mesh.userData.activeTexture.dispose()
            if (mesh.material instanceof THREE.Material) mesh.material.dispose()
         })

         workMeshesRef.current = []

         if (sceneRef.current) sceneRef.current.clear()
         scene.clear()

         if (rendererRef.current) rendererRef.current.dispose()
         renderer.dispose()

         if (container && container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
         isInitialized.current = false
      }
   }, [updateLODs])

   // Effect for running animations AFTER the scene is ready.
   useEffect(() => {
      if (isSceneReady && cameraRef.current && sceneRef.current) {
         // Animate Camera Zoom-out.
         gsap.to(cameraRef.current.position, {
            z: 40,
            duration: 2.5,
            ease: 'power3.inOut',
            onComplete: () => {
               isLODEnabledRef.current = true
            },
         })

         // Animate Background Color.
         const targetBgColor = new THREE.Color('rgb(233, 233, 233)')
         gsap.to(sceneRef.current.background, {
            r: targetBgColor.r, g: targetBgColor.g, b: targetBgColor.b,
            duration: 2.5,
            ease: 'power3.inOut',
         })

         // Animate Meshes into view.
         workMeshesRef.current.forEach(mesh => mesh.scale.set(0, 0, 0))
         gsap.to(workMeshesRef.current.map(m => m.scale), {
            x: 1, y: 1, z: 1,
            duration: 2,
            stagger: 0.03,
            ease: 'power3.out',
            delay: 3,
         })
      }
   }, [isSceneReady])

   // Animation Loop.
   useEffect(() => {
      if (!isSceneReady || !rendererRef.current || !sceneRef.current || !cameraRef.current || !controlsRef.current) {
         return
      }

      const renderer = rendererRef.current
      const scene = sceneRef.current
      const camera = cameraRef.current
      const controls = controlsRef.current

      let animationFrameId: number
      const animate = () => {
         animationFrameId = requestAnimationFrame(animate)

         // Update controls and LODs.
         controls.update()
         updateLODs(camera, workMeshesRef.current)

         // Render the scene.
         renderer.render(scene, camera)
      }

      animate()

      // Cancel the animation frame when the component unmounts.
      return () => {
         cancelAnimationFrame(animationFrameId)
      }
   }, [isSceneReady, updateLODs])

   return (
      <div className="relative w-screen h-screen bg-white">
         {!isSceneReady && (
            <div className="absolute inset-0 z-50 flex flex-col justify-center items-center bg-white">
               <p className="mb-4 text-lg text-gray-700">Loading Portfolio... {loadingProgress.toFixed(1)}%</p>
               <Progress value={loadingProgress} className="w-1/4" />
            </div>
         )}

         <div ref={containerRef}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${isSceneReady ? 'opacity-100 cursor-grab active:cursor-grabbing' : 'opacity-0'}`} />
         <div
            className={`absolute top-4 right-4 z-10 flex items-center gap-2 transition-opacity duration-1000 ${isSceneReady ? 'opacity-100' : 'opacity-0'}`}>
            <Button variant="outline" size="icon" onClick={handleRecenter} disabled={isRecenterAnimating}>
               {isRecenterAnimating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
               ) : (
                  <LocateFixed className="h-4 w-4" />
               )}
            </Button>
         </div>

         <div
            className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-full max-w-lg lg:max-w-2xl px-8 z-10 transition-opacity duration-1000 ${isSceneReady ? 'opacity-100' : 'opacity-0'}`}>
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
                        {selectedWork.main_image_path && isVideo(selectedWork.main_image_path) ? (
                           <video src={selectedWork.main_image_path} controls autoPlay loop muted playsInline
                                  className="w-full rounded-md" />
                        ) : (
                           // eslint-disable-next-line @next/next/no-img-element
                           <img src={selectedWork.main_image_path} alt={selectedWork.title}
                                className="w-full rounded-md"
                                onError={(e) => (e.currentTarget.src = '/images/wip.jpg')}
                           />
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

                     {(selectedWork.date || selectedWork.link || selectedWork.github) && (
                        <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
                           {selectedWork.date &&
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