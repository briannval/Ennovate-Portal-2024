#!/bin/bash

COUNTER=0

IMAGES_DIR="./public"

IMAGES=($(find "$IMAGES_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \)))

# Bash array reference
for image in "${IMAGES[@]}"; do
    COUNTER=$((COUNTER+1))
    echo "Found image #$COUNTER: $image"
done
