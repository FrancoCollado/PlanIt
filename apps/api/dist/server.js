// Placeholder committed a proposito.
//
// Vercel Services (beta) valida que el archivo de `entrypoint` exista ANTES
// de correr el `buildCommand` del servicio (ver
// https://github.com/vercel/vercel/issues/17651). Sin este placeholder, el
// deploy falla con "Service \"api\" has entrypoint ... but that path does
// not exist" sin siquiera intentar instalar/compilar nada.
//
// En un build real (`npm run build`, que corre `tsc`), este archivo se
// sobreescribe por completo con el server compilado desde src/server.ts.
// Si ves este mensaje en producción, el paso de build no se ejecutó.
throw new Error('apps/api/dist/server.js es un placeholder: el build (`npm run build`) no lo sobreescribió.');
