#!/bin/bash

COMPONENTS_DIR="./src/components"

COMPONENTS=($(find "$COMPONENTS_DIR" -type f -iname '*.tsx'))

for component in "${COMPONENTS[@]}"; do
    BASENAME=$(basename $component .tsx)

    NEW_DIR="$COMPONENTS_DIR/$BASENAME"

    mkdir -p $NEW_DIR

    mv $component "$NEW_DIR/"

    echo "Applied changes to component $BASENAME to $NEW_DIR"
done