Use master;
-- 1. Crear la base de datos 'App' si no existe
IF DB_ID('App') IS NULL
BEGIN
    CREATE DATABASE App;
END
GO

-- 2. Usar la base de datos 'App'
USE App;
GO

-- 3. Crear la tabla 'Clientes' si no existe
IF OBJECT_ID('Clientes', 'U') IS NULL
BEGIN
    CREATE TABLE Clientes (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nombre NVARCHAR(100) NOT NULL,
        Telefono NVARCHAR(20) NOT NULL,
        Pais NVARCHAR(50) NOT NULL
    );
END
GO

-- 4. Insertar 100 registros de prueba si aún no hay datos
IF NOT EXISTS (SELECT 1 FROM Clientes)
BEGIN
    DECLARE @i INT = 1;
    WHILE @i <= 100
    BEGIN
        INSERT INTO Clientes (Nombre, Telefono, Pais)
        VALUES (
            CONCAT('Cliente ', @i),
            CONCAT('569', FORMAT(CAST(RAND(CHECKSUM(NEWID())) * 100000000 AS INT), '00000000')), -- teléfonos tipo 5612345678
            CASE 
                WHEN @i % 5 = 0 THEN 'Chile'
                WHEN @i % 5 = 1 THEN 'Argentina'
                WHEN @i % 5 = 2 THEN 'México'
                WHEN @i % 5 = 3 THEN 'Colombia'
                WHEN @i % 5 = 4 THEN 'Brazil'
                WHEN @i % 5 = 5 THEN 'Uruguay'
                WHEN @i % 5 = 6 THEN 'Venezuela'
                ELSE 'Perú'
            END
        );
        SET @i = @i + 1;
    END
END
GO

-- 5. Crear el procedimiento almacenado para paginación
IF OBJECT_ID('GetClientesPaginados', 'P') IS NOT NULL
    DROP PROCEDURE GetClientesPaginados;
GO

CREATE PROCEDURE GetClientesPaginados
  @Page INT,
  @Size INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT * FROM Clientes
    ORDER BY Id
    OFFSET (@Page - 1) * @Size ROWS
    FETCH NEXT @Size ROWS ONLY;
END
GO

-- Creacion de Usuario de la BD
USE master;
GO

DECLARE @User NVARCHAR(50) = 'usr_app';
DECLARE @Password NVARCHAR(100) = '7GHLEOft73T1';
DECLARE @SQL NVARCHAR(MAX);

-- Verificar si el inicio de sesión ya existe antes de crearlo
IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = @User)
BEGIN
    PRINT 'Creando el inicio de sesión ' + @User + '...';
    SET @SQL = 'CREATE LOGIN ' + QUOTENAME(@User) + ' WITH PASSWORD = ''' + @Password + ''', CHECK_POLICY = OFF;';
    EXEC sp_executesql @SQL;
END
ELSE
BEGIN
    PRINT 'El inicio de sesión ' + @User + ' ya existe.';
END
GO

-- Cambiar al contexto de la base de datos BaseIntranet
USE App;
GO

-- Verificar si el usuario ya existe antes de crearlo
IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = 'usr_app')
BEGIN
    PRINT 'Creando el usuario usr_app en la base de datos App...';
    CREATE USER usr_app FOR LOGIN usr_app;
END
ELSE
BEGIN
    PRINT 'El usuario usr_app ya existe en la base de datos App.';
END
GO

-- Agregar el usuario al rol db_owner si no es miembro aún
IF NOT EXISTS (
    SELECT 1 FROM sys.database_role_members drm
    JOIN sys.database_principals dp ON drm.role_principal_id = dp.principal_id
    WHERE dp.name = 'db_owner'
    AND drm.member_principal_id = DATABASE_PRINCIPAL_ID('usr_app')
)
BEGIN
    PRINT 'Asignando rol db_owner a usr_app...';
    ALTER ROLE db_owner ADD MEMBER usr_app;
END
ELSE
BEGIN
    PRINT 'El usuario usr_app ya tiene el rol db_owner.';
END
GO
-- Fin Creacion de Usuario de la BD
