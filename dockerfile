# Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de package.json y yarn.lock para instalar dependencias
COPY package.json yarn.lock ./

# Verificar los archivos copiados
RUN cat package.json

# Instala las dependencias de la aplicación
RUN yarn install --frozen-lockfile

# Copia el resto del código de la aplicación
COPY . .

# Compila el código TypeScript
RUN yarn build

# Expone el puerto que la aplicación usa
EXPOSE 3000

# Asegurarte de que siempre use el último archivo
RUN ls -la

# Comando para ejecutar la aplicación
CMD ["yarn", "start:prod"]

