# 📄 Documentación del Desarrollo Backend

## Proyecto

Sitio Web de Instituciones Educativas

## Descripción

Desarrollo de un sistema web para el registro de alumnos de un colegio o cualquier institución educativa, con control de grados\*, materias y actividad docente.

## Tecnologías Utilizadas

- Lenguaje de Programación: TypeScript
- Entorno de Ejecución: Node.js - NestJs
- Framework de Desarrollo Web: React
- Base de Datos: Mysql
- Sistema de Gestión de Versiones: Git

## Diagrama de Entidades /MER - DER

> https://miro.com/app/board/uXjVMr2AvLo=/

## Repositorio Git

> https://github.com/zapiralos/aulasIT.git

## Estructura del Proyecto

Estructuramiento según NestJs, donde cada Componente tiene en carpeta sus servicios, controles, entidad, rutas, etc.

```Bash
/aulasIT
    ├── /src
    │   ├── /auth
    │   ├── /base
    │   ├── /modes
    │   ├── /courses
    │   ├── /positions
    │   ├── /sector
    │   ├── /users
    │   ├── /utils
    │   ├── app.ts
    │   ├── typeorm-config.ts
    │   ├── ...
    │
    ├── package.json
    ├── package-lock.json

```

## Funcionalidades:

> Roles de usuario: administrador, profesor, estudiante, mantenimiento.

> Gestión de usuario:

- Registro
- Login
- Edición de Perfil

> Gestión de Administrador:

> > Roles de Usuario para controlar el acceso a funciones específicas.

- Edición: Asignación de Roles
- Eliminación

> > Asignación de profesores a Cursos.

> > Gestión de Cursos:

- Creación y gestión de cursos.

> Autenticación y Seguridad

## API´s

El backend expone una API RESTful que permite a los desarrolladores frontend interactuar con la aplicación. Los puntos finales principales incluyen:

```bash
Usuarios:
GET / POST :
/api/v1/users/
GET ID / PUT / DELETE:
/api/v1/users/:ID

Login:
/api/v1/auth/login/

Cursos:
GET / POST :
/api/v1/curses/
GET ID / PUT / DELETE:
/api/v1/curses/:ID

Sector:
GET / POST :
/api/v1/sectors/
GET ID / PUT / DELETE:
/api/v1/sectors/:ID

Modos:
GET / POST :
/api/v1/modes/
GET ID / PUT / DELETE:
/api/v1/modes/:ID

```

### 🔎 Test de API´s

> <font color="yellow">**GET**</font> // listado de todos los users

```bash
url/api/v1/users/
```

> <font color="yellow">**GET**</font> // Arroja un user especifico

```bash
url/api/v1/users/id de usuario a mostrar
```

> <font color="yellow">**POST**</font> // Crea un usuario (Registro)

```bash
url/api/v1/users/
```

Petición por body tipo JSON:

```bash
{
    "email": "email",
    "confirmEmail": "email",
    "password": "contraseña",
    "confirmPassword": "contraseña",
    "firstName": "nombre",
    "lastName": "apellido",
    "address": "dirección",
    "phoneNumber": numeroTelefonico,
    "birthDate": "fecha de nacimiento",
    "guardian": "nombre y apellido"
}
```

Validación de Datos:
| Campo | Tipo | Validación |
| :--- | :----: | :--- |
| email | string | no puede estar vacío, formato email |
| confirmEmail | string | no puede estar vacío, formato email, igual al email |
| password | string | no puede estar vacío, min: 8, max:100 |
| confirmPassword | string | no puede estar vacío, min: 8, max:100, igual al password |
| firstName | string | no puede estar vacío, Min: 2, Max:50 |
| lastName | string | no puede estar vacío, Min: 2, Max:50 |
| address | string | opcional, Max: 100 |
| phoneNumber | int | no puede estar vacío |
| birthDate | date | validación ISO 8601 |
| guardian | string | no puede estar vacío, Max: 100 |
| socialWellfareId | int | opcional |

<br>

> <font color="yellow">**PUT**</font> // Modifica 1 usuario (Edición)

```bash
url/api/v1/users/id de usuario a modificar
```

Petición por body tipo JSON:

```json
{
    "email": "email",
    "confirmEmail": "email",
    "password": "contraseña",
    "confirmPassword": "contraseña",
    "address": "dirección",
    "phoneNumber": numeroTelefonico,
    "guardian": "nombre y apellido"
}
```

Validación de Datos:
| Campo | Tipo | Validación |
| :--- | :----: | :--- |
| email | string | opcional, formato email |
| confirmEmail | string | opcional, formato email, igual al email |
| password | string | opcional, min: 8, max:100 |
| confirmPassword | string | opcional, min: 8, max:100, igual al password |
| address | string | opcional, Max: 100 |
| phoneNumber | int | opcional |
| guardian | string | opcional, Max: 100 |

<br>

> <font color="yellow">**DELETE**</font> // listado de todos los users

```bash
url/api/v1/users/id de usuario a borrar
```

<br>

## Instalación y Despliegue

Para configuración del entorno de desarrollo, hace falta clonar repositorio desde Git. Tener NodeJS instalado y correr la siguiente linea de comando desde VsCode:

```Bash
npm i
```

Para poder tener todos las dependencias necesarias.
Luego ejecutar el comando de ejecusión en desarrollo:

```Bash
npm run dev
```

## Configuración

Configuración de conexión a la base de datos:

```Bash
/aulasIT
    ├── /src
    │   │   ├── typeorm-config.ts  //archivo de conexión a Base de datos
    │   ├── ...
    │   ...

```

## Instrucciones para desplegar la aplicación en un servidor de producción.

Para poder ejecutar el deploy y subir el proyecto al servidor, ejecutar:

```Bash
npm build
```

## Comandos para ejecutar migraciones y cargar datos iniciales.

## Contribución

## Normas de codificación y convenciones de estilo.

## Proceso de revisión de código.

## Flujo de trabajo de contribución a través de Git.

## Contacto

Punto de contacto para consultas y problemas técnicos:

Juan Lischetti - lischetti.juan@gmail.com

Facundo Rocha - facundo.rocha@outlook.com

Carlos Rubio - carlosreyniery@gmail.com

Javier Solari Paz - zapiralos@gmail.com
