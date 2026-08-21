# CAMICREA ✿

Sitio web oficial de **CAMICREA**, la marca personal de Camila Henríquez:
publicista, creadora de contenido y fundadora de **CAMICREA Estudio Creativo**.

El sitio reúne en un solo lugar sus dos caminos:

1. **CAMICREA Estudio Creativo** — servicios profesionales de estrategia, contenido y creatividad para marcas.
2. **Journaling, autocuidado y más** — contenido, productos digitales y comunidad.

Este README está escrito para alguien **sin conocimientos avanzados de programación**. Sigue los pasos con calma, uno a la vez.

---

## 1. Archivos que componen el sitio

```
camicrea/
├── index.html                     → Todo el contenido y la estructura del sitio (una sola página)
├── styles.css                     → Todos los colores, tipografías y estilos visuales
├── script.js                      → El menú móvil, las animaciones y el formulario
├── README.md                      → Este archivo
└── assets/
    ├── favicon.svg                → El pequeño ícono que aparece en la pestaña del navegador
    └── IMAGENES-PENDIENTES.md     → Lista de las fotos e imágenes que faltan por agregar
```

No hay ningún otro archivo "escondido" necesario: con estos cuatro elementos el sitio funciona completo.

---

## 2. Cómo abrir la página (vista previa rápida)

La forma más simple:

1. Busca el archivo `index.html` en la carpeta del proyecto.
2. Haz doble clic sobre él.
3. Se abrirá automáticamente en tu navegador (Chrome, Safari, Edge, etc.).

Con esto ya puedes ver el sitio completo, navegar por las secciones y probar el menú en el celular (achicando la ventana del navegador).

---

## 3. Cómo iniciar una vista previa local "de verdad" (opcional)

Abrir el archivo con doble clic funciona bien para mirar el sitio, pero si en algún momento quieres una vista previa más parecida a como se vería publicado, puedes usar un mini servidor local. No necesitas instalar nada complicado:

**Si tienes Python instalado**, abre una terminal dentro de la carpeta del proyecto y escribe:

```
python3 -m http.server 8000
```

Luego abre tu navegador en: `http://localhost:8000`

**Si usas Visual Studio Code**, puedes instalar la extensión gratuita "Live Server" y hacer clic en "Go Live" abajo a la derecha.

Esto es completamente opcional — el doble clic del paso 2 ya es suficiente para revisar el sitio.

---

## 4. Dónde cambiar los textos

Todos los textos están dentro de `index.html`. Está organizado en bloques claramente comentados, por ejemplo:

```html
<!-- ======================= PORTADA PRINCIPAL ======================= -->
```

Para cambiar un texto:

1. Abre `index.html` con un editor de texto (por ejemplo Notepad, TextEdit o, idealmente, Visual Studio Code).
2. Usa "Buscar" (Ctrl+F o Cmd+F) y pega el texto que quieres cambiar.
3. Reemplázalo por el nuevo texto, manteniendo las etiquetas (las palabras entre `< >`) tal como están.
4. Guarda el archivo y actualiza la vista previa en el navegador.

---

## 5. Dónde cambiar los colores

Todos los colores están definidos en un solo lugar, al principio de `styles.css`, dentro de `:root { ... }`:

```css
--color-marfil: #FFF8F2;       /* fondo principal del sitio */
--color-rosa-palido: #FBE8EC;  /* fondos suaves y resplandores */
--color-rosa-pastel: #F2C5D0;  /* bordes, franjas y detalles */
--color-frambuesa: #C93F5B;    /* botones y llamados a la acción */
--color-burdeos: #8F2346;      /* títulos y elementos principales */
--color-cafe: #3D3033;         /* texto principal */
...
```

Para cambiar un color en todo el sitio, solo necesitas cambiar el valor (el código que empieza con `#`) en esa línea. No hace falta tocar nada más: como el resto del sitio usa esas mismas variables, el cambio se aplica automáticamente en todas las secciones.

La paleta actual está alineada con el logo editorial de CAMICREA: sin morados ni lilas, con burdeos, frambuesa y tonos rosa suaves sobre fondo marfil.

---

## 6. Cómo reemplazar los enlaces provisionales

