# Imágenes pendientes de CAMICREA

Este archivo lista todas las imágenes que el sitio está preparado para
recibir, pero que todavía no existen. Mientras no se agreguen, el sitio
muestra marcadores visuales elegantes hechos con HTML y CSS (cajas con
degradados de color y texto), así que **el sitio funciona igual sin ellas**.

Cuando tengas cada imagen, guárdala dentro de esta misma carpeta (`assets/`)
con el nombre indicado, y avísame (o edítalo tú misma siguiendo el README)
para conectarla en el HTML.

---

## 1. Logo de CAMICREA — ✅ agregado

- **Archivo:** `logo-camicrea.png` (recortado y con fondo transparente, 1044 × 346 px)
- **Dónde aparece:** Encabezado del sitio (`.logo-img`) y pie de página (`.footer-logo-img`, invertido a blanco con CSS para leerse sobre el fondo burdeos oscuro)
- **Texto alternativo usado:** "CamiCrea Estudio Creativo"
- Si más adelante quieres reemplazarlo por otra versión, guarda el nuevo archivo con el mismo nombre (`logo-camicrea.png`) dentro de `assets/` y listo — no hace falta tocar el HTML.

## 2. Fotografía de Camila (sección "Sobre mí") — ✅ agregada

- **Archivo:** `assets/sobre-mi/camila-henriquez.jpg` (900 × 1350 px, proporción 2:3, optimizada a ~240 KB)
- **Dónde aparece:** Sección "Hola, soy Camila" (`.sobre-mi-imagen`)
- **Texto alternativo usado:** "Camila Henríquez, publicista y creadora de CamiCrea"
- Si más adelante quieres reemplazarla por otra fotografía, guarda el nuevo archivo con el mismo nombre dentro de `assets/sobre-mi/` y listo — no hace falta tocar el HTML. Mantén una proporción cercana a 2:3 (más alta que ancha) para que se vea igual de bien sin recortes forzados.

## 3. Portada del Método 369

- **Archivo sugerido:** `metodo-369-portada.png`
- **Medidas sugeridas:** 1000 × 1250 px aprox.
- **Dónde aparece:** Sección "Productos digitales" (`.producto-imagen`), en reemplazo del marcador "Plantilla Método 369"
- **Texto alternativo sugerido:** "Portada de la Plantilla Método 369 de CAMICREA"

## 4. Páginas interiores del Método 369

- **Archivos sugeridos:** `metodo-369-interior-01.png`, `metodo-369-interior-02.png`, `metodo-369-interior-03.png` (agregar tantas como quieras mostrar)
- **Medidas sugeridas:** 1000 × 1250 px aprox. cada una
- **Dónde aparece:** Se pueden incorporar como una pequeña galería dentro de la tarjeta del producto destacado (`.producto-destacado`)
- **Texto alternativo sugerido:** "Página interior de la Plantilla Método 369 — [describir brevemente qué muestra, por ejemplo: espacio para escribir intención matutina]"

## 5. Imagen para compartir en redes (Open Graph)

- **Archivo sugerido:** `og-camicrea.jpg`
- **Medidas sugeridas:** 1200 × 630 px
- **Dónde aparece:** Metaetiqueta `og:image` en `index.html` (vista previa al compartir el sitio en redes sociales o WhatsApp)
- **Texto alternativo sugerido:** no aplica (imagen de vista previa, no lleva `alt` visible)

## 6. Imágenes del portafolio

- **Archivos sugeridos:**
  - `proyecto-medical-store.jpg` — Medical Store y Ortopedia & Uniformes Pro
  - `proyecto-siempre-estuvieron-ahi.jpg` — Siempre estuvieron ahí
  - `proyecto-oncomamas.jpg` — Oncomamás — 10 años bajo un mismo paraguas
  - `proyecto-bless.jpg` — Bless
  - `proyecto-kitkat.jpg` — KitKat
  - `proyecto-06.jpg` — próximo proyecto a definir
- **Medidas sugeridas:** 1000 × 625 px aprox. (proporción 16:10, igual que el marcador actual)
- **Dónde aparece:** Sección "Portafolio" (`.proyecto-imagen`), una por cada tarjeta de proyecto
- **Texto alternativo sugerido:** "Proyecto [nombre de la marca o cliente] — [breve descripción del trabajo realizado]"

