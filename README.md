# Link al deploy ( sin necesidad levantar local )
https://planit-8k5i.vercel.app/

# Credenciales del deploy
   CLIENTE
Usuario: cliente@gmail.com
Contraseña: 123

   EMPRESA
Usuario: empresa@gmail.com
Contraseña: 123

   ADMINISTRADOR
Usuario: administrador@gmail.com
Contraseña: 123

# PlanIt

Marketplace para organizar eventos: las empresas publican servicios y los clientes los guardan en un tablero.

## Qué necesitás antes

Instalá [Node.js](https://nodejs.org) 20 o más nuevo. Al instalarlo también queda `npm`, que es lo que usa el proyecto para bajar las librerías.

## Cómo levantarlo

1. Abrí una terminal en la carpeta del proyecto (la que tiene este archivo).
2. Instalá las dependencias, una sola vez:

   ```bash
   npm install
   ```

3. Pedile a alguien del grupo los archivos de configuración. Van dos, y no se suben a GitHub porque tienen claves:
   - `.env` en la raíz: conexión a la base, puerto de la API y Mercado Pago.
   - `apps/web/.env`: dirección y clave pública de Supabase, para subir fotos.

4. Arrancá el proyecto:

   ```bash
   npm run dev
   ```

Eso prende la API y la página al mismo tiempo, y abre el navegador. La página queda en http://localhost:5173 y la API en http://localhost:4000.

Para frenarlo, volvé a esa terminal y apretá `Ctrl + C`.
