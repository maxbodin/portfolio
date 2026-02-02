import * as THREE from 'three'
import { WorkDetails } from '@/interfaces/workDetails'

type CreateWorkObjectParams = {
   position: [number, number, number];
   details: WorkDetails;
   onClick: (details: WorkDetails) => void;
};

const sharedTextureLoader = new THREE.TextureLoader()
const fallbackTexturePath = '/images/wip.jpg'

/**
 * Determines the best initial static image path to load for an object.
 */
function getInitialTexturePath(details: WorkDetails): string {
   // If a thumbnail exists, always use it for the fastest load.
   if (details.thumbnail_path) {
      return details.thumbnail_path
   }

   // If it's a static image (not a video), use its main path for the initial texture.
   if (details.main_image_path && !isVideo(details.main_image_path)) {
      return details.main_image_path
   }

   // If it's a video but has no thumbnail, use the static fallback.
   // The LOD system will be responsible for loading the low resolution video later.
   return fallbackTexturePath
}

/**
 * Asynchronously creates a THREE.Mesh with an initial thumbnail texture.
 * The mesh's userData is populated with all necessary info for the LOD system.
 */
export function createWorkObject({ position, details, onClick }: CreateWorkObjectParams): Promise<THREE.Mesh> {
   return new Promise((resolve, reject) => {
      const isMainImageVideo = details.main_image_path && isVideo(details.main_image_path)
      const baseSize = 3

      const initialTexturePath = getInitialTexturePath(details)

      sharedTextureLoader.load(
         initialTexturePath,
         (texture) => {
            const aspect = (texture.image.width / texture.image.height) || 1
            const geometry = new THREE.PlaneGeometry(baseSize * aspect, baseSize)
            const material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, transparent: true })
            const mesh = new THREE.Mesh(geometry, material)

            mesh.position.set(...position)

            mesh.userData = {
               onClick: () => onClick(details),
               details: details,

               // LOD system properties.
               // A mesh is considered an "LOD Video" if its primary content is a video
               // that should be loaded dynamically by the LOD system.
               isLODVideo: isMainImageVideo,
               lodState: 'thumbnail',     // Always start in a non-active state.
               isLoading: false,          // Flag to prevent concurrent loading.

               // Keep track of resources to dispose them later.
               activeTexture: texture,
               activeVideoElement: null,
            }
            resolve(mesh)
         },
         undefined,
         (error) => {
            // If the initial texture fails, create the mesh with a global fallback.
            console.warn(`Could not load initial texture ${initialTexturePath}. Loading fallback.`)
            sharedTextureLoader.load(fallbackTexturePath, (fallbackTexture) => {
               const aspect = (fallbackTexture.image.width / fallbackTexture.image.height) || 1
               const geometry = new THREE.PlaneGeometry(baseSize * aspect, baseSize)
               const material = new THREE.MeshBasicMaterial({
                  map: fallbackTexture,
                  toneMapped: false,
                  transparent: true,
               })
               const mesh = new THREE.Mesh(geometry, material)

               mesh.position.set(...position)

               mesh.userData = {
                  onClick: () => onClick(details),
                  details: details,
                  isLODVideo: isMainImageVideo,
                  lodState: 'thumbnail',
                  isLoading: false,
                  activeTexture: fallbackTexture,
                  activeVideoElement: null,
               }
               resolve(mesh)
            }, undefined, () => reject(`FATAL: Could not load the fallback image. ${error}`))
         },
      )
   })
}


export function isVideo(path: string): boolean {
   return (path != null && path.trim() != '' && (path.endsWith('.mp4') || path.endsWith('.webm')))
}