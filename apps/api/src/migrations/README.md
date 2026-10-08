# Migraciones

`001-schema-completo.sql` es la fuente de verdad: define el esquema completo
tal cual debe quedar la base en Supabase (tablas, índices, RLS). Se ejecuta
una sola vez, a mano, desde el SQL Editor de Supabase.

No hay ninguna herramienta que lleve registro de qué migraciones corrieron;
por eso se mantiene un único archivo consolidado en lugar de una cadena de
pasos incrementales que haya que aplicar en orden.

## archive/ 

Contiene las migraciones incrementales (`add-*` / `create-*`) que se usaron
mientras se iba diseñando el esquema. Ya están todas incorporadas en
`001-schema-completo.sql`, así que no hace falta (ni corresponde) volver a
ejecutarlas. Se conservan solo como referencia histórica.

## Scripts de datos

`apps/api/scripts/sql/hash-passwords.sql` no es una migración de esquema,
sino un script puntual para re-hashear contraseñas existentes. Por eso vive
en `scripts/`, separado de las migraciones de esquema.
