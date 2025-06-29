#!/bin/bash

# This script processes videos to create low-quality versions and thumbnails for the LOD system.

# Directory containing the original high-resolution videos.
SOURCE_DIR="public/videos/3d"

# --- Configuration ---
# Low-quality video settings.
LOW_RES_SUFFIX="_low"
LOW_RES_SCALE="scale=480:-1" # 480p height, aspect ratio is preserved.
LOW_RES_CRF="30" # Constant Rate Factor (higher is lower quality/smaller size). 28-32 is good for previews.

# Thumbnail settings
THUMB_SUFFIX="_thumb"
THUMB_FORMAT="jpg"
THUMB_TIME="00:00:01" # Capture frame at 1 second.

# --- Script Logic ---
if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: Source directory '$SOURCE_DIR' not found."
  exit 1
fi

echo "Starting video processing..."

# Find all mp4 and webm files in the source directory.
# shellcheck disable=SC2095
find "$SOURCE_DIR" -type f \( -name "*.mp4" -o -name "*.webm" \) | while read -r filepath; do

  # Get filename without extension and directory.
  filename=$(basename -- "$filepath")
  extension="${filename##*.}"
  filename_noext="${filename%.*}"
  dir=$(dirname "$filepath")

  # Define output file paths.
  low_res_output="${dir}/${filename_noext}${LOW_RES_SUFFIX}.${extension}"
  thumb_output="${dir}/${filename_noext}${THUMB_SUFFIX}.${THUMB_FORMAT}"

  # --- Generate Low-Resolution Video ---
  if [ -f "$low_res_output" ]; then
    echo "Skipping low-res for ${filename} (already exists)."
  else
    echo "Processing low-res for: ${filename}"
    ffmpeg -i "$filepath" -vf "$LOW_RES_SCALE" -c:v libx264 -preset fast -crf "$LOW_RES_CRF" -an -y "$low_res_output"
    # -vf "$LOW_RES_SCALE": Rescales the video.
    # -c:v libx264: Uses the x264 video codec.
    # -preset fast: Balances encoding speed and compression.
    # -crf "$LOW_RES_CRF": Sets the quality level.
    # -an: Removes the audio track to save space.
    # -y: Overwrites output file if it exists.
  fi

  # --- Generate Thumbnail Image ---
  if [ -f "$thumb_output" ]; then
    echo "Skipping thumbnail for ${filename} (already exists)."
  else
    echo "Processing thumbnail for: ${filename}"
    ffmpeg -i "$filepath" -ss "$THUMB_TIME" -vframes 1 -q:v 2 -y "$thumb_output"
    # -ss "$THUMB_TIME": Seeks to the specified timestamp.
    # -vframes 1: Extracts only one frame.
    # -q:v 2: Sets the output image quality (2-5 is a good range for JPG).
  fi

  echo "--------------------------------"
done

echo "Processing complete."