 # Use an official Node.js runtime as a parent image
FROM node:18.19.0 as build
LABEL authors="migue"


# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Build the Angular app for production
RUN ng build

# Use an official Nginx runtime as the final image
FROM nginx:alpine

# Copy the built Angular app from the 'build' stage to the nginx 'html' directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
