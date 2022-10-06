FROM node:18.10.0
WORKDIR /FTV
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD ["npm", "start"]