# # Use an official Node.js runtime as a parent image
# FROM node:14

# # Set the working directory in the container
# WORKDIR /usr/src/app
# Use Ubuntu 20.04 LTS as the base image
FROM ubuntu:20.04

# Set environment variables to prevent interactive installation of packages
ENV DEBIAN_FRONTEND=noninteractive \
    TZ=UTC

# Update the package lists and install required packages
RUN apt-get update && \
    apt-get install -y \
    curl \
    gnupg

# Add Node.js repository and install Node.js
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Display Node.js and npm versions
RUN node -v && npm -v

# Cleanup unnecessary files
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/*


# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

WORKDIR /usr/src/app

# Expose the port where the app runs
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
