# Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de package.json y yarn.lock para instalar dependencias
COPY package.json yarn.lock ./

# Instala las dependencias de la aplicación
RUN yarn install --frozen-lockfile

# Copia el resto del código de la aplicación
COPY . .

# Compila el código TypeScript
RUN yarn build

# Expone el puerto que la aplicación usa
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["yarn", "start:prod"]