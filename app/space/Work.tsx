import * as THREE from 'three'
import { WorkDetails } from '@/interfaces/workDetails'

type CreateWorkObjectParams = {
   position: [number, number, number];
   details: WorkDetails;
   onClick: (details: WorkDetails) => void;
};

/**
 * Asynchronously creates a THREE.Mesh for a work item.
 * Supports images and videos. Fallback for loading errors.
 */
export function createWorkObject({ position, details, onClick }: CreateWorkObjectParams): Promise<THREE.Mesh> {
   return new Promise((resolve, reject) => {
      const isVideo = details.image_path.endsWith('.mp4') || details.image_path.endsWith('.webm')
      const baseSize = 3

      const createMesh = (texture: THREE.Texture, aspect: number, userDataExtensions: object = {}) => {
         // If aspect is invalid, default to 1 to prevent errors.
         const validAspect = (Number.isFinite(aspect) && aspect > 0) ? aspect : 1;
         const geometry = new THREE.PlaneGeometry(baseSize * validAspect, baseSize)
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

      // Fallback function to load a placeholder if the original media fails.
      const loadFallback = () => {
         console.warn(`Could not load ${details.image_path}. Loading fallback image.`);
         const fallbackLoader = new THREE.TextureLoader();
         fallbackLoader.load(
            '/images/wip.jpg',
            (fallbackTexture) => {
               const aspect = fallbackTexture.image.width / fallbackTexture.image.height;
               // Pass the original details so the modal shows correct info,
               // even if the image inside the modal will also be broken.
               createMesh(fallbackTexture, aspect);
            },
            undefined,
            (error) => reject(`FATAL: Could not load even the fallback image. ${error}`)
         );
      };

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
         // If the video fails to load, use the fallback.
         video.onerror = loadFallback;

      } else { // Static image.
         const loader = new THREE.TextureLoader()
         loader.load(
            details.image_path,
            (texture) => {
               const aspect = texture.image.width / texture.image.height;
               createMesh(texture, aspect)
            },
            undefined,
            // If the image fails to load, use the fallback.
            loadFallback,
         )
      }
   })
}