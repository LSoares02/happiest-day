FROM node:16

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install

COPY server /app/server
COPY build /app/build

ENV NODE_ENV production
ENV PORT 5000

EXPOSE 5000

CMD ["npm", "start"]