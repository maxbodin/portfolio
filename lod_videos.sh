#!/bin/bash

# This script processes videos to create low-quality versions and thumbnails for the LOD system.

# Directory containing the original high-resolution videos.
SOURCE_DIR="public/videos/3d"

# --- Configuration ---
# Low-quality video settings.
LOW_RES_SUFFIX="_low"
# Use `scale=-2:480`. The -2 tells ffmpeg to calculate the width to maintain aspect ratio,
# while also ensuring the result is an even number, which is required by many video codecs.
LOW_RES_SCALE="scale=-2:480"
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

echo "Starting video processing in: $SOURCE_DIR"
echo "--------------------------------"

# Use -maxdepth 1 to prevent searching in subdirectories.
# Use -print0 and a while loop with read -d '' to handle filenames with spaces or special characters safely.
# shellcheck disable=SC2095
find "$SOURCE_DIR" -maxdepth 1 -type f \( -name "*.mp4" -o -name "*.webm" \) -print0 | while IFS= read -r -d '' filepath; do

  # Get filename without extension and directory.
  filename=$(basename -- "$filepath")
  extension="${filename##*.}"
  filename_noext="${filename%.*}"
  dir=$(dirname "$filepath")

  # IMPROVEMENT: Skip files that are already thumbnails or low-res versions.
  if [[ "$filename" == *"$LOW_RES_SUFFIX."* || "$filename" == *"$THUMB_SUFFIX."* ]]; then
    # echo "Skipping already processed file: ${filename}"
    continue
  fi

  echo "Processing file: ${filename}"

  # Define output file paths.
  # Standardize low-res output to .mp4 to avoid container/codec issues.
  low_res_output="${dir}/${filename_noext}${LOW_RES_SUFFIX}.mp4"
  thumb_output="${dir}/${filename_noext}${THUMB_SUFFIX}.${THUMB_FORMAT}"

  # --- Generate Low-Resolution Video ---
  if [ -f "$low_res_output" ]; then
    echo " -> Low-res version already exists."
  else
    echo " -> Creating low-res video..."
    ffmpeg -i "$filepath" -vf "$LOW_RES_SCALE" -c:v libx264 -preset fast -crf "$LOW_RES_CRF" -an -y "$low_res_output"
    # -vf "$LOW_RES_SCALE": Rescales the video.
    # -c:v libx264: Uses the x264 video codec.
    # -preset fast: Balances encoding speed and compression.
    # -crf "$LOW_RES_CRF": Sets the quality level.
    # -an: Removes the audio track to save space.
    # -y: Overwrites output file if it exists.

    if [ $? -eq 0 ]; then
        echo " -> Low-res video created successfully."
    else
        echo " -> ERROR: Failed to create low-res video for ${filename}."
    fi
  fi

  # --- Generate Thumbnail Image ---
  if [ -f "$thumb_output" ]; then
    echo " -> Thumbnail already exists."
  else
    echo " -> Creating thumbnail..."
    ffmpeg -nostdin -i "$filepath" -ss "$THUMB_TIME" -vframes 1 -q:v 2 -y "$thumb_output"
    # -ss "$THUMB_TIME": Seeks to the specified timestamp.
    # -vframes 1: Extracts only one frame.
    # -q:v 2: Sets the output image quality (2-5 is a good range for JPG).

     if [ $? -eq 0 ]; then
        echo " -> Thumbnail created successfully."
    else
        echo " -> ERROR: Failed to create thumbnail for ${filename}."
    fi
  fi

  echo "--------------------------------"
done

echo "Processing complete."