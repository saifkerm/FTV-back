FROM node:18.10.0
WORKDIR /fdj-test
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD ["npm", "start"]