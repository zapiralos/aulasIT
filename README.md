# Documentación del Desarrollo Backend

## Proyecto

Sitio Web de Instituciones Educativas

## Descripción

Desarrollo de un sistema web para el registro de alumnos de un colegio o cualquier institución educativa, con control de grados\*, materias y actividad docente.

## Tecnologías Utilizadas

- Lenguaje de Programación: TypeScript
- Entorno de Ejecución: Node.js
- Framework de Desarrollo Web: Express.js
- Base de Datos: Mysql
- Sistema de Gestión de Versiones: Git

## Estructura del Proyecto

```Bash
/aulasIT
    ├── /src
    │   ├── /auth
    │   ├── /base
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

> Gestión de usuario:

- Login
- Registro
- Edición de Perfil

> Roles de usuario: administrador, profesor, estudiante, mantenimiento.

> Gestión de Programas Académicos:

- Creación
- Edición y eliminación de programas académicos.

> Asignación de profesores a programas académicos.

> Gestión de Cursos:

- Creación y gestión de cursos para programas académicos.

> Gestión de Inscripciones:
> Inscripción de estudiantes en cursos.

> Gestión de Contacto:
> Recepción y respuesta a consultas de contacto.

> Autenticación y Seguridad

> Uso de tokens JWT para autenticación de usuarios.

> Roles de usuario para controlar el acceso a funciones específicas.

> Seguridad de contraseñas mediante hashing.

## API´s

El backend expone una API RESTful que permite a los desarrolladores frontend interactuar con la aplicación. Los puntos finales principales incluyen:

```bash

/api/v1/login/ Validación de login
/api/v1/users/: CRUD de usuarios.
/api/v1/sector/: CRUD de sectores.
/api/v1/courses/: CRUD de cursos.
/api/v1/positions/: CRUD de positions.

```

## Diagrama de Entidades /MER - DER

> https://miro.com/app/board/uXjVMr2AvLo=/

## Repositorio Git

> https://github.com/zapiralos/aulasIT.git

## Instalación y Despliegue

Para configuración del entorno de desarrollo, hace falta clonar repositorio desde Git. Tener NodeJS instalado y correr la siguiente linea de comando desde VsCode:

```Bash
npm i
```

Para poder tener todos las dependencias necesarias.

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
