<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description Crypto api

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Iniciar proyecto

```bash
clonar proyecto
clonar archivo env.template y renombrarlo a env
cambiar variables de entorno

levantar base de datos
$ docker-compose up -d
```

## Correr la app

```bash
# watch mode
$ yarn run start:dev
```

## Crear/agregar una criptomoneda

```bash
run endpoint
Post : http://localhost:3000/api/crypto

Ejemplo
{
  "nombre": "Ethereum",
  "ticker": "ETH",
  "precioCompra": 3200.75,
  "cantidadComprada": 10
}


```

## Comprar una criptomoneda

```bash
run endpoint
Post :http://localhost:3000/api/crypto/buy-more/

Ejemplo
{
  "ticker": "ETH",
  "amount": 3
}


```

````

## Login Usuario

```bash
run endpoint
Post :http://localhost:3000/api/auth/login

Ejemplo
{
    "email": "donaldd@example.com",
    "password": "securePassword123"
}


````

## Registrar Usuario

```bash
run endpoint
Post :http://localhost:3000/api/auth/register

Ejemplo
{
  "email": "rick@example.com",
  "password": "securePassword123",
  "name": "Rick Mendez"
}


```
