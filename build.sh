#!/bin/bash

# 1. Navigate to the functions directory and install dependencies
echo "Installing function dependencies..."
cd netlify/functions || exit 1 # Exit if cd fails
npm install || exit 1          # Exit if npm install fails

# 2. Navigate back to the project root
echo "Navigating back to root..."
cd ../.. || exit 1

# 3. Run the main application build
echo "Running main application build..."
npm run build || exit 1