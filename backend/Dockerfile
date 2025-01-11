# Use the official Node.js image with version 18
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only the package files to leverage Docker caching
COPY package*.json /usr/src/app/

# Install dependencies
RUN npm install --production

# Copy the rest of your project files into the container
COPY . /usr/src/app/

# Expose the port your app will run on (default: 3000)
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