---

## 7. Página de detalle — KitKat (`proyecto-kitkat.html`)

- **Archivos sugeridos:**
  - `kitkat-portada.jpg` — imagen o pieza principal de la campaña (reemplaza el marcador de degradado en la portada)
  - `kitkat-pieza-01.jpg`, `kitkat-pieza-02.jpg`, `kitkat-pieza-03.jpg`, `kitkat-pieza-04.jpg` — piezas, mockups o capturas de la campaña para la galería (se puede agregar o quitar tarjetas según cuántas imágenes tengas)
- **Medidas sugeridas:** portada 1600 × 900 px aprox.; piezas de galería 800 × 600 px aprox. (proporción 4:3, igual que el marcador actual)
- **Dónde aparece:** `proyecto-kitkat.html`, secciones "Portada" (`.detalle-proyecto-visual`) y "Galería" (`.galeria-proyecto-item`)
- **Texto alternativo sugerido:** portada "Campaña KitKat — La vida te da un wate… cuando necesitas un break"; piezas de galería "Pieza de la campaña KitKat — [breve descripción, por ejemplo: publicación para Instagram / mockup de afiche / video de campaña]"
- Este mismo patrón de página (`proyecto-<nombre>.html`) puede reutilizarse para los demás casos del portafolio (Bless, etc.) cuando tengas su información y piezas.

---

## 8. Página de detalle — Oncomamás (`proyecto-oncomamas.html`)

- **Archivos sugeridos:**
  - `oncomamas-portada.jpg` — imagen o pieza principal de la campaña (reemplaza el marcador de degradado en la portada)
  - `oncomamas-pieza-01.jpg`, `oncomamas-pieza-02.jpg`, `oncomamas-pieza-03.jpg`, `oncomamas-pieza-04.jpg` — piezas, mockups o capturas de la campaña para la galería
- **Medidas sugeridas:** portada 1600 × 900 px aprox.; piezas de galería 800 × 600 px aprox. (proporción 4:3, igual que el marcador actual)
- **Dónde aparece:** `proyecto-oncomamas.html`, secciones "Portada" (`.detalle-proyecto-visual`) y "Galería" (`.galeria-proyecto-item`)
- **Texto alternativo sugerido:** portada "Campaña Oncomamás — 10 años bajo un mismo paraguas"; piezas de galería "Pieza de la campaña Oncomamás — [breve descripción]"

---

## 9. Página de detalle — ADA Vestuario (`proyecto-ada-vestuario.html`)

- **Archivos sugeridos:**
  - `ada-vestuario-portada.jpg` — imagen o pieza principal (reemplaza el marcador de degradado suave en la portada)
  - `ada-vestuario-pieza-01.jpg`, `ada-vestuario-pieza-02.jpg`, `ada-vestuario-pieza-03.jpg` — piezas o fotografías del vestuario para la galería (se puede agregar o quitar tarjetas)
- **Medidas sugeridas:** portada 1600 × 900 px aprox.; piezas de galería 900 × 1200 px aprox. (proporción 3:4, igual que el marcador actual — pensado para fotografías verticales de vestuario)
- **Dónde aparece:** `proyecto-ada-vestuario.html`, secciones "Portada" (`.detalle-proyecto-visual`) y "Galería" (`.galeria-proyecto-item`)
- **Texto alternativo sugerido:** portada "ADA Vestuario — vestuario de hadas"; piezas de galería "Pieza de ADA Vestuario — [breve descripción, por ejemplo: vestido de hada para niña / diseño para adultos]"
- Esta página trata una historia personal y sensible (la marca nace como homenaje a la hija de su creadora). Al agregar fotografías, prioriza imágenes cálidas y respetuosas del vestuario en sí, evitando cualquier tratamiento que sensacionalice la historia.

---

## Recursos gráficos de marca (opcional)

Si más adelante defines elementos gráficos propios de CAMICREA (patrones,
ilustraciones, texturas), puedes guardarlos también en esta carpeta con
nombres descriptivos, por ejemplo `patron-flores.svg` o `textura-papel.png`,
y referenciarlos desde `styles.css`.

---

**Importante:** no se descargó ninguna imagen de internet para este sitio.
Todos los marcadores visuales actuales están hechos solo con HTML y CSS
(colores, degradados y texto), tal como se pidió.