Mientras no tengas los enlaces definitivos, el sitio usa marcadores fácilmente identificables como `#ENLACE_INSTAGRAM` o `mailto:CORREO_PROFESIONAL`. Aparecen en varios botones (Instagram, TikTok, Pinterest, WhatsApp, correo, Gumroad y comunidad).

Para reemplazarlos:

1. Abre `index.html`.
2. Usa "Buscar" (Ctrl+F o Cmd+F) y escribe, por ejemplo, `ENLACE_INSTAGRAM`.
3. Reemplaza **solo esa parte** por tu enlace real. Por ejemplo:

   Antes:
   ```html
   <a href="#ENLACE_INSTAGRAM" ...>Visitar Instagram</a>
   ```
   Después:
   ```html
   <a href="https://www.instagram.com/tu_usuario" ...>Visitar Instagram</a>
   ```

4. Repite lo mismo para cada marcador. La lista completa de marcadores es:

   | Marcador                    | Dónde se usa                              | Estado |
   |------------------------------|--------------------------------------------|--------|
   | `ENLACE_INSTAGRAM`          | "Seguir el proceso", "Sobre mí", pie de página, contacto | ✅ Ya reemplazado por `https://www.instagram.com/cvmilapazz/` |
   | `ENLACE_TIKTOK`              | Pie de página | Pendiente |
   | `ENLACE_PINTEREST`           | Pie de página | Pendiente |
   | `ENLACE_WHATSAPP`            | Botón "Contactar por WhatsApp" | Pendiente |
   | `CORREO_PROFESIONAL`         | Botón "Escribir por correo" y pie de página | Pendiente |
   | `ENLACE_PUBLICO_GUMROAD`     | Botón "Comprar en Gumroad" | Pendiente |
   | `ENLACE_COMUNIDAD`           | Sección "Comunidad" (por ahora el botón dice "Próximamente" y está desactivado a propósito, hasta que exista el enlace real) | Pendiente |

**Importante:** el botón de la comunidad se deja intencionalmente sin enlace ("Próximamente") porque ese espacio todavía no existe. Cuando lo crees, dime o edita el botón en `index.html` (sección `id="comunidad"`) para convertirlo en un enlace activo, siguiendo el mismo formato que los demás botones.

---

## 7. Cómo agregar imágenes

Por ahora, todas las fotos están reemplazadas por cajas de color elegantes hechas con CSS (por ejemplo, donde dice "Foto de Camila"). Esto es intencional: así el sitio se ve completo mientras reúnes las imágenes reales.

Para agregar una imagen real:

1. Revisa el archivo `assets/IMAGENES-PENDIENTES.md`: ahí está la lista completa de imágenes sugeridas, con el nombre de archivo recomendado, el tamaño sugerido y en qué parte del sitio va cada una.
2. Guarda tu imagen dentro de la carpeta `assets/` usando el nombre sugerido (por ejemplo `camila-fundadora.jpg`).
3. En `index.html`, busca el bloque correspondiente (por ejemplo `sobre-mi-imagen`) y reemplaza el `<div>` de marcador por una etiqueta `<img>`, así:

   Antes:
   ```html
   <div class="sobre-mi-imagen" aria-hidden="true">
     <span>Foto de<br>Camila</span>
   </div>
   ```
   Después:
   ```html
   <img class="sobre-mi-imagen" src="assets/camila-fundadora.jpg" alt="Camila Henríquez, publicista y fundadora de CAMICREA">
   ```

Si no te sientes segura haciendo este paso, puedes pedir ayuda para hacerlo — no es necesario apurarse, el sitio funciona perfectamente bien mientras tanto.

---

## 8. Cómo completar el portafolio

La sección "Portafolio" (`id="portafolio"` en `index.html`) ya tiene 6 tarjetas preparadas, incluyendo los nombres de proyectos que mencionaste (Medical Store, Siempre estuvieron ahí, Oncomamás - DateColor, Bless, KitKat, y una tarjeta libre para un próximo proyecto).

Cada tarjeta tiene campos marcados como `[Pendiente de completar]`. Para completarlos:

