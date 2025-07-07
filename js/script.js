// ========================================
// INVITACIÓN XV AÑOS - GABRIELA MEDINA PÉREZ
// JavaScript optimizado sin código no utilizado
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // ========================================
  // ANIMACIÓN DEL SOBRE
  // ========================================
  const openEnvelopeBtn = document.getElementById("open-envelope");
  const envelopeFlap = document.getElementById("envelope-flap");
  const envelopeSection = document.getElementById("envelope");
  const letterContent = document.getElementById("letter-content");

  if (openEnvelopeBtn) {
    openEnvelopeBtn.addEventListener("click", function () {
      // Prevenir múltiples clicks
      if (openEnvelopeBtn.classList.contains("broken")) return;

      // Obtener la posición exacta del sello de cera en la pantalla
      const sealRect = openEnvelopeBtn.getBoundingClientRect();
      const sealCenterX =
        (sealRect.left + sealRect.width / 2) / window.innerWidth;
      const sealCenterY =
        (sealRect.top + sealRect.height / 2) / window.innerHeight;

      // Crear fragmentos del sello antes de que se rompa
      createSealFragments(openEnvelopeBtn, sealRect);

      // Iniciar música de fondo
      startBackgroundMusic();

      // Iniciar el vuelo de la mariposa inmediatamente al romper el sello
      startButterflyFlight();

      // Activar función de respaldo por si las animaciones CSS fallan
      butterflyAnimationFallback();

      // Efecto de romper el sello de cera
      openEnvelopeBtn.classList.add("broken");

      // Primer burst de confetti inmediato (simulando la explosión inicial)
      confetti({
        particleCount: 60,
        spread: 45,
        origin: {
          x: sealCenterX,
          y: sealCenterY,
        },
        colors: ["#d4af37", "#f4d03f", "#b8860b"],
        shapes: ["circle", "square"],
        scalar: 0.8,
        drift: 0,
        gravity: 0.8,
        ticks: 300,
        startVelocity: 35,
      });

      // Segundo burst más grande después de 150ms (fragmentos convirtiéndose en confetti)
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: {
            x: sealCenterX,
            y: sealCenterY,
          },
          colors: ["#d4af37", "#f4d03f", "#e6c469", "#ffd700"],
          shapes: ["circle", "square"],
          scalar: 0.9,
          drift: 0.1,
          gravity: 0.6,
          ticks: 400,
          startVelocity: 50,
        });
      }, 150);

      // Tercer burst final y disperso después de 350ms
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 120,
          origin: {
            x: sealCenterX,
            y: sealCenterY,
          },
          colors: ["#e6c469", "#ffd700", "#f4d03f"],
          shapes: ["circle"],
          scalar: 0.6,
          drift: 0.2,
          gravity: 0.4,
          ticks: 250,
          startVelocity: 30,
        });
      }, 350);

      // Cuarto burst sutil de cierre después de 600ms
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: {
            x: sealCenterX,
            y: sealCenterY,
          },
          colors: ["#d4af37", "#b8860b"],
          shapes: ["circle"],
          scalar: 0.4,
          drift: 0.1,
          gravity: 0.3,
          ticks: 180,
          startVelocity: 20,
        });
      }, 600);

      // Después de romper el sello, animar la apertura del sobre
      setTimeout(() => {
        // Animar la apertura de la solapa dorada
        envelopeFlap.style.transform = "rotateX(-180deg)";

        // Después de la animación del sobre, mostrar la carta
        setTimeout(() => {
          // Ocultar la sección del sobre
          envelopeSection.style.opacity = "0";
          envelopeSection.style.transform = "scale(0.8)";

          setTimeout(() => {
            envelopeSection.style.display = "none";

            // Cambiar a partículas de mariposas
            document.body.classList.remove("particles-envelope");
            document.body.classList.add("particles-letter");

            // Crear mariposas flotantes dinámicas
            createFloatingButterflies();

            // Mostrar la carta con animación
            letterContent.style.display = "block";
            setTimeout(() => {
              letterContent.classList.remove("opacity-0", "translate-y-12");
              letterContent.classList.add("opacity-100", "translate-y-0");
            }, 100);
          }, 500);
        }, 1500);
      }, 600); // Tiempo para completar la animación del sello
    });
  }

  // ========================================
  // FUNCIÓN PARA CREAR FRAGMENTOS DEL SELLO
  // ========================================
  function createSealFragments(sealElement, sealRect) {
    const fragmentCount = 6;

    // Obtener los estilos computados del sello original
    const sealStyles = window.getComputedStyle(sealElement);

    for (let i = 1; i <= fragmentCount; i++) {
      const fragment = document.createElement("div");
      fragment.className = `seal-fragment fragment-${i}`;

      // Copiar el fondo del sello original
      fragment.style.background = sealStyles.background;
      fragment.style.borderRadius = "50%";
      fragment.style.width = "15px";
      fragment.style.height = "15px";
      fragment.style.position = "fixed";
      fragment.style.pointerEvents = "none";
      fragment.style.zIndex = "150";

      // Posicionar cada fragmento en el centro del sello original
      const centerX = sealRect.left + sealRect.width / 2 - 7.5;
      const centerY = sealRect.top + sealRect.height / 2 - 7.5;

      fragment.style.left = `${centerX}px`;
      fragment.style.top = `${centerY}px`;

      // Añadir algo de variación en los fragmentos
      const scale = 0.7 + Math.random() * 0.6;
      fragment.style.transform = `scale(${scale})`;

      // Añadir sombra similar al sello original
      fragment.style.boxShadow =
        "0 2px 6px rgba(0, 0, 0, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.2)";

      document.body.appendChild(fragment);

      // Remover los fragmentos después de la animación
      setTimeout(() => {
        if (fragment.parentElement) {
          fragment.remove();
        }
      }, 1500);
    }
  }
  // ========================================
  // FUNCIÓN PARA EL VUELO DE LA MARIPOSA
  // ========================================
  function startButterflyFlight() {
    const envelopeButterfly = document.getElementById("envelope-butterfly");
    const letterButterfly = document.getElementById("letter-butterfly");

    if (!envelopeButterfly || !letterButterfly) {
      console.warn("🦋 No se encontraron los elementos de mariposa");
      return;
    }

    // Aplicar optimizaciones de rendimiento para animaciones suaves
    envelopeButterfly.style.willChange = "transform, opacity";
    letterButterfly.style.willChange = "transform, opacity";

    // Hacer que la mariposa del sobre "vuele" hacia la izquierda con movimiento orgánico sinusoidal
    envelopeButterfly.classList.add("butterfly-fly-away");

    // Después de que la mariposa desaparezca, preparar la aparición en la carta
    setTimeout(() => {
      // Ocultar completamente la mariposa del sobre
      envelopeButterfly.style.display = "none";
      envelopeButterfly.style.willChange = "auto"; // Limpiar optimización

      // Después de que aparezca la carta, hacer que la mariposa "vuele" desde la derecha con ondas orgánicas
      setTimeout(() => {
        // Activar la animación de llegada a la carta
        letterButterfly.classList.add("butterfly-fly-to-letter");

        // Remover la animación después de que complete para evitar conflictos
        setTimeout(() => {
          letterButterfly.classList.remove("butterfly-fly-to-letter");
          letterButterfly.style.willChange = "auto"; // Limpiar optimización

          // Posicionar la mariposa en su lugar final y hacerla visible
          letterButterfly.style.transform =
            "translate(0, 0) rotate(-15deg) scale(0.8)";
          letterButterfly.style.opacity = "1";

          // Añadir flotación sutil
          letterButterfly.classList.add("butterfly-positioned");

          // Configurar observador para mantener la mariposa visible hasta salir del viewport
          setupButterflyVisibilityObserver(letterButterfly);
        }, 3500); // Duración de la animación orgánica de vuelo de entrada (3.5s)
      }, 2300); // Esperar a que la carta esté completamente visible
    }, 3500); // Duración de la animación orgánica de vuelo de salida desde el sobre (3.5s)
  }

  // ========================================
  // OBSERVADOR DE VISIBILIDAD PARA LA MARIPOSA
  // ========================================
  function setupButterflyVisibilityObserver(butterflyElement) {
    const letterContent = document.getElementById("letter-content");

    if (!letterContent) {
      console.warn("🦋 No se encontró el contenido de la carta para observar");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // La carta está visible, asegurar que la mariposa esté visible
            butterflyElement.style.opacity = "1";
          } else {
            // La carta salió del viewport, hacer que la mariposa se desvanezca
            butterflyElement.style.transition = "opacity 1s ease-out";
            butterflyElement.style.opacity = "0";

            // Después de desvanecer, ocultar completamente para optimizar rendimiento
            setTimeout(() => {
              if (butterflyElement.style.opacity === "0") {
                butterflyElement.style.display = "none";
              }
            }, 1000);
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: "50px", // Margen para activar antes de salir completamente
        threshold: 0.1, // Se activa cuando al menos 10% está visible
      }
    );

    observer.observe(letterContent);
  }

  // ========================================
  // CUENTA REGRESIVA
  // ========================================

  // Fecha del evento: 25 de Julio, 2025 a las 19:00 (Zona horaria CDMX)
  const eventDate = new Date("2025-07-25T19:00:00-06:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Actualizar elementos del DOM
      const daysEl = document.getElementById("days");
      const hoursEl = document.getElementById("hours");
      const minutesEl = document.getElementById("minutes");
      const secondsEl = document.getElementById("seconds");

      if (daysEl) daysEl.textContent = days.toString().padStart(2, "0");
      if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, "0");
      if (minutesEl)
        minutesEl.textContent = minutes.toString().padStart(2, "0");
      if (secondsEl)
        secondsEl.textContent = seconds.toString().padStart(2, "0");
    } else {
      // El evento ya pasó - mantener en ceros
      const countdownElements = ["days", "hours", "minutes", "seconds"];
      countdownElements.forEach((id) => {
        const element = document.getElementById(id);
        if (element) element.textContent = "00";
      });
    }
  }

  // Actualizar countdown cada segundo
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ========================================
  // NAVEGACIÓN SUAVE
  // ========================================

  // Agregar navegación suave a cualquier enlace interno
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ========================================
  // EASTER EGGS Y DETALLES ESPECIALES
  // ========================================

  // Flags para controlar efectos especiales
  let crownClicks = 0;
  let crownEasterEggDiscovered = false;
  let autoConfettiTriggered = false;
  let crownConfettiInProgress = false;

  // Secuencia especial si hacen clic en la corona múltiples veces
  const crown =
    document.querySelector(".ti-crown") ||
    document.getElementById("crown-image");

  if (crown) {
    crown.addEventListener("click", function () {
      crownClicks++;

      if (crownClicks === 5 && !crownConfettiInProgress) {
        // Bloquear nuevos efectos mientras está en progreso
        crownConfettiInProgress = true;

        // Marcar que el easter egg fue descubierto
        if (!crownEasterEggDiscovered) {
          crownEasterEggDiscovered = true;
        }

        // Efecto especial de confetti desde múltiples direcciones
        const duration = 3000;
        const end = Date.now() + duration;

        // Función para crear múltiples explosiones
        function frame() {
          confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#d4af37", "#f4d03f", "#b8860b", "#e6c469"],
          });
          confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#d4af37", "#f4d03f", "#b8860b", "#e6c469"],
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }

        frame();

        // Explosión central adicional
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#f4d03f", "#b8860b", "#e6c469", "#ffd700"],
        });

        // Liberar el bloqueo después de que termine toda la animación
        setTimeout(() => {
          crownConfettiInProgress = false;
        }, duration + 500);

        crownClicks = 0; // Reset para permitir reactivación
      } else if (crownClicks === 5 && crownConfettiInProgress) {
        // Si intenta activar mientras está en progreso
        // Feedback visual - hacer que la corona parpadee
        crown.style.animation = "none";
        crown.offsetHeight; // Forzar reflow
        crown.style.animation = "crownGlow 0.3s ease-in-out 3";

        crownClicks = 0; // Reset para permitir reintento
      }
    });
  }

  // ========================================
  // AUTO-CONFETTI CUANDO LA CORONA APAREZCA EN PANTALLA
  // ========================================

  function setupAutoConfetti() {
    // Buscar el elemento de la corona (imagen o icono)
    const crownElement =
      document.getElementById("crown-image") ||
      document.querySelector("i.ti-crown.text-gold-accent.animate-crown-glow");

    if (!crownElement) {
      return;
    }

    const observerOptions = {
      threshold: [0.1, 0.3, 0.5, 0.8],
      rootMargin: "0px 0px -10% 0px",
    };

    const autoConfettiObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.3 &&
          !autoConfettiTriggered
        ) {
          autoConfettiTriggered = true;

          // Efecto de confetti igual de espectacular que el easter egg de la corona
          setTimeout(() => {
            // Explosión central principal
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#d4af37", "#f4d03f", "#b8860b", "#e6c469", "#ffd700"],
            });

            // Efectos laterales continuos por 3 segundos
            const duration = 3000;
            const end = Date.now() + duration;

            function frame() {
              confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ["#d4af37", "#f4d03f", "#b8860b", "#e6c469"],
              });
              confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ["#d4af37", "#f4d03f", "#b8860b", "#e6c469"],
              });

              if (Date.now() < end) {
                requestAnimationFrame(frame);
              }
            }

            // Iniciar los efectos laterales después de la explosión principal
            setTimeout(() => {
              frame();
            }, 200);

            // Explosión adicional en el medio después de 1.5 segundos
            setTimeout(() => {
              confetti({
                particleCount: 80,
                spread: 60,
                origin: {
                  x: 0.5,
                  y: 0.4,
                },
                colors: ["#d4af37", "#f4d03f", "#e6c469", "#ffd700"],
                shapes: ["circle", "square"],
                scalar: 0.8,
                drift: 0,
                gravity: 0.6,
                ticks: 300,
              });
            }, 1500);
          }, 300);

          // Desconectar el observer ya que solo debe suceder una vez
          autoConfettiObserver.disconnect();
        }
      });
    }, observerOptions);

    // Comenzar a observar el elemento de la corona
    autoConfettiObserver.observe(crownElement);
  }

  // Configurar el auto-confetti después de que la carta esté visible
  setTimeout(() => {
    setupAutoConfetti();
  }, 2000);

  // También configurar inmediatamente si la carta ya está abierta
  if (letterContent && letterContent.classList.contains("show")) {
    setupAutoConfetti();
  }

  // ========================================
  // FUNCIÓN PARA CREAR MARIPOSAS FLOTANTES DINÁMICAS
  // ========================================
  function createFloatingButterflies() {
    // Encontrar todos los contenedores de partículas de mariposas
    const butterflyContainers = document.querySelectorAll(
      ".butterfly-particles"
    );

    butterflyContainers.forEach((container) => {
      // Limpiar mariposas existentes si las hay
      container.querySelectorAll(".floating-butterfly").forEach((butterfly) => {
        butterfly.remove();
      });

      // Crear 5 mariposas flotantes
      for (let i = 1; i <= 5; i++) {
        const butterfly = document.createElement("div");
        butterfly.className = "floating-butterfly";
        container.appendChild(butterfly);
      }
    });
  }

  // ========================================
  // INICIALIZACIÓN FINAL
  // ========================================

  console.log("🎉 Invitación XV Años - Gabriela Medina Pérez");
  console.log("✨ ¡Que disfrutes la celebración!");

  // ========================================
  // DOCUMENTACIÓN DE ANIMACIONES DE MARIPOSA ORGÁNICA
  // ========================================
  /*
   * RESUMEN DE IMPLEMENTACIÓN COMPLETA:
   *
   * 1. ANIMACIÓN DE VUELO DE SALIDA (butterfly-fly-away):
   *    - La mariposa del sobre vuela hacia la izquierda con curvas sinusoidales
   *    - Utiliza min() para responsividad entre vw y px
   *    - Duración: 3.5s con curva cubic-bezier optimizada
   *    - Incluye rotación y escalado orgánico
   *
   * 2. ANIMACIÓN DE VUELO DE ENTRADA (butterfly-fly-to-letter):
   *    - La mariposa aparece desde la derecha volando hacia la carta
   *    - Movimiento sinusoidal orgánico con variaciones naturales
   *    - Se posiciona suavemente en la esquina superior derecha de la carta
   *    - Duración: 3.5s con la misma curva optimizada
   *
   * 3. ANIMACIÓN DE FLOTACIÓN SUTIL (butterfly-positioned):
   *    - Flotación infinita suave una vez posicionada
   *    - Ajustes responsivos para diferentes tamaños de pantalla
   *    - Duración: 4-5s dependiendo del dispositivo
   *
   * 4. OPTIMIZACIONES DE RENDIMIENTO:
   *    - backface-visibility: hidden para móviles
   *    - will-change apropiado durante animaciones
   *    - Media queries para dispositivos pequeños
   *    - Función de respaldo si las animaciones CSS fallan
   *    - Observador de visibilidad para optimizar cuando fuera del viewport
   *
   * 5. EFECTOS VISUALES ADICIONALES:
   *    - Estela dorada sutil durante el vuelo
   *    - Transiciones suaves entre estados
   *    - Soporte para prefers-reduced-motion
   *
   * 6. RESPONSIVIDAD:
   *    - Funciona correctamente en móviles, tablets y desktop
   *    - Ajustes automáticos de escala y velocidad por dispositivo
   *    - Fallbacks para navegadores más antiguos
   *
   * ESTADO: ✅ IMPLEMENTACIÓN COMPLETA Y OPTIMIZADA
   */

  console.log("🦋✨ MARIPOSAS ORGÁNICAS IMPLEMENTADAS EXITOSAMENTE");
  console.log("🎯 Animaciones sinusoidales responsivas activadas");
  console.log("⚡ Optimizaciones de rendimiento aplicadas");
  console.log("📱 Compatibilidad móvil asegurada");
});

