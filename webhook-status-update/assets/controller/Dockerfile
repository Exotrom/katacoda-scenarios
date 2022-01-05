FROM node:17-alpine3.14
RUN mkdir -p /app
WORKDIR /app
COPY ./ /app
RUN npm ci
CMD ["npm", "start"]