1. Busca el proyecto que quieras editar dentro de `<div class="portafolio-grid">`.
2. Reemplaza cada `[Pendiente de completar]` por la información real: objetivo, rol de Camila, trabajo realizado y resultado o aporte verificable.
3. Si quieres activar el botón "Conocer el caso" (actualmente aparece como "Próximamente" y desactivado), puedes convertirlo en un enlace a una página de caso, o simplemente quitarle el atributo `disabled` cuando tengas contenido real que mostrar.

No se inventó ningún dato, cliente ni resultado — todo lo que falta queda marcado explícitamente para que lo completes tú.

---

## 9. Cómo conectar el formulario de contacto

El formulario de la sección "Contacto" (`id="contactoForm"`) **todavía no está conectado a ningún servicio real**. Por honestidad, en vez de simular un envío exitoso, muestra un mensaje avisando que aún no está conectado.

Tienes tres opciones para activarlo (elige la que te resulte más simple):

### Opción A: Formspree (recomendada, gratis para uso básico)

1. Crea una cuenta en [formspree.io](https://formspree.io) y crea un nuevo formulario.
2. Formspree te dará una URL parecida a `https://formspree.io/f/xxxxxxx`.
3. En `index.html`, busca la etiqueta `<form class="contacto-form" id="contactoForm" novalidate>` y agrégale los atributos `action` y `method`:
   ```html
   <form class="contacto-form" id="contactoForm" action="https://formspree.io/f/xxxxxxx" method="POST" novalidate>
   ```
4. En `script.js`, dentro del bloque "Formulario de contacto", quita o comenta la línea `event.preventDefault();` para que el formulario se envíe normalmente a Formspree.

### Opción B: enlace directo por correo o WhatsApp

Si prefieres no conectar ningún servicio por ahora, puedes dejar el formulario tal como está (mostrando el aviso) y confiar en los tres botones de contacto directo que ya están activos debajo del formulario: WhatsApp, correo e Instagram. Solo necesitas completar esos enlaces (ver punto 6).

### Opción C: otro servicio

Si usas otro proveedor de formularios (Netlify Forms, Web3Forms, etc.), sigue sus instrucciones para obtener una URL o atributos especiales, y aplícalos de la misma manera que en la Opción A.

---

## 10. Qué elementos siguen pendientes

Antes de publicar el sitio, esto es lo que falta por definir o reemplazar:

- [x] Enlace real de Instagram (`https://www.instagram.com/cvmilapazz/`)
- [ ] Enlace real de TikTok
- [ ] Enlace real de Pinterest
- [ ] Enlace real de WhatsApp (con el número correcto)
- [ ] Correo profesional real
- [ ] Enlace público del producto en Gumroad
- [ ] Enlace de la comunidad (cuando exista)
- [ ] Conectar el formulario de contacto (ver punto 9)
- [ ] Fotografía de Camila
- [x] Logo de CAMICREA (`assets/logo-camicrea.png`, en el encabezado y el pie de página)
- [ ] Portada e interiores del Método 369
- [ ] Imagen para compartir en redes sociales (Open Graph)
- [ ] Imágenes y datos reales de cada proyecto del portafolio
- [ ] Revisión final de todos los textos

Todo esto está detallado también en `assets/IMAGENES-PENDIENTES.md` (para las imágenes) y en este README (para enlaces y formulario).

---

## 11. Cómo preparar el sitio para publicarlo

Cuando ya hayas revisado y aprobado el diseño, y hayas completado los pendientes que quieras completar antes de salir en vivo, publicar el sitio es muy simple porque es un sitio estático (no necesita bases de datos ni configuraciones complicadas). Algunas opciones sencillas y gratuitas:

- **Netlify** o **Vercel**: puedes arrastrar la carpeta completa del proyecto a su panel y el sitio queda publicado en minutos.
- **GitHub Pages**: si el proyecto ya está en GitHub (como es el caso), se puede activar GitHub Pages en la configuración del repositorio para publicar `index.html` directamente.

**Importante:** este sitio todavía no ha sido publicado. Está guardado y disponible para tu revisión. La publicación se hará solo cuando tú lo apruebes.

---

## Sobre el contenido de journaling, manifestación y bienestar

Como se indica en el pie de página del sitio, los contenidos y productos de journaling, manifestación y bienestar son herramientas de reflexión personal. No reemplazan atención psicológica, médica, financiera ni profesional, y no garantizan resultados externos.
