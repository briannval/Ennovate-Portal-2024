#!/bin/bash

# Usage: npm run convert-to-webp <DIR_NAME>
if ! command -v cwebp &> /dev/null; then
    echo "Error: cwebp is not installed. Please install it before running this script."
    exit 1
fi

COUNTER=0

# Directory to search for images
IMAGES_DIR="./public${1:+/$1}"

# Find all images with the specified extensions
IMAGES=($(find "$IMAGES_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \)))

# Iterate over each found image
for image in "${IMAGES[@]}"; do
    COUNTER=$((COUNTER+1))
    echo "Found image #$COUNTER: $image"

    # Create the output filename by replacing the extension with .webp
    OUTPUT_IMAGE="${image%.*}.webp"

    # Convert the image to WebP format with quality 80
    cwebp -q 80 "$image" -o "$OUTPUT_IMAGE"

    # Check if the conversion was successful
    if [ $? -eq 0 ]; then
        echo "Converted $image to $OUTPUT_IMAGE"
        rm "$image"  # Delete the original image file
    else
        echo "Failed to convert $image"
    fi
done
