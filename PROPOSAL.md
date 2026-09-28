# Propuesta TP DSW[cite: 1]

## Grupo[cite: 1]
### Integrantes[cite: 1]
* legajo - Apellido(s), Nombre(s)[cite: 1]

### Repositorios[cite: 1]
* [frontend app](http://hyperlinkToGihubOrGitlab)[cite: 1]
* [backend app](http://hyperlinkToGihubOrGitlab)[cite: 1]

## Tema[cite: 1]
### Descripción[cite: 1]
Una aplicación estilo “marketplace” para bienes y servicios relacionados a eventos, donde las personas puedan acceder en un solo lugar a diferentes propuestas por parte de los negocios. Nuestra intención es que la persona pueda organizar el evento en su totalidad a través de la app, es una especie de vidriera virtual.

### Modelo[cite: 1]
![Dsp subo modelo]()[cite: 1]

## Alcance Funcional[cite: 1]

### Alcance Mínimo[cite: 1]

Regularidad:[cite: 1]
| Req | Detalle |
| :--- | :--- |
| **CRUD simple**[cite: 1] | 1. CRUD Eventos<br>2. CRUD Usuarios<br>3. CRUD Categoría |
| **CRUD dependiente**[cite: 1] | 1. CRUD de Servicios {depende de} Categoría<br>2. CRUD de Tablero {depende de} Cliente |
| **Listado + detalle**[cite: 1] | 1. Listado de servicios filtrado por categoría => detalle incluido en cada card<br>2. Listado de servicios filtrado por evento => detalle incluido en cada card |
| **CUU/Epic**[cite: 1] | 1. Suspensión de la empresa por parte del administrador<br>2. Publicación de un nuevo servicio con fotos y precios<br>3. Guardado de servicio dentro del tablero |

Adicionales para Aprobación[cite: 1]
| Req | Detalle |
| :--- | :--- |
| **CRUD**[cite: 1] | 1. CRUD Eventos<br>2. CRUD Usuarios<br>3. CRUD Categoría<br>4. CRUD Servicios<br>5. CRUD Tablero |
| **CUU/Epic**[cite: 1] | 1. Suspensión de la empresa por parte del administrador<br>2. Publicación de un nuevo servicio con fotos y precios<br>3. Guardado de servicio dentro del tablero |


### Alcance Adicional Voluntario[cite: 1]

| Req | Detalle |
| :--- | :--- |
| **Listados**[cite: 1] | 1. Filtrar servicio por atributo zona<br>2. Filtrar servicio por empresa (por nombre, ej. filtrar los servicios de “Marta Cura”) |
| **Otros**[cite: 1] | 1. Verificación de login a través de un código de un solo uso enviado al email |
