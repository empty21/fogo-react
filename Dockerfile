FROM node:14-alpine
# Create app directory
EXPOSE 5000
WORKDIR /app
# Install app dependencies
ADD package*.json /app/
RUN npm install -f
# Copy app source code
ADD . /app
#Expose port and start application
RUN npm run build

CMD [ "npm", "run", "serve" ]