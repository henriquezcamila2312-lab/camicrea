/* =========================================================
   CAMICREA — Interacciones del sitio
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

  /* ---------- Año automático en el pie de página ---------- */
  var anioActual = document.getElementById('anioActual');
  if (anioActual) {
    anioActual.textContent = String(new Date().getFullYear());
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

});
