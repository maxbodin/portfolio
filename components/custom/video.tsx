'use client'

import React from 'react'

export type VideoPreload = 'none' | 'metadata' | 'auto';

export type VideoProps = {
   src: string;
   title?: string;
   className?: string;
   autoPlay?: boolean;
   controls?: boolean;
   loop?: boolean;
   muted?: boolean;
   playsInline?: boolean;
   preload?: VideoPreload;
   /**
    * How many pixels before the video enters the viewport to start loading.
    * A larger margin pre-fetches earlier, reducing visible loading delays.
    * Defaults to '200px' — a good balance between eagerness and wasted bandwidth.
    */
   rootMargin?: string;
};

/**
 * Resolves the default preload strategy.
 * autoPlay videos need 'metadata' so the browser knows dimensions/duration.
 * Non-autoplay videos default to 'none' to save bandwidth until user intent.
 */
const resolvePreload = (
   preload: VideoPreload | undefined,
   autoPlay: boolean
): VideoPreload => preload ?? (autoPlay ? 'metadata' : 'none');

/**
 * Ref callback factory: attaches an IntersectionObserver to the video element
 * that sets its src only when it is about to enter the viewport, then
 * immediately disconnects to avoid unnecessary observation.
 */
const createLazyRef =
   (src: string, rootMargin: string) =>
      (video: HTMLVideoElement | null): void => {
         if (!video) return;

         const observer = new IntersectionObserver(
            ([entry]) => {
               if (!entry.isIntersecting) return;
               video.src = src;  // browser begins fetching only now.
               video.load();
               observer.disconnect();
            },
            { rootMargin }
         );

         observer.observe(video);
      };

/**
 * Performant lazy-loading drop-in replacement for <video>.
 */
const Video = ({
                  src,
                  title,
                  className,
                  autoPlay = true,
                  controls = false,
                  loop = true,
                  muted = true,
                  playsInline = true,
                  preload,
                  rootMargin = '200px',
               }: VideoProps) => (
   <video
      ref={createLazyRef(src, rootMargin)}
      title={title}
      controls={controls}
      className={className}
      preload={resolvePreload(preload, autoPlay)}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
   />
);

export default Video;