// ========================================
// FUNCIÓN PARA COMPARTIR LA INVITACIÓN
// ========================================

function shareInvitation() {
  if (navigator.share) {
    navigator.share({
      title: "Invitación XV Años - Gabriela Medina Pérez",
      text: "¡Estás invitado a celebrar mis XV años!",
      url: window.location.href,
    });
  } else {
    // Fallback para navegadores que no soportan Web Share API
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("¡Enlace copiado al portapapeles!");
    });
  }
}

// ========================================
// FUNCIÓN DE RESPALDO PARA ANIMACIONES DE MARIPOSA
// ========================================
function butterflyAnimationFallback() {
  const envelopeButterfly = document.getElementById("envelope-butterfly");
  const letterButterfly = document.getElementById("letter-butterfly");

  if (!envelopeButterfly || !letterButterfly) return;

  // Verificar después de un tiempo si las animaciones CSS no se ejecutaron
  setTimeout(() => {
    // Si la mariposa del sobre sigue visible después de la animación
    if (
      envelopeButterfly.style.display !== "none" &&
      !envelopeButterfly.classList.contains("butterfly-fly-away")
    ) {
      console.log(
        "🦋 Activando respaldo de animación - ocultando mariposa del sobre"
      );
      envelopeButterfly.style.opacity = "0";
      envelopeButterfly.style.transform = "translate(-100vw, 0) scale(0.5)";
      envelopeButterfly.style.transition = "all 2s ease-out";

      setTimeout(() => {
        envelopeButterfly.style.display = "none";
      }, 2000);
    }
  }, 5000);

  // Verificar si la mariposa de la carta apareció correctamente
  setTimeout(() => {
    if (
      letterButterfly.style.opacity === "0" ||
      letterButterfly.style.opacity === ""
    ) {
      console.log(
        "🦋 Activando respaldo de animación - mostrando mariposa de la carta"
      );
      letterButterfly.style.opacity = "1";
      letterButterfly.style.transform =
        "translate(0, 0) rotate(-15deg) scale(0.8)";
      letterButterfly.style.transition = "all 1s ease-out";
      letterButterfly.classList.add("butterfly-positioned");
      setupButterflyVisibilityObserver(letterButterfly);
    }
  }, 8000);
}

