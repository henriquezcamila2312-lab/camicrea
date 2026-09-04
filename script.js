/* =========================================================
   camicrea — Interacciones del sitio
   Menú móvil, scroll suave, animaciones al aparecer,
   año automático y manejo seguro del formulario de contacto.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Menú de archivador (pila vertical de carpetas) ----------
     Al abrir, cada carpeta aparece con un pequeño desfase (como si el
     archivador se fuera desplegando) en vez de mostrarse todas de
     golpe. Al cerrar, se limpia el estado para que el próximo abrir
     repita el mismo efecto escalonado. */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');
  var carpetasNavItems = primaryNav ? primaryNav.querySelectorAll('.carpeta-nav-item') : [];
  var prefiereMenosMovimientoMenu = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var temporizadoresCarpetas = [];

  var limpiarTemporizadoresCarpetas = function () {
    temporizadoresCarpetas.forEach(function (id) { window.clearTimeout(id); });
    temporizadoresCarpetas = [];
  };

  var abrirArchivador = function () {
    primaryNav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Cerrar menú de navegación');

    if (prefiereMenosMovimientoMenu) {
      carpetasNavItems.forEach(function (item) { item.classList.add('is-visible'); });
      return;
    }
    limpiarTemporizadoresCarpetas();
    carpetasNavItems.forEach(function (item, indice) {
      var id = window.setTimeout(function () {
        item.classList.add('is-visible');
      }, indice * 80);
      temporizadoresCarpetas.push(id);
    });
  };

  var cerrarArchivador = function () {
    limpiarTemporizadoresCarpetas();
    primaryNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    carpetasNavItems.forEach(function (item) { item.classList.remove('is-visible'); });
  };

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      if (primaryNav.classList.contains('is-open')) {
        cerrarArchivador();
      } else {
        abrirArchivador();
      }
    });

    // Cierra el menú al elegir una opción (comportamiento esperado en móvil)
    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (primaryNav.classList.contains('is-open')) {
          cerrarArchivador();
        }
      });
    });

    // Cierra el menú con la tecla Escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        cerrarArchivador();
        navToggle.focus();
      }
    });
  }

  /* ---------- Navegación por ventanas ----------
     El sitio se organiza en ventanas (una por ítem del menú principal:
     Inicio, Estudio Creativo, Portafolio, Journaling, Sobre camicrea y
     Contacto). Solo una ventana está visible a la vez, sin recargar la
     página. Los anchors internos que antes apuntaban a secciones propias
     (por ejemplo #planes, #productos, #comunidad, #presentacion o
     #suscripcion) siguen funcionando: siguen existiendo como ids dentro
     de la ventana que ahora los contiene, así que ningún enlace externo
     (de otras páginas del sitio) necesita cambiar. */
  var siteWindows = document.querySelectorAll('.site-window');

  if (siteWindows.length) {
    var mostrarVentana = function (ventana, elementoDestino) {
      siteWindows.forEach(function (win) {
        if (win !== ventana) {
          win.classList.remove('ventana-activa');
          win.hidden = true;
        }
      });

      ventana.hidden = false;

      // El contenido de la ventana debe verse desde el principio,
      // sin depender del scroll para activar su animación de aparición.
      ventana.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });

      window.requestAnimationFrame(function () {
        ventana.classList.add('ventana-activa');
      });

      document.querySelectorAll('.nav-link').forEach(function (link) {
        var linkHash = (link.getAttribute('href') || '').split('#')[1];
        link.classList.toggle('esta-activo', linkHash === ventana.id);
      });

      var prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var comportamientoScroll = prefiereMenosMovimiento ? 'auto' : 'smooth';
      window.requestAnimationFrame(function () {
        if (elementoDestino && elementoDestino !== ventana) {
          elementoDestino.scrollIntoView({ behavior: comportamientoScroll, block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: comportamientoScroll });
        }
      });
    };

    var manejarHash = function () {
      var rawHash = window.location.hash ? window.location.hash.substring(1) : '';

      if (!rawHash) {
        mostrarVentana(document.getElementById('inicio'), null);
        return;
      }

      var elementoDestino = document.getElementById(rawHash);
      if (!elementoDestino) {
        mostrarVentana(document.getElementById('inicio'), null);
        return;
      }

      var ventana = elementoDestino.closest('.site-window');
      if (!ventana) {
        // No pertenece al sistema de ventanas (por ejemplo, el enlace
        // "Saltar al contenido principal"): no se fuerza ningún cambio.
        return;
      }

      mostrarVentana(ventana, elementoDestino);
    };

    window.addEventListener('hashchange', manejarHash);
    manejarHash();
  }

  /* ---------- Cursor: flecha nativa + polvo de brillo delicado ----------
     La flecha del sistema se mantiene intacta (precisa y funcional).
     Solo se agrega un rastro corto de 3 a 5 brillos que se desvanecen
     rápido con opacity + scale; nunca forma una línea ni un hilo
     continuo. Máximo 5 partículas simultáneas. Solo en escritorio con
     puntero preciso y sin prefers-reduced-motion; desactivado en
     táctil. */
  var puedeUsarCursorPersonalizado = window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (puedeUsarCursorPersonalizado) {
    var COLORES_BRILLO_CURSOR = ['#F3AFC3', '#FFFDF9', '#8D2949'];
    var particulasBrilloCursor = [];
    var ultimoBrilloCursorTs = 0;
    var INTERVALO_BRILLO_CURSOR_MS = 75;

    var crearBrilloCursor = function (x, y, grande) {
      var el = document.createElement('span');
      el.className = 'cursor-brillo';
      var tam = grande ? 11 : 6;
      el.style.width = tam + 'px';
      el.style.height = tam + 'px';
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.backgroundColor = COLORES_BRILLO_CURSOR[Math.floor(Math.random() * COLORES_BRILLO_CURSOR.length)];
      document.body.appendChild(el);
      particulasBrilloCursor.push(el);

      while (particulasBrilloCursor.length > 5) {
        var viejo = particulasBrilloCursor.shift();
        if (viejo.parentNode) { viejo.parentNode.removeChild(viejo); }
      }

      window.requestAnimationFrame(function () {
        el.classList.add('cursor-brillo--desvanece');
      });
      window.setTimeout(function () {
        if (el.parentNode) { el.parentNode.removeChild(el); }
        var indice = particulasBrilloCursor.indexOf(el);
        if (indice !== -1) { particulasBrilloCursor.splice(indice, 1); }
      }, 550);
    };

    document.addEventListener('mousemove', function (event) {
      var ahora = Date.now();
      if (ahora - ultimoBrilloCursorTs < INTERVALO_BRILLO_CURSOR_MS) { return; }
      ultimoBrilloCursorTs = ahora;
      var esInteractivo = event.target.closest && event.target.closest('a, button, input, select, textarea, .proceso-dia');
      crearBrilloCursor(event.clientX, event.clientY, !!esInteractivo);
    });
  }

  /* ---------- Año automático en el pie de página ---------- */
  var anioActual = document.getElementById('anioActual');
  if (anioActual) {
    anioActual.textContent = String(new Date().getFullYear());
  }

  /* ---------- Fecha automática en la nota "Desde mi escritorio" ---------- */
  var notaFecha = document.getElementById('notaFecha');
  if (notaFecha) {
    try {
      notaFecha.textContent = new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (error) {
      notaFecha.textContent = '';
    }
  }

  /* ---------- Animaciones discretas al aparecer secciones ---------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealElements = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Selector Social Media / Community Management ---------- */
  var tabSocialMedia = document.getElementById('tabSocialMedia');
  var tabCommunity = document.getElementById('tabCommunity');
  var panelSocialMedia = document.getElementById('panelSocialMedia');
  var panelCommunity = document.getElementById('panelCommunity');

  if (tabSocialMedia && tabCommunity && panelSocialMedia && panelCommunity) {
    var mostrarPanelServicios = function (tabActivo) {
      var esSocialMedia = tabActivo === tabSocialMedia;

      tabSocialMedia.classList.toggle('is-activo', esSocialMedia);
      tabSocialMedia.setAttribute('aria-selected', String(esSocialMedia));
      tabSocialMedia.tabIndex = esSocialMedia ? 0 : -1;

      tabCommunity.classList.toggle('is-activo', !esSocialMedia);
      tabCommunity.setAttribute('aria-selected', String(!esSocialMedia));
      tabCommunity.tabIndex = esSocialMedia ? -1 : 0;

      panelSocialMedia.hidden = !esSocialMedia;
      panelCommunity.hidden = esSocialMedia;

      // El panel recién mostrado debe verse desde el principio, sin
      // depender de que el scroll vuelva a cruzar su umbral de aparición.
      var panelVisible = esSocialMedia ? panelSocialMedia : panelCommunity;
      panelVisible.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
    };

    tabSocialMedia.addEventListener('click', function () { mostrarPanelServicios(tabSocialMedia); });
    tabCommunity.addEventListener('click', function () { mostrarPanelServicios(tabCommunity); });
  }

  /* ---------- Selección estilo iOS/iPad: destacados progresivos ----------
     Cada .seleccion-ios recibe dos manijas (inicio y fin) posicionadas
     con getClientRects(), para funcionar igual si el texto ocupa una o
     varias líneas. El color de fondo aparece progresivamente al entrar
     en pantalla; el texto en sí nunca se oculta. */
  var seleccionesIOS = document.querySelectorAll('.seleccion-ios');
  var posicionarSelecciones = function () {};

  if (seleccionesIOS.length) {
    var colorManijaDe = function (span) {
      if (span.classList.contains('seleccion-ios--verde')) { return 'seleccion-ios-mango--verde'; }
      if (span.classList.contains('seleccion-ios--negro')) { return 'seleccion-ios-mango--negro'; }
      return '';
    };

    seleccionesIOS.forEach(function (span) {
      var claseColor = colorManijaDe(span);

      var mangoInicio = document.createElement('span');
      mangoInicio.className = 'seleccion-ios-mango' + (claseColor ? ' ' + claseColor : '');
      mangoInicio.setAttribute('aria-hidden', 'true');

      var mangoFin = document.createElement('span');
      mangoFin.className = 'seleccion-ios-mango' + (claseColor ? ' ' + claseColor : '');
      mangoFin.setAttribute('aria-hidden', 'true');

      document.body.appendChild(mangoInicio);
      document.body.appendChild(mangoFin);
      span._mangoInicio = mangoInicio;
      span._mangoFin = mangoFin;
    });

    posicionarSelecciones = function () {
      seleccionesIOS.forEach(function (span) {
        var rects = span.getClientRects();
        if (!rects.length) { return; }
        var primero = rects[0];
        var ultimo = rects[rects.length - 1];
        var scrollX = window.scrollX;
        var scrollY = window.scrollY;

        span._mangoInicio.style.left = (primero.left + scrollX) + 'px';
        span._mangoInicio.style.top = (primero.bottom + scrollY) + 'px';
        span._mangoInicio.style.setProperty('--alto-linea', primero.height + 'px');

        span._mangoFin.style.left = (ultimo.right + scrollX) + 'px';
        span._mangoFin.style.top = (ultimo.bottom + scrollY) + 'px';
        span._mangoFin.style.setProperty('--alto-linea', ultimo.height + 'px');
      });
    };

    var marcarSeleccionVisible = function (span) {
      span.classList.add('is-visible');
      span._mangoInicio.classList.add('is-visible');
      span._mangoFin.classList.add('is-visible');
      window.requestAnimationFrame(posicionarSelecciones);
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      seleccionesIOS.forEach(marcarSeleccionVisible);
    } else {
      var seleccionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            marcarSeleccionVisible(entry.target);
            seleccionObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      seleccionesIOS.forEach(function (span) { seleccionObserver.observe(span); });
    }

    window.addEventListener('resize', posicionarSelecciones);
  }

  /* ---------- "¿Cómo trabajamos?": checklist que se marca sola al hacer scroll ---------- */
  var metodologiaLista = document.getElementById('metodologiaLista');
  var metodologiaFinal = document.getElementById('metodologiaFinal');

  if (metodologiaLista && metodologiaFinal) {
    var itemsMetodologia = metodologiaLista.querySelectorAll('.metodologia-item');

    var marcarChecklist = function () {
      if (prefersReducedMotion) {
        itemsMetodologia.forEach(function (item) { item.classList.add('is-checked'); });
        metodologiaFinal.classList.add('is-visible');
        return;
      }
      itemsMetodologia.forEach(function (item, index) {
        window.setTimeout(function () {
          item.classList.add('is-checked');
          if (index === itemsMetodologia.length - 1) {
            window.setTimeout(function () { metodologiaFinal.classList.add('is-visible'); }, 300);
          }
        }, index * 260);
      });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      marcarChecklist();
    } else {
      var metodologiaObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            marcarChecklist();
            metodologiaObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      metodologiaObserver.observe(metodologiaLista);
    }
  }

  /* ---------- "Conocer la plantilla" (Método 369): despliega detalle ---------- */
  var btnConocerPlantilla = document.getElementById('btnConocerPlantilla');
  var metodo369Detalle = document.getElementById('metodo369Detalle');

  if (btnConocerPlantilla && metodo369Detalle) {
    btnConocerPlantilla.addEventListener('click', function () {
      var estaVisible = !metodo369Detalle.hidden;
      metodo369Detalle.hidden = estaVisible;
      btnConocerPlantilla.setAttribute('aria-expanded', String(!estaVisible));
      btnConocerPlantilla.textContent = estaVisible ? 'Conocer la plantilla' : 'Ocultar detalle';
    });
  }

  /* ---------- Formulario de contacto ----------
     El formulario todavía NO está conectado a ningún servicio de envío
     (Formspree, correo, WhatsApp, etc.). Por eso no simulamos un envío
     exitoso: solo mostramos un aviso claro y honesto a quien lo complete.
     Ver README.md → "Cómo conectar el formulario" para activarlo. */
  var contactoForm = document.getElementById('contactoForm');
  var formAviso = document.getElementById('formAviso');

  if (contactoForm && formAviso) {
    contactoForm.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!contactoForm.checkValidity()) {
        contactoForm.reportValidity();
        return;
      }

      formAviso.hidden = false;
      formAviso.textContent = 'Este formulario todavía no está conectado a un servicio de envío. Mientras tanto, escríbeme directamente por WhatsApp, Instagram o correo (más abajo) y con gusto te respondo.';
      formAviso.setAttribute('tabindex', '-1');
      formAviso.focus();
    });
  }

  /* ---------- Formulario de suscripción (plantilla gratuita) ----------
     Este formulario está preparado para el embed oficial de Kit, pero
     todavía NO está conectado a ningún proveedor real. Por eso no
     simulamos una suscripción exitosa ni el mensaje de confirmación de
     Kit: solo mostramos un aviso honesto. No se guarda el nombre ni el
     correo en ningún lugar (ni siquiera en localStorage). */
  var formSuscripcion = document.getElementById('formSuscripcion');
  var suscripcionAviso = document.getElementById('suscripcionAviso');

  if (formSuscripcion && suscripcionAviso) {
    formSuscripcion.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!formSuscripcion.checkValidity()) {
        formSuscripcion.reportValidity();
        return;
      }

      suscripcionAviso.hidden = false;
      suscripcionAviso.textContent = 'Esta suscripción todavía no está conectada a Kit, así que por ahora no podemos enviarte la plantilla por este medio. Mientras se activa, puedes escribir por WhatsApp o correo (sección Contacto) para pedirla directamente.';
      suscripcionAviso.setAttribute('tabindex', '-1');
      suscripcionAviso.focus();
    });
  }

  /* ---------- "Mi proceso": check-ins de 30 días (solo en mi-proceso.html) ----------
     Guarda únicamente qué días se marcaron (números del 1 al 30) en
     localStorage, en un espacio de nombres propio y separado de la
     suscripción por correo. No se guarda ningún texto ni nota personal:
     el check-in es solo "marcado" o "no marcado". */
  var procesoDiasGrid = document.getElementById('procesoDiasGrid');

  if (procesoDiasGrid) {
    var PROCESO_STORAGE_KEY = 'camicrea_mi_proceso_dias';
    var PROCESO_TOTAL_DIAS = 30;
    var procesoContador = document.getElementById('procesoContador');
    var procesoRelleno = document.getElementById('procesoRelleno');
    var procesoBarra = document.getElementById('procesoBarra');
    var procesoReiniciar = document.getElementById('procesoReiniciar');

    var cargarDiasProceso = function () {
      try {
        var guardado = window.localStorage.getItem(PROCESO_STORAGE_KEY);
        if (!guardado) { return []; }
        var datos = JSON.parse(guardado);
        if (!Array.isArray(datos)) { return []; }
        return datos.filter(function (dia) {
          return Number.isInteger(dia) && dia >= 1 && dia <= PROCESO_TOTAL_DIAS;
        });
      } catch (error) {
        return [];
      }
    };

    var guardarDiasProceso = function (dias) {
      try {
        window.localStorage.setItem(PROCESO_STORAGE_KEY, JSON.stringify(dias));
      } catch (error) {
        // localStorage no disponible (modo privado, cuota llena, etc.): no se persiste, sin romper la página.
      }
    };

    var actualizarProgresoProceso = function (dias) {
      var total = dias.length;
      if (procesoContador) { procesoContador.textContent = String(total); }
      if (procesoRelleno) { procesoRelleno.style.width = Math.round((total / PROCESO_TOTAL_DIAS) * 100) + '%'; }
      if (procesoBarra) { procesoBarra.setAttribute('aria-valuenow', String(total)); }
    };

    var aplicarEstadoProceso = function (dias) {
      procesoDiasGrid.querySelectorAll('.proceso-dia').forEach(function (boton) {
        var dia = parseInt(boton.getAttribute('data-dia'), 10);
        var completado = dias.indexOf(dia) !== -1;
        boton.classList.toggle('is-completado', completado);
        boton.setAttribute('aria-pressed', String(completado));
      });
      actualizarProgresoProceso(dias);
    };

    var diasCompletadosProceso = cargarDiasProceso();
    aplicarEstadoProceso(diasCompletadosProceso);

    procesoDiasGrid.addEventListener('click', function (event) {
      var boton = event.target.closest('.proceso-dia');
      if (!boton) { return; }

      var dia = parseInt(boton.getAttribute('data-dia'), 10);
      var indice = diasCompletadosProceso.indexOf(dia);

      if (indice === -1) {
        diasCompletadosProceso.push(dia);
      } else {
        diasCompletadosProceso.splice(indice, 1);
      }

      guardarDiasProceso(diasCompletadosProceso);
      aplicarEstadoProceso(diasCompletadosProceso);
    });

    if (procesoReiniciar) {
      procesoReiniciar.addEventListener('click', function () {
        var confirmado = window.confirm('¿Quieres reiniciar tu proceso? Esto borrará los días marcados en este navegador.');
        if (!confirmado) { return; }
        diasCompletadosProceso = [];
        guardarDiasProceso(diasCompletadosProceso);
        aplicarEstadoProceso(diasCompletadosProceso);
      });
    }
  }

});
