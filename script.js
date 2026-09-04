/* =========================================================
   camicrea — Interacciones del sitio
   Menú móvil, scroll suave, animaciones al aparecer,
   año automático y manejo seguro del formulario de contacto.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Menú móvil ---------- */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    });

    // Cierra el menú al elegir una opción (comportamiento esperado en móvil)
    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (primaryNav.classList.contains('is-open')) {
          primaryNav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        }
      });
    });

    // Cierra el menú con la tecla Escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        primaryNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
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

  /* ---------- Cursor personalizado: flecha pixelada + hilo burdeos ----------
     Solo en escritorio con puntero preciso (mouse/trackpad) y sin
     prefers-reduced-motion. En pantallas táctiles no se activa. */
  var puedeUsarCursorPersonalizado = window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (puedeUsarCursorPersonalizado) {
    document.body.classList.add('cursor-personalizado-activo');

    var cursorFlecha = document.createElement('div');
    cursorFlecha.className = 'cursor-flecha';
    cursorFlecha.setAttribute('aria-hidden', 'true');
    cursorFlecha.innerHTML = '<svg viewBox="0 0 14 14" width="18" height="18" shape-rendering="crispEdges"><polygon points="1,1 1,11 4,8.3 5.8,12 7.6,11.1 5.8,7.4 10,7.4" fill="#211C1E" stroke="#FFFDF9" stroke-width="1"/></svg>';

    var cursorHilo = document.createElement('div');
    cursorHilo.className = 'cursor-hilo';
    cursorHilo.setAttribute('aria-hidden', 'true');
    cursorHilo.innerHTML = '<svg viewBox="0 0 40 20" width="40" height="20"><path d="M1 2C10 2 8 18 20 14C28 11 30 6 38 8" fill="none" stroke="#8D2949" stroke-width="1.4" stroke-linecap="round" opacity="0.55"/></svg>';

    var cursorAccento = document.createElement('div');
    cursorAccento.className = 'cursor-accento';
    cursorAccento.setAttribute('aria-hidden', 'true');
    cursorAccento.innerHTML = '<svg viewBox="0 0 30 30" width="16" height="16"><path d="M15 2 L18 12 L28 15 L18 18 L15 28 L12 18 L2 15 L12 12 Z" fill="#8D2949"/></svg>';

    document.body.appendChild(cursorHilo);
    document.body.appendChild(cursorFlecha);
    document.body.appendChild(cursorAccento);

    document.addEventListener('mousemove', function (event) {
      var x = event.clientX;
      var y = event.clientY;
      cursorFlecha.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      cursorHilo.style.transform = 'translate(' + (x - 6) + 'px, ' + (y + 2) + 'px)';
      cursorAccento.style.transform = 'translate(' + (x + 16) + 'px, ' + (y + 16) + 'px)';
      cursorFlecha.classList.add('esta-activo');
      cursorHilo.classList.add('esta-activo');
    });

    document.addEventListener('mouseover', function (event) {
      var esInteractivo = event.target.closest && event.target.closest('a, button, input, select, textarea, .proceso-dia');
      cursorAccento.classList.toggle('esta-visible', !!esInteractivo);
    });

    document.addEventListener('mouseleave', function () {
      cursorFlecha.classList.remove('esta-activo');
      cursorHilo.classList.remove('esta-activo');
      cursorAccento.classList.remove('esta-visible');
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
