# Pokédex — React + PokeAPI

Una pequeña Pokédex web, minimalista y moderna, construida con **React** y
**Vite**, que consume datos en tiempo real de la [PokeAPI](https://pokeapi.co).

Permite:

- 🔎 Buscar Pokémon por **nombre** o por **número de Pokédex (ID)**.
- 🏷️ Filtrar por **categoría/tipo** (fuego, agua, planta, eléctrico, etc.).
- ⭐ Ordenar la lista del **más famoso al menos famoso**, usando un ranking
  curado a mano (ver la sección "Sobre el orden por fama" más abajo).
- 🃏 Hacer clic en cualquier tarjeta abre una **carta de detalle estilo TCG**
  (carta coleccionable), con PS, estadísticas, tipo, altura, peso y la
  descripción oficial del Pokémon.

---

## 1. Cómo está armado el proyecto

```
pokedex-react/
├── index.html                 # HTML base, carga las fuentes tipográficas
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                # Punto de entrada de React
    ├── App.jsx                 # Componente raíz: conecta todo
    ├── index.css                # Todos los estilos de la app
    ├── api/
    │   └── pokeapi.js           # Todas las llamadas a la PokeAPI viven acá
    ├── data/
    │   ├── typeColors.js        # Colores por tipo de Pokémon
    │   └── famousPokemon.js     # Ranking curado de "fama"
    ├── utils/
    │   └── sortPokemon.js       # Funciones de ordenamiento
    └── components/
        ├── SearchBar.jsx         # Input de búsqueda por nombre/ID
        ├── TypeFilter.jsx        # Chips de filtro por tipo
        ├── SortControl.jsx       # Botones de "ordenar por"
        ├── PokemonCard.jsx       # Tarjeta individual de Pokémon (clickeable)
        ├── PokemonGrid.jsx       # Grilla + carga progresiva ("Cargar más")
        └── PokemonModal.jsx      # Carta de detalle estilo TCG (al hacer clic)
```

Cada archivo tiene comentarios explicando **qué hace** y, más importante,
**por qué** está escrito así. La idea es que puedas leer el código de
arriba a abajo y entender las decisiones, no solo la sintaxis.

### Cómo fluyen los datos (resumen rápido)

1. Al abrir la página, `App.jsx` le pide a `api/pokeapi.js` la lista
   **completa** de nombres de Pokémon (liviana: solo nombre + ID).
2. Esa lista se guarda en memoria y sirve como "índice" local: buscar por
   nombre o número se hace filtrando ese arreglo en el navegador, **sin**
   volver a golpear la API en cada letra que escribís.
3. Si elegís un tipo (por ejemplo "fuego"), se pide a la API la lista de
   miembros de ese tipo específico (`/type/fire`) y se usa como base en
   lugar del índice completo.
4. La lista resultante (filtrada y ordenada) se le pasa a `PokemonGrid`,
   que va pidiendo los **detalles completos** (sprite, tipos, stats) solo
   de los Pokémon que realmente se están mostrando en pantalla, de a 24 a
   la vez, con el botón "Cargar más". Esto evita hacer miles de llamadas
   a la API de una sola vez.

---

## 2. Sobre el orden "por fama"

Este es un punto importante para ser honesto sobre los datos: **la PokeAPI
no tiene ningún concepto de popularidad o fama**. Es una API de datos
puros del juego (estadísticas, tipos, evoluciones, movimientos...).

Para poder ofrecer el orden "del más famoso al menos famoso" que pediste,
armé un diccionario curado a mano en `src/data/famousPokemon.js`, con un
puntaje aproximado para los Pokémon más icónicos (protagonistas del anime,
mascotas de los juegos, memes conocidos, etc.). Cualquier Pokémon que no
esté en esa lista se considera "fama 0" y se ordena al final, por número
de Pokédex.

Es una heurística nuestra, no un dato oficial — lo aclaro también dentro
del propio código para que quede documentado.

---

## 3. Diseño: por qué se ve como se ve

- **Fondo neutro, colores que vienen de los datos:** en vez de un único
  color de marca, cada tarjeta toma el color de su tipo de Pokémon como
  franja superior. La variedad de color de la página la genera el
  contenido, no una paleta decorativa fija.
- **Tipografía en 3 roles:** *Space Grotesk* para títulos (personalidad),
  *Inter* para texto general (legibilidad) y *JetBrains Mono* para los
  números de Pokédex y datos, para que se sientan "escaneados" como un
  catálogo real.
- **Sin exceso de animación:** solo hay una aparición suave de las
  tarjetas y un leve efecto al pasar el mouse. Se respeta también la
  preferencia de "reducir movimiento" del sistema operativo, para
  personas sensibles a las animaciones.

---

## 4. Cómo tener una vista previa (paso a paso)

Necesitás tener instalado **Node.js** (versión 18 o superior). Podés
verificarlo así:

```bash
node -v
```

Si no lo tenés, descargalo desde [nodejs.org](https://nodejs.org).

### Paso 1: Instalar las dependencias

Abrí una terminal dentro de la carpeta `pokedex-react` y corré:

```bash
npm install
```

Esto va a descargar React, Vite y las demás librerías que el proyecto
necesita (se guardan en una carpeta `node_modules`, que no se sube a
ningún lado).

### Paso 2: Levantar el servidor de desarrollo

```bash
npm run dev
```

La terminal te va a mostrar algo como:

```
  VITE ready
  ➜  Local:   http://localhost:5173/
```

Abrí esa dirección (`http://localhost:5173`) en tu navegador y ya vas a
ver la Pokédex funcionando, consumiendo datos reales de la PokeAPI. Cada
vez que guardes un cambio en el código, la página se va a actualizar sola.

### Paso 3 (opcional): generar una versión final para publicar

Si en algún momento querés subir esto a un hosting (Vercel, Netlify,
GitHub Pages, etc.), primero generá la versión optimizada:

```bash
npm run build
```

Esto crea una carpeta `dist/` con HTML, CSS y JS ya optimizados, lista
para subir a cualquier hosting de archivos estáticos. Para revisarla
localmente antes de publicar:

```bash
npm run preview
```

---

## 5. Créditos

- Datos de Pokémon: [PokeAPI](https://pokeapi.co) (API pública, gratuita,
  sin necesidad de API key).
- Proyecto hecho con [React](https://react.dev) y [Vite](https://vitejs.dev).
- Sin fines comerciales — Pokémon es una marca registrada de Nintendo /
  Game Freak / The Pokémon Company; este proyecto es solo para fines de
  aprendizaje.
