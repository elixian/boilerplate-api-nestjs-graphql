FROM node:18.14.2

# Set working dir in the container to /
WORKDIR /app

# Copy application to /app directory and install dependencies
COPY package.json ./app
RUN npm install
COPY . .
# Expose port 8081 to the outside once the container has launched
EXPOSE 3001

# what should be executed when the Docker image is launching
CMD "npm run start:prod"
