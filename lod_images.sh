#!/bin/bash

# This script optimizes images for faster web rendering by converting them to WebP.

# --- Directories ---
SOURCE_DIR="public/images/to-opti"
OUTPUT_DIR="public/images/opti"

# --- Configuration ---
OUTPUT_FORMAT="webp"
QUALITY="75"          # WebP quality (70–80 is a good web balance)
MAX_WIDTH="1920"      # Prevent excessively large images
SUFFIX=""             # Optional suffix, example: "_opti"

# --- Dependency checks ---
command -v cwebp >/dev/null 2>&1
HAS_CWEBP=$?

command -v magick >/dev/null 2>&1
HAS_MAGICK=$?

if [ $HAS_CWEBP -ne 0 ] && [ $HAS_MAGICK -ne 0 ]; then
  echo "Error: Neither 'cwebp' nor 'imagemagick' (magick) is installed."
  exit 1
fi

# --- Directory checks ---
if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: Source directory '$SOURCE_DIR' not found."
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

echo "Starting image optimization"
echo "Source: $SOURCE_DIR"
echo "Output: $OUTPUT_DIR"
echo "--------------------------------"

# Process only files in the top-level directory.
find "$SOURCE_DIR" -maxdepth 1 -type f \( \
  -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \
\) -print0 | while IFS= read -r -d '' filepath; do

  filename=$(basename -- "$filepath")
  filename_noext="${filename%.*}"

  output_file="${OUTPUT_DIR}/${filename_noext}${SUFFIX}.${OUTPUT_FORMAT}"

  if [ -f "$output_file" ]; then
    echo "Skipping existing file: ${filename}"
    continue
  fi

  echo "Optimizing: ${filename}"

  # --- Use cwebp if available ---
  if [ $HAS_CWEBP -eq 0 ]; then
    cwebp \
      -q "$QUALITY" \
      -resize "$MAX_WIDTH" 0 \
      "$filepath" \
      -o "$output_file"

  # --- Fallback to ImageMagick ---
  else
    magick "$filepath" \
      -resize "${MAX_WIDTH}x>" \
      -strip \
      -quality "$QUALITY" \
      "$output_file"
  fi

  if [ $? -eq 0 ]; then
    echo " -> Created: $(basename "$output_file")"
  else
    echo " -> ERROR: Failed to optimize ${filename}"
  fi

  echo "--------------------------------"
done

echo "Image optimization complete."
