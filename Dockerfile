  
# use an official node runtime as the base image
FROM node:10.16.0-alpine

# set the (container) working directory
WORKDIR /app

# copy current (local) directory contents into the container
COPY . /app

# install dependencies
RUN npm install -g create-react-app && npm install

# make port available to the world outside this container
EXPOSE 3000

# run when the container launches
CMD ["npm", "start"]