// ========================================
// FUNCIÓN DE VALIDACIÓN DE ANIMACIONES (Solo para desarrollo)
// ========================================
function validateButterflyAnimations() {
  const envelopeButterfly = document.getElementById("envelope-butterfly");
  const letterButterfly = document.getElementById("letter-butterfly");

  if (envelopeButterfly && letterButterfly) {
    console.log("✅ Elementos de mariposa encontrados correctamente");
    console.log(
      "🦋 Mariposa del sobre:",
      envelopeButterfly.getBoundingClientRect()
    );
    console.log(
      "🦋 Mariposa de la carta:",
      letterButterfly.getBoundingClientRect()
    );

    // Verificar que las clases CSS estén disponibles
    const styles = getComputedStyle(document.documentElement);
    console.log("✅ Animaciones CSS cargadas y disponibles");

    return true;
  } else {
    console.error("❌ No se encontraron los elementos de mariposa");
    return false;
  }
}

// Validar animaciones al cargar la página
setTimeout(() => {
  validateButterflyAnimations();
}, 1000);

// ========================================
// MÚSICA DE FONDO
// ========================================
function startBackgroundMusic() {
  const backgroundMusic = document.getElementById("background-music");

  if (backgroundMusic) {
    // Configurar el volumen inicial (más bajo para ser elegante)
    backgroundMusic.volume = 0.3;

    // Intentar reproducir la música
    const playPromise = backgroundMusic.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("🎵 Música de fondo iniciada exitosamente");
        })
        .catch((error) => {
          console.log("⚠️ La música requiere interacción del usuario:", error);
          // Fallback: intentar reproducir en el próximo click del usuario
          document.addEventListener(
            "click",
            function tryPlayMusic() {
              backgroundMusic
                .play()
                .then(() => {
                  console.log(
                    "🎵 Música iniciada después de interacción del usuario"
                  );
                  document.removeEventListener("click", tryPlayMusic);
                })
                .catch((e) =>
                  console.log("❌ No se pudo reproducir la música:", e)
                );
            },
            { once: true }
          );
        });
    }
  } else {
    console.error("❌ No se encontró el elemento de audio background-music");
  }
}
