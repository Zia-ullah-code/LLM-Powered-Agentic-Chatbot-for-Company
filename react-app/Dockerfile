FROM node:18
WORKDIR /app
COPY package*.json ./
#RUN npm install react-tooltip react-icons react-markdown
RUN npm install
COPY . .
CMD ["npm", "start"]