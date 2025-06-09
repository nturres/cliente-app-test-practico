# Cliente App

Este repositorio contiene dos proyectos principales:

- **cliente-api/**: API REST desarrollada en .NET 9 + SQL Server.
- **cliente-web/**: Aplicación web desarrollada en Angular 20.

## Requisitos Previos

- Node.js (recomendado v18+)
- .NET 9 SDK
- SQL Server (puede ser local o en contenedor Docker)
- Angular CLI (`npm install -g @angular/cli`)

---

## Configuración del Backend (cliente-api)

1. **Base de Datos**

   - Asegúrate de tener SQL Server corriendo en `localhost:1433`.
   - El script de base de datos se encuentra en [`cliente-api/app (data and structure).sql`](<cliente-api/app%20(data%20and%20structure).sql>).
   - Ejecuta el script en tu SQL Server para crear la base de datos, usuario y datos de prueba.

2. **Configuración de la conexión**

   - El archivo [`cliente-api/appsettings.json`](cliente-api/appsettings.json) ya viene configurado para conectarse a `localhost:1433` con usuario `usr_app` y contraseña `7GHLEOft73T1`.
   - Si tu SQL Server está en otro host/puerto o usas otras credenciales, actualiza la cadena de conexión en ese archivo.

3. **Ejecutar la API**

   - **Desde Visual Studio:**  
     Pulsa F5 y selecciona el perfil `IIS Express` o `cliente-api` según prefieras.

   - **Desde terminal:**

     ```sh
     cd cliente-api
     dotnet restore
     dotnet build
     dotnet run
     ```

     Por defecto, la API se expone en `http://localhost:5176` (ver [`cliente-api/Properties/launchSettings.json`](cliente-api/Properties/launchSettings.json)).

   - Puedes probar los endpoints en Swagger:
     - Kestrel: `http://localhost:5176/swagger`
     - IIS Express: `https://localhost:44368/swagger`

---

## Configuración del Frontend (cliente-web)

1. **Instalar dependencias**

   ```sh
   cd cliente-web
   npm install
   ```

2. **Configurar URL de la API**

   - Por defecto, el frontend apunta a `https://localhost:44368/api` (IIS Express, recomendado si ejecutas desde Visual Studio).
   - Si ejecutas la API desde terminal (`dotnet run`), la URL será `http://localhost:5176/api` (ver [`cliente-api/Properties/launchSettings.json`](cliente-api/Properties/launchSettings.json)).
   - Si tu API corre en otro puerto o protocolo, actualiza la variable `apiUrl` en los archivos de environment.

3. **Ejecutar la aplicación Angular**

   ```sh
   npm start
   ```

   - Accede a la app en [http://localhost:4200](http://localhost:4200)

---

## Notas

- Si usas Docker para SQL Server, puedes levantarlo con:

  ```sh
  docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Your_password123" -p 1433:1433 mcr.microsoft.com/mssql/server:2022-latest
  ```

  Luego, ajusta la cadena de conexión en `appsettings.json` según corresponda.

- El frontend y backend están desacoplados, pero debes asegurarte de que ambos puedan comunicarse (CORS ya está habilitado en la API).

---

## Scripts útiles

- **Levantar backend:**  
  `cd cliente-api && dotnet run`

- **Levantar frontend:**  
  `cd cliente-web && npm start`

- **Ejecutar tests Angular:**  
  `cd cliente-web && npm test`

---

## Contacto

Para dudas o problemas, abre un issue en el repositorio.

---
