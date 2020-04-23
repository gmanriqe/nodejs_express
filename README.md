# NodeJS con Express

- BD tendrá tablas con entidades: Usuarios, Categorías y Productos

## MongoDB

- Para levantar el servidor:
brew services start mongodb-community

- Para restaurar el servidor:
brew services restart mongodb-community

- Para para el servidor:
brew services stop mongodb-community

- Interfaz gráfico seria: Robo 3t (Aqui creamos la conexión, la bd, las tablas)

- Por defecto por cada registro te crea un _id

## Git

- Luego de haber hecho el pull, debemos de colocar un tag al proyecto
git tag -a v0.0.1 "Alpha - Inicio de proyecto"

## Crear proyecto desde consola en Heroku

1- $heroku create (con este comando me crea un nombre de proyecto. En este caso pure-shelf-32994)
2- $git remote
3- $git remote -v
4- $git push heroku master (subir el proyecto a heroku)

Alternativo: git remote rm heroku (elimina el remoto del proyecto)