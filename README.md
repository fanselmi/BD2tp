Proyecto creado para la materia Base de Datos II, el grupo está conformado
por Facundo Anselmi, Micaela Capart, Santiago Ferraris y Mateo Ruiz.

Se puede ver una idea del trabajo en la siguiente presentación:

https://docs.google.com/presentation/d/1iFELmWT6ZdeTQ93Znkz6T-tXRvNRainUQbls91H9gHU

# Instalación
Para poder correr el proyecto, se debe tener instalado:

- Angular 13.3.8
- DynamoDB corriendo localmente con Docker
- Redis Server, instalado con el comando: sudo apt install redis-server

# Redis
Para tener redis corriendo, basta con ingresar el siguiente comando en la terminal: redis-server

Esto provee un servidor local de redis, que se utilizará en el proyecto para el caching de las urls.
# BackEnd
Para correr el BackEnd es necesario tener el servidor de redis corriendo.
Luego, pararse /BD2tp/backend y seguir los siguientes pasos:
- npm install
- npm run start

Luego, el servidor debería estar corriendo

#DynamoDB
Para que la base de datos funcione con el proyecto, primero hay que tener un container de Docker corriendo localmente en la computadora.

Luego, cambiar los siguientes datos de configuración en /BD2tp/backend/src/db/client.ts, de la línea 4 a la linea 11

    new DynamoDBClient({
        region: 'your-region', //por default, esta 'us-east-1'
        endpoint: 'your-dynamo-addr', //por default, http://localhost:8000',
        credentials: {
        accessKeyId: "your-dynamo-access-key-id", //por default, "1234",
        secretAccessKey: "your-dynamo-secret-access-key"//por default, "567890"
        }   
    })

Si se cambio la configuración default, es necesario reiniciar el servidor, si esta estaba corriendo.

Para crear las tablas, es necesario haber corrido primero el servidor backend.
Si se pudo correr, se debería haber creado una carpeta "dist" dentro del proyecto.

Posicionarse en BD2tp/backend/dist/db, y correr los siguientes comandos por terminal:

- node model.js (crea la tabla)
- node ttl.js (le agrega el ttl a la tabla)

Luego, está lista la Base de Datos para almacenar las urls.

# Frontend
Posicionarse en  /BD2tp/frontend y seguir los siguientes pasos:
- npm install
- npm run start

Luego, el frontend debería estar corriendo
