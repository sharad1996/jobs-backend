FROM node:12

# Create app directory in container
RUN mkdir -p /usr/src/app

# Set /app directory as default working directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json .

# If you are building your code for production
# RUN npm install --only=production
RUN npm install --only=production

# Copy all file from current dir to /app in container
COPY . .

# Label the app
LABEL appname="jobs api"

# CMD to start service
CMD [ "npm", "start" ]
