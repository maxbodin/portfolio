import * as THREE from 'three'
import { WorkDetails } from '@/interfaces/workDetails'

type CreateWorkObjectParams = {
   position: [number, number, number];
   details: WorkDetails;
   onClick: (details: WorkDetails) => void;
};

/**
 * Asynchronously creates a THREE.Mesh for a work item.
 * Supports images and videos.
 */
export function createWorkObject({ position, details, onClick }: CreateWorkObjectParams): Promise<THREE.Mesh> {
   return new Promise((resolve, reject) => {
      const isVideo = details.image_path.endsWith('.mp4') || details.image_path.endsWith('.webm')
      const baseSize = 3

      const createMesh = (texture: THREE.Texture, aspect: number, userDataExtensions: object = {}) => {
         const geometry = new THREE.PlaneGeometry(baseSize * aspect, baseSize)
         const material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, transparent: true })
         const mesh = new THREE.Mesh(geometry, material)
         mesh.position.set(...position)

         mesh.userData = {
            onClick: () => onClick(details),
            details: details,
            texture: texture,
            ...userDataExtensions,
         }

         resolve(mesh)
      }

      if (isVideo) {
         const video = document.createElement('video')
         video.src = details.image_path
         video.crossOrigin = 'anonymous'
         video.loop = true
         video.muted = true
         video.playsInline = true

         // Add the video to the DOM but keep it hidden.
         // This is a crucial step to help browsers with autoplay policies.
         video.style.position = 'fixed'
         video.style.top = '-9999px'
         video.style.left = '-9999px'
         document.body.appendChild(video)

         video.addEventListener('canplay', () => {
            video.play().catch(e => console.error('Video play error:', e))
            const videoTexture = new THREE.VideoTexture(video)
            const aspect = video.videoWidth / video.videoHeight
            createMesh(videoTexture, aspect, { videoElement: video })
         }, { once: true })
         video.onerror = () => reject(`Error loading video: ${details.image_path}`)

      } else { // Static image.
         const loader = new THREE.TextureLoader()
         loader.load(
            details.image_path,
            (texture) => {
               const aspect = texture.image.naturalWidth / texture.image.naturalHeight
               createMesh(texture, aspect)
            },
            undefined,
            () => reject(`Error loading image: ${details.image_path}`),
         )
      }
   })
}