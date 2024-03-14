FROM node:18-alpine

ENV PORT=3000
ENV PG_URI=postgres://gzvawjmm:ILeLqDyoTm2z6GmYqD0BrJUYgmv7jooH@drona.db.elephantsql.com/gzvawjmm
ENV mongoURI=mongodb+srv://mongolianjake:ByQsu25KqmJlearg@solo.kvjbhkk.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp
ENV JWT_SECRET=CODESMITH123

WORKDIR /tangerine/
COPY client/ /tangerine/client
COPY server/ /tangerine/server
COPY package.json /tangerine/

RUN npm install
CMD ["npm", "run", "dev"]