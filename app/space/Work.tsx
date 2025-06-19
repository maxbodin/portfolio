import * as THREE from 'three'
import { WorkDetails } from '@/interfaces/workDetails'

type CreateWorkObjectParams = {
  position: [number, number, number];
  details: WorkDetails;
  onClick: (details: WorkDetails) => void;
};

/**
 * Asynchronously creates a THREE.Mesh for a work item.
 * Supports images, videos, and GIFs.
 */
export function createWorkObject({ position, details, onClick }: CreateWorkObjectParams): Promise<THREE.Mesh> {
  return new Promise((resolve, reject) => {
    const isVideo = details.image_path.endsWith('.mp4') || details.image_path.endsWith('.webm');
    const isGif = details.image_path.endsWith('.gif');
    const baseSize = 3;

    const createMesh = (texture: THREE.Texture, aspect: number, userDataExtensions: object = {}) => {
      const geometry = new THREE.PlaneGeometry(baseSize * aspect, baseSize);
      const material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, transparent: true });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);

      mesh.userData = {
        onClick: () => onClick(details),
        details: details,
        texture: texture,
        ...userDataExtensions,
      };

      resolve(mesh);
    };

    if (isVideo) {
      const video = document.createElement('video');
      video.src = details.image_path;
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true;
      video.playsInline = true;

      // Add the video to the DOM but keep it hidden.
      // This is a crucial step to help browsers with autoplay policies.
      video.style.position = 'fixed';
      video.style.top = '-9999px';
      video.style.left = '-9999px';
      document.body.appendChild(video);

      video.addEventListener('canplay', () => {
        video.play().catch(e => console.error("Video play error:", e));
        const videoTexture = new THREE.VideoTexture(video);
        const aspect = video.videoWidth / video.videoHeight;
        createMesh(videoTexture, aspect, { videoElement: video });
      }, { once: true });
      video.onerror = () => reject(`Error loading video: ${details.image_path}`);

    } else if (isGif) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = details.image_path;

      // Add the image to the DOM but keep it hidden to ensure browser processes animation.
      img.style.position = 'fixed';
      img.style.top = '-9999px';
      img.style.left = '-9999px';
      document.body.appendChild(img);

      img.onload = () => {
        const aspect = img.width / img.height;
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d')!;

        ctx.drawImage(img, 0, 0); // Initial draw.
        const texture = new THREE.CanvasTexture(canvas);

        const gifIntervalId = setInterval(() => {
          ctx.drawImage(img, 0, 0);
          texture.needsUpdate = true;
        }, 100);

        // Pass both the interval and the image element for full cleanup.
        createMesh(texture, aspect, { gifIntervalId, gifImageElement: img });
      };
      img.onerror = () => reject(`Error loading GIF: ${details.image_path}`);

    } else { // Static image.
      const loader = new THREE.TextureLoader();
      loader.load(
         details.image_path,
         (texture) => {
           const aspect = texture.image.naturalWidth / texture.image.naturalHeight;
           createMesh(texture, aspect);
         },
         undefined,
         (error) => reject(`Error loading image: ${details.image_path}`)
      );
    }
  });
}