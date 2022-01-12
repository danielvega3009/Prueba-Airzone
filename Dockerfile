#Establece la imagen base
FROM node:latest

#metadatos
LABEL "cl.apgca.appNode"="Prueba Airzone"
LABEL maintainer= "Daniel Vega"
LABEL version = "1.0"

#directorio de trabajo
RUN mkdir -p /home/app

#directorio de trabajo
WORKDIR /home/app 

#instala los paquetes existetnes en package.json
COPY package.json .
RUN npm install --quiet

#instalación modemon
RUN npm install nodemon -g --quiet

#copia la aplicación
COPY ..

#expone la aplicación en el puerto 8000
EXPOSE 8000

#inicia la aplicación al iniciar el contenedor
CMD nodemon -L --watch . index.js